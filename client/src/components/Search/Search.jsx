import { SearchStyles } from "./SearchStyles";

const Search = ({ setSearch }) => {
  return (
    <SearchStyles>
      <input
        type="text"
        placeholder="Search"
        onChange={({ currentTarget: input }) => setSearch(input.value)}
      />
    </SearchStyles>
  );
};

export default Search;
