import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const { login } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user = await login({
      email,
      password,
    });

    console.log("Logged In:", user);
  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
};

return ( <div className="min-h-screen flex items-center justify-center bg-slate-100"> <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]"> <h1 className="text-3xl font-bold text-center mb-6">
Login </h1>


    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="border p-3 rounded-lg"
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="border p-3 rounded-lg"
      />

      <button
        type="submit"
        className="bg-black text-white p-3 rounded-lg"
      >
        Login
      </button>
    </form>
  </div>
</div>

);
}

export default Login;
