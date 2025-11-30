export interface PromoCode {
  id: string;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxUses: number;
  currentUses: number;
  minOrderAmount: number;
  expiryDate: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface DiscountResult {
  code: string;
  discountType: "percentage" | "fixed";
  discountAmount: number;
  originalAmount: number;
  finalAmount: number;
}

const PROMO_CODES_KEY = "promo_codes";

const defaultPromoCodes: PromoCode[] = [
  {
    id: "1",
    code: "WELCOME20",
    description: "20% off on your first order",
    discountType: "percentage",
    discountValue: 20,
    maxUses: 100,
    currentUses: 5,
    minOrderAmount: 10000,
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    code: "SAVE5000",
    description: "₦5,000 off orders over ₦50,000",
    discountType: "fixed",
    discountValue: 5000,
    maxUses: 50,
    currentUses: 12,
    minOrderAmount: 50000,
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    code: "SUMMER15",
    description: "15% off on all items",
    discountType: "percentage",
    discountValue: 15,
    maxUses: 200,
    currentUses: 45,
    minOrderAmount: 20000,
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: "4",
    code: "BULK10",
    description: "10% discount for orders over ₦100,000",
    discountType: "percentage",
    discountValue: 10,
    maxUses: 150,
    currentUses: 23,
    minOrderAmount: 100000,
    expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    isActive: true,
    createdAt: new Date(),
  },
];

export const promoCodeStore = {
  getAllCodes(): PromoCode[] {
    try {
      const data = localStorage.getItem(PROMO_CODES_KEY);
      return data ? JSON.parse(data) : defaultPromoCodes;
    } catch {
      return defaultPromoCodes;
    }
  },

  validateCode(code: string, orderAmount: number): DiscountResult | null {
    const codes = this.getAllCodes();
    const promoCode = codes.find(
      (p) =>
        p.code.toUpperCase() === code.toUpperCase() &&
        p.isActive &&
        new Date(p.expiryDate) > new Date() &&
        p.currentUses < p.maxUses &&
        orderAmount >= p.minOrderAmount
    );

    if (!promoCode) {
      return null;
    }

    let discountAmount = 0;
    if (promoCode.discountType === "percentage") {
      discountAmount = Math.round(orderAmount * (promoCode.discountValue / 100));
    } else {
      discountAmount = promoCode.discountValue;
    }

    // Cap discount to not exceed order amount
    discountAmount = Math.min(discountAmount, orderAmount);

    return {
      code: promoCode.code,
      discountType: promoCode.discountType,
      discountAmount,
      originalAmount: orderAmount,
      finalAmount: orderAmount - discountAmount,
    };
  },

  applyCode(code: string): void {
    const codes = this.getAllCodes();
    const promoCode = codes.find((p) => p.code.toUpperCase() === code.toUpperCase());

    if (promoCode) {
      promoCode.currentUses += 1;
      localStorage.setItem(PROMO_CODES_KEY, JSON.stringify(codes));
    }
  },

  // Backend concept methods (for admin panel)
  createCode(newCode: Omit<PromoCode, "id" | "currentUses" | "createdAt">): PromoCode {
    const codes = this.getAllCodes();
    const code: PromoCode = {
      ...newCode,
      id: Date.now().toString(),
      currentUses: 0,
      createdAt: new Date(),
    };
    codes.push(code);
    localStorage.setItem(PROMO_CODES_KEY, JSON.stringify(codes));
    return code;
  },

  updateCode(id: string, updates: Partial<PromoCode>): PromoCode | null {
    const codes = this.getAllCodes();
    const index = codes.findIndex((p) => p.id === id);

    if (index === -1) return null;

    codes[index] = { ...codes[index], ...updates };
    localStorage.setItem(PROMO_CODES_KEY, JSON.stringify(codes));
    return codes[index];
  },

  deleteCode(id: string): boolean {
    const codes = this.getAllCodes();
    const filtered = codes.filter((p) => p.id !== id);

    if (filtered.length === codes.length) return false;

    localStorage.setItem(PROMO_CODES_KEY, JSON.stringify(filtered));
    return true;
  },

  deactivateCode(id: string): void {
    this.updateCode(id, { isActive: false });
  },

  activateCode(id: string): void {
    this.updateCode(id, { isActive: true });
  },

  resetCodes(): void {
    localStorage.removeItem(PROMO_CODES_KEY);
  },
};
