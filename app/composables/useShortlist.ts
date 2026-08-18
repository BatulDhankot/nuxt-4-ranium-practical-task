import { ref, type Ref } from "vue";
import type { ShortlistBook } from "../types/books.ts";

const STORAGE_KEY = "shelf-shortlist";
const stateStore = new Map<string, Ref<unknown>>();

export const useShortlist = () => {
  const books = useState<ShortlistBook[]>(
    "shortlist",
    () => []
  );

  const initialized = useState(
    "shortlist-initialized",
    () => false
  );

  const initialize = () => {
    if (!import.meta.client || initialized.value) {
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        books.value = JSON.parse(stored);
      } catch {
        books.value = [];
      }
    }

    initialized.value = true;
  };

  const persist = () => {
    if (!import.meta.client) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(books.value)
    );
  };

  const isShortlisted = (id: string) => {
    return books.value.some((book) => book.id === id);
  };

  const add = (book: ShortlistBook) => {
    if (isShortlisted(book.id)) return;

    books.value.push(book);
    persist();
  };

  const remove = (id: string) => {
    books.value = books.value.filter(
      (book) => book.id !== id
    );

    persist();
  };

  return {
    books,
    initialize,
    isShortlisted,
    add,
    remove,
  };
};

function useState<T>(key: string, initial: () => T): Ref<T> {
  if (!stateStore.has(key)) {
    stateStore.set(key, ref(initial()) as Ref<unknown>);
  }

  return stateStore.get(key) as Ref<T>;
}
