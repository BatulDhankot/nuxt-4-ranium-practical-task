# Node version
node -v
v24.19.0

# npm -v
11.17.0

# github SSH to install
git@github.com:BatulDhankot/nuxt-4-ranium-practical-task.git

# Run command
npm run dev

# Shelf — Book Discovery App

Shelf is a book discovery application built with Nuxt 4 and Vue 3. It allows users to search for books, the cover, title, author, and publication year using the Google Books API, view detailed information about a book, and save books to a personal shortlist.

## Live Demo

**Live application:** [(https://nuxt-4-ranium-practical-task-39etddvep-batuldhankots-projects.vercel.app/)]

**GitHub repository:** [(https://github.com/BatulDhankot/nuxt-4-ranium-practical-task)]

**Screen recording:** [ADD YOUR LOOM / VIDEO URL]

---

## Key Features
1. Search the book
2. view Detail of the book
3. Shortlist to read later

1. Book Search

- Search for books by title or author.
- Search results are retrieved from the Google Books API.
- Results display:
  - Book cover
  - Title
  - Author
  - Publication year
- Loading, empty, and error states are handled.

2. Book Details
Each book has its own detail page cover its own URL, showing a larger cover, the description, publisher, page count, and categories.

3. Shortlist to read later
A user can save books to a personal shortlist and remove them. The shortlist survives a page refresh. 

## Tradeoffs
# 1. Better search experience

I would improve the search experience with:

- Debounced search requests
- Pagination or "Load more" functionality
- Sorting options
- add loader 
- Better handling of very large result sets
- Recent search history

# 2. Better API caching

I would introduce server-side caching for frequently requested Google Books data.

This would:

- Reduce repeated API requests
- Improve response times
- Reduce dependency on the external API

# 3. More robust shortlist persistence
The current shortlist is stored in `localStorage`, which is appropriate for this exercise because authentication and a backend database were not required.

For a production application, I would add:

- User authentication
- Server-side persistence 
- pinia persistance

# 4. Testing
- add test cases in jest 
- add or use tools for testing

# Improved UX and UI 
- add Skeleton loaders

## unfinished task
`Storybook`:

I attempted to integrate Storybook for `BookCard` and `SearchBar`. The integration encountered `SB_CORE-SERVER_0006 (MainFileMissingError)`, where Storybook could not find the required `.storybook/main.js` configuration. After adding the configuration, the Nuxt Storybook integration continued to produce build/configuration errors. Due to the four-hour constraint, I stopped troubleshooting the integration and prioritized completing and stabilizing the main application.

## Where I Used AI Tooling

I used AI tools as a development assistant for troubleshooting and implementation guidance.

- Used AI to troubleshoot Nuxt 4 project structure and component auto-import issues.
- Used AI to review the component structure and identify reusable UI components such as `BookCard` and `SearchBar`.
- Used AI while attempting to add Storybook. I encountered `SB_CORE-SERVER_0006 (MainFileMissingError)`, where Storybook could not find the required `.storybook/main.js` configuration. I investigated the Nuxt/Storybook configuration with AI, but stopped further Storybook troubleshooting because of the four-hour time constraint.
- I reviewed and adapted the suggestions and made the final implementation decisions myself.

