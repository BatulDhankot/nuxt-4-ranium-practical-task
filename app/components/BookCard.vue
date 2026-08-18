<script setup lang="ts">
interface Book {
  id: string
  title: string
  authors?: string[]
  publishedDate?: string
  thumbnail?: string
}

const props = defineProps<{
  book: Book
}>()

const emit = defineEmits<{
  click: [book: Book]
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