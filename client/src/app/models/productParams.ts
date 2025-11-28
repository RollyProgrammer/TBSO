// Type representing query parameters for fetching/filtering products
export type ProductParams = {
    orderBy: string;      // Field or criteria to order/sort products (e.g., "price", "name")
    searchTerm?: string;  // Optional search term to filter products by name or description
    types: string[];      // Array of product types/categories to filter by
    brands: string[];     // Array of product brands to filter by
    pageNumber: number;   // Current page number for pagination
    pageSize: number;     // Number of products per page
}
