import './PaginationFooter.css';

type PaginationFooterProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function PaginationFooter({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationFooterProps) {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Páginas a mostrar alrededor del actual
  const visiblePages = Array.from(
    { length: 5 },
    (_, i) => currentPage - 2 + i
  ).filter((page) => page >= 1 && page <= totalPages);

  return (
    <footer className="pagination-footer">
      <div className="pagination">
        <button onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
          «
        </button>
        <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
          ‹
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}

        <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
          ›
        </button>
        <button onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
          »
        </button>
      </div>
    </footer>
  );
}
