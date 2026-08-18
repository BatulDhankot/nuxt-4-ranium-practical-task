<script setup lang="ts">
const {
  books,
  initialize,
  remove,
} = useShortlist();

onMounted(() => {
  initialize();
});
</script>

<template>
  <div class="min-h-screen bg-page">
    <!-- Header -->
    <header
      class="border-b border-line-light bg-page"
    >
      <div
        class="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
      >
        <NuxtLink
          to="/"
          class="flex items-center gap-3"
        >
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white"
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

          <span class="text-lg font-bold">
            Shelf
          </span>
        </NuxtLink>

        <NuxtLink
          to="/"
          class="text-sm font-medium text-muted hover:text-ink"
        >
          Back to Discover
        </NuxtLink>
      </div>
    </header>

    <main
      class="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10"
    >
      <!-- Heading -->
      <div class="mb-10">
        <p
          class="text-xs font-semibold uppercase tracking-widest text-brand-600"
        >
          Your collection
        </p>

        <div
          class="mt-2 flex items-end justify-between"
        >
          <div>
            <h1
              class="text-4xl font-bold tracking-tight"
            >
              Your Shortlist
            </h1>

            <p class="mt-2 text-muted">
              Books you've saved for later.
            </p>
          </div>

          <span
            class="hidden rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700 sm:block"
          >
            {{ books.length }}
            {{ books.length === 1 ? "book" : "books" }}
          </span>
        </div>
      </div>

      <!-- Empty -->
      <div
        v-if="books.length === 0"
        class="rounded-card border border-line bg-surface px-6 py-20 text-center"
      >
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            class="h-6 w-6"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M6 3h12v18l-6-4-6 4V3Z" />
          </svg>
        </div>

        <h2 class="mt-5 text-xl font-bold">
          Your shortlist is empty
        </h2>

        <p
          class="mx-auto mt-2 max-w-md text-sm leading-6 text-muted"
        >
          Search for a book you love and save it here
          to come back to later.
        </p>

        <NuxtLink
          to="/"
          class="mt-6 inline-flex rounded-button bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Discover books
        </NuxtLink>
      </div>

      <!-- Books -->
      <div
        v-else
        class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5"
      >
        <article
          v-for="book in books"
          :key="book.id"
          class="group relative min-w-0"
        >
          <div
            class="relative overflow-hidden rounded-card bg-surface-soft shadow-sm"
          >
            <NuxtLink
              :to="`/books/${book.id}`"
              class="block aspect-[2/3]"
            >
              <img
                v-if="book.thumbnail"
                :src="book.thumbnail"
                :alt="book.title"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div
                v-else
                class="flex h-full items-center justify-center px-5 text-center text-sm text-muted"
              >
                No cover available
              </div>
            </NuxtLink>

            <!-- Remove -->
            <button
              type="button"
              class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-600 shadow-sm backdrop-blur transition hover:scale-105"
              aria-label="Remove from shortlist"
              @click="remove(book.id)"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-4 w-4"
              >
                <path d="M6 3h12v18l-6-4-6 4V3Z" />
              </svg>
            </button>
          </div>

          <NuxtLink
            :to="`/books/${book.id}`"
            class="block"
          >
            <h2
              class="mt-3 line-clamp-2 text-sm font-semibold leading-5 transition group-hover:text-brand-600"
            >
              {{ book.title }}
            </h2>

            <p
              class="mt-1 line-clamp-1 text-xs text-muted"
            >
              {{
                book.authors?.join(", ") ||
                "Unknown author"
              }}
            </p>

            <p
              v-if="book.publishedDate"
              class="mt-2 text-[11px] text-muted-light"
            >
              {{ book.publishedDate.slice(0, 4) }}
            </p>
          </NuxtLink>
        </article>
      </div>
    </main>
  </div>
</template>