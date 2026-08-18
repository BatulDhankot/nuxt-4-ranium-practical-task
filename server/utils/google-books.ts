import type {
  Book,
  GoogleBookVolume,
} from '../../app/types/books'

export function mapGoogleBook(volume: GoogleBookVolume): Book {
  const info = volume.volumeInfo

  return {
    id: volume.id,
    title: info.title ?? 'Untitled',
    authors: info.authors ?? [],
    publishedYear: info.publishedDate?.slice(0, 4) ?? null,
    description: info.description ?? null,
    publisher: info.publisher ?? null,
    pageCount: info.pageCount ?? null,
    categories: info.categories ?? [],
    thumbnail: info.imageLinks?.thumbnail ?? null,
    cover:
      info.imageLinks?.large ??
      info.imageLinks?.medium ??
      info.imageLinks?.thumbnail ??
      null,
  }
}
