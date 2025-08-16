import { useState } from "react";
import usetechhiveStore from "../store/techhive-store";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

const MainNav = () => {
    const carts = usetechhiveStore((state) => state.carts);
    const user = usetechhiveStore(state => state.user);
    const logout = usetechhiveStore((state) => state.logout);

    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const menuItems = ["Home", "Shop", "Cart"];

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    return (
        <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-md relative">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link
                            to="/"
                            className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300"
                        >
                            ⚡TECHHIVE
                        </Link>
                    </div>

                    {/* Desktop Navigation - Hidden on mobile (≤ 425px) */}
                    <div className="hidden tablet:flex items-center gap-4 md:gap-6 lg:gap-8">
                        {menuItems.map((label) => {
                            const to = label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`;
                            return (
                                <NavLink
                                    key={label}
                                    to={to}
                                    className={({ isActive }) =>
                                        `relative group px-3 py-2 text-sm md:text-base lg:text-lg font-medium transition-all duration-200 ${isActive ? "text-white" : "text-gray-300"
                                        }`
                                    }
                                >
                                    {label}
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 group-hover:w-full transition-all duration-300 ease-out" />
                                    {label === "Cart" && carts.length > 0 && (
                                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full shadow-md animate-bounce">
                                            {carts.length}
                                        </span>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-2 rounded-md hover:bg-white/10 transition-colors duration-300"
                                >
                                    <img
                                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border border-white/20"
                                        src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256"
                                        alt="avatar"
                                    />
                                    <ChevronDown className="text-white w-4 h-4 hidden tablet:block" />
                                </button>

                                {/* User Dropdown */}
                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg py-2 z-50">
                                        <Link
                                            to="/user/history"
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            History
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Desktop Login/Register buttons - Hidden on mobile */
                            <div className="hidden tablet:flex items-center gap-3">
                                <NavLink
                                    to="/register"
                                    className="text-sm px-3 py-2 md:px-4 rounded-md bg-gray-600 hover:bg-gray-700 hover:brightness-110 transition-all duration-300 shadow-sm"
                                >
                                    Register
                                </NavLink>
                                <NavLink
                                    to="/login"
                                    className="text-sm px-3 py-2 md:px-4 rounded-md bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-md"
                                >
                                    Login
                                </NavLink>
                            </div>
                        )}

                        {/* Mobile Hamburger Menu Button - Only show on mobile (≤ 425px) */}
                        <button
                            onClick={toggleMobileMenu}
                            className="tablet:hidden p-2 rounded-md hover:bg-white/10 transition-colors duration-300"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Only show on mobile (≤ 425px) */}
            {isMobileMenuOpen && (
                <div className="tablet:hidden absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-lg z-40">
                    <div className="px-4 py-3 space-y-1">
                        {menuItems.map((label) => {
                            const to = label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`;
                            return (
                                <NavLink
                                    key={label}
                                    to={to}
                                    onClick={handleMobileMenuClose}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between px-3 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${isActive
                                            ? "bg-gray-700 text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                        }`
                                    }
                                >
                                    <span>{label}</span>
                                    {label === "Cart" && carts.length > 0 && (
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            {carts.length}
                                        </span>
                                    )}
                                </NavLink>
                            );
                        })}

                        {/* Mobile Login/Register buttons */}
                        {!user && (
                            <div className="pt-3 border-t border-gray-700 space-y-2">
                                <NavLink
                                    to="/register"
                                    onClick={handleMobileMenuClose}
                                    className="block px-3 py-3 text-sm font-medium rounded-md bg-gray-600 text-center hover:bg-gray-700 transition-colors duration-200"
                                >
                                    Register
                                </NavLink>
                                <NavLink
                                    to="/login"
                                    onClick={handleMobileMenuClose}
                                    className="block px-3 py-3 text-sm font-medium rounded-md bg-white text-black text-center hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Login
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Overlay for mobile menu */}
            {isMobileMenuOpen && (
                <div
                    className="tablet:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={handleMobileMenuClose}
                />
            )}

            <style>{`
                /* Mobile S: 320px */
                @media (max-width: 320px) {
                    .tablet\\:hidden { display: block; }
                    .tablet\\:flex { display: none; }
                    .tablet\\:block { display: none; }
                }

                /* Mobile M: 375px */
                @media (min-width: 321px) and (max-width: 375px) {
                    .tablet\\:hidden { display: block; }
                    .tablet\\:flex { display: none; }
                    .tablet\\:block { display: none; }
                }

                /* Mobile L: 425px */
                @media (min-width: 376px) and (max-width: 425px) {
                    .tablet\\:hidden { display: block; }
                    .tablet\\:flex { display: none; }
                    .tablet\\:block { display: none; }
                }

                /* Tablet: 768px and above */
                @media (min-width: 426px) {
                    .tablet\\:hidden { display: none; }
                    .tablet\\:flex { display: flex; }
                    .tablet\\:block { display: block; }
                }

                /* Laptop: 1024px */
                @media (min-width: 1024px) {
                    /* Additional laptop styles if needed */
                }

                /* Laptop L: 1440px */
                @media (min-width: 1440px) {
                    /* Additional large laptop styles if needed */
                }

                /* 4K: 2560px */
                @media (min-width: 2560px) {
                    /* Additional 4K styles if needed */
                }
            `}</style>
        </nav>
    );
};

export default MainNav;