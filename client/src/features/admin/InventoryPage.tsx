import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { useFetchProductsQuery } from "../catalog/catalogApi";
import { currencyFormat } from "../../lib/util";
import { setPageNumber } from "../catalog/catalogSlice";
import AppPagination from "../../components/AppPagination";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import ProductForm from "./ProductForm";
import type { Product } from "../../app/models/product";
import { useDeleteProductMutation } from "./adminApi";

export default function InventoryPage() {
  const productParams = useAppSelector((state) => state.catalog);
  const { data, refetch } = useFetchProductsQuery(productParams);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteProduct] = useDeleteProductMutation();

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setEditMode(true);
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (editMode) return <ProductForm setEditMode={setEditMode} product={selectedProduct} refetch={refetch} setSelectedProduct={setSelectedProduct} />;

  return (
    <main className="pt-15 px-6 sm:p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Inventory</h1>
        <button onClick={() => setEditMode(true)} className="flex items-center gap-2 px-4 py-1.5 rounded-sm bg-gray-900 text-white font-medium hover:bg-gray-700 transition">
          <Plus size={16} />
          New
        </button>
      </header>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-sm font-medium">#</th>
              <th className="px-4 py-3 text-sm font-medium">Product</th>
              <th className="px-4 py-3 text-sm font-medium text-left">Selling Price</th>
              <th className="px-4 py-3 text-sm font-medium text-left">Category</th>
              <th className="px-4 py-3 text-sm font-medium text-left">Brand</th>
              <th className="px-4 py-3 text-sm font-medium text-left">Type</th>
              <th className="px-4 py-3 text-sm font-medium text-left">Quantity</th>
              <th className="px-4 py-3 text-sm font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data &&
              data.items.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{product.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.pictureUrl} alt={product.name} className="h-12 w-12 object-cover rounded" />
                      <span className="font-medium text-gray-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-left font-medium text-gray-700">{currencyFormat(product.price)}</td>
                  <td className="px-4 py-3 text-left text-gray-600">{product.brand}</td> {/* Category */}
                  <td className="px-4 py-3 text-left text-gray-600">{product.brand}</td>
                  <td className="px-4 py-3 text-left text-gray-600">{product.type}</td>
                  <td className="px-4 py-3 text-left text-gray-600">{product.quantityInStock}</td>
                  <td className="px-4 py-3 text-center flex items-center justify-center gap-2">
                    <button onClick={() => handleSelectProduct(product)} className="flex p-2 rounded-lg text-green-600 hover:text-green-300 transition">
                      <Pencil className="w-5 h-5" /> Edit
                    </button>
                    |
                    <button onClick={() => handleDeleteProduct(product.id)} className="flex p-2 rounded-lg text-red-600 hover:bg-red-50 transition">
                      <Trash2 className="w-5 h-5" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data?.pagination && data.items.length > 0 && (
        <div className="mt-6 flex justify-center">
          <AppPagination metadata={data.pagination} onPageChange={(page: number) => dispatch(setPageNumber(page))} />
        </div>
      )}
    </main>
  );
}
