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

async function getOptions(isDev: boolean) {
  let options;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    };
  }
  return options;
}

export async function GET(request: NextRequest) {
  return Response.json({
    data: 'a'
  })
}
