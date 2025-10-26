import type { GenerateAmortizationParams, AmortizationEntry } from "../types";

export function generateAmortization(params: GenerateAmortizationParams): AmortizationEntry[] {
  const { principal: P0, annualRate, years, bullets = [], mode = "fixed-emi" } = params;
  const r = annualRate / 12 / 100; // monthly rate
  const nTotal = Math.max(1, Math.round(years * 12));
  // combine bullets by month
  const bulletsMap = new Map<number, number>();
  for (const b of bullets) {
    if (!b || b.month < 1) continue;
    bulletsMap.set(b.month, (bulletsMap.get(b.month) || 0) + b.amount);
  }

  const eps = 1e-8;
  function computeEMI(P: number, months: number): number {
    if (months <= 0) return 0;
    if (Math.abs(r) < 1e-12) return P / months;
    const rr = Math.pow(1 + r, months);
    return (P * r * rr) / (rr - 1);
  }

  let month = 0;
  let balance = P0;
  let remainingMonths = nTotal;
  let emi = computeEMI(balance, remainingMonths);

  const rows: AmortizationEntry[] = [];

  while (month < nTotal && balance > eps) {
    month++;
    const interest = balance * r;
    let principalFromEMI = emi - interest;
    // protect for final payment or tiny negative principal
    if (principalFromEMI > balance) principalFromEMI = balance;
    if (principalFromEMI < 0) principalFromEMI = 0;

    let balanceAfterEMI = Math.max(0, balance - principalFromEMI);

    const extra = bulletsMap.get(month) || 0;
    const extraApplied = Math.min(extra, balanceAfterEMI);
    balanceAfterEMI = Math.max(0, balanceAfterEMI - extraApplied);

    rows.push({
      month,
      emi: Math.round((emi + Number.EPSILON) * 100) / 100,
      interestPaid: Math.round((interest + Number.EPSILON) * 100) / 100,
      principalPaid: Math.round((principalFromEMI + Number.EPSILON) * 100) / 100,
      extraPrincipal: extraApplied ? Math.round((extraApplied + Number.EPSILON) * 100) / 100 : 0,
      balance: Math.round((balanceAfterEMI + Number.EPSILON) * 100) / 100
    });

    balance = balanceAfterEMI;
    remainingMonths = nTotal - month;

    if (balance <= eps) break;

    if (mode === "recalc-emi" && (extraApplied > 0 || Math.abs(emi) < eps)) {
      emi = computeEMI(balance, remainingMonths);
    }
  }

  return rows;
}
