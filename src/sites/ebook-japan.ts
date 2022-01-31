import * as playwright from 'playwright-aws-lambda'

export const ebookJapan = () => {
  const URL = 'https://ebookjapan.yahoo.co.jp/free/'
  const SEARCH_BOX_SELECTOR =
    '#wrapper > header > div.header__contents.header-contents > div.search-form.header-contents__search > div > div.search-box > form > input'
  const FIND_ITEM_SELECTOR =
    '#wrapper > div.contents-wrapper > div.main > div > div > div > div > div.contents-search > div > ul > li:nth-child(1) > div > a'
  const TITLE_SELECTOR =
    '#wrapper > div.contents-wrapper > div.main > div > div.page-series > div > div.contents-main > div.book-main > div:nth-child(1) > div > h1'
  const SEARCH_ZERO =
    '#wrapper > div.contents-wrapper > div.main > div > div > div > div > div.search-zero > div'
  const searchTitle = async (keyword: string) => {
    const browser = await playwright.launchChromium({
      headless: false,
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
        console.log('[ebookJapan]ご指定の条件に該当する作品はありませんでした。')
        return false
      }
      await page.click(FIND_ITEM_SELECTOR)
      const title = await page.locator(TITLE_SELECTOR).textContent()

      const hasTitle = title?.includes(keyword)
      await browser.close()
      return hasTitle
    } catch (error: any) {
      console.log('[ebookjapan] 例外が発生しました。', error)
      if (browser) {
        await browser.close()
      }
    }
  }

  return { searchTitle }
}
