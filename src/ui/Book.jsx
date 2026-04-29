function Book({ cover, title, author }) {
  return (
    <div className="rounded-xl bg-(--color-bg) p-4 shadow">
      <div className="h-64 mb-4 overflow-hidden rounded-md">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-semibold text-sm mb-1 line-clamp-2">{title}</h3>
      <p className="text-sm text-(--color-text-gray) mb-3">{author}</p>
      <div className="flex gap-2 justify-between">
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

/*
<>
      <div className="animate-pulse rounded-xl bg-(--color-bg) p-4 shadow">
        <div className="h-64 bg-(--color-text-gray)/30 rounded-md mb-4"></div>
        <div className="h-4 bg-(--color-text-gray)/30 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-(--color-text-gray)/30 rounded w-1/2"></div>
        <div className="mt-4 flex gap-2">
          <div className="h-8 w-24 bg-(--color-text-gray)/30 rounded-md"></div>
          <div className="h-8 w-24 bg-(--color-text-gray)/30 rounded-md"></div>
        </div>
      </div>
    </>
*/

export default Book;
