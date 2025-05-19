import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, AuthContext } from "./context/authContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
	const { token } = useContext(AuthContext);
	return token ? children : <Navigate to="/login" />;
};

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route
						path="/"
						element={<Navigate to="/dashboard" />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/signup"
						element={<Signup />}
					/>
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
