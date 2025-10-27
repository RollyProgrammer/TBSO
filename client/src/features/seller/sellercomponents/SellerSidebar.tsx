import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdInventory2, MdLocalOffer, MdLocalShipping } from "react-icons/md";
import { RiShoppingCartLine, RiBarChart2Line, RiBankCardLine } from "react-icons/ri";

export default function SellerSidebar() {
    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

    const toggleMenu = (label: string) => {
        setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const sellerLinks = [
        { to: "/seller/dashboard", label: "Dashboard", icon: <GoHome /> },
        {
            label: "Products",
            icon: <MdInventory2 />,
            submenu: [
                { to: "/seller/products", label: "All Products" },
                { to: "/seller/productcategory", label: "Product Categories" },
            ],
        },
        {
            label: "Sales Orders",
            icon: <RiShoppingCartLine />,
            submenu: [
                { to: "/seller/salesorder", label: "Orders" },
                { to: "/seller/salescustomer", label: "Customers" },
            ],
        },
        { to: "/seller/promotions", label: "Promotions", icon: <MdLocalOffer /> },
        { to: "/seller/reports", label: "Reports", icon: <RiBarChart2Line /> },
        { to: "/seller/paymentsetup", label: "Payment Setup", icon: <RiBankCardLine /> },
        { to: "/seller/couriersetup", label: "Courier Setup", icon: <MdLocalShipping /> },
    ];

    return (
        <nav className="w-full h-full flex flex-col">
            {/* Header */}
            <header className="flex flex-col items-center text-center p-2 bg-gray-200">
                <span className="font-bold text-gray-900 text-2xl">TBSO</span>
                <span className="font-bold text-gray-900 text-2xl">SELLER CENTRE</span>
            </header>

            {/* Main Navigation */}
            <section className="overflow-y-auto p-4">
                <ul className="space-y-5">
                    {sellerLinks.map(({ to, label, icon, submenu }) => (
                        <li key={label}>
                            {submenu ? (
                                <div>
                                    {/* Parent link with toggle */}
                                    <div
                                        onClick={() => toggleMenu(label)}
                                        className="flex items-center gap-2 text-lg cursor-pointer select-none"
                                    >
                                        <span>{icon}</span>
                                        <span>{label}</span>
                                    </div>

                                    {/* Submenu: show only if toggled */}
                                    {openMenus[label] && (
                                        <ul className="ml-6 mt-2 flex flex-col gap-1">
                                            {submenu.map((sub) => (
                                                <li key={sub.label}>
                                                    <NavLink
                                                        to={sub.to}
                                                        className={({ isActive }) =>
                                                            `flex items-center gap-2 transition text-md ${isActive ? "text-gray-500" : "hover:text-gray-400"
                                                            }`
                                                        }
                                                    >
                                                        <span>{sub.label}</span>
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 transition text-lg ${isActive ? "text-gray-500" : "hover:text-gray-400"
                                        }`
                                    }
                                >
                                    <span>{icon}</span>
                                    <span>{label}</span>
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </nav>
    );
}
