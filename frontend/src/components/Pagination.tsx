import { Pagination } from 'react-bootstrap';
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
    <Pagination>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {pageItems.map((page, index) =>
        typeof page === 'number' ? (
          <Pagination.Item
            key={index}
            active={page === currentPage}
            onClick={() => onPageChange(page)}>
            {page}
          </Pagination.Item>
        ) : (
          <Pagination.Ellipsis key={index} disabled />
        )
      )}

      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );
};

export default PaginationComponent;
