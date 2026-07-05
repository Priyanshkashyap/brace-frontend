import { createContext, useState } from "react";

export const AuthContext = createContext(); // context object gets created
export const AuthProvider = ({children}) => { // Whatever is wrapped inside AuthProvider becomes children.
    const [token, setToken] = useState(localStorage.getItem("token")); // for every children its there. null at first

    const login = (jwt) => { 
        localStorage.setItem("token", jwt);
        setToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (// makes these 3 available globally
        <AuthContext.Provider value={{token,login,logout}} >
            {children} 
        </AuthContext.Provider>
    );
};