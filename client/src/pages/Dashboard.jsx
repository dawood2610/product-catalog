import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import "./dashboard.css";

const Dashboard = () => {
	const { user, token, logout } = useContext(AuthContext);
	const [products, setProducts] = useState([]);
	const [form, setForm] = useState({
		name: "",
		price: "",
		imageUrl: "",
		description: "",
	});
	const [editingId, setEditingId] = useState(null);
	const [formVisible, setFormVisible] = useState(false);
	const [loading, setLoading] = useState(false);

	const fetchProducts = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/products", {
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await res.json();
			setProducts(data);
		} catch (err) {
			console.error("Error fetching products:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		const method = editingId ? "PUT" : "POST";
		const url = editingId ? `/api/products/${editingId}` : "/api/products";

		await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(form),
		});

		setForm({ name: "", price: "", imageUrl: "", description: "" });
		setEditingId(null);
		setFormVisible(false);
		fetchProducts();
	};

	const handleEdit = (product) => {
		setForm(product);
		setEditingId(product._id);
		setFormVisible(true);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this product?"))
			return;
		await fetch(`/api/products/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		});
		fetchProducts();
	};

	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<div className="user-welcome">
					<div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div>
					<div>
						<h2 className="welcome-text">Welcome, {user.name}</h2>
						<p className="welcome-subtitle">Manage your product catalog</p>
					</div>
				</div>
				<button
					className="logout-btn"
					onClick={logout}
				>
					Logout
				</button>
			</div>

			<button
				className="toggle-form-btn"
				onClick={() => setFormVisible(!formVisible)}
			>
				{formVisible
					? editingId
						? "Cancel Edit"
						: "Hide Form"
					: editingId
					? "Edit Product"
					: "Add Product"}
			</button>

			<div className={`form-container ${formVisible ? "active" : ""}`}>
				<h3 className="form-title">
					{editingId ? "Edit Product" : "Add New Product"}
				</h3>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							className="form-control"
							name="name"
							placeholder="Product Name"
							value={form.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="number"
							name="price"
							placeholder="Price"
							value={form.price}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							name="imageUrl"
							placeholder="Image URL"
							value={form.imageUrl}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<textarea
							className="form-control"
							name="description"
							placeholder="Description"
							value={form.description}
							onChange={handleChange}
						></textarea>
					</div>
					<div className="form-buttons">
						<button
							type="submit"
							className="btn btn-primary"
						>
							{editingId ? "Update Product" : "Add Product"}
						</button>
						{editingId && (
							<button
								type="button"
								className="btn btn-secondary"
								onClick={() => {
									setForm({
										name: "",
										price: "",
										imageUrl: "",
										description: "",
									});
									setEditingId(null);
									setFormVisible(false);
								}}
							>
								Cancel
							</button>
						)}
					</div>
				</form>
			</div>

			<div className="products-section">
				<div className="products-header">
					<h2 className="products-title">Your Products</h2>
					<div className="products-count">{products.length}</div>
				</div>

				{loading ? (
					<div className="loading-container">
						<div className="loading-spinner"></div>
						<p>Loading products...</p>
					</div>
				) : products.length === 0 ? (
					<div className="empty-products">
						<p>No products yet. Click "Add Product" to get started.</p>
					</div>
				) : (
					<div className="products-grid">
						{products.map((product) => (
							<div
								key={product._id}
								className="product-card"
							>
								<div className="product-image-container">
									{product.imageUrl ? (
										<img
											className="product-image"
											src={product.imageUrl}
											alt={product.name}
										/>
									) : (
										<div className="placeholder-image">📦</div>
									)}
									<div className="product-price">${product.price}</div>
								</div>
								<div className="product-info">
									<h3 className="product-name">{product.name}</h3>
									<p className="product-description">{product.description}</p>
									<div className="product-actions">
										<button
											className="btn-edit"
											onClick={() => handleEdit(product)}
										>
											Edit
										</button>
										<button
											className="btn-delete"
											onClick={() => handleDelete(product._id)}
										>
											Delete
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
