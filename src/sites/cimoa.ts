import * as playwright from 'playwright-aws-lambda'
import { scroll } from './util'

export const cimoa = () => {
  const URL = 'https://www.cmoa.jp/'
  const SEARCH_BOX_SELECTOR = '#suggest_search_box_store_search_word'
  const FIND_ITEM_SELECTOR =
    '#home > section.co_container.pc_with.clearfix > div > div > div.search_result_table > ul > li:nth-child(1) > div.search_result_box_right > div.search_result_box_right_sec1 > p > a'
  const TITLE_SELECTOR =
    '#purchase_form > div.title_details_main_box > div.title_details_thum_box_w.clearfix > div.title_details_text_box > div:nth-child(1) > h1'
  const SEARCH_ZERO =
    '#home > section.co_container.pc_with.clearfix > div > div.contents_right > div.result0Area'
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
      if (await page.locator(SEARCH_ZERO).isVisible()) {
        await browser.close()
        console.log('[コミックシーモア]条件に一致する商品はみつかりませんでした。')
        return false
      }

      await scroll(page, 3, 1000)

      await page.click(FIND_ITEM_SELECTOR)
      await page.waitForTimeout(1000)
      const title = await page.locator(TITLE_SELECTOR).textContent()

      const hasTitle = title?.includes(keyword)
      await browser.close()
      return hasTitle
    } catch (error: any) {
      console.log('[コミックシーモア] 例外が発生しました。', error)
      if (browser) {
        await browser.close()
      }
    }
  }

  return { searchCimoaTitle }
}
