import ProductList from "../features/catalog/ProductList";
import { useFetchFiltersQuery, useFetchProductsQuery } from "../features/catalog/catalogApi";
import AppPagination from "../components/AppPagination";
import { setOrderBy, setPageNumber } from "../features/catalog/catalogSlice";
import Filters from "../components/Filters";
import Sorting from "../components/Sorting";
import { useAppDispatch, useAppSelector } from "../app/store/store";
import { useEffect, useState } from "react";

const sortOptions = [
  { value: "name", label: "Alphabetical A-Z" },
  { value: "pricedesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

export default function Collection() {
  const productParams = useAppSelector((state) => state.catalog);
  const selectedSort = useAppSelector((state) => state.catalog.orderBy);
  const { data: filtersData } = useFetchFiltersQuery();
  const { data: products, isLoading } = useFetchProductsQuery(productParams);
  const dispatch = useAppDispatch();
  const pageTitle = "Collections";

  // cardWidth state lifted here
  const [cardWidth, setCardWidth] = useState("w-70");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth("w-50"); // default for phones
      } else {
        setCardWidth("w-70"); // default for sm and up
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading || !filtersData) return <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">Loading Collections...</div>;

  return (
    <section className="py-15 sm:py-6">
      {/* Sorting Section */}
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4 mb-6 px-4 sm:px-6 md:px-10">
        <Sorting options={sortOptions} selectedValue={selectedSort} onChange={(e) => dispatch(setOrderBy(e.target.value))} pageTitle={pageTitle} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4 sm:px-6 md:px-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/6 space-y-6">
          <Filters cardWidth={cardWidth} setCardWidth={setCardWidth} />
        </aside>

        {/* Product List */}
        <div className="w-full">
          {products.items && products.items.length > 0 ? (
            <>
              <ProductList products={products.items} cardWidth={cardWidth} />
              <AppPagination metadata={products.pagination} onPageChange={(page: number) => dispatch(setPageNumber(page))} />
            </>
          ) : (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">There are no results for this filter</div>
          )}
        </div>
      </div>
    </section>
  );
}
