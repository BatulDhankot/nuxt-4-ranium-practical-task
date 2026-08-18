import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BookCard from './BookCard.vue'

const meta = {
  title: 'Shelf/BookCard',
  component: BookCard,
  tags: ['autodocs'],
} satisfies Meta<typeof BookCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    book: {
      id: '1',
      title: 'The Great Gatsby',
      authors: ['F. Scott Fitzgerald'],
      publishedDate: '1925',
      thumbnail:
        'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    },
  },
}