import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import HowToPlay from '../components/HowToPlay.jsx';
import Header from '../components/Header.jsx';
import NavBar from '../components/NavBar.jsx';
import Footer from "../components/Footer.jsx";
import Cham3x from '../components/Cham3x.jsx';
import Leaderboards from '../components/Leaderboards.jsx';

function Home() {

  const navigate = useNavigate();

  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Light mode on by default
  const [isWarmMode, setIsWarmMode] = useState(false);

  return (
    <div
      className={`w-full max-w-[800px] min-h-screen mx-auto flex flex-col
        ${isWarmMode ? "bg-[#F3D890]" : "bg-[#fff4c7]"}`}
    >

      {/* INNER padded content */}
      <div className="px-10 py-16">

        <Header />

        <NavBar
          onOpenHowToPlay={() => setShowHowToPlay(true)}
          onSignOut={() => navigate('/')}
          onToggleWarmMode={() => setIsWarmMode(prev => !prev)}
          isWarmMode={isWarmMode}
        />

        {/* How To Play Overlay */}
        {showHowToPlay && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
            <HowToPlay onClose={() => setShowHowToPlay(false)} />
          </div>
        )}

      </div>

      <Cham3x />
      
      <Leaderboards />  

      <div className="mt-auto">
        <Footer />
      </div>

    </div>
  );
}

export default Home;

