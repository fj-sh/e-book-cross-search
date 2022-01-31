import * as playwright from 'playwright-aws-lambda'

export const ebookJapan = () => {
  const URL = 'https://ebookjapan.yahoo.co.jp/free/'
  const SEARCH_BOX_SELECTOR =
    '#wrapper > header > div.header__contents.header-contents > div.search-form.header-contents__search > div > div.search-box > form > input'
  const searchTitle = async (keyword: string) => {
    const browser = await playwright.launchChromium({
      headless: false,
    })
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(URL)
    await page.fill(SEARCH_BOX_SELECTOR, keyword)
    await page.keyboard.press('Enter')
  }

  return { searchTitle }
}
