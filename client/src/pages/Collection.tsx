// Import necessary components and hooks
import ProductList from "../features/catalog/ProductList"; // Component to display product cards
import { useFetchFiltersQuery, useFetchProductsQuery } from "../features/catalog/catalogApi"; // RTK Query hooks to fetch filters and products
import AppPagination from "../components/AppPagination"; // Pagination component
import { setOrderBy, setPageNumber } from "../features/catalog/catalogSlice"; // Redux actions for sorting and pagination
import Filters from "../components/Filters"; // Sidebar filters component
import Sorting from "../components/Sorting"; // Sorting dropdown component
import { useAppDispatch, useAppSelector } from "../app/store/store"; // Typed Redux hooks
import { useEffect, useState } from "react"; // React hooks

// Sorting options for the Collection page
const sortOptions = [
  { value: "name", label: "Alphabetical A-Z" },
  { value: "pricedesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

export default function Collection() {
  // Get product parameters and selected sort from Redux
  const productParams = useAppSelector((state) => state.catalog);
  const selectedSort = useAppSelector((state) => state.catalog.orderBy);
  const { data: filtersData } = useFetchFiltersQuery(); // Fetch filter options
  const { data: products, isLoading } = useFetchProductsQuery(productParams); // Fetch products based on parameters
  const dispatch = useAppDispatch();
  const pageTitle = "Collections";

  // State to control card width for responsive layout
  const [cardWidth, setCardWidth] = useState("w-70");

  // Adjust card width dynamically based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth("w-50"); // Mobile width
      } else {
        setCardWidth("w-70"); // Desktop width
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // Cleanup listener
  }, []);

  // Show loading state while fetching products or filters
  if (isLoading || !filtersData)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">
        Loading Collections...
      </div>
    );

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

        {/* Product List */}
        <div className="w-full">
          {products.items && products.items.length > 0 ? (
            <>
              <ProductList products={products.items} cardWidth={cardWidth} />
              <AppPagination
                metadata={products.pagination}
                onPageChange={(page: number) => dispatch(setPageNumber(page))}
              />
            </>
          ) : (
            <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">
              There are no results for this filter
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
