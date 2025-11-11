import { useNavigate } from "react-router-dom";

function NonLogin() {

    const navigate = useNavigate();
    
    return (
        <div className="w-full max-w-[450px] bg-white/70 backdrop-blur-xl shadow-xl p-6 sm:p-10 rounded-3xl mx-auto">
            <div>
                <h2 className="block text-lg sm:text-xl text-[#1E4A78] font-thin text-center">
                    - Enter without Signing In -
                </h2>

                <h2 className="block text-lg sm:text-xl text-[#1E4A78] mb-5 font-thin text-center">
                    Score will not be saved
                </h2>

                <button
                    type="button"
                    onClick={() => navigate('/home')}
                    className="
                            tracking-widest 
                            block mx-auto mt-3 
                            w-56 sm:w-80 
                            py-2.5 sm:py-3 
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
                    Click Here
                </button>
            </div>
        </div>

    );
}

export default NonLogin;