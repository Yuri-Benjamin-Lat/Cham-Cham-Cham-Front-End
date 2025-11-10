import { useState, useEffect } from "react";

function Cham3x() {
    const [isReady, setIsReady] = useState(false);
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);

    const [currentScore, setCurrentScore] = useState(0);
    const [highestScore, setHighestScore] = useState(0);

    const username = localStorage.getItem("username"); // ✅ get current user
    const directions = ["up", "down", "left", "right"];

    /* -----------------------------------------------------------
       ✅ LOAD highest score from backend when user enters game
    ------------------------------------------------------------*/
    useEffect(() => {
        async function fetchHighest() {
            try {
                const res = await fetch(`http://localhost:5000/score/${username}`);
                const data = await res.json();

                if (data.highestScore !== undefined) {
                    setHighestScore(data.highestScore);
                }
            } catch (err) {
                console.error("Error loading highest score:", err);
            }
        }

        if (username) {
            fetchHighest();
        }
    }, [username]);


    /* -----------------------------------------------------------
       ✅ SAVE highest score to backend
    ------------------------------------------------------------*/
    async function saveScoreToDB(score) {
        try {
            await fetch("http://localhost:5000/score/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    score,
                }),
            });
        } catch (err) {
            console.error("Failed to save score:", err);
        }
    }


    /* -----------------------------------------------------------
       ✅ MAIN GAME LOGIC
    ------------------------------------------------------------*/
    function handlePlayerChoice(choice) {
        if (!isReady || isGameOver) return;

        setPlayerChoice(choice);

        const cpu = directions[Math.floor(Math.random() * directions.length)];
        setComputerChoice(cpu);

        if (cpu === choice) {
            // ✅ Player loses
            setIsGameOver(true);

            // ✅ Update local highest score
            if (currentScore > highestScore) {
                setHighestScore(currentScore);
                saveScoreToDB(currentScore); // ✅ Save to backend
            } else {
                saveScoreToDB(highestScore);
            }

        } else {
            // ✅ Player wins → +1 score
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
        <div className="w-full flex flex-col justify-center mb-10 items-center gap-2">

            <div className="relative aspect-square w-180 border-8 border-[#0B3A63] rounded-3xl bg-white shadow-lg overflow-hidden">

                {/* ✅ CPU DISPLAY */}
                <div className="absolute inset-0 flex justify-center items-center z-0">
                    <span className="text-[#0B3A63] text-9xl font-lighter select-none">
                        {displaySymbol(computerChoice)}
                    </span>
                </div>

                {/* ✅ START OVERLAY */}
                {!isReady && !isGameOver && (
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                        <button
                            onClick={() => setIsReady(true)}
                            className="tracking-widest px-10 py-5 bg-[#0B3A63] text-white rounded-full text-5xl font-light shadow-md hover:bg-[#E98A32] transition"
                        >
                            START
                        </button>
                    </div>
                )}

                {/* ✅ GAME OVER OVERLAY */}
                {isGameOver && (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-white">
                        <p className="text-6xl font-normal drop-shadow-lg">GAME OVER</p>

                        <h2 className="font-thin text-2xl text-white text-center mb-4">
                            Score: {currentScore}
                        </h2>

                        <h3 className="font-thin text-xl text-white text-center mb-6">
                            Highest Score: {highestScore}
                        </h3>

                        <button
                            onClick={resetGame}
                            className="tracking-widest px-10 py-4 bg-[#E98A32] text-white rounded-full text-3xl shadow-md hover:bg-[#0B3A63] transition"
                        >
                            Play Again
                        </button>
                    </div>
                )}

                {/* ✅ ARROW BUTTONS */}
                <button
                    onClick={() => handlePlayerChoice("up")}
                    className={`absolute top-4 left-1/2 -translate-x-1/2 w-60 h-16 
                        ${getButtonColor("up")}
                        flex items-center justify-center rounded-xl shadow-md hover:bg-[#0B3A63] transition z-10`}>
                    <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[18px] border-transparent border-b-white"></div>
                </button>

                <button
                    onClick={() => handlePlayerChoice("left")}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-16 h-60
                        ${getButtonColor("left")}
                        flex items-center justify-center rounded-xl shadow-md hover:bg-[#0B3A63] transition z-10`}>
                    <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-r-[18px] border-transparent border-r-white"></div>
                </button>

                <button
                    onClick={() => handlePlayerChoice("right")}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 w-16 h-60
                        ${getButtonColor("right")}
                        flex items-center justify-center rounded-xl shadow-md hover:bg-[#0B3A63] transition z-10`}>
                    <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-l-[18px] border-transparent border-l-white"></div>
                </button>

                <button
                    onClick={() => handlePlayerChoice("down")}
                    className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-60 h-16 
                        ${getButtonColor("down")}
                        flex items-center justify-center rounded-xl shadow-md hover:bg-[#0B3A63] transition z-10`}>
                    <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[18px] border-transparent border-t-white"></div>
                </button>

            </div>

            {/* ✅ SCORE DISPLAY */}
            <h2 className="font-thin text-2xl text-[#E98A32] text-center pt-2">
                Current Score: {currentScore}
            </h2>
            <h2 className="font-thin text-2xl text-[#E98A32] text-center">
                Highest Score: {highestScore}
            </h2>

        </div>
    );
}

export default Cham3x;