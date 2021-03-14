import React from "react";

interface INavigationProps {
  maxPage: number;
  page: number;
  setPage: (page: number) => void;
}

const Navigation: React.FC<INavigationProps> = ({ setPage, page, maxPage }) => {
  const clearPage = page + 1;

  return (
    <div data-testid="table_Navigation" className="flex justify-between pt-10">
      <button
        disabled={page === 0}
        className={`px-3 py-1 text-white rounded-sm ${
          page === 0 ? "bg-gray-500" : "bg-actionColor-400"
        }`}
        onClick={() => page > 0 && setPage(page - 1)}
      >
        Prev
      </button>
      <div>{page + 1 + "/" + maxPage}</div>
      <button
        disabled={clearPage === maxPage}
        className={`px-3 py-1 text-white rounded-sm ${
          clearPage === maxPage ? "bg-gray-500" : "bg-actionColor-400"
        }`}
        onClick={() => clearPage < maxPage && setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};
export default Navigation;
