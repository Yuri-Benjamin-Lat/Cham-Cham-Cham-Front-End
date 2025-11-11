function HowToPlay({ onClose }) {

    return (
        <div
            className="
                w-full 
                max-w-[600px]
                bg-white/70 
                backdrop-blur-xl 
                shadow-xl 
                p-3 sm:p-10 
                rounded-3xl 
                mx-4 sm:mx-auto 
                mt-8 sm:mt-20

                max-h-[90vh]
                overflow-y-auto
                flex flex-col
            "
        >

            {/* Title */}
            <h1
                className="
                    tracking-wider 
                    text-xl sm:text-5xl       /* ✅ smaller mobile title */
                    font-bold 
                    text-[#0B3A63] 
                    text-center 
                    mb-4 pb-1
                    font-normal
                "
            >
                <span className="inline-block -scale-x-100">ˎˊ˗</span> How To Play ˎˊ˗
            </h1>

            {/* 1 */}
            <p className="block text-lg sm:text-3xl text-[#0B3A63] mb-1 font-light">
                1. Choose your direction:
            </p>

            <p className="block text-sm sm:text-xl text-[#0B3A63] mb-2 font-thin pl-3 sm:pl-8 pb-1">
                - Choose a direction to face —
                <span className="text-[#E98A32]"> Up</span>,
                <span className="text-[#E98A32]"> Down</span>,
                <span className="text-[#E98A32]"> Left</span>, or
                <span className="text-[#E98A32]"> Right</span>.
            </p>

            {/* 2 */}
            <p className="block text-lg sm:text-3xl text-[#0B3A63] mb-1 font-light">
                2. Computer’s Guess:
            </p>

            <p className="block text-sm sm:text-xl text-[#0B3A63] mb-2 font-thin pl-3 sm:pl-8 pb-1">
                - The computer will randomly pick a direction to
                "<span className="text-[#E98A32]">point</span>".
            </p>

            {/* 3 */}
            <p className="block text-lg sm:text-3xl text-[#0B3A63] mb-1 font-light">
                3. Win or Lose the Round:
            </p>

            <p className="block text-sm sm:text-xl text-[#0B3A63] mb-1 font-thin pl-3 sm:pl-8">
                - Different direction = you <span className="text-[#E98A32]">win</span>.
            </p>

            <p className="block text-sm sm:text-xl text-[#0B3A63] mb-2 font-thin pl-3 sm:pl-8">
                - Same direction = you <span className="text-[#E98A32]">lose</span>.
            </p>

            {/* 4 */}
            <p className="block text-lg sm:text-3xl text-[#0B3A63] mb-1 font-light">
                4. Scoring and Ranking:
            </p>

            <p className="block text-sm sm:text-xl text-[#0B3A63] mb-4 font-thin pl-3 sm:pl-8 pb-3">
                - Each win adds points. Higher scores place you higher on the leaderboard.
            </p>

            {/* Button */}
            <button
                type="button"
                onClick={onClose}
                className="
                    tracking-widest 
                    block mx-auto mt-2 mb-2
                    w-40 sm:w-64            /* ✅ smaller mobile width */
                    py-2 sm:py-3 
                    bg-[#E98A32] 
                    text-white 
                    text-sm sm:text-xl      /* ✅ smallest mobile text */
                    font-thin 
                    rounded-full 
                    shadow-md 
                    hover:bg-[#0B3A63] 
                    transition-colors
                "
            >
                I understand
            </button>

        </div>
    );
}

export default HowToPlay;
