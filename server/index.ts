import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { isOwnerAuthenticated } from "./auth";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./routes/products";
import { createOrder, getOrderById, getOrders, updateOrderStatus } from "./routes/orders";
import { createPromoCode, deletePromoCode, getPromoCodes } from "./routes/promocodes";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Product Management Routes
  app.get("/api/products", getProducts); // Publicly viewable
  app.get("/api/products/:id", getProductById); // Publicly viewable
  app.post("/api/products", isOwnerAuthenticated, createProduct);
  app.put("/api/products/:id", isOwnerAuthenticated, updateProduct);
  app.delete("/api/products/:id", isOwnerAuthenticated, deleteProduct);

  // Order and Delivery Management Routes
  app.get("/api/orders", isOwnerAuthenticated, getOrders);
  app.get("/api/orders/:id", isOwnerAuthenticated, getOrderById);
  app.post("/api/orders", isOwnerAuthenticated, createOrder);

  // Example of updating an order's status (for delivery tracking)
  // A PATCH request is often used for partial updates.
  app.patch("/api/orders/:id/status", isOwnerAuthenticated, updateOrderStatus);

  // Promo Code Management Routes
  app.get("/api/promocodes", isOwnerAuthenticated, getPromoCodes);
  app.post("/api/promocodes", isOwnerAuthenticated, createPromoCode);
  app.delete("/api/promocodes/:code", isOwnerAuthenticated, deletePromoCode);

  return app;
}
