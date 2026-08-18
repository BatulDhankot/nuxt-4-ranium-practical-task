import type { GoogleBook } from "@/types/books";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Book ID is required",
    });
  }

  const config = useRuntimeConfig();

  return await $fetch<GoogleBook>(
    `https://www.googleapis.com/books/v1/volumes/${id}`,
    {
      query: {
        key: config.googleBooksApiKey,
      },
    }
  );
});