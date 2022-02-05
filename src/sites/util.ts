import { Page } from 'playwright-core'

export const scroll = async (page: Page, repeat: number, waitTimeMs: number) => {
  for (let step = 0; step < repeat; step++) {
    await page.mouse.wheel(0, 300)
    await page.waitForTimeout(waitTimeMs)
  }
}

export const getAmazonUrl = (keyword: string, tag: string) =>
  encodeURI(`https://www.amazon.co.jp/s?k=${keyword}&i=digital-text&tag=${tag}`)

export const getImageTag = (src: string) => `<img src="${src}" height="1" width="1" border="0" />`
