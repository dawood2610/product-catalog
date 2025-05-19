import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
	const { login } = useContext(AuthContext);
	const [form, setForm] = useState({ email: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		const data = await res.json();
		if (res.ok) {
			login(data.user, data.token);
			navigate("/dashboard");
		} else {
			alert(data.error);
		}
	};

	return (
		<div className="login-container">
			<h2 className="login-title">Login</h2>
			<form
				className="login-form"
				onSubmit={handleSubmit}
			>
				<input
					name="email"
					placeholder="Email"
					onChange={handleChange}
					required
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					onChange={handleChange}
					required
				/>
				<button
					className="login-button"
					type="submit"
				>
					Login
				</button>
			</form>
			<p className="login-footer">
				Don't have an account? <a href="/signup">Signup</a>
			</p>
		</div>
	);
};

export default Login;
