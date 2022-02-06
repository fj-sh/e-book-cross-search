import { scroll } from './util'
import { Page } from 'playwright-core'

export const kindleUnlimited = () => {
  const searchKindleUnlimitedTitle = async (keyword: string, page: Page) => {
    const kindleUnlimitedSearchUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(
      keyword
    )}&i=digital-text&rh=n%3A2275256051%2Cp_n_feature_nineteen_browse-bin%3A3169286051&dc&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&qid=1643731084&rnid=3169285051&ref=sr_nr_p_n_feature_nineteen_browse-bin_1`

    console.log('[Kindle Unlimited] 検索URL：', kindleUnlimitedSearchUrl)
    const titleListSelector =
      '#search > div.s-desktop-width-max.s-desktop-content.s-opposite-dir.sg-row > div.s-matching-dir.sg-col-16-of-20.sg-col.sg-col-8-of-12.sg-col-12-of-16 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(n)'

    await page.goto(kindleUnlimitedSearchUrl)

    await page.waitForTimeout(2000)

    const elementHandle = await page.$$(titleListSelector)
    // 検索したページがキーワードを含んでいるか？
    for (const element of elementHandle) {
      const value = await (await element.getProperty('textContent')).jsonValue()
      if (value.includes(keyword)) {
        console.log(`"${keyword}"は実在する...!!!`)
      }
    }

    await page.waitForTimeout(1000)
    await scroll(page, 5, 1000)
    return
  }

  return { searchKindleUnlimitedTitle }
}
