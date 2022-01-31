import { ebookJapan } from './sites/ebook-japan'

const searchEbookJapan = async (keyword: string) => {
  const { searchTitle } = ebookJapan()
  return await searchTitle(keyword)
}

const main = async () => {
  const keyword = 'メイの大冒険'
  const ebookJapan = await searchEbookJapan(keyword)
  console.log('[ebookjapan]', ebookJapan)
}

main()
