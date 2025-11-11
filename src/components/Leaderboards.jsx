import { useEffect, useState } from "react";

function Leaderboards() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/leaderboard`);
        const data = await res.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error loading leaderboard:", error);
      }
    }

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 3000);

    return () => clearInterval(interval);
  }, [import.meta.env.VITE_API_URL]);

  const medal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  return (
    <div className="w-full max-w-[900px] sm:w-180 mt-10 pb-10 mx-auto px-4">

      <h2 className="font-thin text-3xl sm:text-5xl text-[#0B3A63] text-center mb-6">
        ˙✧˖° LEADERBOARDS ⋆✧｡˙
      </h2>

      <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-lg p-4 sm:p-6">

        {/* HEADER */}
        <div className="flex justify-between px-2 sm:px-4 py-2 text-[#0B3A63] text-2xl sm:text-4xl">
          <span className="w-8 sm:w-10 text-left">#</span>
          <span className="flex-1 pl-3 sm:pl-5">Player</span>
          <span>Score</span>
        </div>

        {/* SCROLL AREA */}
        <div className="max-h-96 sm:max-h-100 overflow-y-auto mt-2 pr-1">

          {players.map((player, index) => (
            <div
              key={player._id}
              className="
            flex justify-between items-center
            px-2 sm:px-4 py-4 sm:py-5
            bg-[#E98A32]/90 text-white
            text-2xl sm:text-3xl
            rounded-xl mb-2 tracking-widest
          "
            >
              <span className="w-8 sm:w-10 text-left">{index + 1}</span>

              <span className="flex-1 truncate">
                {medal(index + 1)} {player.username}
              </span>

              <span>{player.highestScore}</span>
            </div>
          ))}

        </div>

      </div>
    </div>

  );
}

export default Leaderboards;
