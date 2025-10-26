import { useState } from "react";
import { useLoanStore } from "../store/useLoanStore";

export default function LoanForm() {
  const { principal, annualRate, years, mode, setPrincipal, setAnnualRate, setYears, setMode, addBullet, clearBullets } = useLoanStore();
  const [bulletMonth, setBulletMonth] = useState<number>(12);
  const [bulletAmount, setBulletAmount] = useState<number>(100000);

  return (
    <div className="card">
      <h3>Loan inputs</h3>
      <div className="field">
        <label>Loan amount (₹)</label>
        <input type="number" value={principal} onChange={(e)=> setPrincipal(Number(e.target.value || 0))}/>
      </div>

      <div className="field">
        <label>Annual interest rate (%)</label>
        <input type="number" value={annualRate} step="0.01" onChange={(e)=> setAnnualRate(Number(e.target.value || 0))}/>
      </div>

      <div className="field">
        <label>Tenure (years)</label>
        <input type="number" value={years} onChange={(e)=> setYears(Number(e.target.value || 0))}/>
      </div>

      <div className="field">
        <label>Mode</label>
        <select value={mode} onChange={(e)=> setMode(e.target.value as any)}>
          <option value="fixed-emi">Fixed EMI (EMI constant)</option>
          <option value="recalc-emi">Recalculate EMI after bullets (keep term)</option>
        </select>
      </div>

      <hr style={{margin:'12px 0'}} />

      <h4>Add bullet payment</h4>
      <div style={{display:'flex',gap:8, marginBottom:8}}>
        <input type="number" min={1} value={bulletMonth} onChange={(e)=> setBulletMonth(Number(e.target.value || 1))} />
        <input type="number" min={0} value={bulletAmount} onChange={(e)=> setBulletAmount(Number(e.target.value || 0))} />
      </div>

      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <button className="button" onClick={()=> {
          addBullet(bulletMonth, bulletAmount);
        }}>Add</button>
        <button className="small-btn" onClick={()=> clearBullets()}>Clear bullets</button>
      </div>
    </div>
  );
}
