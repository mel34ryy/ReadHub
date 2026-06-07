import { FiDownload, FiTrash2 } from "react-icons/fi";
import { BsInfoCircleFill } from "react-icons/bs";

function WishList({ wishList, removeFromWishlist }) {
  if (!wishList.length) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">My Wishlist</h2>

        <p className="text-(--color-text-gray)">
          No books have been added yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-8">My Wishlist</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishList.map((book) => {
          return (
            <div
              key={book.id}
              className="rounded-xl bg-(--color-bg) p-4 shadow flex flex-col h-full"
            >
              <div className="relative h-64 mb-4 overflow-hidden rounded-md group">
                <div className="absolute backdrop-blur-sm top-6 -right-12 p-2 rounded-md bg-(--color-primary)/25 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all duration-300">
                  <div className="flex flex-col items-center gap-4">
                    {book.isPdfAvailable && book.pdfLink && (
                      <a
                        href={book.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--color-text)/70 hover:text-(--color-text)"
                      >
                        <FiDownload className="text-[26px] px-1.25 y-2.5" />
                      </a>
                    )}

                    {book.infoLink && (
                      <a
                        href={book.infoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--color-text)/70 hover:text-(--color-text)"
                      >
                        <BsInfoCircleFill className="text-[26px] px-1.25 y-2.5" />
                      </a>
                    )}
                  </div>
                </div>

                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                {book.title}
              </h3>

              <p className="text-sm text-(--color-text-gray) mb-3 line-clamp-1">
                {book.author}
              </p>

              <div className="mt-auto flex flex-col gap-3">
                <button
                  onClick={() => removeFromWishlist(book.id)}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-(--color-danger) text-white hover:opacity-90 transition"
                >
                  <FiTrash2 />
                  Remove
                </button>

                <div className="flex items-center justify-between gap-2">
                  {book.saleability === "FOR_SALE" && book.price && (
                    <span className="text-sm font-semibold">
                      {book.price} {book.currency}
                    </span>
                  )}

                  {book.saleability === "NOT_FOR_SALE" && (
                    <span className="w-full text-center text-xs text-(--color-text-gray) border border-(--color-border) rounded-md px-3 py-1.5">
                      Not available
                    </span>
                  )}

                  {book.saleability === "FREE" && book.previewLink && (
                    <a
                      href={book.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-3 py-1.5 text-sm font-medium rounded-md bg-(--color-accent) text-white hover:bg-(--color-accent-hover) transition text-center"
                    >
                      Read
                    </a>
                  )}

                  {book.saleability === "FOR_SALE" && book.buyLink && (
                    <a
                      href={book.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-sm font-medium rounded-md bg-(--color-primary) text-white hover:opacity-90 transition"
                    >
                      Buy Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WishList;
