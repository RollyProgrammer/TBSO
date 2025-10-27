function SellerProductCategory() {

  const headers = [
    "CATEGORY NAME",
    "SHOW IN STORE",
    "ACTIONS",
  ];

  const category = [
    { name: "Electronics", showInStore: "Yes" },
    { name: "Groceries", showInStore: "Yes" },
    { name: "Furniture", showInStore: "No" },
    { name: "Clothing", showInStore: "Yes" },
    { name: "Books", showInStore: "Yes" },
    { name: "Toys & Games", showInStore: "No" },
    { name: "Beauty & Personal Care", showInStore: "Yes" },
    { name: "Sports & Outdoors", showInStore: "Yes" },
    { name: "Automotive", showInStore: "No" },
    { name: "Stationery", showInStore: "Yes" },
  ];


  return (
    <section className="p-10 bg-zinc-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800">ORDER</h1>

          {/* Breadcrumb */}
          <p className="text-sm text-gray-500 mt-1">
            Sales Order <span className="text-gray-400">›</span> Order
          </p>
        </div>
        <div className="text-gray-700 font-medium">
          Calendar
        </div>
      </div>
      <div className="mt-6 w-full h-155 bg-gray-200 rounded-lg shadow flex">
        <div className="w-full overflow-x-auto bg-white rounded-lg shadow">

          {/* Top Controls */}
          <div className="flex justify-between items-center p-4">
            <div className="text-gray-900 font-medium">Filter</div>
            <button className="bg-gray-900 text-white px-4 py-1.5 shadow hover:bg-gray-700">
              ADD
            </button>
          </div>

          {/* Table */}
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 text-left text-sm font-semibold border-b border-gray-400"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {category.map((categories) => (
                <tr key={categories.name} className="hover:bg-gray-50 text-sm text-gray-800">
                  <td className="px-4 py-3 border-b border-gray-300">{categories.name}</td>
                  <td className="px-4 py-3 border-b border-gray-300">{categories.showInStore}</td>
                  <td className="px-4 py-2 border-b border-gray-400">
                    <button className="text-blue-600 hover:underline mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
export default SellerProductCategory