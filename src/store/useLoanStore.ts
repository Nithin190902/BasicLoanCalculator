import {create} from "zustand";
import type { Bullet } from "../types";
import { nanoid } from "nanoid";

type State = {
  principal: number;
  annualRate: number;
  years: number;
  mode: "fixed-emi" | "recalc-emi";
  bullets: Bullet[];
  setPrincipal: (v: number) => void;
  setAnnualRate: (v: number) => void;
  setYears: (v: number) => void;
  setMode: (m: "fixed-emi" | "recalc-emi") => void;
  addBullet: (month: number, amount: number) => void;
  updateBullet: (id: string, month: number, amount: number) => void;
  removeBullet: (id: string) => void;
  clearBullets: () => void;
};

export const useLoanStore = create<State>((set) => ({
  principal: 1000000,
  annualRate: 7.5,
  years: 10,
  mode: "fixed-emi",
  bullets: [],
  setPrincipal: (v) => set({ principal: v }),
  setAnnualRate: (v) => set({ annualRate: v }),
  setYears: (v) => set({ years: v }),
  setMode: (m) => set({ mode: m }),
  addBullet: (month, amount) =>
    set((s) => ({ bullets: [...s.bullets, { id: nanoid(), month, amount }] })),
  updateBullet: (id, month, amount) =>
    set((s) => ({ bullets: s.bullets.map(b => b.id === id ? { ...b, month, amount } : b) })),
  removeBullet: (id) => set((s) => ({ bullets: s.bullets.filter(b => b.id !== id) })),
  clearBullets: () => set({ bullets: [] }),
}));
