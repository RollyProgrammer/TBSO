// React Hook Form for managing form state
import { useForm } from "react-hook-form";

// Zod schema and types for product validation
import { createProductSchema, type CreateProductSchema } from "../../lib/schemas/createProductSchema";

// Hookform resolver to integrate Zod with React Hook Form
import { zodResolver } from "@hookform/resolvers/zod";

// Custom input components
import AppTextInput from "../../components/AppTextInput";
import AppSelectInput from "../../components/AppSelectInput";
import AppDropZone from "../../components/AppDropZone";

// API hooks and types
import { useFetchFiltersQuery } from "../catalog/catalogApi";
import { useCreateProductMutation, useUpdateProductMutation } from "./adminApi";
import { handleApiError } from "../../lib/util";
import type z from "zod";
import type { Product } from "../../app/models/product";

// React hook
import { useEffect } from "react";

// Props expected by the ProductForm component
type Props = {
  setEditMode: (value: boolean) => void;
  product: Product | null;
  refetch: () => void;
  setSelectedProduct: (value: Product | null) => void;
};

export default function ProductForm({ setEditMode, product, refetch, setSelectedProduct }: Props) {
  // Initialize form with Zod schema validation
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<
    z.input<typeof createProductSchema>, // Type before Zod transformation
    unknown,
    z.output<typeof createProductSchema> // Type after Zod transformation
  >({
    mode: "onTouched",
    resolver: zodResolver(createProductSchema),
  });

  // Watch the file input for preview cleanup
  const watchFile = watch("file");

  // Fetch dropdown filter options (brands, types)
  const { data } = useFetchFiltersQuery();

  // Mutation hooks for creating or updating a product
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  // Reset form when editing an existing product
  useEffect(() => {
    if (product) reset(product);

    // Cleanup preview URL to avoid memory leaks
    return () => {
      if (watchFile) URL.revokeObjectURL((watchFile as File & { preview: string }).preview);
    };
  }, [product, reset, watchFile]);

  // Convert form data into FormData for file upload
  const createFormData = (items: CreateProductSchema) => {
    const formData = new FormData();
    for (const key in items) {
      formData.append(key, items[key]);
    }
    return formData;
  };

  // Submit handler for creating or updating product
  const onSubmit = async (data: CreateProductSchema) => {
    try {
      const formData = createFormData(data);
      if (watchFile) formData.append("file", watchFile);

      // Update if editing, otherwise create new product
      if (product) await updateProduct({ id: product.id, data: formData }).unwrap();
      else await createProduct(formData).unwrap();

      // Reset UI state
      setEditMode(false);
      setSelectedProduct(null);
      refetch();
    } catch (error) {
      console.log(error);
      // Handle validation errors from API
      handleApiError<CreateProductSchema>(error, setError, ["brand", "description", "file", "name", "pictureUrl", "price", "quantityInStock", "type"]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-2">PRODUCT DETAILS</h2>
      <hr />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-gray-500 font-semibold mt-3">General Details</h3>
          <div className="flex gap-6 p-5">
            {/* Left column: text and select inputs */}
            <div className="flex-1 flex flex-col gap-4">
              <AppTextInput control={control} name="name" label="Product name" />
              {/* Category dropdown (can be renamed from brand) */}
              {data?.brands && <AppSelectInput items={data.brands} control={control} name="brand" label="Category" />}
              {/* Brand dropdown */}
              {data?.brands && <AppSelectInput items={data.brands} control={control} name="brand" label="Brand" />}
              {/* Type dropdown */}
              {data?.types && <AppSelectInput items={data.types} control={control} name="type" label="Type" />}

              {/* Radio buttons for visibility */}
              <div className="space-y-3">
                <h1 className="text-sm font-medium text-gray-700">Show in Store</h1>
                <div className="flex items-center gap-6">
                  {/* Yes option */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="showInStore" value="yes" defaultChecked className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-sm text-gray-800">Yes</span>
                  </label>

                  {/* No option */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="showInStore" value="no" className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <span className="text-sm text-gray-800">No</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right column: image dropzone */}
            <div className="w-2/5 flex-shrink-0">
              <AppDropZone name="file" control={control} />
            </div>
          </div>
        </div>

        <hr />

        {/* Item details section */}
        <div>
          <h3 className="text-gray-500 font-semibold mt-4">Item Details</h3>
          <div className="flex gap-6 p-5">
            <AppTextInput type="number" control={control} name="price" label="Price in cents" />
            <AppTextInput type="number" control={control} name="quantityInStock" label="Quantity in stock" />
          </div>

          <div className="flex gap-6 px-5">
            <AppTextInput control={control} multiline rows={4} name="description" label="Description" />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-5 px-5">
          <button type="submit" disabled={isSubmitting} className="px-8 py-2 rounded-sm bg-black text-white hover:bg-gray-800 transition disabled:opacity-50">
            {isSubmitting ? "Saving..." : "Save"}
          </button>

          <button type="button" onClick={() => setEditMode(false)} className="px-6 py-2 rounded-sm border border-b-gray-900 hover:bg-gray-200 transition">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
