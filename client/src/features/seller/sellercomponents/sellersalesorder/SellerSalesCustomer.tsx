function SellerSalesCustomer() {

    const headers = [
        "CUSTOMER NAME",
        "EMAIL",
        "PHONE NUMBER",
        "RECEIVABLES",
    ];

    const customers = [
        {
            name: "Juan Dela Cruz",
            email: "juan.delacruz@example.com",
            phone: "0917-123-4567",
            receivables: "₱12,500",
        },
        {
            name: "Maria Santos",
            email: "maria.santos@example.com",
            phone: "0928-234-5678",
            receivables: "₱7,300",
        },
        {
            name: "Carlos Reyes",
            email: "carlos.reyes@example.com",
            phone: "0919-345-6789",
            receivables: "₱2,900",
        },
        {
            name: "Ana Villanueva",
            email: "ana.villanueva@example.com",
            phone: "0932-456-7890",
            receivables: "₱1,500",
        },
        {
            name: "Mark Lim",
            email: "mark.lim@example.com",
            phone: "0945-567-8901",
            receivables: "₱18,700",
        },
        {
            name: "Sofia Gomez",
            email: "sofia.gomez@example.com",
            phone: "0956-678-9012",
            receivables: "₱3,200",
        },
        {
            name: "David Tan",
            email: "david.tan@example.com",
            phone: "0967-789-0123",
            receivables: "₱9,850",
        },
        {
            name: "Emily Cruz",
            email: "emily.cruz@example.com",
            phone: "0978-890-1234",
            receivables: "₱4,600",
        },
        {
            name: "John Paul Bautista",
            email: "johnpaul.bautista@example.com",
            phone: "0989-901-2345",
            receivables: "₱6,000",
        },
        {
            name: "Patricia Ong",
            email: "patricia.ong@example.com",
            phone: "0990-012-3456",
            receivables: "₱11,200",
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
                            {customers.map((customer) => (
                                <tr key={customer.name} className="hover:bg-gray-50 text-sm text-gray-800">
                                    <td className="px-4 py-3 border-b border-gray-300">{customer.name}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{customer.email}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{customer.phone}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{customer.receivables}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
export default SellerSalesCustomer