import { useState } from "react";
import ProductList from "../features/catalog/ProductList";
import { useFetchProductsQuery } from "../features/catalog/catalogApi";

export default function BestSeller() {
  const [selectedSort, setSelectedSort] = useState("latest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    []
  );

  const { data: fetchedProducts, isLoading } = useFetchProductsQuery();

  if (isLoading || !fetchedProducts)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">
        Loading New Items Page...
      </div>
    );

  const filters = {
    categories: Array.from(new Set((fetchedProducts ?? []).map((p) => p.type))),
    availability: ["In Stock", "Out of Stock"],
  };

  const clearFilters = () => {
    setSelectedSort("latest");
    setSelectedCategories([]);
    setSelectedAvailability([]);
  };

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: (val: string[]) => void
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  const filteredProducts = (fetchedProducts ?? [])
    .filter((product) => {
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.type)
      ) {
        return false;
      }

      const availabilityLabel =
        product.quantityInStock > 0 ? "In Stock" : "Out of Stock";
      if (
        selectedAvailability.length > 0 &&
        !selectedAvailability.includes(availabilityLabel)
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "a-z":
          return a.name.localeCompare(b.name);
        case "z-a":
          return b.name.localeCompare(a.name);
        case "latest":
        default:
          return 0; // placeholder sort if no createdAt
      }
    });

  return (
    <section className="py-15 sm:py-6">
      {/* Header */}
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4 mb-6 px-4 sm:px-6 md:px-10">
        <h2 className="text-3xl font-semibold">New Items</h2>
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="border border-gray-300 px-2 py-2 text-sm rounded focus:ring-1 focus:ring-gray-500"
        >
          <option value="latest">Latest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="a-z">Alphabetical A-Z</option>
          <option value="z-a">Alphabetical Z-A</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4 sm:px-6 md:px-10">
        {/* Sidebar Filters */}
        <aside className="w-1/6 space-y-6">
          {/* Filter Header */}
          <div className="flex justify-between mb-3">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button
              className="text-sm text-gray-600 hover:underline"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Categories</h3>
            <div className="space-y-2 text-sm">
              {filters.categories.map((cat) => (
                <label key={cat} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() =>
                      toggleSelection(
                        cat,
                        selectedCategories,
                        setSelectedCategories
                      )
                    }
                    className="mr-2 accent-black"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Availability Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Availability</h3>
            <div className="space-y-2 text-sm">
              {filters.availability.map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAvailability.includes(status)}
                    onChange={() =>
                      toggleSelection(
                        status,
                        selectedAvailability,
                        setSelectedAvailability
                      )
                    }
                    className="mr-2 accent-black"
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="w-full">
          <ProductList products={filteredProducts} />
        </div>
      </div>
    </section>
  );
}
