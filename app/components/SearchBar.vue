<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [query: string]
}>()

const query = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <form
    class="flex w-full gap-3"
    @submit.prevent="emit('search', query)"
  >
    <div class="relative flex-1">
      <input
        v-model="query"
        type="search"
        placeholder="Search by title or author..."
        class="h-13 w-full rounded-button border border-line bg-surface px-5 text-sm text-ink outline-none transition placeholder:text-muted-light focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="h-13 rounded-button bg-brand-600 px-6 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {{ loading ? 'Searching...' : 'Search' }}
    </button>
  </form>
</template>
