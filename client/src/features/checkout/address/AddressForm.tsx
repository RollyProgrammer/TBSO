import { useState, useEffect } from "react";
import type { ShippingAddress } from "../../../app/models/order";

interface AddressFormProps {
  onNext: (data: ShippingAddress & { saveAsDefault: boolean }) => void;
  defaultAddress?: ShippingAddress; // optional default address
}

export default function AddressForm({ onNext, defaultAddress }: AddressFormProps) {
  const [form, setForm] = useState<ShippingAddress>({
    name: "",
    country: "",
    line1: "",
    line2: "",
    city: "",
    postal_code: "",
    state: "",
  });

  const [saveAsDefault, setSaveAsDefault] = useState(false);

  // Populate form if default address exists
  useEffect(() => {
    if (defaultAddress) {
      setForm(defaultAddress);
      setSaveAsDefault(true); // default address implies saving by default
    }
  }, [defaultAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
      <div className="grid gap-4">
        {/* Full Name */}
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="border border-gray-300 shadow p-2 rounded" />

        {/* Country Dropdown */}
        <select name="country" value={form.country} onChange={handleChange} className="border border-gray-300 shadow p-2 rounded">
          <option value="">Select Country</option>
          <option value="PH">Philippines</option>
          {/* Add other countries if needed */}
        </select>

        <input name="line1" placeholder="Address line 1" value={form.line1} onChange={handleChange} className="border border-gray-300 shadow p-2 rounded" />
        <input name="line2" placeholder="Address line 2 (Optional)" value={form.line2 ?? ""} onChange={handleChange} className="border border-gray-300 shadow p-2 rounded" />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border border-gray-300 shadow p-2 rounded" />

        {/* Postal Code + State */}
        <div className="grid grid-cols-2 gap-4">
          <input name="postal_code" placeholder="Postal Code" value={form.postal_code} onChange={handleChange} className="border border-gray-300 shadow p-2 rounded" />

          <select name="state" value={form.state} onChange={handleChange} className="border border-gray-300 shadow p-2 rounded">
            <option value="">Select Region</option>
            {/* Add regions if needed */}
          </select>
        </div>

        {/* Save as default checkbox */}
        <label className="flex justify-end items-center space-x-2 mt-2">
          <input type="checkbox" checked={saveAsDefault} onChange={() => setSaveAsDefault(!saveAsDefault)} className="w-4 h-4 border border-gray-400 rounded" />
          <span className="text-gray-700">Save as default address</span>
        </label>
      </div>

      <button onClick={() => onNext({ ...form, saveAsDefault })} className="mt-4 px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 rounded">
        Continue to Payment
      </button>
    </div>
  );
}
