export default function SellerSalesOrder() {

    const headers = [
        "SALES ORDER #",
        "CUSTOMER NAME",
        "ORDER STATUS",
        "SHIPPED",
        "REFUND",
        "AMOUNT",
        "DATE",
    ];

    // Mock data
    const salesOrders = [
        {
            id: "SO-1001",
            customer: "Juan Dela Cruz",
            status: "Completed",
            shipped: "Yes",
            refund: "No",
            amount: "₱12,500",
            date: "2025-09-01",
        },
        {
            id: "SO-1002",
            customer: "Maria Santos",
            status: "Pending",
            shipped: "No",
            refund: "No",
            amount: "₱7,300",
            date: "2025-09-02",
        },
        {
            id: "SO-1003",
            customer: "Carlos Reyes",
            status: "Shipped",
            shipped: "Yes",
            refund: "No",
            amount: "₱2,900",
            date: "2025-09-02",
        },
        {
            id: "SO-1004",
            customer: "Ana Villanueva",
            status: "Cancelled",
            shipped: "No",
            refund: "Yes",
            amount: "₱1,500",
            date: "2025-09-03",
        },
        {
            id: "SO-1005",
            customer: "Mark Lim",
            status: "Completed",
            shipped: "Yes",
            refund: "No",
            amount: "₱18,700",
            date: "2025-09-03",
        },
        {
            id: "SO-1006",
            customer: "Sofia Gomez",
            status: "Processing",
            shipped: "No",
            refund: "No",
            amount: "₱3,200",
            date: "2025-09-04",
        },
        {
            id: "SO-1007",
            customer: "David Tan",
            status: "Completed",
            shipped: "Yes",
            refund: "No",
            amount: "₱9,850",
            date: "2025-09-05",
        },
        {
            id: "SO-1008",
            customer: "Emily Cruz",
            status: "Shipped",
            shipped: "Yes",
            refund: "No",
            amount: "₱4,600",
            date: "2025-09-05",
        },
        {
            id: "SO-1009",
            customer: "John Paul Bautista",
            status: "Refunded",
            shipped: "No",
            refund: "Yes",
            amount: "₱6,000",
            date: "2025-09-06",
        },
        {
            id: "SO-1010",
            customer: "Patricia Ong",
            status: "Completed",
            shipped: "Yes",
            refund: "No",
            amount: "₱11,200",
            date: "2025-09-07",
        },
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
                            {salesOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 text-sm text-gray-800">
                                    <td className="px-4 py-3 border-b border-gray-300">{order.id}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{order.customer}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{order.status}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{order.shipped}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{order.refund}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{order.amount}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}