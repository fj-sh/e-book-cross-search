import * as playwright from 'playwright-aws-lambda'
import { scroll } from './util'

export const cimoa = () => {
  const URL = 'https://www.cmoa.jp/'
  const SEARCH_BOX_SELECTOR = '#suggest_search_box_store_search_word'

  const searchCimoaTitle = async (keyword: string) => {
    const browser = await playwright.launchChromium({
      headless: false,
      channel: 'chrome',
    })
    try {
      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(URL)
      await page.fill(SEARCH_BOX_SELECTOR, keyword)
      await page.keyboard.press('Enter')
      await page.waitForTimeout(3000)
      await scroll(page, 3, 1000)
      await page.waitForTimeout(1000)
      await browser.close()
    } catch (error: any) {
      console.log('[コミックシーモア] 例外が発生しました。', error)
      if (browser) {
        await browser.close()
      }
    }
  }

  return { searchCimoaTitle }
}
