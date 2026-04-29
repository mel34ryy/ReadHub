export default async function getBooks() {
  const randomPage = Math.floor(Math.random() * 100) + 1;
  const res = await fetch(`/api/search.json?q=book&page=${randomPage}`);
  const data = await res.json();

  return data?.docs;
}
