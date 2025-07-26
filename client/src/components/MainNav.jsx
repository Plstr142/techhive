import React from 'react';
import usetechhiveStore from '../store/techhive-store';
import { Link } from "react-router-dom";

const MainNav = () => {
    const carts = usetechhiveStore((state) => state.carts);
    console.log(carts.length);

    return (
        <div className="relative">
            <nav className="relative h-16 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900">
                    {/* Floating Particles */}
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full animate-pulse ${i % 4 === 0 ? 'bg-gray-400/30' :
                                i % 4 === 1 ? 'bg-slate-400/30' :
                                    i % 4 === 2 ? 'bg-zinc-400/30' :
                                        'bg-stone-400/30'
                                }`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>

                {/* Glass Morphism Overlay */}
                <div className="absolute inset-0 backdrop-blur-sm bg-black/60 border-b border-gray-600/30" />

                {/* Navigation Content */}
                <div className="relative z-10 mx-auto px-4 h-full">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-6">
                            <Link
                                to="/"
                                className="text-2xl font-bold text-gray-200 hover:text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                            >
                                Logo
                            </Link>
                            <Link
                                to="/"
                                className="text-gray-300/80 hover:text-gray-100 transition-all duration-300 hover:scale-105 relative group"
                            >
                                Home
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full" />
                            </Link>
                            <Link
                                to="/shop"
                                className="text-gray-300/80 hover:text-gray-100 transition-all duration-300 hover:scale-105 relative group"
                            >
                                Shop
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full" />
                            </Link>
                            <Link
                                to="/cart"
                                className="text-gray-300/80 hover:text-gray-100 transition-all duration-300 hover:scale-105 relative group py-4"
                            >
                                Cart
                                {carts.length > 0 && (
                                    <span className="absolute top-0 bg-white rounded-full px-2 text-black">
                                        {carts.length}
                                    </span>
                                )}
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">
                            <a
                                href="/register"
                                className="px-4 py-2 text-gray-300/80 hover:text-gray-100 border border-gray-500/40 rounded-lg hover:bg-gray-700/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm hover:border-gray-400/60"
                            >
                                Register
                            </a>
                            <a
                                href="/login"
                                className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/50"
                            >
                                Login
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default MainNav;
