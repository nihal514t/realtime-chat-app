import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const { login } = useAuth();
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();

```
try {
  await login({
    email,
    password,
  });

  navigate("/chat");
} catch (error) {
  console.error(error);
  alert("Login failed");
}
```

};

return ( <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6"> <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-10">


    <div className="text-center mb-10">
      <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
        Welcome Back
      </h1>

      <p className="text-gray-500 mt-3">
        Sign in to continue chatting
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="w-full h-14 px-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
      />

      <button
        type="submit"
        className="w-full h-14 rounded-2xl bg-black text-white font-medium hover:opacity-90 transition"
      >
        Login
      </button>
    </form>

    <p className="text-center text-gray-500 mt-8">
      Don't have an account?{" "}
      <Link
        to="/signup"
        className="text-black font-medium"
      >
        Sign Up
      </Link>
    </p>
  </div>
</div>


);
}

export default Login;
