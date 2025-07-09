import type { Pagination as PaginationType } from "../app/models/pagination";

type Props = {
  metadata: PaginationType;
  onPageChange: (page: number) => void;
};

export default function AppPagination({ metadata, onPageChange }: Props) {
  const { currentPage, totalPages } = metadata;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 text-sm font-medium border border-gray-300 ${
              page === currentPage
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </div>
  );
}
