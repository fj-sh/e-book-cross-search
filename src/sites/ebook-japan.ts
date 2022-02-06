import { scroll } from './util'
import { Page } from 'playwright-core'

export const ebookJapan = () => {
  const URL = 'https://ebookjapan.yahoo.co.jp/free/'
  const SEARCH_BOX_SELECTOR =
    '#wrapper > header > div.header__contents.header-contents > div.search-form.header-contents__search > div > div.search-box > form > input'
  const SEARCH_ZERO =
    '#wrapper > div.contents-wrapper > div.main > div > div > div > div > div.search-zero > div'

  const searchEbookJapanTitle = async (keyword: string, page: Page) => {
    await page.goto(URL)
    await page.fill(SEARCH_BOX_SELECTOR, keyword)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(3000)
    if (await page.locator(SEARCH_ZERO).isVisible()) {
      await page.waitForTimeout(1000)
      console.log('[ebookJapan]ご指定の条件に該当する作品はありませんでした。')
      return
    }

    await scroll(page, 3, 1000)
    await page.waitForTimeout(1000)

    return
  }

  return { searchEbookJapanTitle }
}
