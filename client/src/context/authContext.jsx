import { createContext, useState } from "react";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() =>
		JSON.parse(localStorage.getItem("user"))
	);
	const [token, setToken] = useState(() => localStorage.getItem("token"));
	const navigate = useNavigate();

	const login = (user, token) => {
		setUser(user);
		setToken(token);
		localStorage.setItem("user", JSON.stringify(user));
		localStorage.setItem("token", token);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.clear();
		navigate("/login");
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
