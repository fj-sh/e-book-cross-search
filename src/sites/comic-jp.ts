import * as playwright from 'playwright-aws-lambda'
import { scroll } from './util'

export const comicJp = () => {
  const searchComicJpTitle = async (keyword: string) => {
    const browser = await playwright.launchChromium({
      headless: false,
      channel: 'chrome',
    })
    try {
      const comikJpSearchUrl = 'https://comic.jp/comic'

      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(comikJpSearchUrl)
      await page.waitForTimeout(4000)

      const searchBoxSelector =
        '#headerPC > div > div.search-block > div > div > form > p.input > span > input'

      await page.fill(searchBoxSelector, keyword)
      await page.keyboard.press('Enter')
      await page.waitForTimeout(4000)

      const searchZeroSeletor = '#__layout > div > div > article > section.main > p'
      if (await page.locator(searchZeroSeletor).isVisible()) {
        await browser.close()
        console.log('[コミック.jp]ご指定の条件に該当する作品はありませんでした。')
        return false
      }

      await scroll(page, 3, 1000)

      const findItemSelector =
        '#__layout > div > div > article > section.main > div:nth-child(1) > ul > li:nth-child(1) > a'

      await page.click(findItemSelector)
      await page.waitForTimeout(2000)

      const titleSelector =
        '#__layout > div > div > div.content.pc-padding > article > section:nth-child(1) > div > h1'
      const title = await page.locator(titleSelector).textContent()

      const hasTitle = title?.includes(keyword)
      await page.waitForTimeout(1000)
      await browser.close()
      return hasTitle
    } catch (error: any) {
      console.log('[コミック.jp] 例外が発生しました。', error)
      if (browser) {
        await browser.close()
      }
    }
  }

  return { searchComicJpTitle }
}
