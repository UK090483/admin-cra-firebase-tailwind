import * as React from "react";

export interface ISearchProps {
  setSearch: (search: string) => void;
  search: string | null;
}

const Search: React.FC<ISearchProps> = ({ setSearch, search }) => {
  return (
    <div className="flex">
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="search"
        value={search ? search : ""}
        data-testid="searchInput"
        className="mt-1 p-3 block w-full rounded-md bg-gray-100 border-gray-500 border-2 focus:border-gray-500 focus:bg-white focus:ring-0"
      />
    </div>
  );
};

export default Search;
