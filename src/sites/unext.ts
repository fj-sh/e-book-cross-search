import * as playwright from 'playwright-aws-lambda'
import { scroll } from './util'

export const unext = () => {
  const searchUnextTitle = async (keyword: string) => {
    const browser = await playwright.launchChromium({
      headless: false,
      channel: 'chrome',
    })
    try {
      const searchUrl = 'https://video.unext.jp/'

      const context = await browser.newContext()
      const page = await context.newPage()
      await page.goto(searchUrl)
      await page.waitForTimeout(2000)

      const searchBoxSelector =
        '#__next > div.Leanback__SiteOverlay-sc-1vba8lh-2.gCyrFV > div.Leanback__DesktopSearch-sc-1vba8lh-3.hDWDPV > div > input'

      await page.fill(searchBoxSelector, keyword)
      await page.keyboard.press('Enter')
      await page.waitForTimeout(2000)

      await scroll(page, 2, 1000)

      const findItemSelector =
        '#__next > div.Layout__MainContent-i0fe44-0.ciMYus > div.Layout__MainComponent-i0fe44-1.iLrYU > div.ListViewContainer-sc-1v54ekx-0.cESCrs > div.ListView__Container-sc-1veaxzq-0.iYnQyM > div:nth-child(1) > div > div > div:nth-child(1) > a'

      await page.click(findItemSelector)
      await page.waitForTimeout(1000)

      const titleSelector =
        '#__next > div.Layout__MainContent-i0fe44-0.ciMYus > div.Layout__MainComponent-i0fe44-1.iLrYU > div.TitleModal__SiteOverlay-sc-1r097l6-0.dLViCG > div > div > div.MainSection__Container-sc-1fy4efc-0.xHhEQ > div.MainSection__MainMeta-sc-1fy4efc-2.fIwoeU > h1'
      const title = await page.locator(titleSelector).textContent()

      const hasTitle = title?.includes(keyword)
      await page.waitForTimeout(1000)
      await browser.close()
      return hasTitle
    } catch (error: any) {
      console.log('[U-NEXT] 例外が発生しました。', error)
      if (browser) {
        await browser.close()
      }
    }
  }

  return { searchUnextTitle }
}
