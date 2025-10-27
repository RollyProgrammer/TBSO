export default function SellerDashboard() {
    return (
        <section className="p-10 bg-zinc-100 min-h-screen flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

                    {/* Breadcrumb */}
                    <p className="text-sm text-gray-500 mt-1">
                        Home <span className="text-gray-400">›</span> Dashboard
                    </p>
                </div>
                <div className="text-gray-700 font-medium">Calendar</div>
            </div>

            {/* Boxes Row 1 */}
            <div className="flex gap-5 mt-6 overflow-x-auto">
                <div className="w-1/4 h-40 bg-gray-200 rounded-lg shadow flex items-center justify-center">
                    box 1
                </div>
                <div className="w-1/4 h-40 bg-gray-200 rounded-lg shadow flex items-center justify-center">
                    box 2
                </div>
                <div className="w-1/4 h-40 bg-gray-200 rounded-lg shadow flex items-center justify-center">
                    box 3
                </div>
                <div className="w-1/4 h-40 bg-gray-200 rounded-lg shadow flex items-center justify-center">
                    box 4
                </div>
            </div>


            {/* Boxes Row 2 */}
            <div className="flex gap-5 mt-6 overflow-x-auto">
                <div className="w-2/3 h-100 bg-gray-200 rounded-lg shadow flex items-center justify-center">
                    box 1
                </div>
                <div className="w-1/3 h-100 bg-gray-200 rounded-lg shadow flex items-center justify-center">
                    box 2
                </div>
            </div>

            {/* Full-width Box */}
            <div className="mt-6 w-full h-200 bg-gray-200 rounded-lg shadow flex items-center justify-center">
                Full-width Box
            </div>
        </section>

    );
}
