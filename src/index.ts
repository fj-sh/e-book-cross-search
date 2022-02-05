import { ebookJapan } from './sites/ebook-japan'
import { cimoa } from './sites/cimoa'
import { kindleUnlimited } from './sites/kindle-unlimited'
import { mangaOkoku } from './sites/manga-okoku'
import { comicJp } from './sites/comic-jp'
import { unext } from './sites/unext'
import siteSettings from '../site-settings'
import commandLineArgs from 'command-line-args'

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

const displayTable = async () => {
  console.log('siteSettings', siteSettings[0])
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
]

const options = commandLineArgs(optionDefinitions)

const site = options.site ? `${options.site}` : ''
const format = options.format ? `${options.format}` : 'md'

console.log(`${site} のテーブル情報を ${format} 形式で出力します。`)
