import React, { useState, useEffect } from 'react';
import usetechhiveStore from '../store/techhive-store';
import { Link } from "react-router-dom";

const MainNav = () => {
    const carts = usetechhiveStore((state) => state.carts);
    console.log(carts.length)

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative">
            <nav className="relative h-16 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900">
                    {/* Moving Orbs */}
                    <div
                        className="absolute w-96 h-96 bg-gradient-to-r from-gray-600/20 to-gray-800/20 rounded-full blur-3xl animate-pulse"
                        style={{
                            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
                            left: '10%',
                            top: '-150%'
                        }}
                    />
                    <div
                        className="absolute w-72 h-72 bg-gradient-to-r from-slate-600/25 to-gray-700/25 rounded-full blur-3xl animate-pulse"
                        style={{
                            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
                            right: '10%',
                            top: '-100%',
                            animationDelay: '1s'
                        }}
                    />
                    <div
                        className="absolute w-64 h-64 bg-gradient-to-r from-zinc-600/20 to-slate-700/20 rounded-full blur-3xl animate-pulse"
                        style={{
                            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
                            left: '60%',
                            top: '-120%',
                            animationDelay: '2s'
                        }}
                    />

                    {/* Floating Particles */}
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full animate-pulse ${i % 4 === 0 ? 'bg-gray-400/30' :
                                i % 4 === 1 ? 'bg-slate-400/30' :
                                    i % 4 === 2 ? 'bg-zinc-400/30' : 'bg-stone-400/30'
                                }`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}

                    {/* Scan Line Effect */}
                    <div
                        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-70"
                        style={{
                            animation: 'scan 4s linear infinite',
                            transform: `translateY(${scrollY * 0.1}px)`
                        }}
                    />

                    {/* Additional Scan Line */}
                    <div
                        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-50"
                        style={{
                            animation: 'scan 6s linear infinite reverse',
                            transform: `translateY(${scrollY * 0.05}px)`
                        }}
                    />

                    {/* Dark Energy Lines */}
                    <div
                        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-40"
                        style={{
                            animation: 'scan 8s linear infinite',
                            transform: `translateY(${scrollY * 0.15}px)`
                        }}
                    />
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
                                {
                                    carts.length > 0 && (<span className="absolute top-0 bg-white rounded-full px-2 text-black"> {carts.length}</span>)
                                }
                                {/* <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full" /> */}
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


            <style>
                {`@keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }`}
            </style>
        </div>
    );
};

export default MainNav;