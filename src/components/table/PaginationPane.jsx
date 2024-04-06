import React from "react";

const PaginationPane = () => {
  return (
    <div className="w-full flex justify-between mt-3">
      <button className="capitalize w-max bg-gray-50 border border-gray-300 p-1">
        previous
      </button>
      <p>page 1 0f 10</p>
      <button className="capitalize border border-gray-300 p-1">next</button>
    </div>
  );
};

export default PaginationPane;
