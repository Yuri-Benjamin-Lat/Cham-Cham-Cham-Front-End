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

    fetchLeaderboard(); // ✅ initial load
    const interval = setInterval(fetchLeaderboard, 3000); // auto-refresh every 3 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  const medal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  return (
    <div className="w-180 mt-10 pb-10 mx-auto">
      <h2 className="font-thin text-5xl text-[#0B3A63] text-center mb-6">
        ˙✧˖° LEADERBOARDS ⋆✧｡˙
      </h2>

      <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-lg p-6">

        <div className="flex justify-between px-4 py-2 text-[#0B3A63] text-4xl">
          <span className="w-10 text-left">#</span>
          <span className="flex-1 pl-5">Player</span>
          <span>Score</span>
        </div>

        <div className="max-h-100 overflow-y-auto mt-2">
          {players.map((player, index) => (
            <div
              key={player._id}
              className="
                flex justify-between items-center px-4 py-5
                bg-[#E98A32]/90 text-white
                text-3xl rounded-xl mb-2 tracking-widest
              "
            >
              <span className="w-10 text-left">{index + 1}</span>

              <span className="flex-1">
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
