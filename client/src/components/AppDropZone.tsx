import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import { Upload } from "lucide-react";

type Props<T extends FieldValues> = {
  name: keyof T;
  existingImage?: string | null;
} & UseControllerProps<T>;

export default function AppDropZone<T extends FieldValues>({ existingImage, ...props }: Props<T>) {
  const { fieldState, field } = useController({ ...props });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const fileWithPreview = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        });
        field.onChange(fileWithPreview);
      }
    },
    [field]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const file = field.value as (File & { preview?: string }) | undefined;
  const previewSrc = file?.preview || existingImage || null;

  // Clean up object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);

  return (
    <div
      {...getRootProps()}
      className={`relative flex items-center justify-center w-full max-w-md h-100 rounded-lg border-2 border-dashed cursor-pointer overflow-hidden transition
        ${isDragActive ? "border-green-500 bg-green-50" : "border-gray-400 hover:border-gray-500"}
        ${fieldState.error ? "border-red-500 bg-red-50" : ""}`}
      aria-label="Image upload dropzone"
    >
      <input {...getInputProps()} />

      {previewSrc ? (
        <img src={previewSrc} alt="Preview" className="object-cover w-full h-full" />
      ) : (
        <div className="flex flex-col items-center justify-center text-center px-4">
          <Upload className="w-16 h-16 text-gray-500 mb-2" />
          <p className="text-lg font-semibold text-gray-700">Drop image here</p>
          <p className="text-sm text-gray-500">Drag & drop or click to select a file</p>
        </div>
      )}

      {fieldState.error && <p className="absolute bottom-2 text-sm text-red-500 bg-white/70 px-2 rounded">{fieldState.error.message}</p>}
    </div>
  );
}
