export default async function getBooks(
  query = "book",
  page = 1,
  limit = 8,
  filter = "ebooks",
) {
  const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
  const startIndex = (page - 1) * limit;

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=${filter}&startIndex=${startIndex}&maxResults=${limit}&key=${API_KEY}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch books: ${res.status}`);
  }

  const data = await res.json();

  return {
    books: data?.items || [],
    total: data?.totalItems || 0,
  };
}
