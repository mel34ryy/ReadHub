import booksImg from "../assets/books.jpeg";
import { IoFilter } from "react-icons/io5";
import getBooks from "../services/apiBooks";
import { useEffect, useState } from "react";
import BookSkeleton from "../ui/BookSkeleton";
import Book from "../ui/Book";

const MAX_RESULTS = 250;

function Books({ query, wishList, addToWishlist }) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState("ebooks");
  const booksPerPage = 12;

  useEffect(() => {
    if (!query.trim()) return;

    let ignore = false;

    async function loadBooks() {
      try {
        setIsLoading(true);

        const { books, total } = await getBooks(
          query,
          currentPage,
          booksPerPage,
          filter,
        );

        if (ignore) return;

        setBooks(books);

        const safeTotal = Math.min(total, MAX_RESULTS);
        setTotalPages(Math.ceil(safeTotal / booksPerPage));
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadBooks();

    return () => {
      ignore = true;
    };
  }, [currentPage, query, filter]);

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
        <div className="flex justify-between mt-7">
          <h3>Books for you!</h3>
          <div className="flex items-center gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="py-1.5 px-3"
              name="types"
              id="types"
            >
              <option value="ebooks">Ebooks</option>
              <option value="partial">Partial</option>
              <option value="full">Full</option>
              <option value="free-ebooks">Free ebooks</option>
              <option value="paid-ebooks">Paid ebooks</option>
            </select>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <BookSkeleton key={index} />
              ))
            : books.map((book, i) => {
                const info = book.volumeInfo;
                return (
                  <Book
                    key={book.id || i}
                    id={book.id}
                    title={info?.title || "No Title"}
                    cover={
                      info?.imageLinks?.thumbnail ||
                      "https://placehold.co/150/dddddd/dddddd"
                    }
                    author={info?.authors?.[0] || "Unknown Author"}
                    previewLink={book.accessInfo?.webReaderLink}
                    pdfLink={book.accessInfo?.pdf?.downloadLink}
                    isPdfAvailable={book.accessInfo?.pdf?.isAvailable}
                    infoLink={info?.infoLink}
                    saleability={book.saleInfo?.saleability}
                    price={book.saleInfo?.listPrice?.amount}
                    currency={book.saleInfo?.listPrice?.currencyCode}
                    buyLink={book.saleInfo?.buyLink}
                    wishList={wishList}
                    addToWishlist={addToWishlist}
                  />
                );
              })}
        </div>
        <div className="flex justify-center my-4">
          <div>
            <ul className="flex items-center justify-center gap-1">
              <li>
                <button
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-all duration-200
            ${
              currentPage === 1
                ? "bg-(--color-pagination-disabled-bg) border-(--color-pagination-border) text-(--color-pagination-disabled-text) opacity-60 cursor-not-allowed"
                : "bg-(--color-pagination-bg) border-(--color-pagination-border) text-(--color-pagination-text) hover:bg-(--color-pagination-active-bg) hover:text-(--color-pagination-active-text) hover:border-(--color-pagination-active-bg) cursor-pointer"
            }`}
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

                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
                ) {
                  return (
                    <li
                      onClick={() => {
                        if (page <= totalPages) setCurrentPage(page);
                      }}
                      key={page}
                      className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-all duration-200 cursor-pointer
          ${
            isActive
              ? "bg-(--color-pagination-active-bg) border-(--color-pagination-active-bg) text-(--color-pagination-active-text)"
              : "bg-(--color-pagination-bg) border-(--color-pagination-border) text-(--color-pagination-text) hover:bg-(--color-pagination-active-bg) hover:text-(--color-pagination-active-text) hover:border-(--color-pagination-active-bg)"
          }`}
                    >
                      <button
                        disabled={isLoading || isActive}
                        className="cursor-pointer"
                      >
                        {page}
                      </button>
                    </li>
                  );
                }

                if (page === currentPage - 3 || page === currentPage + 3) {
                  return (
                    <li
                      key={page}
                      className="px-2 py-1.5 text-(--color-text-gray) text-sm"
                    >
                      ...
                    </li>
                  );
                }

                return null;
              })}

              <li>
                <button
                  disabled={isLoading || currentPage === totalPages}
                  className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-all duration-200
            ${
              currentPage === totalPages
                ? "bg-(--color-pagination-disabled-bg) border-(--color-pagination-border) text-(--color-pagination-disabled-text) opacity-60 cursor-not-allowed"
                : "bg-(--color-pagination-bg) border-(--color-pagination-border) text-(--color-pagination-text) hover:bg-(--color-pagination-active-bg) hover:text-(--color-pagination-active-text) hover:border-(--color-pagination-active-bg) cursor-pointer"
            }`}
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
