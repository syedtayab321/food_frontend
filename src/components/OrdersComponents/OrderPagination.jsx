const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-center mt-6">
        <nav className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg border disabled:opacity-50"
          >
            &laquo;
          </button>
          
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 rounded-lg border ${
                number === currentPage 
                  ? "bg-red-600 text-white border-red-600" 
                  : "hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg border disabled:opacity-50"
          >
            &raquo;
          </button>
        </nav>
      </div>
    );
  };
  
  export default Pagination;