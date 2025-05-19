const Product = require('../models/Product');

// GET /api/products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// POST /api/products
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

// PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};
