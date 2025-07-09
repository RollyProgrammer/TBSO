import { useEffect, useState } from "react";

interface TypeFilterProps {
  types: string[];
  checked: string[];
  onChange: (items: string[]) => void;
}

export default function TypeFilter({ types, checked, onChange }: TypeFilterProps) {
  const [checkedItems, setCheckedItems] = useState(checked);

  useEffect(() => {
    setCheckedItems(checked);
  }, [checked]);

  const handleToggle = (value: string) => {
    const updatedChecked = checkedItems.includes(value)
      ? checkedItems.filter(item => item !== value)
      : [...checkedItems, value];

    setCheckedItems(updatedChecked);
    onChange(updatedChecked);
  };

  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold mb-2">Types</h3>
      <div className="space-y-2 text-sm">
        {types.map((item) => (
          <label key={item} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={item}
              checked={checkedItems.includes(item)} // use local state
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
