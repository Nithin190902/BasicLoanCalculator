import { useState } from "react";
import { useLoanStore } from "../store/useLoanStore";
import CustomField from "../reuseableFiels/CustomField";
import CustomSelect from "../reuseableFiels/CustomSelect";

export default function LoanForm() {
  const { principal, annualRate, years, mode, setPrincipal, setAnnualRate, setYears, setMode, addBullet, clearBullets } = useLoanStore();
  const [bulletMonth, setBulletMonth] = useState<number>(12);
  const [bulletAmount, setBulletAmount] = useState<number>(100000);

  return (
    <div className="card">
      <h3>Loan inputs</h3>
      
      <CustomField label="Loan amount (₹)" value={principal} onChange={setPrincipal} />

      <CustomField label="Annual interest rate (%)" type="number" value={annualRate} step={0.01} onChange={setAnnualRate} />

      <CustomField label="Tenure (years)" type="number" value={years} onChange={setYears} />

      <CustomSelect 
        label="Mode"
        options={[
          { value: "fixed-emi", label: "Fixed EMI (EMI constant)" },
          { value: "recalc-emi", label: "Recalculate EMI after bullets (keep term)" },
        ]}
        value={mode}
        onChange={(v) => setMode(v as "fixed-emi" | "recalc-emi")}
      />

      <hr style={{margin:'12px 0'}} />

      <h4>Add bullet payment</h4>
      <div style={{display:'flex',gap:8, marginBottom:8}}>
        <CustomField label="Month" type="number" min={1} value={bulletMonth} onChange={setBulletMonth} />
        <CustomField label="Amount (₹)" type="number" min={0} value={bulletAmount} onChange={setBulletAmount} />
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
