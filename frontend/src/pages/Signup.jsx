import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();


try {
  await register({
    name,
    email,
    password,
  });

  navigate("/chat");
} catch (error) {
  alert(
    error.response?.data?.message ||
      "Registration failed"
  );
}
;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6">
      {" "}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-500 mt-3">
            Join and start chatting instantly
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          />

          <button
            type="submit"
            className="w-full h-14 rounded-2xl bg-black text-white font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
