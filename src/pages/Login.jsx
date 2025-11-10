import { useNavigate } from 'react-router-dom'

import LoginForm from '../components/LoginForm.jsx'
import Header from '../components/Header.jsx';
import Footer from "../components/Footer.jsx";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[800px] bg-[#fff4c7] min-h-screen mx-auto flex flex-col">

      {/* Inner padded content */}
      <div className="px-10 py-16">

        <Header />

        <LoginForm />

      </div>

      <div className="mt-auto">
        <Footer />
      </div>

    </div>
  )
}

export default Login;


/*
        <div className="pt-10">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="tracking-widest block mx-auto mt-3 w-64 py-3 bg-[#E98A32] text-white text-xl font-thin rounded-full shadow-md hover:bg-[#0B3A63] transition-colors"
          >
            Enter Home Screen
          </button>
        </div>

*/
