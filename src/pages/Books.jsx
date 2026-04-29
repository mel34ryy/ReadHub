import booksImg from "../assets/books.jpeg";
import { IoFilter } from "react-icons/io5";
import getBooks from "../services/apiBooks";
import { useEffect, useState } from "react";
import BookSkeleton from "../ui/BookSkeleton";
import Book from "../ui/Book";

function Books() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  useEffect(() => {
    async function loadBooks() {
      try {
        setIsLoading(true);
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadBooks();
  }, []);

  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = books.slice(startIndex, startIndex + booksPerPage);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <img
          className="w-full rounded-md max-h-75 brightness-75"
          src={booksImg}
          alt="books"
        />
      </div>
      <section>
        <div className="flex justify-between my-7">
          <h3>Books for you!</h3>
          <div className="flex items-center gap-4">
            <select name="types" id="types">
              <option value="test1">Test1</option>
              <option value="test2">Test2</option>
            </select>
            <button className="flex items-center justify-center gap-2">
              <span>
                <IoFilter />
              </span>
              Filter
            </button>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <BookSkeleton key={index} />
              ))
            : currentBooks.map((book, i) => (
                <Book
                  key={i}
                  title={book.title}
                  cover={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                      : `https://placehold.co/150/dddddd/dddddd`
                  }
                  author={book.author_name?.[0] || "Unknown Author"}
                />
              ))}
        </div>
        <div className="flex justify-center my-4">
          <div>
            <ul className="flex items-center justify-center gap-1">
              <li>
                <button
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 rounded-md border text-(--color-text)
          ${
            currentPage === 1
              ? "bg-(--color-text-gray) border-(--color-text-gray) opacity-70 cursor-not-allowed"
              : "bg-(--color-primary) border-(--color-primary) hover:bg-(--color-accent) hover:border-(--color-accent)"
          } ${currentPage === 1 ? "cursor-none" : "cursor-pointer"}`}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Previous
                </button>
              </li>

              {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;
                return (
                  <li
                    onClick={() => setCurrentPage(i + 1)}
                    key={i + 1}
                    className={`px-3 py-1.5 rounded-md border text-(--color-text)
            ${
              isActive
                ? "bg-(--color-accent) border-(--color-accent)"
                : "bg-(--color-primary) border-(--color-primary) hover:bg-(--color-accent) hover:border-(--color-accent)"
            }`}
                  >
                    <button>{i + 1}</button>
                  </li>
                );
              })}

              <li>
                <button
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1.5 rounded-md border text-(--color-surface)
          ${
            currentPage === totalPages
              ? "bg-(--color-text-gray) border[var(--color-text-gray) opacity-70 cursor-not-allowed"
              : "bg-(--color-primary) border-(--color-primary) hover:bg-(--color-accent) hover:border-(--color-accent)"
          } ${currentPage === totalPages ? "cursor-none" : "cursor-pointer"}`}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Books;
