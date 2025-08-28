import { useEffect, useState } from "react";

interface BrandFilterProps {
  brands: string[];
  checked: string[];
  onChange: (items: string[]) => void;
}

export default function BrandFilter({ brands, checked, onChange }: BrandFilterProps) {
    const [checkedItem, setCheckedItems] = useState(checked);

    useEffect(() => {
        setCheckedItems(checked);
    }, [checked]);

    const handleToggle = (value: string) => {
        const updatedChecked = checkedItem?.includes(value)
        ? checkedItem.filter(item => item !== value)
        : [...checkedItem, value];

        setCheckedItems(updatedChecked);
        onChange(updatedChecked);
    }
  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold mb-2">Brands</h3>
      <div className="space-y-2 text-sm">
        {brands.map((item) => (
          <label key={item} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={item}
              checked={checkedItem.includes(item)}
              onChange={() => handleToggle(item)}
              className="accent-gray-600"
            />
            <span className="capitalize">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
