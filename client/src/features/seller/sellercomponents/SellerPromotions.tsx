export default function SellerPromotions() {
    return (
        <section className="p-10 bg-zinc-100">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800">VOUCHER</h1>

                    {/* Breadcrumb */}
                    <p className="text-sm text-gray-500 mt-1">
                        Promotions<span className="text-gray-400">›</span> Voucher
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
                        <div className="text-gray-900 font-medium text-2xl">Voucher</div>
                        <button className="bg-gray-900 text-white px-4 py-1.5 shadow hover:bg-gray-700">
                            ADD
                        </button>
                    </div>

                    {/* Empty State */}
                    <div className="flex flex-col items-center justify-center text-center space-y-4 min-h-[calc(100vh-4rem)] py-12">
                        <h1 className="text-xl font-bold">No Vouchers Made Yet</h1>
                        <p className="text-gray-600 max-w-md">
                            Boost sales by giving customers discounted prices at checkout using voucher
                        </p>
                        <button className="bg-gray-900 text-white shadow hover:bg-gray-700 px-4 py-2 rounded">
                            Add Coupon
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}