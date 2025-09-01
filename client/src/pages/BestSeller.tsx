import ProductList from "../features/catalog/ProductList";
import { useFetchBestSellingProductsQuery, useFetchFiltersQuery } from "../features/catalog/catalogApi";
import { useAppDispatch, useAppSelector } from "../app/store/store";
import Sorting from "../components/Sorting";
import Filters from "../components/Filters";
import AppPagination from "../components/AppPagination";
import { setOrderBy, setPageNumber } from "../features/catalog/catalogSlice";
import { useEffect, useState } from "react";

const sortOptions = [
  { value: "name", label: "Alphabetical A-Z" },
  { value: "pricedesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

export default function BestSeller() {
  const productParams = useAppSelector((state) => state.catalog);
  const selectedSort = useAppSelector((state) => state.catalog.orderBy);
  const { data: filtersData } = useFetchFiltersQuery();
  const dispatch = useAppDispatch();
  const pageTitle = "Best Sellers";

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

  const bestParams = {
    orderBy: productParams?.orderBy || "name",
    searchTerm: productParams?.searchTerm || "",
    brands: productParams?.brands || [],
    types: productParams?.types || [],
    pageNumber: productParams?.pageNumber || 1,
    pageSize: productParams?.pageSize || 12,
  };

  const { data: bestProducts, isLoading: loadingBest } = useFetchBestSellingProductsQuery(bestParams);

  const products = bestProducts?.items ?? [];
  const pagination = bestProducts?.pagination;
  const isLoading = loadingBest;

  if (isLoading || !filtersData) return <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">Loading Best Sellers...</div>;

  return (
    <section className="py-15 sm:py-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4 mb-6 px-4 sm:px-6 md:px-10">
        <Sorting options={sortOptions} selectedValue={selectedSort} onChange={(e) => dispatch(setOrderBy(e.target.value))} pageTitle={pageTitle} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4 sm:px-6 md:px-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/6 space-y-6">
          <Filters cardWidth={cardWidth} setCardWidth={setCardWidth} />
        </aside>
        <div className="w-full">
          {products.length > 0 ? (
            <>
              <ProductList products={products} cardWidth={cardWidth} />
              {pagination && <AppPagination metadata={pagination} onPageChange={(page: number) => dispatch(setPageNumber(page))} />}
            </>
          ) : (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">No items found.</div>
          )}
        </div>
      </div>
    </section>
  );
}
