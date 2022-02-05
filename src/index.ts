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

const collectEbookSites = async () => {
  const keyword = '妻の姉'

  const comicJp = await searchComikJp(keyword)
  const unext = await searchUnext(keyword)
  const kindleUnlimited = await searchKindleUnlimited(keyword)
  const mangaOkoku = await searchMangaOkoku(keyword)
  const ebookJapan = await searchEbookJapan(keyword)
  const cimoa = await searchCimoa(keyword)

  console.log('[コミック.jp]', comicJp)
  console.log('[U-NEXT]', unext)
  console.log('[KindleUnlimited]', kindleUnlimited)
  console.log('[まんが王国]', mangaOkoku)
  console.log('[ebookJapan]', ebookJapan)
  console.log('[cimoa]', cimoa)
}

const getSiteSettings = (siteName: string) => {
  const settings = siteSettings.filter((setting: SiteSetting) => setting.name === siteName)
  if (settings.length === 0) {
    throw new Error(`${siteName}は存在しません。正しいサイト名を指定してください。`)
  }
  return settings[0]
}

const displayHtmlTable = (siteName: string) => {}

const displayMarkdownTable = (siteName: string) => {
  const siteSetting = getSiteSettings(siteName)

  const amazonLink = getAmazonUrl('東京リベンジャーズ', siteSetting.amazon)

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
  | <a href="${
    siteSetting.cimoa
  }" target="_blank" rel="nofollow">コミックシーモア </a> | ○ | 先行配信がある。読み放題プランがある | 
  | <a href="${siteSetting.mangaokoku}" target="_blank" rel="nofollow">まんが王国 ${getImageTag(
    siteSetting.mangaokokuImage
  )}</a> | ○ | 毎日ポイントがたまる。無料お試しページが多い |
  `
  console.log(table)
}

const optionDefinitions = [
  {
    name: 'site',
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

const site = options.site ? `${options.site}` : ''
const format = options.format ? `${options.format}` : 'md'

console.log(`${site} のテーブル情報を ${format} 形式で出力します。`)

displayMarkdownTable(site)
