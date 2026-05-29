import { createContext, useContext, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
const [user, setUser] = useState(null);

const register = async (userData) => {
const data = await authService.register(userData);


localStorage.setItem(
  "user",
  JSON.stringify(data)
);

setUser(data);

return data;


};

const login = async (userData) => {
const data = await authService.login(userData);


localStorage.setItem(
  "user",
  JSON.stringify(data)
);

setUser(data);

return data;


};

const logout = () => {
localStorage.removeItem("user");
setUser(null);
};

return (
<AuthContext.Provider
value={{
user,
register,
login,
logout,
}}
>
{children}
</AuthContext.Provider>
);
}

export function useAuth() {
return useContext(AuthContext);
}
