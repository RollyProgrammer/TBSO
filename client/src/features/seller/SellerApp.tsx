import { Outlet } from "react-router-dom"
import SellerFooter from "./sellercomponents/SellerFooter"
import SellerNavBar from "./sellercomponents/SellerNavBar"
import SellerSidebar from "./sellercomponents/SellerSidebar"

function SellerApp() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-70 bg-white transition-all duration-300">
                    <SellerSidebar />
                </aside>

                {/* Main content area */}
                <div className="flex flex-col flex-1">
                    {/* Navbar */}
                    <header className="">
                        <SellerNavBar />
                    </header>

                    {/* Main content */}
                    <main className="w-full">
                        <Outlet /> {/* Child routes render here */}
                    </main>
                </div>
            </div>

            {/* Full-width footer */}
            <footer className="w-full">
                <SellerFooter />
            </footer>
        </div>
    )
}
export default SellerApp
