import { useEffect, useState } from "react";
import type { Product } from "../app/models/product";
import ProductList from "../features/catalog/ProductList";

export default function Collection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSort, setSelectedSort] = useState("latest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const filters = {
    categories: ["Category 1", "Category 2", "Category 3"],
    availability: ["In Stock", "Out of Stock"],
    sizes: ["XS", "S", "M", "L", "XL"],
  };

  const handleClearFilters = () => {
    setSelectedSort("latest");
    setSelectedCategories([]);
    setSelectedAvailability([]);
  };

  const handleCheckboxChange = (
    value: string,
    selectedList: string[],
    setSelected: (val: string[]) => void
  ) => {
    if (selectedList.includes(value)) {
      setSelected(selectedList.filter((item) => item !== value));
    } else {
      setSelected([...selectedList, value]);
    }
  };

  return (
    <section className="py-10 sm:py-6">
      {/* Header */}
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4 mb-6 px-4 sm:px-6 md:px-10">
        <h2 className="text-3xl font-semibold">Collections</h2>

        {/* Sort Dropdown */}
        <div className="relative">
          <label htmlFor="sort" className="sr-only">
            Sort By
          </label>
          <select
            id="sort"
            name="sort"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="border border-gray-300 px-1 py-2 text-sm rounded focus:outline-none focus:ring-1 focus:ring-gray-500"
          >
            <option value="latest">Latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="a-z">Alphabetical A-Z</option>
            <option value="z-a">Alphabetical Z-A</option>
          </select>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 px-4 sm:px-6 md:px-10">
        {/* Filters */}
        <aside className="w-full lg:w-1/8 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-xl">Filters</h3>
              <button
                className="text-sm text-gray-600 hover:underline"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {filters.sizes.map((size, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-gray-300 hover:bg-gray-400 cursor-pointer rounded flex items-center justify-center text-xs font-medium"
                  title={`Size ${size}`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Categories</h3>
            <div className="space-y-2 text-sm">
              {filters.categories.map((cat, idx) => (
                <div key={idx}>
                  <input
                    type="checkbox"
                    id={`cat-${idx}`}
                    className="mr-2"
                    checked={selectedCategories.includes(cat)}
                    onChange={() =>
                      handleCheckboxChange(cat, selectedCategories, setSelectedCategories)
                    }
                  />
                  <label htmlFor={`cat-${idx}`}>{cat}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Availability</h3>
            <div className="space-y-2 text-sm">
              {filters.availability.map((status, idx) => (
                <div key={idx}>
                  <input
                    type="checkbox"
                    id={`avail-${idx}`}
                    className="mr-2"
                    checked={selectedAvailability.includes(status)}
                    onChange={() =>
                      handleCheckboxChange(
                        status,
                        selectedAvailability,
                        setSelectedAvailability
                      )
                    }
                  />
                  <label htmlFor={`avail-${idx}`}>{status}</label>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="w-full">
          <ProductList products={products} />
        </div>
      </div>
    </section>
  );
}
