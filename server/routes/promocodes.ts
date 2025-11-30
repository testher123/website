import type { Request, Response } from "express";

// In-memory store for demo purposes.
const promoCodes = [
  { code: "SUMMER10", discountPercent: 10 },
  { code: "SAVE20", discountPercent: 20 },
];

export const getPromoCodes = (req: Request, res: Response) => {
  res.json(promoCodes);
};

export const createPromoCode = (req: Request, res: Response) => {
  const { code, discountPercent } = req.body;
  if (!code || discountPercent === undefined) {
    return res.status(400).json({ message: "Missing promo code data" });
  }
  if (promoCodes.find(p => p.code.toUpperCase() === code.toUpperCase())) {
    return res.status(409).json({ message: "Promo code already exists" });
  }

  const newPromoCode = { code: code.toUpperCase(), discountPercent: Number(discountPercent) };
  promoCodes.push(newPromoCode);
  res.status(201).json(newPromoCode);
};

export const deletePromoCode = (req: Request, res: Response) => {
  const codeToDelete = req.params.code.toUpperCase();
  const index = promoCodes.findIndex((p) => p.code === codeToDelete);

  if (index > -1) {
    promoCodes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Promo code not found" });
  }
};