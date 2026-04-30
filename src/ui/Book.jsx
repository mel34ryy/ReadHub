function Book({ cover, title, author }) {
  return (
    <div className="rounded-xl bg-(--color-bg) p-4 shadow flex flex-col h-full">
      <div className="h-64 mb-4 overflow-hidden rounded-md shrink-0">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-semibold text-sm mb-1 line-clamp-2">{title}</h3>
      <p className="text-sm text-(--color-text-gray) mb-3 line-clamp-1">
        {author}
      </p>
      <div className="flex gap-2 justify-between mt-auto">
        <button className="px-3 py-1 rounded-md bg-(--color-text-gray) text-(--color-surface) cursor-pointer">
          Add to Wishlist
        </button>
        <button className="px-3 py-1 rounded-md bg-(--color-primary) text-(--color-surface) cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Book;
