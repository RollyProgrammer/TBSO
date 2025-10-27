export default function SellerProduct() {

    const headers = [
        "ID",
        "Image",
        "Product Name",
        "Selling Price",
        "Stock",
        "Category",
        "Type",
        "Exp. Date",
        "Show in Store",
        "Actions",
    ];

    // Mock data
    const products = [
        {
            id: "1",
            image: "",
            name: "Laptop Pro 15",
            price: "₱45,000",
            stock: 12,
            category: "Electronics",
            type: "Device",
            expDate: "-",
            show: "Yes",
        },
        {
            id: "2",
            image: "",
            name: "Organic Apples",
            price: "₱150",
            stock: 50,
            category: "Groceries",
            type: "Food",
            expDate: "2025-12-01",
            show: "Yes",
        },
        {
            id: "3",
            image: "",
            name: "Office Chair",
            price: "₱3,200",
            stock: 8,
            category: "Furniture",
            type: "Equipment",
            expDate: "-",
            show: "No",
        },
        {
            id: "4",
            image: "",
            name: "Wireless Mouse",
            price: "₱700",
            stock: 30,
            category: "Electronics",
            type: "Accessory",
            expDate: "-",
            show: "Yes",
        },
        {
            id: "5",
            image: "",
            name: "Milk 1L",
            price: "₱80",
            stock: 100,
            category: "Groceries",
            type: "Beverage",
            expDate: "2025-09-30",
            show: "Yes",
        },
    ];

    return (
        <section className="p-10 bg-zinc-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800">Products</h1>

                    {/* Breadcrumb */}
                    <p className="text-sm text-gray-500 mt-1">
                        Product <span className="text-gray-400">›</span> Items
                    </p>
                </div>
                <div className="text-gray-700 font-medium">
                    Calendar
                </div>
            </div>

            <div className="mt-6 w-full h-auto bg-gray-200 rounded-lg shadow flex">
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
                            {products.map((p, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b border-gray-400">{p.id}</td>
                                    <td className="px-4 py-2 border-b border-gray-400">
                                        {p.image ? (
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-400">{p.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-400">{p.price}</td>
                                    <td className="px-4 py-2 border-b border-gray-400">{p.stock}</td>
                                    <td className="px-4 py-2 border-b border-gray-400">{p.category}</td>
                                    <td className="px-4 py-2 border-b border-gray-400">{p.type}</td>
                                    <td className="px-4 py-2 border-b border-gray-400">{p.expDate}</td>
                                    <td className="px-4 py-2 border-b border-gray-400">{p.show}</td>
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