// Import required components, hooks, and API calls
import ProductList from "../features/catalog/ProductList"; // Component to display a list of products
import AppPagination from "../components/AppPagination"; // Pagination component
import { setOrderBy, setPageNumber } from "../features/catalog/catalogSlice"; // Redux actions for catalog
import { useFetchFiltersQuery, useFetchNewestProductsQuery } from "../features/catalog/catalogApi"; // API hooks
import { useAppDispatch, useAppSelector } from "../app/store/store"; // Custom typed Redux hooks
import Sorting from "../components/Sorting"; // Sorting component
import Filters from "../components/Filters"; // Filter sidebar component
import { useEffect, useState } from "react"; // React hooks

// Options for sorting the product list
const sortOptions = [
  { value: "name", label: "Alphabetical A-Z" },
  { value: "pricedesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

export default function NewItems() {
  // Redux state for product parameters
  const productParams = useAppSelector((state) => state.catalog);
  const selectedSort = useAppSelector((state) => state.catalog.orderBy);

  // Fetch available filters from backend
  const { data: filtersData } = useFetchFiltersQuery();

  // Dispatch function to update Redux state
  const dispatch = useAppDispatch();

  const pageTitle = "New Items"; // Title for sorting component

  // Construct query parameters for fetching newest products
  const newestParams = {
    orderBy: productParams?.orderBy || "name",
    searchTerm: productParams?.searchTerm || "",
    brands: productParams?.brands || [],
    types: productParams?.types || [],
    pageNumber: productParams?.pageNumber || 1,
    pageSize: productParams?.pageSize || 12,
  };

  // Fetch newest products based on query parameters
  const { data: newestProducts, isLoading: loadingNewest } = useFetchNewestProductsQuery(newestParams);

  const products = newestProducts?.items ?? [];
  const pagination = newestProducts?.pagination;
  const isLoading = loadingNewest;

  // Manage card width state for responsive product cards
  const [cardWidth, setCardWidth] = useState("w-70");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth("w-50"); // Card width for mobile
      } else {
        setCardWidth("w-70"); // Card width for larger screens
      }
    };

    handleResize(); // Initial card width on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show loading state while fetching data
  if (isLoading || !filtersData) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">
        Loading New Items...
      </div>
    );
  }

  return (
    <section className="py-15 sm:py-6">
      {/* Sorting Section */}
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

        {/* Product List Section */}
        <div className="w-full">
          {products.length > 0 ? (
            <>
              <ProductList products={products} cardWidth={cardWidth} />
              {pagination && (
                <AppPagination
                  metadata={pagination}
                  onPageChange={(page: number) => dispatch(setPageNumber(page))}
                />
              )}
            </>
          ) : (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">
              No new items found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
