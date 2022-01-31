import { ebookJapan } from './sites/ebook-japan'
import { cimoa } from './sites/cimoa'

const searchEbookJapan = async (keyword: string) => {
  const { searchEbookJapanTitle } = ebookJapan()
  return await searchEbookJapanTitle(keyword)
}

const searchCimoa = async (keyword: string) => {
  const { searchCimoaTitle } = cimoa()
  return await searchCimoaTitle(keyword)
}

const main = async () => {
  const keyword = '弟嫁'
  const ebookJapan = await searchEbookJapan(keyword)
  const cimoa = await searchCimoa(keyword)
  console.log('[ebookjapan]', ebookJapan)
  console.log('[コミックシーモア]', cimoa)
}

main()
