import type { Request, Response } from "express";

// In-memory store for demo purposes. Replace with a database in a real application.
const products = [
  { id: 1, name: "Laptop", price: 1200, stock: 50 },
  { id: 2, name: "Smartphone", price: 800, stock: 200 },
  { id: 3, name: "Keyboard", price: 100, stock: 150 },
];
let nextProductId = 4;

export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

export const getProductById = (req: Request, res: Response) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const createProduct = (req: Request, res: Response) => {
  const { name, price, stock } = req.body;
  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({ message: "Missing product data" });
  }
  const newProduct = { id: nextProductId++, name, price, stock };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req: Request, res: Response) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    const { name, price, stock } = req.body;
    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index > -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};