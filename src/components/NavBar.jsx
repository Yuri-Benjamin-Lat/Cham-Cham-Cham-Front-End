function NavBar({ onOpenHowToPlay, onSignOut, onToggleWarmMode, isWarmMode }) {
  return (
    <nav
      className="
        w-full 
        flex 
        flex-col sm:flex-row 
        items-center 
        justify-center 
        gap-4 sm:gap-8 
        pt-6 sm:pt-8 
        px-4
      "
    >

      {/* Warm Mode */}
      <button
        onClick={onToggleWarmMode}
        className="
          tracking-widest 
          px-5 py-2 
          bg-[#0B3A63] 
          text-white 
          rounded-full 
          text-base sm:text-lg 
          font-thin 
          shadow-md 
          hover:bg-[#E98A32] 
          transition-colors
          w-full sm:w-auto
        "
      >
        Warm Mode
      </button>

      {/* How To Play */}
      <button
        onClick={onOpenHowToPlay}
        className="
          tracking-widest 
          px-5 py-2 
          bg-[#0B3A63] 
          text-white 
          rounded-full 
          text-base sm:text-lg
          font-thin 
          shadow-md 
          hover:bg-[#E98A32] 
          transition-colors
          w-full sm:w-auto
        "
      >
        How To Play
      </button>

      {/* Sign Out */}
      <button
        onClick={onSignOut}
        className="
          tracking-widest 
          px-5 py-2 
          bg-[#0B3A63] 
          text-white 
          rounded-full 
          text-base sm:text-lg
          font-thin 
          shadow-md 
          hover:bg-[#E98A32] 
          transition-colors
          w-full sm:w-auto
        "
      >
        Sign Out
      </button>

    </nav>
  );
}

export default NavBar;
