import * as playwright from 'playwright-aws-lambda'
import { scroll } from './util'

export const mangaOkoku = () => {
  const searchMangaOkokuTitle = async (keyword: string) => {
    const browser = await playwright.launchChromium({
      headless: false,
      channel: 'chrome',
    })
    try {
      const mangaOkokuSearchUrl = 'https://comic.k-manga.jp/'

      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(mangaOkokuSearchUrl)
      await page.waitForTimeout(2000)

      const searchBoxSelector = '#x-search-word'

      await page.fill(searchBoxSelector, keyword)
      await page.keyboard.press('Enter')
      await page.waitForTimeout(2000)

      const searchZeroSeletor = '#contents > section > section:nth-child(3) > p'
      if (await page.locator(searchZeroSeletor).isVisible()) {
        await browser.close()
        console.log('[まんが王国]ご指定の条件に該当する作品はありませんでした。')
        return false
      }

      await scroll(page, 3, 1000)

      const findItemSelector = '#contents > section > section.section.mb-off > div > ul > li > a'

      await page.click(findItemSelector)
      await page.waitForTimeout(1000)

      const titleSelector =
        '#contents > div:nth-child(2) > section.book-info.section.pb40.pt2.pos-relative > header > h1 > span:nth-child(2)'
      const title = await page.locator(titleSelector).textContent()

      const hasTitle = title?.includes(keyword)
      await page.waitForTimeout(1000)
      await browser.close()
      return hasTitle
    } catch (error: any) {
      console.log('[まんが王国] 例外が発生しました。', error)
      if (browser) {
        await browser.close()
      }
    }
  }

  return { searchMangaOkokuTitle }
}
