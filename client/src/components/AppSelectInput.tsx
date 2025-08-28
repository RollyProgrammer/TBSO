import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: keyof T;
  items: string[];
} & UseControllerProps<T>;

export default function AppSelectInput<T extends FieldValues>({ label, items, ...props }: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      {/* Select */}
      <select
        {...field}
        className={`block w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldState.error ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="">Select {label}</option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      {/* Error message */}
      {fieldState.error && <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>}
    </div>
  );
}
