import { ebookJapan } from './sites/ebook-japan'

const searchEbookJapan = async (keyword: string) => {
  const { searchTitle } = ebookJapan()
  await searchTitle(keyword)
}

const main = async () => {
  const keyword = 'トリリオンゲーム'
  await searchEbookJapan(keyword)
}

main()
