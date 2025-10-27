export default function SellerReports() {

    const headers = [
        "REPORT NAME",
        "TYPE",
        "CREATED BY",
        "CREATED AT",
    ];

    const reports = [
        {
            name: "Monthly Sales Summary",
            type: "Sales",
            createdBy: "Juan Dela Cruz",
            createdAt: "2025-09-01",
        },
        {
            name: "Inventory Status",
            type: "Inventory",
            createdBy: "Maria Santos",
            createdAt: "2025-09-02",
        },
        {
            name: "Customer Feedback",
            type: "Survey",
            createdBy: "Carlos Reyes",
            createdAt: "2025-09-02",
        },
        {
            name: "Quarterly Profit Report",
            type: "Finance",
            createdBy: "Ana Villanueva",
            createdAt: "2025-09-03",
        },
        {
            name: "Employee Attendance",
            type: "HR",
            createdBy: "Mark Lim",
            createdAt: "2025-09-03",
        },
        {
            name: "Product Performance",
            type: "Sales",
            createdBy: "Sofia Gomez",
            createdAt: "2025-09-04",
        },
        {
            name: "Marketing Campaign Stats",
            type: "Marketing",
            createdBy: "David Tan",
            createdAt: "2025-09-05",
        },
        {
            name: "Supplier Evaluation",
            type: "Procurement",
            createdBy: "Emily Cruz",
            createdAt: "2025-09-05",
        },
        {
            name: "Refund & Returns",
            type: "Finance",
            createdBy: "John Paul Bautista",
            createdAt: "2025-09-06",
        },
        {
            name: "Website Analytics",
            type: "Marketing",
            createdBy: "Patricia Ong",
            createdAt: "2025-09-07",
        },
    ];


    return (
        <section className="p-10 bg-zinc-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800">REPORTS CENTER</h1>

                    {/* Breadcrumb */}
                    <p className="text-sm text-gray-500 mt-1">
                        Reports
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
                        <thead className="bg-gray-100 text-gray-700 text-center">
                            <tr>
                                {headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className="py-2 text-sm font-semibold border-b border-gray-400"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {reports.map((report) => (
                                <tr key={report.name} className="hover:bg-gray-50 text-sm text-gray-800">
                                    <td className="px-4 py-3 border-b border-gray-300">{report.name}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{report.type}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{report.createdBy}</td>
                                    <td className="px-4 py-3 border-b border-gray-300">{report.createdAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}