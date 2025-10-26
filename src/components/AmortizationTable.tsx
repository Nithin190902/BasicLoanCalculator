import { useMemo } from "react";
import { useLoanStore } from "../store/useLoanStore";
import { generateAmortization } from "../utiles/generateAmortization";

export default function AmortizationTable() {
  const { principal, annualRate, years, bullets, mode } = useLoanStore();
  const rows = useMemo(() => generateAmortization({ principal, annualRate, years, bullets, mode }), [principal, annualRate, years, bullets, mode]);

  const totInterest = rows.reduce((s, r) => s + r.interestPaid, 0);
  const totPrincipal = rows.reduce((s, r) => s + r.principalPaid + (r.extraPrincipal||0), 0);

  return (
    <div className="card">
      <h4>Amortization schedule</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Month</th>
            <th>EMI</th>
            <th>Interest</th>
            <th>Principal</th>
            <th>Bullet</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.month}>
              <td style={{textAlign:'left'}}>{r.month}</td>
              <td>₹{r.emi}</td>
              <td>₹{r.interestPaid}</td>
              <td>₹{r.principalPaid}</td>
              <td>₹{r.extraPrincipal || 0}</td>
              <td>₹{r.balance}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th style={{textAlign:'left'}}>Total</th>
            <th></th>
            <th>₹{Math.round((totInterest+Number.EPSILON)*100)/100}</th>
            <th>₹{Math.round((totPrincipal+Number.EPSILON)*100)/100}</th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
