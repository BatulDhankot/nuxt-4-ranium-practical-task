<script setup lang="ts">
import type { GoogleBook } from "../types/books";

const router = useRouter();
const { searchBooks } = useBooks();
const { books: shortlist, initialize} =
  useShortlist();


const searchQuery = ref("");
const results = ref<GoogleBook[]>([]);
const loading = ref(false);
const searched = ref(false);
const errorMessage = ref("");

onMounted(() => {
  initialize();
});

const performSearch = async (query = searchQuery.value) => {
  const value = query.trim();

  if (!value) return;

  searchQuery.value = value;
  loading.value = true;
  searched.value = true;
  errorMessage.value = "";

  try {
    const response = await searchBooks(value);

    results.value = response.items ?? [];
  } catch (error) {
    console.error(error);

    results.value = [];
    errorMessage.value =
      "We couldn't load the books right now. Please try again.";
  } finally {
    loading.value = false;
  }
};

const popularSearches = [
  "Harry Potter",
  "Atomic Habits",
  "The Hobbit",
  "1984",
];

const openBook = (id: string) => {
  router.push(`/books/${id}`);
};

const toBookCard = (book: GoogleBook) => ({
  id: book.id,
  title: book.volumeInfo.title,
  authors: book.volumeInfo.authors ?? [],
  publishedDate: book.volumeInfo.publishedDate,
  thumbnail: book.volumeInfo.imageLinks?.thumbnail,
});
</script>

<template>
  <div class="min-h-screen bg-page">
    <!-- Header -->
    <header
      class="sticky top-0 z-40 border-b border-line-light bg-page/90 backdrop-blur-xl"
    >
      <div
        class="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex items-center gap-3"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="h-5 w-5"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"
              />
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            </svg>
          </div>

          <span class="text-lg font-bold tracking-tight">
            Shelf
          </span>
        </NuxtLink>

        <!-- Navigation -->
        <nav class="flex items-center gap-2">
          <NuxtLink
            to="/"
            class="hidden rounded-xl px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-surface-soft sm:block"
          >
            Discover
          </NuxtLink>

          <!-- Shortlist -->
        <NuxtLink
            to="/shortlist"
            class="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-surface-soft"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="h-4 w-4"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M6 3h12v18l-6-4-6 4V3Z" />
            </svg>

            <span>Shortlist</span>

            <span
              v-if="shortlist.length"
              class="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-100 px-1.5 text-[11px] font-bold text-brand-700"
            >
              {{ shortlist.length }}
            </span>
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main>
      <!-- Hero -->
      <section
        class="mx-auto max-w-4xl px-5 pb-12 pt-20 text-center sm:px-8 sm:pt-28"
      >
        <div
          class="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-brand-500" />
          Your personal book finder
        </div>

        <h1
          class="text-4xl font-bold tracking-[-0.04em] text-ink sm:text-6xl lg:text-7xl"
        >
          Find your next
          <span class="text-brand-600"> great read.</span>
        </h1>

        <p
          class="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg"
        >
          Discover books by title or author
        </p>

        <!-- Search -->
        <SearchBar
          v-model="searchQuery"
          :loading="loading"
          @search="performSearch"
        />

        <!-- Popular searches -->
        <div class="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span class="mr-1 text-xs text-muted">
            Try:
          </span>

          <button
            v-for="item in popularSearches"
            :key="item"
            type="button"
            class="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            @click="performSearch(item)"
          >
            {{ item }}
          </button>
        </div>
      </section>

      <!-- Results -->
      <section
        v-if="searched"
        class="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10"
      >
        <!-- Results heading -->
        <div
          class="mb-7 flex items-end justify-between border-b border-line pb-5"
        >
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Library
            </p>

            <h2 class="mt-1 text-2xl font-bold tracking-tight">
              Search results
            </h2>
          </div>

          <span
            v-if="!loading && !errorMessage"
            class="text-sm text-muted"
          >
            {{ results.length }}
            {{ results.length === 1 ? "book" : "books" }}
          </span>
        </div>

        <!-- Loading -->
        <div
          v-if="loading"
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          <div
            v-for="index in 10"
            :key="index"
            class="overflow-hidden rounded-card border border-line bg-surface"
          >
            <div class="aspect-[2/3] animate-pulse bg-surface-soft" />

            <div class="space-y-3 p-4">
              <div class="h-4 animate-pulse rounded bg-surface-soft" />
              <div class="h-3 w-2/3 animate-pulse rounded bg-surface-soft" />
            </div>
          </div>
        </div>

        <!-- Error -->
        <div
          v-else-if="errorMessage"
          class="rounded-card border border-red-100 bg-red-50 p-10 text-center"
        >
          <div
            class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-danger"
          >
            !
          </div>

          <h3 class="mt-4 font-semibold text-ink">
            Something went wrong
          </h3>

          <p class="mt-2 text-sm text-muted">
            {{ errorMessage }}
          </p>

          <button
            class="mt-5 rounded-button bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-soft"
            @click="performSearch()"
          >
            Try again
          </button>
        </div>

        <!-- Empty -->
        <div
          v-else-if="results.length === 0"
          class="rounded-card border border-line bg-surface px-6 py-16 text-center"
        >
          <div
            class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-soft"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              class="h-6 w-6 text-muted"
              stroke="currentColor"
              stroke-width="1.7"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </div>

          <h3 class="mt-5 text-lg font-semibold">
            No books found
          </h3>

          <p class="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
            Try searching for a different title, author, or keyword.
          </p>
        </div>

        <!-- Books -->
        <div
          v-else
          class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5"
        >
        <!-- Book Card Common Component -->
         <BookCard
            v-for="book in results"
            :key="book.id"
            :book="toBookCard(book)"
            @click="openBook(book.id)"
          />
        </div>
      </section>

      <!-- Initial state -->
      <section
        v-else
        class="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10"
      >
        <div
          class="rounded-card border border-line bg-surface p-8 sm:p-12"
        >
          <div
            class="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]"
          >
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-brand-600">
                Explore
              </p>

              <h2
                class="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
              >
                There is a whole
                <span class="text-brand-600">library</span>
                waiting.
              </h2>

              <p
                class="mt-4 max-w-lg leading-7 text-muted"
              >
                Search for a book you're curious about and
                discover its story, author, publisher, and more.
              </p>
            </div>

            <div
              class="grid grid-cols-3 gap-3 sm:gap-4"
            >
              <div
                class="aspect-[2/3] rotate-[-5deg] overflow-hidden rounded-xl bg-brand-100 shadow-lg"
              >
                <div
                  class="flex h-full items-end p-4 text-sm font-bold text-brand-700"
                >
                  Stories
                </div>
              </div>

              <div
                class="aspect-[2/3] translate-y-4 overflow-hidden rounded-xl bg-ink shadow-lg"
              >
                <div
                  class="flex h-full items-end p-4 text-sm font-bold text-white"
                >
                  Ideas
                </div>
              </div>

              <div
                class="aspect-[2/3] rotate-[5deg] overflow-hidden rounded-xl bg-surface-soft shadow-lg"
              >
                <div
                  class="flex h-full items-end p-4 text-sm font-bold text-ink"
                >
                  Knowledge
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-line bg-surface">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"
      >
        <span>© {{ new Date().getFullYear() }} Shelf</span>
        <span>Discover. Read. Keep.</span>
      </div>
    </footer>
  </div>
</template>