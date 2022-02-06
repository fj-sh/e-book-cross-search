import { scroll } from './util'
import { Page } from 'playwright-core'

export const cimoa = () => {
  const URL = 'https://www.cmoa.jp/'
  const SEARCH_BOX_SELECTOR = '#suggest_search_box_store_search_word'

  const searchCimoaTitle = async (keyword: string, page: Page) => {
    await page.goto(URL)
    await page.fill(SEARCH_BOX_SELECTOR, keyword)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(3000)
    await scroll(page, 3, 1000)
    await page.waitForTimeout(1000)
    return
  }

  return { searchCimoaTitle }
}
