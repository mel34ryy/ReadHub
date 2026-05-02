import { FaReadme } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { BsInfoCircleFill } from "react-icons/bs";

function Book({
  cover,
  title,
  author,
  previewLink,
  pdfLink,
  isPdfAvailable,
  infoLink,
  saleability,
  price,
  currency,
  buyLink,
}) {
  return (
    <div className="rounded-xl bg-(--color-bg) p-4 shadow flex flex-col h-full">
      <div className="relative h-64 mb-4 overflow-hidden rounded-md shrink-0 group">
        {saleability === "FREE" && (
          <span className="absolute top-2.5 left-2.5 z-10 px-2 py-1 text-xs font-semibold rounded-full bg-(--color-success) text-(--color-surface) shadow">
            Free
          </span>
        )}
        {saleability === "FOR_SALE" && (
          <span className="absolute top-2.5 left-2.5 z-10 px-2 py-1 text-xs font-semibold rounded-full bg-(--color-danger) text-(--color-surface) shadow">
            Paid
          </span>
        )}
        <div className="absolute backdrop-blur-sm top-6.25 -right-12.5 w-fit p-2.5 rounded-[5px] bg-(--color-primary)/25 opacity-0 group-hover:opacity-100 group-hover:right-3.75 transition-all duration-300 delay-300">
          <div className="flex flex-col items-center gap-4">
            {isPdfAvailable && pdfLink && (
              <a
                href={pdfLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-text)/70 underline hover:text-(--color-text) transition-all duration-300"
                title="Download PDF"
              >
                <FiDownload className="text-[26px] px-1.25 y-2.5" />
              </a>
            )}
            {infoLink && (
              <a
                href={infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-text)/70 underline hover:text-(--color-text) transition-all duration-300"
                title="More Info"
              >
                <BsInfoCircleFill className="text-[26px] px-1.25 y-2.5" />
              </a>
            )}
          </div>
        </div>
        <img src={cover} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-semibold text-sm mb-1 line-clamp-2">{title}</h3>
      <p className="text-sm text-(--color-text-gray) mb-3 line-clamp-1">
        {author}
      </p>
      <div className="mt-auto flex flex-col gap-3">
        <button className="px-3 py-1 rounded-md bg-(--color-primary) text-(--color-surface) cursor-pointer hover:opacity-90 transition">
          Add to Wishlist
        </button>
        <div className="flex items-center justify-between gap-2">
          {saleability === "FOR_SALE" && price && (
            <span className="text-sm font-semibold text-(--color-text)">
              {price} {currency}
            </span>
          )}
          {saleability === "NOT_FOR_SALE" && (
            <span className="w-full text-xs text-center text-(--color-text-gray) border border-(--color-border) rounded-md px-3 py-1.5 cursor-no-drop">
              Not available
            </span>
          )}
          {saleability === "FREE" && previewLink && (
            <a
              href={previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-1.5 text-sm font-medium rounded-md bg-(--color-accent) text-white hover:bg-(--color-accent-hover) transition text-center"
            >
              Read
            </a>
          )}
          {saleability === "FOR_SALE" && buyLink && (
            <a
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className=" px-3 py-1.5 text-sm font-medium rounded-md bg-(--color-primary) text-white hover:opacity-90 transition text-center"
            >
              Buy Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Book;
