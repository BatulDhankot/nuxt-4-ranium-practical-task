import type { GoogleBooksResponse } from "@/types/books.ts";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = String(query.q || "").trim();

  if (!search) {
    return {
      totalItems: 0,
      items: [],
    };
  }

  const config = useRuntimeConfig();

  return await $fetch<GoogleBooksResponse>(
    "https://www.googleapis.com/books/v1/volumes",
    {
      query: {
        q: search,
        key: config.googleBooksApiKey,
        maxResults: 20,
      },
    }
  );
});