<script setup lang="ts">
interface Book {
  id: string
  title: string
  authors?: string[]
  publishedDate?: string
  thumbnail?: string
  isShortlisted?: boolean
}

const props = defineProps<{
  book: Book
}>()

const emit = defineEmits<{
  click: [book: Book]
  shortlist: [book: Book]
}>()
</script>

<template>
  <article class="group relative min-w-0">
    <!-- Cover -->
    <div
      class="relative overflow-hidden rounded-card bg-surface-soft shadow-sm"
    >
      <button
        type="button"
        class="block aspect-[2/3] w-full overflow-hidden"
        @click="emit('click', book)"
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
      </button>
      
      <!-- Shortlist -->
      <button
        type="button"
        class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105"
        :class="
          book.isShortlisted
            ? 'text-brand-600'
            : 'text-ink-soft'
        "
        @click.stop="emit('shortlist', book)"
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

    <!-- Information -->
    <button
      type="button"
      class="block w-full text-left"
      @click="emit('click', book)"
    >
      <h3
        class="mt-3 line-clamp-2 text-sm font-semibold leading-5 text-ink transition group-hover:text-brand-600"
      >
        {{ book.title }}
      </h3>

      <p class="mt-1 line-clamp-1 text-xs text-muted">
        {{ book.authors?.join(', ') || 'Unknown author' }}
      </p>

      <p
        v-if="book.publishedDate"
        class="mt-2 text-[11px] text-muted-light"
      >
        {{ book.publishedDate.slice(0, 4) }}
      </p>
    </button>
  </article>
</template>