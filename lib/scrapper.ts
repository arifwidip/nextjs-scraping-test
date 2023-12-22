import * as cheerio from "cheerio";
import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer-core';
import chrome from "@sparticuz/chromium";

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

export async function scrapePutusan(pageNumber: number = 1) {
  // get options for browser
  const options = await getOptions() as PuppeteerLaunchOptions;

  // launch a new headless browser with dev / prod options
  chrome.setGraphicsMode = false
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  // Scrap the link with type document only, don't scrap asset file like css, js, etc.
  await page.setRequestInterception(true)
  page.on("request", (request) => {
    if (request.resourceType() === "document") {
      request.continue()
    } else {
      request.abort()
    }
  })

  let url = 'https://putusan3.mahkamahagung.go.id/direktori.html'
  if (pageNumber > 1) {
    url =`https://putusan3.mahkamahagung.go.id/direktori/index/page/${pageNumber}.html`
  }

  // tell the page to visit the url
  await page.goto(url);

  // Get the html content
  const html = await page.evaluate(() => {
    return document.querySelector("body")!.innerHTML
  })

  // Init cherio from the HTML content
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

  return items
}
