// src/components/Filters.tsx

import { useFetchFiltersQuery } from "../features/catalog/catalogApi";
import BrandFilter from "./BrandFilter";
import Search from "./Search";
import TypeFilter from "./TypeFilter";
import { resetParams, setBrands, setTypes } from "../features/catalog/catalogSlice";
import { useAppDispatch, useAppSelector } from "../app/store/store";

// Changed cardSize to cardWidth
type FiltersProps = {
  cardWidth: string;
  setCardWidth: (size: string) => void;
};

// Changed cardSize, setCardSize to cardWidth, setCardWidth
export default function Filters({ cardWidth, setCardWidth }: FiltersProps) {
  const { data } = useFetchFiltersQuery();
  const { types, brands } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-3">
        <h3 className="text-xl font-semibold">Filters</h3>
        <button
          className="text-sm text-gray-600 hover:underline"
          onClick={() => {
            dispatch(resetParams());
          }}
        >
          Clear
        </button>
      </div>

      <Search />

      <div className="flex justify-between items-start sm:flex-col flex-row">
        {/* Card width filter */}
        <div className="hidden sm:flex gap-2 mb-4">
          <button
            className={`px-3 py-1 border ${cardWidth === "w-45" ? "bg-gray-900 text-white" : ""}`}
            onClick={() => setCardWidth("w-45")}
          >
            S
          </button>
          <button
            className={`px-3 py-1 border ${cardWidth === "w-70" ? "bg-gray-900 text-white" : ""}`}
            onClick={() => setCardWidth("w-70")}
          >
            M
          </button>
          <button
            className={`px-3.5 py-1 border ${cardWidth === "w-140" ? "bg-gray-900 text-white" : ""}`}
            onClick={() => setCardWidth("w-140")}
          >
            L
          </button>
        </div>

        {/* Brand + Type */}
        <div className="w-full sm:w-1/2 order-1 sm:order-none">
          <BrandFilter
            brands={data.brands}
            checked={brands}
            onChange={(items: string[]) => dispatch(setBrands(items))}
          />
        </div>
        <div className="w-full sm:w-1/2 order-2 sm:order-none">
          <TypeFilter
            types={data.types}
            checked={types}
            onChange={(items: string[]) => dispatch(setTypes(items))}
          />
        </div>
      </div>
    </div>
  );
}