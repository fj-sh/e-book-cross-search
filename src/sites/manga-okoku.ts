import { scroll } from './util'
import { Page } from 'playwright-core'

export const mangaOkoku = () => {
  const searchMangaOkokuTitle = async (keyword: string, page: Page) => {
    const mangaOkokuSearchUrl = 'https://comic.k-manga.jp/'
    await page.goto(mangaOkokuSearchUrl)
    await page.waitForTimeout(1000)

    const searchBoxSelector = '#x-search-word'

    await page.fill(searchBoxSelector, keyword)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(2000)

    const searchZeroSeletor = '#contents > section > section:nth-child(3) > p'
    if (await page.locator(searchZeroSeletor).isVisible()) {
      console.log('[まんが王国]ご指定の条件に該当する作品はありませんでした。')
      return
    }
    await page.waitForTimeout(2000)
    await scroll(page, 3, 1000)
    await page.waitForTimeout(1000)
    return
  }

  return { searchMangaOkokuTitle }
}
