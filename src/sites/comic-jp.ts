import { scroll } from './util'
import { Page } from 'playwright-core'

export const comicJp = () => {
  const searchComicJpTitle = async (keyword: string, page: Page) => {
    const comikJpSearchUrl = 'https://comic.jp/comic'

    await page.goto(comikJpSearchUrl)
    await page.waitForTimeout(3000)

    const searchBoxSelector =
      '#headerPC > div > div.search-block > div > div > form > p.input > span > input'

    await page.fill(searchBoxSelector, keyword)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(3000)

    const searchZeroSeletor = '#__layout > div > div > article > section.main > p'
    if (await page.locator(searchZeroSeletor).isVisible()) {
      await scroll(page, 2, 1000)
      console.log('[コミック.jp]ご指定の条件に該当する作品はありませんでした。')
      return
    }
    await page.waitForTimeout(1000)
    await scroll(page, 2, 1000)
    await page.waitForTimeout(1000)
    return
  }

  return { searchComicJpTitle }
}
