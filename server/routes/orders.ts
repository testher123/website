import type { Request, Response } from "express";

// In-memory store for demo purposes. Replace with a database.
const orders = [
  {
    id: 1,
    customer: "John Doe",
    items: [{ productId: 1, quantity: 1 }],
    status: "shipped",
  },
  {
    id: 2,
    customer: "Jane Smith",
    items: [
      { productId: 2, quantity: 1 },
      { productId: 3, quantity: 2 },
    ],
    status: "pending",
  },
];
let nextOrderId = 3;

export const getOrders = (req: Request, res: Response) => {
  res.json(orders);
};

export const getOrderById = (req: Request, res: Response) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

export const createOrder = (req: Request, res: Response) => {
  const { customer, items } = req.body;
  if (!customer || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Missing order data" });
  }
  const newOrder = { id: nextOrderId++, customer, items, status: "pending" };
  orders.push(newOrder);
  res.status(201).json(newOrder);
};

export const updateOrderStatus = (req: Request, res: Response) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  const { status } = req.body;
  if (order && status) {
    order.status = status;
    res.json(order);
  } else if (!order) {
    res.status(404).json({ message: "Order not found" });
  } else {
    res.status(400).json({ message: "Status is required" });
  }
};