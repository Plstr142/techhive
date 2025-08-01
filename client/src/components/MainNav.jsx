import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import usetechhiveStore from "../store/techhive-store";
import { ChevronDown } from "lucide-react";

const MainNav = () => {
    const carts = usetechhiveStore((state) => state.carts);
    const user = usetechhiveStore(state => state.user);
    const logout = usetechhiveStore((state) => state.logout);
    // console.log(Boolean(user))

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    console.log(carts.length);
    return (
        <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16 items-center relative">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="text-2xl font-extrabold tracking-wide hover:scale-105 transition-transform duration-300">
                            ⚡TECHHIVE
                        </Link>

                        {["Home", "Shop", "Cart"].map((label) => {
                            const to = label.toLowerCase() === "home" ? "/" : `/${label.toLowerCase()}`
                            return (
                                <NavLink
                                    key={label}
                                    to={to}
                                    className={({ isActive }) =>
                                        `relative group px-3 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "text-white" : "text-gray-300"}`
                                    }
                                >
                                    {label}
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 group-hover:w-full transition-all duration-300 ease-out" />
                                    {label === "Cart" && carts.length > 0 && (
                                        <span className="absolute -top-2 -right-3 bg-gray-600 text-white text-xs px-1.5 rounded-full shadow-md animate-bounce">
                                            {carts.length}
                                        </span>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-300"
                            >
                                <img
                                    className="w-9 h-9 rounded-full border border-white/20"
                                    src="https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256"
                                    alt="avatar"
                                />
                                <ChevronDown className="text-white w-4 h-4" />
                            </button>

                            {/* Dropdown */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg py-2 z-50 animate-fadeIn">
                                    <Link
                                        to="/user/history"
                                        className="block px-4 py-2 hover:bg-gray-100 transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        History
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logout();
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <NavLink
                                to="/register"
                                className="text-sm px-4 py-2 rounded-md bg-gray-600 hover:bg-black hover:text-white hover:brightness-110 transition-all duration-300 shadow-sm"
                            >
                                Register
                            </NavLink>
                            <NavLink
                                to="/login"
                                className="text-sm px-4 py-2 rounded-md bg-white text-black hover:bg-gray-600 hover:text-black hover:brightness-110 transition-all duration-300 shadow-md"
                            >
                                Login
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default MainNav;
