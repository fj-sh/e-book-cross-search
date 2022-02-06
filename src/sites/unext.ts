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

      await page.waitForTimeout(1000)
      await browser.close()
      return true
    } catch (error: any) {
      console.log('[U-NEXT] 例外が発生しました。', error)
      if (browser) {
        await browser.close()
      }
    }
  }

  return { searchUnextTitle }
}
