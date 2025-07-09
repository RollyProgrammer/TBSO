import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/store/store";
import { setSearchTerm } from "../features/catalog/catalogSlice";
import { debounce } from "@mui/material";

export default function Search() {
  const { searchTerm } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    setTerm(searchTerm)
  }, [searchTerm])

  const debouncedSearch = debounce(event => {
    dispatch(setSearchTerm(event.target.value))
  }, 500)

  return (
    <input
      className="w-full rounded border-2 border-gray-400 px-2 py-1 mb-5"
      type="search"
      value={term}
      onChange={e => {
        setTerm(e.target.value);
        debouncedSearch(e);
      }}
      placeholder="Search products..."
    />
  );
}
