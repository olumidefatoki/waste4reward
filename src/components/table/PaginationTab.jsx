import React from "react";
import { Pagination } from "@aws-amplify/ui-react";
const PaginationTab = ({
  currentPageIndex,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  handleOnChange,
}) => {
  return (
    <>
      {totalPages > 1 ? (
        <Pagination
          as={"div"}
          currentPage={currentPageIndex}
          totalPages={totalPages || 0}
          siblingCount={1}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
          onChange={handleOnChange}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default PaginationTab;
