export interface Bullet {
  id: string;
  month: number; // 1-based month
  amount: number; // extra principal
}

export interface GenerateAmortizationParams {
  principal: number;
  annualRate: number;
  years: number;
  bullets?: Bullet[];
  mode?: "fixed-emi" | "recalc-emi";
}

export interface AmortizationEntry {
  month: number;
  emi: number;
  interestPaid: number;
  principalPaid: number;
  extraPrincipal?: number;
  balance: number;
}
