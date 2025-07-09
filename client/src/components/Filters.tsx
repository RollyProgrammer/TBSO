import { useFetchFiltersQuery } from "../features/catalog/catalogApi";
import BrandFilter from "./BrandFilter";
import Search from "./Search";
import TypeFilter from "./TypeFilter";
import { resetParams, setBrands, setTypes } from "../features/catalog/catalogSlice";
import { useAppDispatch, useAppSelector } from "../app/store/store";

export default function Filters() {
  const { data } = useFetchFiltersQuery();
  const { types, brands } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  return (
    //  Filter Header
    <div>
      <div className="flex justify-between mb-3">
        <h3 className="text-xl font-semibold">Filters</h3>
        <button
          className="text-sm text-gray-600 hover:underline"
          onClick={() => {
            dispatch(resetParams());
            dispatch(resetParams());
          }}
        >
          Clear
        </button>
      </div>
      <Search />
      <BrandFilter
        brands={data.brands}
        checked={brands}
        onChange={(items: string[]) => dispatch(setBrands(items))}
      />
      <TypeFilter
        types={data.types}
        checked={types}
        onChange={(items: string[]) => dispatch(setTypes(items))}
      />
    </div>
  );
}
