import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface PromoCode {
  code: string;
  discountPercent: number;
}

export function PromoCodeManagement() {
  const { adminKey } = useAuth();
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newPromo, setNewPromo] = useState({ code: "", discountPercent: "" });

  useEffect(() => {
    if (!adminKey) return;
    fetch("/api/promocodes", { headers: { 'X-Admin-Auth': adminKey } })
      .then(res => {
        if (!res.ok) throw new Error("Could not fetch promo codes.");
        return res.json();
      })
      .then(setPromoCodes)
      .catch(err => setError(err.message));
  }, [adminKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPromo(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/promocodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Auth': adminKey! },
        body: JSON.stringify({ code: newPromo.code, discountPercent: Number(newPromo.discountPercent) }),
      });
      if (!response.ok) throw new Error((await response.json()).message || 'Failed to add promo code.');
      const addedPromo = await response.json();
      setPromoCodes(prev => [...prev, addedPromo]);
      setNewPromo({ code: "", discountPercent: "" });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeletePromo = async (code: string) => {
    if (!window.confirm(`Are you sure you want to delete promo code "${code}"?`)) return;
    setError(null);
    try {
      const response = await fetch(`/api/promocodes/${code}`, { method: 'DELETE', headers: { 'X-Admin-Auth': adminKey! } });
      if (!response.ok) throw new Error('Failed to delete promo code.');
      setPromoCodes(prev => prev.filter(p => p.code !== code));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Promo Code Management</h2>
      <h3>Add New Promo Code</h3>
      <form onSubmit={handleAddPromo} style={{ marginBottom: '2rem', display: 'flex', gap: '10px' }}>
        <input name="code" value={newPromo.code} onChange={handleInputChange} placeholder="Code (e.g., SAVE10)" required />
        <input name="discountPercent" value={newPromo.discountPercent} onChange={handleInputChange} placeholder="Discount %" type="number" required />
        <button type="submit">Add Promo Code</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Existing Promo Codes</h3>
      <ul>
        {promoCodes.map(promo => (
          <li key={promo.code} style={{ marginBottom: '10px' }}>
            <strong>{promo.code}</strong>: {promo.discountPercent}% discount
            <button onClick={() => handleDeletePromo(promo.code)} style={{ marginLeft: '20px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}