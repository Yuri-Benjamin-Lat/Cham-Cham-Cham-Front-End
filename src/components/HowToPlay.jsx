function HowToPlay({ onClose }) {

    return (
        <div
            className="
    w-full 
    max-w-[600px]
    bg-white/70 
    backdrop-blur-xl 
    shadow-xl 
    p-4 sm:p-10 
    rounded-3xl 
    mx-4 sm:mx-auto 
    mt-10 sm:mt-20

    max-h-[90vh]         /* ✅ Limit height to viewport */
    overflow-y-auto      /* ✅ Enable internal scroll */
    flex flex-col        /* ✅ Fix for scroll */
  "
        >

            {/* Title */}
            <h1
                className="
                    tracking-wider 
                    text-3xl sm:text-5xl 
                    font-bold 
                    text-[#0B3A63] 
                    text-center 
                    mb-5 pb-2 
                    font-normal
                "
            >
                <span className="inline-block -scale-x-100">ˎˊ˗</span> How To Play ˎˊ˗
            </h1>

            {/* 1 */}
            <p className="block text-2xl sm:text-3xl text-[#0B3A63] mb-2 font-light">
                1. Choose your direction:
            </p>
            <p className="block text-lg sm:text-xl text-[#0B3A63] mb-2 font-thin pl-4 sm:pl-8 pb-2">
                - You will have to decide which way to face —
                <span className="text-[#E98A32]"> Up</span>,
                <span className="text-[#E98A32]"> Down</span>,
                <span className="text-[#E98A32]"> Left</span>, or
                <span className="text-[#E98A32]"> Right</span>.
            </p>

            {/* 2 */}
            <p className="block text-2xl sm:text-3xl text-[#0B3A63] mb-2 font-light">
                2. Computer’s Guess:
            </p>
            <p className="block text-lg sm:text-xl text-[#0B3A63] mb-2 font-thin pl-4 sm:pl-8 pb-2">
                - After you choose, the computer will randomly pick a direction to
                "<span className="text-[#E98A32]">point</span>" — trying to guess which way you looked.
            </p>

            {/* 3 */}
            <p className="block text-2xl sm:text-3xl text-[#0B3A63] mb-2 font-light">
                3. Win or Lose the Round:
            </p>
            <p className="block text-lg sm:text-xl text-[#0B3A63] mb-2 font-thin pl-4 sm:pl-8">
                - If the computer guesses a different direction, you
                <span className="text-[#E98A32]"> win</span> the round.
            </p>
            <p className="block text-lg sm:text-xl text-[#0B3A63] mb-2 font-thin pl-4 sm:pl-8">
                - If the computer guessed your direction correctly, you
                <span className="text-[#E98A32]"> lose</span> the round.
            </p>

            {/* 4 */}
            <p className="block text-2xl sm:text-3xl text-[#0B3A63] mb-2 font-light">
                4. Scoring and Ranking:
            </p>
            <p className="block text-lg sm:text-xl text-[#0B3A63] mb-5 font-thin pl-4 sm:pl-8 pb-5">
                - Each win earns you points. Your total score determines your rank among other players —
                <span className="text-[#E98A32]"> the higher your score</span>, the
                <span className="text-[#E98A32]"> higher your position</span> on the leaderboard.
            </p>

            {/* Button */}
            <button
                type="button"
                onClick={onClose}
                className="
                    tracking-widest 
                    block mx-auto mt-3 
                    w-48 sm:w-64 
                    py-3 
                    bg-[#E98A32] 
                    text-white 
                    text-lg sm:text-xl 
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
