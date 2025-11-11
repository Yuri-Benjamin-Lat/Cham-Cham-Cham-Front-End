import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [mode, setMode] = useState("signin"); // "signin" or "signup"
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const [successMessage, setSuccessMessage] = useState("");

    const API_URL = import.meta.env.VITE_API_URL; // e.g. https://your-backend.vercel.app

    console.log("DEBUG API_URL:", API_URL); // this is for debugging

    async function handleSignUp() {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || data.message || "Username already taken.");    
                setLoading(false);
                return;
            }

            setSuccessMessage("Account created! You can now sign in.");
            setTimeout(() => {
                setSuccessMessage("");
                setMode("signin");
            }, 2000);

            setMode("signin");
            setUsername("");
            setPassword("");

        } catch (err) {
            setError("Server error. Try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin() {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || data.message || "Login failed.");
                setLoading(false);
                return;
            }

            // ✅ Save token for authentication
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", username);

            navigate("/home");

        } catch (err) {
            setError("Server error. Try again.");
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (mode === "signin") handleLogin();
        else handleSignUp();
    }

    return (
        <div className="w-full max-w-[450px] bg-white/70 backdrop-blur-xl shadow-xl p-10 rounded-3xl mx-auto mt-20">

            {/* Title */}
            <h1 className="tracking-wider text-4xl font-bold text-[#0B3A63] text-center mb-5 font-normal">
                {mode === "signin" ? "Knock Knock !!" : "Who's There ??"}
            </h1>

            {/* Toggle */}
            <div className="flex justify-center mb-5">
                <div className="bg-[#FFF2C9] p-1 rounded-full flex shadow-inner w-64">
                    <button
                        className={`tracking-wider font-thin flex-1 px-5 py-3 rounded-full text-xl transition-all ${mode === "signin"
                            ? "bg-[#E98A32] text-white shadow-md"
                            : "text-[#0B3A63]"
                            }`}
                        onClick={() => setMode("signin")}
                    >
                        Sign In
                    </button>

                    <button
                        className={`tracking-wider font-thin flex-1 px-5 py-3 rounded-full text-xl transition-all ${mode === "signup"
                            ? "bg-[#E98A32] text-white shadow-md"
                            : "text-[#0B3A63]"
                            }`}
                        onClick={() => setMode("signup")}
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {/* FORM */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

                <div>
                    <label className="block text-xl text-[#1E4A78] mb-2 font-thin">𖦹 Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 rounded-full border border-[#DCDCDC] bg-white/80 text-[#1F4F7A] focus:outline-none focus:ring-2 focus:ring-[#F6A348] shadow-sm"
                        placeholder={mode === "signin" ? "Enter your username" : "Create a username"}
                        required
                    />
                </div>

                <div>
                    <label className="block text-xl text-[#1E4A78] mb-2 font-thin">ᝰ Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-full border border-[#DCDCDC] bg-white/80 text-[#1F4F7A] focus:outline-none focus:ring-2 focus:ring-[#F6A348] shadow-sm"
                        placeholder={mode === "signin" ? "Enter your password" : "Create a password"}
                        required
                    />
                </div>

                {/* Error */}
                {error && (
                    <p className="text-red-500 text-center">{error}</p>
                )}

                <p className="tracking-wider text-base text-[#E98A32] text-center">
                    Note: If you forget your password, your account is lost forever 𐔌՞. .՞𐦯...
                </p>

                <button
                    type="submit"
                    disabled={loading}
                    className="tracking-widest mx-auto mt-3 w-64 py-3 bg-[#E98A32] text-white font-thin text-xl rounded-full shadow-md hover:bg-[#0B3A63] transition-colors"
                >
                    {loading
                        ? (mode === "signin" ? "Logging in..." : "Creating...")
                        : (mode === "signin" ? "Login" : "Create Account")}
                </button>

            </form>

            {/* ✅ SUCCESS MODAL */}
            {successMessage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-10 rounded-3xl shadow-xl w-[350px] text-center transform -translate-y-95">
                        <p className="text-2xl text-[#0B3A63] font-normal">
                            {successMessage}
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
}
