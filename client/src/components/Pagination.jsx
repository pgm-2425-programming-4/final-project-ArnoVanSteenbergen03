function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav aria-label="Paginering">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Vorige
      </button>
      <span>Pagina {currentPage} van {totalPages}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Volgende
      </button>
    </nav>
  );
}

export default Pagination;
