import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  name: keyof T;
  type?: string;
  rows?: number;
  multiline?: boolean;
  placeholder?: string;
} & UseControllerProps<T>;

export default function AppTextInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{props.label}</label>

      {props.multiline ? (
        <textarea
          {...field}
          rows={props.rows || 3}
          placeholder={props.placeholder}
          className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 
          ${fieldState.error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} `}
        />
      ) : (
        <input
          {...field}
          type={props.type || "text"}
          placeholder={props.placeholder}
          value={field.value || ""}
          className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 
          ${fieldState.error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} `}
        />
      )}

      {fieldState.error && <p className="mt-1 text-xs text-red-600">{fieldState.error.message}</p>}
    </div>
  );
}
