// Importing necessary components, hooks, and Redux utilities
import ProductList from "../features/catalog/ProductList"; 
import { useFetchBestSellingProductsQuery, useFetchFiltersQuery } from "../features/catalog/catalogApi"; // RTK Query hooks for fetching products and filters
import { useAppDispatch, useAppSelector } from "../app/store/store"; // Typed Redux hooks
import Sorting from "../components/Sorting"; // Sorting dropdown component
import Filters from "../components/Filters"; // Sidebar filters component
import AppPagination from "../components/AppPagination"; // Pagination component
import { setOrderBy, setPageNumber } from "../features/catalog/catalogSlice"; // Redux actions for sorting and pagination
import { useEffect, useState } from "react"; // React hooks

// Sorting options for the Best Seller page
const sortOptions = [
  { value: "name", label: "Alphabetical A-Z" },
  { value: "pricedesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

export default function BestSeller() {
  // Get product parameters and selected sort option from Redux store
  const productParams = useAppSelector((state) => state.catalog);
  const selectedSort = useAppSelector((state) => state.catalog.orderBy);
  const { data: filtersData } = useFetchFiltersQuery(); // Fetch filter data
  const dispatch = useAppDispatch();
  const pageTitle = "Best Sellers";

  // State to control the card width for responsive layout
  const [cardWidth, setCardWidth] = useState("w-70");

  // Adjust card width based on window size (responsive)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth("w-50"); // default width for phones
      } else {
        setCardWidth("w-70"); // default width for sm and up
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize); // Listen for window resize

    return () => window.removeEventListener("resize", handleResize); // Clean up
  }, []);

  // Parameters to fetch best-selling products
  const bestParams = {
    orderBy: productParams?.orderBy || "name",
    searchTerm: productParams?.searchTerm || "",
    brands: productParams?.brands || [],
    types: productParams?.types || [],
    pageNumber: productParams?.pageNumber || 1,
    pageSize: productParams?.pageSize || 12,
  };

  // Fetch best-selling products using RTK Query
  const { data: bestProducts, isLoading: loadingBest } = useFetchBestSellingProductsQuery(bestParams);

  const products = bestProducts?.items ?? [];
  const pagination = bestProducts?.pagination;
  const isLoading = loadingBest;

  // Show loading state if fetching products or filters
  if (isLoading || !filtersData)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">
        Loading Best Sellers...
      </div>
    );

  return (
    <section className="py-15 sm:py-6">
      {/* Sorting controls */}
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4 mb-6 px-4 sm:px-6 md:px-10">
        <Sorting
          options={sortOptions}
          selectedValue={selectedSort}
          onChange={(e) => dispatch(setOrderBy(e.target.value))}
          pageTitle={pageTitle}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4 sm:px-6 md:px-10">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/6 space-y-6">
          <Filters cardWidth={cardWidth} setCardWidth={setCardWidth} />
        </aside>

        {/* Product List */}
        <div className="w-full">
          {products.length > 0 ? (
            <>
              <ProductList products={products} cardWidth={cardWidth} />
              {/* Pagination */}
              {pagination && (
                <AppPagination
                  metadata={pagination}
                  onPageChange={(page: number) => dispatch(setPageNumber(page))}
                />
              )}
            </>
          ) : (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">
              No items found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
