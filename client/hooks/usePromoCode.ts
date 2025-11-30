import { useState, useCallback } from "react";
import { promoCodeStore, DiscountResult } from "@/store/promoCodes";

export function usePromoCode() {
  const [appliedCode, setAppliedCode] = useState<DiscountResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateAndApply = useCallback((code: string, orderAmount: number) => {
    setError(null);

    if (!code.trim()) {
      setError("Please enter a promo code");
      return null;
    }

    const result = promoCodeStore.validateCode(code, orderAmount);

    if (!result) {
      setError("Invalid promo code or code requirements not met");
      return null;
    }

    promoCodeStore.applyCode(code);
    setAppliedCode(result);
    return result;
  }, []);

  const removeCode = useCallback(() => {
    setAppliedCode(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    appliedCode,
    error,
    validateAndApply,
    removeCode,
    clearError,
  };
}
