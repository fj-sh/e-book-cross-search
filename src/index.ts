import { ebookJapan } from './sites/ebook-japan'
import { cimoa } from './sites/cimoa'
import { kindleUnlimited } from './sites/kindle-unlimited'
import { mangaOkoku } from './sites/manga-okoku'
import { comicJp } from './sites/comic-jp'
import { unext } from './sites/unext'

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

const main = async () => {
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

main()
