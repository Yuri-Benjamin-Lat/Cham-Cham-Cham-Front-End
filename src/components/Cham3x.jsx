import { useState, useEffect } from "react";

function Cham3x() {
    const [isReady, setIsReady] = useState(false);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);

    const [currentScore, setCurrentScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);

    const username = localStorage.getItem("username"); // ✅ get current user
    const API_URL = import.meta.env.VITE_API_URL;
    const directions = ["up", "down", "left", "right"];

    /* -----------------------------------------------------------
       ✅ LOAD highest score from backend when user enters game
    ------------------------------------------------------------*/
    useEffect(() => {
        async function fetchHighest() {
            try {
                const res = await fetch(`${API_URL}/score/${username}`);
                const data = await res.json();

                if (data.highestScore !== undefined) {
                    setHighestScore(data.highestScore);
                }
            } catch (err) {
                console.error("Error loading highest score:", err);
            }
        }

        if (username) fetchHighest();
    }, [username, API_URL]);


    /* ✅ Save score to backend */
    async function saveScoreToDB(score) {
        try {
            await fetch(`${API_URL}/score/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, score }),
            });
        } catch (err) {
            console.error("Failed to save score:", err);
        }
    }

    /* ✅ Main game logic */
    function handlePlayerChoice(choice) {
        if (!isReady || isGameOver) return;

        setPlayerChoice(choice);

        const cpu = directions[Math.floor(Math.random() * directions.length)];
        setComputerChoice(cpu);

        if (cpu === choice) {
            setIsGameOver(true);

            if (currentScore > highestScore) {
                setHighestScore(currentScore);
                saveScoreToDB(currentScore);
            } else {
                saveScoreToDB(highestScore);
            }
        } else {
            setCurrentScore(prev => prev + 1);
        }
    }

    /* -----------------------------------------------------------
       ✅ TEMPORARY color flash (green/red) for 0.5s
    ------------------------------------------------------------*/
    useEffect(() => {
        if (!playerChoice || !computerChoice) return;
        if (isGameOver) return;

        const timer = setTimeout(() => {
            setPlayerChoice(null);
            setComputerChoice(null);
        }, 500);

        return () => clearTimeout(timer);
    }, [playerChoice, computerChoice, isGameOver]);


    /* -----------------------------------------------------------
       ✅ RESET GAME
    ------------------------------------------------------------*/
    function resetGame() {
        setIsGameOver(false);
        setPlayerChoice(null);
        setComputerChoice(null);
        setCurrentScore(0);
    }


    /* -----------------------------------------------------------
       ✅ Button Color Logic
    ------------------------------------------------------------*/
    function getButtonColor(direction) {
        if (!playerChoice || !computerChoice) {
            return "bg-[#E98A32]";
        }

        const player = playerChoice === direction;
        const cpu = computerChoice === direction;

        // ✅ If lost, both match → red
        if (playerChoice === computerChoice) {
            if (player || cpu) return "bg-red-500";
        }

        // ✅ If win
        if (player) return "bg-green-500";
        if (cpu) return "bg-red-500";

        return "bg-[#E98A32]";
    }


    function displaySymbol(dir) {
        if (!dir) return "?";
        if (dir === "up") return "↑";
        if (dir === "down") return "↓";
        if (dir === "left") return "←";
        if (dir === "right") return "→";
    }


    return (
        <div className="w-full flex flex-col justify-center mb-10 items-center gap-2 px-4">

            {/* ✅ GAME BOARD */}
            <div
                className="
      relative 
      aspect-square 
      w-full max-w-[800px] sm:w-180 
      border-8 border-[#0B3A63] 
      rounded-3xl 
      bg-white 
      shadow-lg 
      overflow-hidden
    "
            >

                {/* ✅ CPU DISPLAY */}
                <div className="absolute inset-0 flex justify-center items-center z-0">
                    <span className="text-[#0B3A63] text-7xl sm:text-9xl font-lighter select-none">
                        {displaySymbol(computerChoice)}
                    </span>
                </div>

                {/* ✅ START OVERLAY */}
                {!isReady && !isGameOver && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                        <button
                            onClick={() => setIsReady(true)}
                            className="
            tracking-widest 
            px-8 sm:px-10 
            py-4 sm:py-5 
            bg-[#0B3A63] 
            text-white 
            rounded-full 
            text-3xl sm:text-5xl 
            font-light 
            shadow-md 
            hover:bg-[#E98A32] 
            transition
          "
                        >
                            START
                        </button>
                    </div>
                )}

                {/* ✅ GAME OVER OVERLAY */}
                {isGameOver && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-white px-4">
                        <p className="text-4xl sm:text-6xl font-normal drop-shadow-lg">GAME OVER</p>

                        <h2 className="font-thin text-xl sm:text-2xl text-center mb-3">
                            Score: {currentScore}
                        </h2>

                        <h3 className="font-thin text-lg sm:text-xl text-center mb-6">
                            Highest Score: {highestScore}
                        </h3>

                        <button
                            onClick={resetGame}
                            className="
            tracking-widest 
            px-8 sm:px-10 
            py-3 sm:py-4 
            bg-[#E98A32] 
            text-white 
            rounded-full 
            text-2xl sm:text-3xl 
            shadow-md 
            hover:bg-[#0B3A63] 
            transition
          "
                        >
                            Play Again
                        </button>
                    </div>
                )}

                {/* ✅ ARROW BUTTONS */}
                {/* UP */}
                <button
                    onClick={() => handlePlayerChoice("up")}
                    className={`
        absolute 
        top-3 sm:top-4 
        left-1/2 -translate-x-1/2 
        w-40 sm:w-60 
        h-12 sm:h-16
        ${getButtonColor("up")}
        flex items-center justify-center 
        rounded-xl shadow-md 
        hover:bg-[#0B3A63] 
        transition 
        z-10
      `}
                >
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[14px] sm:border-l-[12px] sm:border-r-[12px] sm:border-b-[18px] border-transparent border-b-white"></div>
                </button>

                {/* LEFT */}
                <button
                    onClick={() => handlePlayerChoice("left")}
                    className={`
        absolute 
        left-3 sm:left-4 
        top-1/2 -translate-y-1/2 
        w-12 sm:w-16 
        h-40 sm:h-60
        ${getButtonColor("left")}
        flex items-center justify-center 
        rounded-xl shadow-md 
        hover:bg-[#0B3A63] 
        transition 
        z-10
      `}
                >
                    <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-r-[14px] sm:border-t-[12px] sm:border-b-[12px] sm:border-r-[18px] border-transparent border-r-white"></div>
                </button>

                {/* RIGHT */}
                <button
                    onClick={() => handlePlayerChoice("right")}
                    className={`
        absolute 
        right-3 sm:right-4
        top-1/2 -translate-y-1/2 
        w-12 sm:w-16 
        h-40 sm:h-60
        ${getButtonColor("right")}
        flex items-center justify-center 
        rounded-xl shadow-md 
        hover:bg-[#0B3A63] 
        transition 
        z-10
      `}
                >
                    <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[14px] sm:border-t-[12px] sm:border-b-[12px] sm:border-l-[18px] border-transparent border-l-white"></div>
                </button>

                {/* DOWN */}
                <button
                    onClick={() => handlePlayerChoice("down")}
                    className={`
        absolute 
        bottom-3 sm:bottom-4 
        left-1/2 -translate-x-1/2 
        w-40 sm:w-60 
        h-12 sm:h-16
        ${getButtonColor("down")}
        flex items-center justify-center 
        rounded-xl shadow-md 
        hover:bg-[#0B3A63] 
        transition 
        z-10
      `}
                >
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[14px] sm:border-l-[12px] sm:border-r-[12px] sm:border-t-[18px] border-transparent border-t-white"></div>
                </button>

            </div>

            {/* ✅ SCORE DISPLAY */}
            <h2 className="font-thin text-xl sm:text-2xl text-[#E98A32] text-center pt-2">
                Current Score: {currentScore}
            </h2>
            <h2 className="font-thin text-xl sm:text-2xl text-[#E98A32] text-center">
                Highest Score: {highestScore}
            </h2>

        </div>

    );
}

export default Cham3x;