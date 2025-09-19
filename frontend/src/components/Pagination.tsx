import { PaginationProps } from '../interfaces';

const PaginationComponent: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageItems = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, maxVisiblePages);
    } else if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pageItems = getPageItems();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        ‹ Prev
      </button>

      {pageItems.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
              page === currentPage
                ? 'bg-purple-500 text-white border-purple-500'
                : 'bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-white/60">...</span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        Next ›
      </button>
    </div>
  );
};

export default PaginationComponent;
