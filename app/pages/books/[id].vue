<script setup lang="ts">
const route = useRoute();

const { getBook } = useBooks();

const {
  books: shortlist,
  initialize,
  isShortlisted,
  add,
  remove,
} = useShortlist();

const {
  data: book,
  pending,
  error,
} = await useAsyncData(
  `book-${route.params.id}`,
  () => getBook(String(route.params.id))
);

onMounted(() => {
  initialize();
});

const toggleShortlist = () => {
  if (!book.value) return;

  if (isShortlisted(book.value.id)) {
    remove(book.value.id);
    return;
  }

  add({
    id: book.value.id,
    title: book.value.volumeInfo.title,
    authors: book.value.volumeInfo.authors ?? [],
    publishedDate: book.value.volumeInfo.publishedDate,
    thumbnail: book.value.volumeInfo.imageLinks?.thumbnail,
  });
};

const stripHtml = (value?: string) => {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const year = computed(() => {
  return book.value?.volumeInfo.publishedDate?.slice(0, 4);
});

const description = computed(() => {
  return stripHtml(book.value?.volumeInfo.description);
});

const isBookShortlisted = computed(() => {
  return book.value ? isShortlisted(book.value.id) : false;
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

          <span class="text-lg font-bold tracking-tight">
            Shelf
          </span>
        </NuxtLink>

        <nav class="flex items-center gap-2">
          <NuxtLink
            to="/"
            class="hidden rounded-xl px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-surface-soft sm:block"
          >
            Discover
          </NuxtLink>

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

    <main
      class="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-8 sm:pt-12"
    >
      <!-- Back -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-ink"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          class="h-4 w-4"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>

        Back to discovery
      </NuxtLink>

      <!-- Loading -->
      <div
        v-if="pending"
        class="mt-10 grid gap-10 md:grid-cols-[280px_1fr]"
      >
        <div
          class="aspect-[2/3] animate-pulse rounded-card bg-surface-soft"
        />

        <div class="space-y-5">
          <div class="h-4 w-24 animate-pulse rounded bg-surface-soft" />
          <div class="h-12 w-3/4 animate-pulse rounded bg-surface-soft" />
          <div class="h-5 w-1/2 animate-pulse rounded bg-surface-soft" />
          <div class="h-24 w-full animate-pulse rounded bg-surface-soft" />
        </div>
      </div>

      <!-- Error -->
      <div
        v-else-if="error || !book"
        class="mt-10 rounded-card border border-line bg-surface px-6 py-20 text-center"
      >
        <div
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-danger"
        >
          !
        </div>

        <h1 class="mt-5 text-xl font-bold">
          Book not found
        </h1>

        <p class="mt-2 text-sm text-muted">
          We couldn't find the book you're looking for.
        </p>

        <NuxtLink
          to="/"
          class="mt-6 inline-flex rounded-button bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft"
        >
          Back to search
        </NuxtLink>
      </div>

      <!-- Book -->
      <template v-else>
        <section
          class="mt-10 grid gap-10 md:grid-cols-[280px_minmax(0,1fr)] md:gap-14 lg:grid-cols-[320px_minmax(0,1fr)]"
        >
          <!-- Cover -->
          <div>
            <div
              class="overflow-hidden rounded-card bg-surface-soft shadow-card"
            >
              <div class="aspect-[2/3]">
                <img
                  v-if="book.volumeInfo.imageLinks?.thumbnail"
                  :src="book.volumeInfo.imageLinks.thumbnail"
                  :alt="book.volumeInfo.title"
                  class="h-full w-full object-cover"
                />

                <div
                  v-else
                  class="flex h-full items-center justify-center px-8 text-center text-muted"
                >
                  No cover available
                </div>
              </div>
            </div>
          </div>

          <!-- Information -->
          <div class="flex flex-col">
            <div>
              <span
                class="inline-flex rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700"
              >
                Book details
              </span>

              <h1
                class="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl"
              >
                {{ book.volumeInfo.title }}
              </h1>

              <p
                v-if="book.volumeInfo.authors?.length"
                class="mt-4 text-lg text-muted"
              >
                by
                <span class="font-medium text-ink-soft">
                  {{ book.volumeInfo.authors.join(", ") }}
                </span>
              </p>

              <p
                v-if="description"
                class="mt-7 max-w-2xl text-base leading-7 text-muted"
              >
                {{ description }}
              </p>
            </div>

            <!-- Metadata -->
            <div
              class="mt-9 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-7 sm:grid-cols-4"
            >
              <div>
                <p
                  class="text-[11px] font-semibold uppercase tracking-wider text-muted-light"
                >
                  Publisher
                </p>

                <p class="mt-2 text-sm font-semibold leading-5">
                  {{ book.volumeInfo.publisher || "—" }}
                </p>
              </div>

              <div>
                <p
                  class="text-[11px] font-semibold uppercase tracking-wider text-muted-light"
                >
                  Published
                </p>

                <p class="mt-2 text-sm font-semibold">
                  {{ year || "—" }}
                </p>
              </div>

              <div>
                <p
                  class="text-[11px] font-semibold uppercase tracking-wider text-muted-light"
                >
                  Pages
                </p>

                <p class="mt-2 text-sm font-semibold">
                  {{ book.volumeInfo.pageCount || "—" }}
                </p>
              </div>

              <div>
                <p
                  class="text-[11px] font-semibold uppercase tracking-wider text-muted-light"
                >
                  Categories
                </p>

                <p class="mt-2 line-clamp-2 text-sm font-semibold">
                  {{
                    book.volumeInfo.categories?.join(", ") || "—"
                  }}
                </p>
              </div>
            </div>

            <!-- Action -->
            <div class="mt-8">
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-button px-5 py-3 text-sm font-semibold transition"
               :class="
                  isBookShortlisted
                    ? 'border border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100'
                    : 'bg-brand-600 text-white shadow-sm hover:bg-brand-700'
                "
                @click="toggleShortlist"
                >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  class="h-4 w-4"
                  :class="
                    isBookShortlisted
                      ? 'fill-brand-600'
                      : ''
                  "
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M6 3h12v18l-6-4-6 4V3Z" />
                </svg>
                {{
                  isBookShortlisted
                    ? "Remove from shortlist"
                    : "Add to shortlist"
                }}
              </button>
            </div>
          </div>
        </section>

        <!-- Description -->
        <section
          v-if="description"
          class="mt-20 border-t border-line pt-12"
        >
          <div class="grid gap-8 md:grid-cols-[220px_1fr]"
          >
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-widest text-brand-600"
              >
                About the book
              </p>

              <h2 class="mt-2 text-2xl font-bold tracking-tight">
                Description
              </h2>
            </div>

            <div
              class="max-w-3xl text-base leading-8 text-ink-soft"
            >
              <p>
                {{ description }}
              </p>
            </div>
          </div>
        </section>

        <!-- Categories -->
        <section
          v-if="book.volumeInfo.categories?.length"
          class="mt-14 border-t border-line pt-10"
        >
          <p
            class="text-xs font-semibold uppercase tracking-widest text-brand-600"
          >
            Explore
          </p>

          <h2 class="mt-2 text-2xl font-bold tracking-tight">
            Categories
          </h2>

          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="category in book.volumeInfo.categories"
              :key="category"
              class="rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink-soft"
            >
              {{ category }}
            </span>
          </div>
        </section>
      </template>
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
