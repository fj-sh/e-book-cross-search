import { ebookJapan } from './sites/ebook-japan'
import { cimoa } from './sites/cimoa'
import { kindleUnlimited } from './sites/kindle-unlimited'

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

const main = async () => {
  const keyword = 'スラムダンク'
  const ebookJapan = await searchEbookJapan(keyword)
  await sleep(1000)
  const cimoa = await searchCimoa(keyword)
  await sleep(1000)
  const kindleUnlimited = await searchKindleUnlimited(keyword)

  console.log('[ebookJapan]', ebookJapan)
  console.log('[cimoa]', cimoa)
  console.log('[KindleUnlimited]', kindleUnlimited)
}

main()
