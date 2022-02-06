import { ebookJapan } from './sites/ebook-japan'
import { cimoa } from './sites/cimoa'
import { kindleUnlimited } from './sites/kindle-unlimited'
import { mangaOkoku } from './sites/manga-okoku'
import { comicJp } from './sites/comic-jp'
import { unext } from './sites/unext'
import commandLineArgs from 'command-line-args'
import { SiteSetting } from '../types/site-setting'
import siteSettings from '../site-settings'
import { getAmazonUrl, getImageTag } from './sites/util'
import childProcess from 'child_process'

const sleep = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

const searchEbookJapan = async (keyword: string) => {
  const { searchEbookJapanTitle } = ebookJapan()
  return await searchEbookJapanTitle(keyword)
}

const searchCimoa = async (keyword: string) => {
  const { searchCimoaTitle } = cimoa()
  return await searchCimoaTitle(keyword)
}

const searchKindleUnlimited = async (keyword: string) => {
  const { searchKindleUnlimitedTitle } = kindleUnlimited()
  return await searchKindleUnlimitedTitle(keyword)
}

const searchMangaOkoku = async (keyword: string) => {
  const { searchMangaOkokuTitle } = mangaOkoku()
  return await searchMangaOkokuTitle(keyword)
}

const searchComikJp = async (keyword: string) => {
  const { searchComicJpTitle } = comicJp()
  return await searchComicJpTitle(keyword)
}

const searchUnext = async (keyword: string) => {
  const { searchUnextTitle } = unext()
  return await searchUnextTitle(keyword)
}

const collectEbookSites = async (keyword: string) => {
  await searchKindleUnlimited(keyword)
  await searchComikJp(keyword)
  await searchUnext(keyword)
  await searchEbookJapan(keyword)
  await searchCimoa(keyword)
  await searchMangaOkoku(keyword)
}

const getSiteSettings = (siteName: string) => {
  const settings = siteSettings.filter((setting: SiteSetting) => setting.name === siteName)
  if (settings.length === 0) {
    throw new Error(`${siteName}は存在しません。正しいサイト名を指定してください。`)
  }
  return settings[0]
}

const displayHtmlTable = (siteName: string, keyword: string) => {
  const siteSetting = getSiteSettings(siteName)
  const amazonLink = getAmazonUrl(keyword, siteSetting.amazon)

  const table = `
<table>
  <thead>
    <tr><th>サイト</th><th>掲載有無</th><th>特徴</th></tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="${amazonLink}" target="_blank" rel="nofollow">Kindle Unlimited</a></td>
      <td>○</td>
      <td>Amazonアカウントですぐに30日間無料体験できる</td></tr>
    <tr>
      <td><a href="${siteSetting.comicJp}" target="_blank" rel="nofollow">コミック.jp ${getImageTag(
    siteSetting.comicJpImage
  )}</a>
      </td>
      <td>○</td>
      <td>30日間の無料体験。1200円分の無料ポイントがもらえる</td></tr>  
    <tr>
    <td><a href="${siteSetting.unext}" target="_blank" rel="nofollow">U-NEXT ${getImageTag(
    siteSetting.unextImage
  )}</a></td>
    <td>○</td>
    <td>30日間の無料体験。600円分の無料ポイントと動画・雑誌見放題</td></tr>  
    <tr>
      <td><a href="${
        siteSetting.ebookjapan
      }" target="_blank" rel="nofollow">ebookJapan ${getImageTag(
    siteSetting.ebookjapanImage
  )}</a></td>
      <td>○</td>
      <td>初回50%オフ。50%分のPayPayポイントがもらえるので実質半額。単品購入ができる</td></tr>  
    <tr>
      <td><a href="${
        siteSetting.cimoa
      }" target="_blank" rel="nofollow">コミックシーモア ${getImageTag(siteSetting.cimoaImage)}</a> 
      </td>
      <td>○</td>
      <td>先行配信がある。読み放題プランがある</td></tr>  
    <tr>
      <td><a href="${
        siteSetting.mangaokoku
      }" target="_blank" rel="nofollow">まんが王国 ${getImageTag(siteSetting.mangaokokuImage)}</a> 
      </td>
      <td>○</td>
      <td>毎日ポイントがたまる。無料お試しページが多い </td></tr>  
  </tbody>
</table>
  `
  return table
}

const displayMarkdownTable = (siteName: string, keyword: string) => {
  const siteSetting = getSiteSettings(siteName)
  const amazonLink = getAmazonUrl(keyword, siteSetting.amazon)
  const table = `
  | サイト | 掲載有無 | 特徴 |
  | --- | --- | --- |
  | <a href="${amazonLink}" target="_blank" rel="nofollow">Kindle Unlimited</a> | ○ | Amazonアカウントですぐに30日間無料体験できる |
  | <a href="${siteSetting.comicJp}" target="_blank" rel="nofollow">コミック.jp ${getImageTag(
    siteSetting.comicJpImage
  )}</a> | ○ | 30日間の無料体験。1200円分の無料ポイントがもらえる |
  | <a href="${siteSetting.unext}" target="_blank" rel="nofollow">U-NEXT ${getImageTag(
    siteSetting.unextImage
  )}</a>| ○ | 30日間の無料体験。600円分の無料ポイントと動画・雑誌見放題 |
  | <a href="${siteSetting.ebookjapan}" target="_blank" rel="nofollow">ebookJapan ${getImageTag(
    siteSetting.ebookjapanImage
  )}</a> | ○ | 初回50%オフ。50%分のPayPayポイントがもらえるので実質半額。単品購入ができる。 |
  | <a href="${siteSetting.cimoa}" target="_blank" rel="nofollow">コミックシーモア ${getImageTag(
    siteSetting.cimoaImage
  )}</a> | ○ | 先行配信がある。読み放題プランがある | 
  | <a href="${siteSetting.mangaokoku}" target="_blank" rel="nofollow">まんが王国 ${getImageTag(
    siteSetting.mangaokokuImage
  )}</a> | ○ | 毎日ポイントがたまる。無料お試しページが多い |
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
const keyword = options.keyword || '東京リベンジャーズ'

console.log(
  `${siteName} のテーブル情報を ${format} 形式で出力します。検索キーワードは「${keyword}」です。`
)

const main = async (format: string, siteName: string, keyword: string) => {
  const table = getTable(format, siteName, keyword)
  console.log(table)
  const { spawn } = childProcess
  const proc = spawn('pbcopy')
  proc.stdin.write(table)
  proc.stdin.end()
  console.log('テーブル情報をクリップボードにコピーしました！')

  await sleep(2000)
  await collectEbookSites(keyword)
}

main(format, siteName, keyword)
