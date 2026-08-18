import type {
  GoogleBook,
  GoogleBooksResponse,
} from "../types/books.ts";
import { $fetch } from "ofetch";

export const useBooks = () => {
  const searchBooks = async (query: string) => {
    if (!query.trim()) {
      return {
        totalItems: 0,
        items: [],
      } satisfies GoogleBooksResponse;
    }

    return await $fetch<GoogleBooksResponse>("/api/books/search", {
      query: {
        q: query,
      },
    });
  };

  const getBook = async (id: string) => {
    return await $fetch<GoogleBook>(`/api/books/${id}`);
  };

  return {
    searchBooks,
    getBook,
  };
};