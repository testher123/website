import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function ProductManagement() {
  const { adminKey } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editingProductData, setEditingProductData] = useState<Partial<Product>>({});

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => setError("Failed to fetch products."));
  }, []);

  const handleNewProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Auth': adminKey! },
        body: JSON.stringify({ name: newProduct.name, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock, 10) }),
      });
      if (!response.ok) throw new Error('Failed to add product. Check your secret key.');
      const addedProduct = await response.json();
      setProducts(prev => [...prev, addedProduct]);
      setNewProduct({ name: "", price: "", stock: "" });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setError(null);
    try {
      const response = await fetch(`/api/products/${productId}`, { method: 'DELETE', headers: { 'X-Admin-Auth': adminKey! } });
      if (!response.ok) throw new Error('Failed to delete product.');
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateProduct = async (productId: number) => {
    setError(null);
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Auth': adminKey! },
        body: JSON.stringify({ name: editingProductData.name, price: parseFloat(editingProductData.price as any), stock: parseInt(editingProductData.stock as any, 10) }),
      });
      if (!response.ok) throw new Error('Failed to update product.');
      const updatedProduct = await response.json();
      setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
      setEditingProductId(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const startEditing = (product: Product) => {
    setEditingProductId(product.id);
    setEditingProductData(product);
  };

  const cancelEditing = () => setEditingProductId(null);

  return (
    <div>
      <h2>Product Management</h2>
      <h3>Add New Product</h3>
      <form onSubmit={handleAddProduct} style={{ marginBottom: '2rem', display: 'flex', gap: '10px' }}>
        <input name="name" value={newProduct.name} onChange={handleNewProductInputChange} placeholder="Name" required />
        <input name="price" value={newProduct.price} onChange={handleNewProductInputChange} placeholder="Price" type="number" step="0.01" required />
        <input name="stock" value={newProduct.stock} onChange={handleNewProductInputChange} placeholder="Stock" type="number" required />
        <button type="submit">Add Product</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Existing Products</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stock</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              {editingProductId === product.id ? (
                <>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}><input name="name" value={editingProductData.name} onChange={handleEditInputChange} /></td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}><input name="price" type="number" step="0.01" value={editingProductData.price} onChange={handleEditInputChange} /></td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}><input name="stock" type="number" value={editingProductData.stock} onChange={handleEditInputChange} /></td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <button onClick={() => handleUpdateProduct(product.id)} style={{ marginRight: '5px' }}>Save</button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>${product.price.toFixed(2)}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.stock}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <button onClick={() => startEditing(product)} style={{ marginRight: '5px' }}>Edit</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}