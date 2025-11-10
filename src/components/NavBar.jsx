function NavBar({ onOpenHowToPlay, onSignOut, onToggleWarmMode, isWarmMode }) {
  return (
    <nav className="w-full flex justify-center gap-8 pt-8">

      {/* Dark Mode (future) */}
      <button
        onClick={onToggleWarmMode}
        className="tracking-widest pl-5 pr-5 py-1 bg-[#0B3A63] text-white rounded-full text-lg font-thin shadow-md hover:bg-[#E98A32] transition-colors"
      >
        Warm Mode
      </button>

      {/* How To Play */}
      <button
        onClick={onOpenHowToPlay}
        className="tracking-widest pl-5 pr-5 py-1 bg-[#0B3A63] text-white rounded-full text-lg font-thin shadow-md hover:bg-[#E98A32] transition-colors"
      >
        How To Play
      </button>

      {/* Sign Out */}
      <button
        onClick={onSignOut}
        className="tracking-widest pl-5 pr-5 py-1 bg-[#0B3A63] text-white rounded-full text-lg font-thin shadow-md hover:bg-[#E98A32] transition-colors"
      >
        Sign Out
      </button>

    </nav>
  );
}

export default NavBar;

/*
Lightmode: bg-[#fff4c7]
Warmmode: bg-[#F3D890]
*/