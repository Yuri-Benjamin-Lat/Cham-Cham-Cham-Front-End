function Footer() {
    return (
        <footer className="relative w-full mt-16 sm:mt-24">

            {/* Top fixed-height chevron */}
            <div
                className="
                    w-full 
                    h-16 sm:h-20 
                    bg-[#E98A32]
                    [clip-path:polygon(0_100%,50%_0,100%_100%)]
                "
            ></div>

            {/* Bottom expanding rectangle */}
            <div className="w-full bg-[#E98A32] flex flex-col items-center justify-center py-6 sm:py-8 text-white">

                <p className="tracking-wider text-xl sm:text-3xl text-white text-center font-normal">
                    Cham Cham Cham @ 2025
                </p>

                <p className="tracking-widest text-base sm:text-xl text-white text-center mb-6 sm:mb-8 font-light">
                    Built by Yuri Lat ✮
                </p>

            </div>

        </footer>
    );
}

export default Footer;
