import { scroll } from './util'
import { Page } from 'playwright-core'

export const unext = () => {
  const searchUnextTitle = async (keyword: string, page: Page) => {
    const searchUrl = 'https://video.unext.jp/'
    await page.goto(searchUrl)
    await page.waitForTimeout(2000)

    const searchBoxSelector =
      '#__next > div.Leanback__SiteOverlay-sc-1vba8lh-2.gCyrFV > div.Leanback__DesktopSearch-sc-1vba8lh-3.hDWDPV > div > input'

    await page.fill(searchBoxSelector, keyword)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(2000)

    await scroll(page, 2, 1000)

    await page.waitForTimeout(1000)
    return true
  }

  return { searchUnextTitle }
}
