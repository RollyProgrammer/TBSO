import type { ChangeEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  selectedValue: string;
  pageTitle: string;
};

export default function Sorting({ options, onChange, selectedValue, pageTitle  }: Props) {
  return (
    <div className="container mx-auto flex flex-wrap justify-between items-center">
      <h2 className="text-3xl font-semibold">{pageTitle}</h2> {/* <-- dynamic */}
      <select value={selectedValue} onChange={onChange} className="border border-gray-300 px-2 py-2 text-sm rounded focus:ring-1 focus:ring-gray-500">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
