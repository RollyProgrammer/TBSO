// Type representing pagination information for lists or tables
export type Pagination = {
    currentPage: number; // Current page number being viewed
    totalPages: number;  // Total number of pages available
    pageSize: number;    // Number of items displayed per page
    totalCount: number;  // Total number of items across all pages
}
