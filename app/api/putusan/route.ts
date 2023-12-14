import * as cheerio from "cheerio";
import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer-core';
import chrome from "@sparticuz/chromium";
import { NextRequest } from "next/server";

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function getOptions() {
  let options;
  if (process.env.NODE_ENV === "production") {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath(),
      headless: chrome.headless,
    }
  } else {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    }
  }
  return options;
}

export async function GET(request: NextRequest) {
  try {
    // get options for browser
    const options = await getOptions() as PuppeteerLaunchOptions;

    // launch a new headless browser with dev / prod options
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setRequestInterception(true)
    page.on("request", (request) => {
      if (request.resourceType() === "document") {
        request.continue()
      } else {
        request.abort()
      }
    })

    // set the viewport size
    // await page.setViewport({
    //   width: 1920,
    //   height: 1080,
    //   deviceScaleFactor: 1,
    // })

    // tell the page to visit the url
    await page.goto('https://putusan3.mahkamahagung.go.id/direktori.html');
    const html = await page.evaluate(() => {
      return document.querySelector("body")!.innerHTML
    })
    const $ = cheerio.load(html)

    const $items = $('#popular-post-list-sidebar').children('.spost')
    const items: any = []

    $items.each((_, el) => {
      const $obj = $(el)
      const dates = $obj.find('.small').eq(1).text().replace(/\s/g, "").split('—')
      const details = $obj.find('.entry-c > div:last-child').html()?.split('<br>')
      details?.pop()
      const totalViews = parseInt($obj.find('strong[title="Jumlah view"]').text())
      const totalDownloads = parseInt($obj.find('strong[title="Jumlah download"]').text())
      const abstract = $obj.find('.putusan_container').text()

      const item = {
        link: $obj.find('strong a').attr('href'),
        title: $obj.find('strong a').text(),
        dates,
        details,
        abstract,
        totalViews,
        totalDownloads,
      }

      items.push(item)
    })

    await browser.close()

    return Response.json({
      data: items,
    });

  } catch (e: any) {
    return Response.json({
      error: e.message,
    }, {
      status: 500,
    })
  }
}
