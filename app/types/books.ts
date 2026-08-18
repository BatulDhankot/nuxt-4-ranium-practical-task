export interface Book {
  id: string
  title: string
  authors: string[]
  publishedYear: string | null
  description: string | null
  publisher: string | null
  pageCount: number | null
  categories: string[]
  thumbnail: string | null
  cover: string | null
}

export interface GoogleBooksResponse {
  totalItems: number
  items?: GoogleBookVolume[]
}

export interface BookImageLinks {
  smallThumbnail?: string;
  thumbnail?: string;
}

export interface BookVolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: BookImageLinks;
}

export interface GoogleBook {
  id: string;
  volumeInfo: BookVolumeInfo;
}

export interface GoogleBookVolume {
  id: string
  volumeInfo: {
    title?: string
    authors?: string[]
    publishedDate?: string
    description?: string
    publisher?: string
    pageCount?: number
    categories?: string[]
    imageLinks?: {
      smallThumbnail?: string
      thumbnail?: string
      small?: string
      medium?: string
      large?: string
      extraLarge?: string
    }
  }
}

export interface ShortlistBook {
  id: string;
  title: string;
  authors: string[];
  publishedDate?: string;
  thumbnail?: string;
}
