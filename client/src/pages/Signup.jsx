import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch("/api/auth/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(form),
		});
		if (res.ok) {
			alert("Signup successful. Please log in.");
			navigate("/login");
		} else {
			const data = await res.json();
			alert(data.error);
		}
	};

	return (
		<div className="signup-container">
			<h2 className="signup-title">Sign Up</h2>
			<form
				className="signup-form"
				onSubmit={handleSubmit}
			>
				<input
					name="name"
					placeholder="Name"
					onChange={handleChange}
					required
				/>
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
					className="signup-button"
					type="submit"
				>
					Create Account
				</button>
			</form>
			<p className="signup-footer">
				Already have an account? <a href="/login">Login</a>
			</p>
		</div>
	);
};

export default Signup;
