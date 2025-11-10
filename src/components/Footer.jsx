// src/components/Footer.jsx
function Footer() {
    return (
        <footer className="relative w-full mt-24">

            {/* Top fixed-height chevron */}
            <div
                className="
                w-full h-20 bg-[#E98A32]
                [clip-path:polygon(0_100%,50%_0,100%_100%)]
                "
            ></div>

            {/* Bottom auto-expanding rectangle */}
            <div className="w-full bg-[#E98A32] flex flex-col items-center justify-center py-8 text-white">

                <p className="tracking-wider text-3xl text-white text-center font-normal">
                    Cham Cham Cham @ 2025
                </p>
                <p className="tracking-widest text-xl text-white text-center mb-8 font-light">
                    Built by Yuri Lat ✮
                </p>



            </div>

        </footer>
    );
}

export default Footer;
