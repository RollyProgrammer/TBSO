export default function SellerCourierSetup() {
    return (
        <section className="p-10 bg-zinc-100">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800">COURIER SETUP</h1>

                    {/* Breadcrumb */}
                    <p className="text-sm text-gray-500 mt-1">
                        Courier Setup
                    </p>
                </div>
                <div className="text-gray-700 font-medium">
                    Calendar
                </div>
            </div>

            <div className="mt-6 w-full bg-gray-200 rounded-lg shadow flex min-h-screen">
                <div className="w-full overflow-x-auto bg-gray-200 rounded-lg shadow">
                    {/* Top Controls */}
                    <div className="flex justify-between items-center p-4 bg-white">
                        <div className="text-gray-900 font-medium text-2xl">Courier Setup</div>
                    </div>

                    {/* Empty State */}
                    <div className="flex flex-col items-center justify-center text-center space-y-4 min-h-[calc(100vh-4rem)] py-12">

                    </div>
                </div>
            </div>
        </section>
    )
}