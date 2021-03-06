import { ebookJapan } from './sites/ebook-japan'
import { cimoa } from './sites/cimoa'
import { kindleUnlimited } from './sites/kindle-unlimited'
import { mangaOkoku } from './sites/manga-okoku'
import { comicJp } from './sites/comic-jp'
import { unext } from './sites/unext'
import commandLineArgs from 'command-line-args'
import { SiteSetting } from '../types/site-setting'
import siteSettings from '../site-settings'
import { getAmazonUrl, getBrowserPage, getImageTag } from './sites/util'
import childProcess from 'child_process'
import { Page } from 'playwright-core'

const sleep = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

const searchEbookJapan = async (keyword: string, page: Page) => {
  const { searchEbookJapanTitle } = ebookJapan()
  return await searchEbookJapanTitle(keyword, page)
}

const searchCimoa = async (keyword: string, page: Page) => {
  const { searchCimoaTitle } = cimoa()
  return await searchCimoaTitle(keyword, page)
}

const searchKindleUnlimited = async (keyword: string, page: Page) => {
  const { searchKindleUnlimitedTitle } = kindleUnlimited()
  return await searchKindleUnlimitedTitle(keyword, page)
}

const searchMangaOkoku = async (keyword: string, page: Page) => {
  const { searchMangaOkokuTitle } = mangaOkoku()
  return await searchMangaOkokuTitle(keyword, page)
}

const searchComikJp = async (keyword: string, page: Page) => {
  const { searchComicJpTitle } = comicJp()
  return await searchComicJpTitle(keyword, page)
}

const searchUnext = async (keyword: string, page: Page) => {
  const { searchUnextTitle } = unext()
  return await searchUnextTitle(keyword, page)
}

const collectEbookSites = async (keyword: string) => {
  const page = await getBrowserPage()
  await searchKindleUnlimited(keyword, page)
  await searchComikJp(keyword, page)
  await searchUnext(keyword, page)
  await searchEbookJapan(keyword, page)
  await searchCimoa(keyword, page)
  await searchMangaOkoku(keyword, page)
  await page.close()
}

const getSiteSettings = (siteName: string) => {
  const settings = siteSettings.filter((setting: SiteSetting) => setting.name === siteName)
  if (settings.length === 0) {
    throw new Error(`${siteName}???????????????????????????????????????????????????????????????????????????`)
  }
  return settings[0]
}

const displayHtmlTable = (siteName: string, keyword: string) => {
  const siteSetting = getSiteSettings(siteName)
  const amazonLink = getAmazonUrl(keyword, siteSetting.amazon)

  const table = `
<table>
  <thead>
    <tr><th>?????????</th><th>????????????</th><th>??????</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="${amazonLink}" target="_blank" rel="nofollow">Kindle Unlimited</a></td>
      <td>??????</td>
      <td>Amazon???????????????????????????30???????????????????????????</td></tr>
    <tr>
      <td><a href="${siteSetting.comicJp}" target="_blank" rel="nofollow">????????????.jp ${getImageTag(
    siteSetting.comicJpImage
  )}</a>
      </td>
      <td>??????</td>
      <td>30????????????????????????1200??????????????????????????????????????????</td></tr>  
    <tr>
    <td><a href="${siteSetting.unext}" target="_blank" rel="nofollow">U-NEXT ${getImageTag(
    siteSetting.unextImage
  )}</a></td>
    <td>??????</td>
    <td>30????????????????????????600??????????????????????????????????????????????????????</td></tr>  
    <tr>
      <td><a href="${
        siteSetting.ebookjapan
      }" target="_blank" rel="nofollow">ebookJapan ${getImageTag(
    siteSetting.ebookjapanImage
  )}</a></td>
      <td>??????</td>
      <td>??????50%?????????50%??????PayPay????????????????????????????????????????????????????????????????????????</td></tr>  
    <tr>
      <td><a href="${
        siteSetting.cimoa
      }" target="_blank" rel="nofollow">???????????????????????? ${getImageTag(siteSetting.cimoaImage)}</a> 
      </td>
      <td>??????</td>
      <td>??????????????????????????????????????????????????????</td></tr>  
    <tr>
      <td><a href="${
        siteSetting.mangaokoku
      }" target="_blank" rel="nofollow">??????????????? ${getImageTag(siteSetting.mangaokokuImage)}</a> 
      </td>
      <td>??????</td>
      <td>?????????????????????????????????????????????????????????????????? </td></tr>  
  </tbody>
</table>
  `
  return table
}

const displayMarkdownTable = (siteName: string, keyword: string) => {
  const siteSetting = getSiteSettings(siteName)
  const amazonLink = getAmazonUrl(keyword, siteSetting.amazon)
  const table = `
  | ????????? | ???????????? | ?????? |
  | --- | --- | --- |
  | <a href="${amazonLink}" target="_blank" rel="nofollow">Kindle Unlimited</a> | ??? | Amazon???????????????????????????30??????????????????????????? |
  | <a href="${siteSetting.comicJp}" target="_blank" rel="nofollow">????????????.jp ${getImageTag(
    siteSetting.comicJpImage
  )}</a> | ?????? | 30????????????????????????1200?????????????????????????????????????????? |
  | <a href="${siteSetting.unext}" target="_blank" rel="nofollow">U-NEXT ${getImageTag(
    siteSetting.unextImage
  )}</a>| ?????? | 30????????????????????????600?????????????????????????????????????????????????????? |
  | <a href="${siteSetting.ebookjapan}" target="_blank" rel="nofollow">ebookJapan ${getImageTag(
    siteSetting.ebookjapanImage
  )}</a> | ?????? | ??????50%?????????50%??????PayPay??????????????????????????????????????????????????????????????????????????? |
  | <a href="${siteSetting.cimoa}" target="_blank" rel="nofollow">???????????????????????? ${getImageTag(
    siteSetting.cimoaImage
  )}</a> | ?????? | ?????????????????????????????????????????????????????? | 
  | <a href="${siteSetting.mangaokoku}" target="_blank" rel="nofollow">??????????????? ${getImageTag(
    siteSetting.mangaokokuImage
  )}</a> | ?????? | ?????????????????????????????????????????????????????????????????? |
  `
  return table
}

const getTable = (format: string, siteName: string, keyword: string) => {
  return (
    (format === 'md' && displayMarkdownTable(siteName, keyword)) ||
    (format === 'html' && displayHtmlTable(siteName, keyword)) ||
    new Error()
  )
}

const optionDefinitions = [
  {
    name: 'siteName',
    alias: 's',
    type: String,
  },
  {
    name: 'format',
    alias: 'f',
    type: String,
  },
  {
    name: 'keyword',
    alias: 'k',
    type: String,
  },
]

const options = commandLineArgs(optionDefinitions)

const siteName = options.siteName || ''
const format = options.format || 'md'
const keyword = options.keyword || '???????????????????????????'

console.log(
  `${siteName} ???????????????????????? ${format} ??????????????????????????????????????????????????????${keyword}????????????`
)

const main = async (format: string, siteName: string, keyword: string) => {
  const table = getTable(format, siteName, keyword)
  console.log(table)
  const { spawn } = childProcess
  const proc = spawn('pbcopy')
  proc.stdin.write(table)
  proc.stdin.end()
  console.log('?????????????????????????????????????????????????????????????????????')

  await sleep(2000)
  await collectEbookSites(keyword)
}

main(format, siteName, keyword)
