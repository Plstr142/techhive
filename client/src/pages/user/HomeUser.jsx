import { useState, useEffect } from 'react';

const HomeUser = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="h-screen w-screen bg-black flex items-center justify-center relative overflow-hidden fixed inset-0">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-white/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                ></div>
            </div>



            {/* Main content */}
            <div className="relative z-10 text-center">
                <div className={`transition-all duration-2000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                    {/* Glowing background for text */}
                    <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150 animate-pulse"></div>

                    {/* Main text */}
                    <h1 className="relative text-8xl md:text-9xl lg:text-[10rem] font-black text-white font-mono tracking-wider select-none">
                        TECHHIVE
                        <br />
                        Customer Account
                    </h1>

                    {/* Text shadow/glow effect */}
                    <div className="absolute inset-0 text-8xl md:text-9xl lg:text-[10rem] font-black text-white/20 blur-sm font-mono tracking-wider">

                    </div>

                    {/* Text stroke effect */}
                    <div className="absolute inset-0 text-8xl md:text-9xl lg:text-[10rem] font-black text-transparent font-mono tracking-wider"
                        style={{
                            WebkitTextStroke: '2px rgba(255,255,255,0.3)',
                            transform: 'translate(2px, 2px)'
                        }}>

                    </div>
                </div>

                {/* Animated underline */}
                {/* <div className={`mt-8 h-0.5 bg-white transition-all duration-3000 ${isVisible ? 'w-64 opacity-70' : 'w-0 opacity-0'
                    }`}>

                </div> */}

                {/* Subtitle */}
                <div className={`mt-4 transition-all duration-3000 delay-1000 ${isVisible ? 'opacity-60' : 'opacity-0'
                    }`}>
                    <p className="text-white/60 text-lg font-mono tracking-widest">GO TO SHOPPING</p>
                </div>
            </div>



            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 right-0 h-px bg-white/30 animate-pulse opacity-50"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30 animate-pulse opacity-50 delay-1000"></div>

            {/* Side accent lines */}
            <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        </div>
    );
};

export default HomeUser;