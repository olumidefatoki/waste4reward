import React from "react";

const PaginationPane = ({ currentPage, totalPages, nextPage, prevPage }) => {
  return (
    <div className="w-full flex justify-between mt-3">
      <button
        className="capitalize w-max bg-gray-50 border border-gray-300 p-1"
        onClick={() => prevPage()}
      >
        previous
      </button>
      <p>{`page ${currentPage} 0f ${totalPages}`}</p>
      <button
        className="capitalize border border-gray-300 p-1"
        onClick={() => nextPage()}
      >
        next
      </button>
    </div>
  );
};

export default PaginationPane;
