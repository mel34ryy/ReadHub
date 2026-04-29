function BookSkeleton() {
  return (
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
  );
}

export default BookSkeleton;
