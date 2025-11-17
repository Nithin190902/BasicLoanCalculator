import LoanForm from "./components/LoanForm";
import BulletsList from "./components/BulletsList";
import LoanChart from "./components/LoanChart";
import AmortizationTabs from "./components/AmortizationTabs";
import { useLoanStore } from "./store/useLoanStore";
import { generateAmortization } from "./utiles/generateAmortization";
import { useMemo } from "react";

export default function App() {

  const { principal, annualRate, years, bullets, mode } = useLoanStore();
  const rows = useMemo(() => generateAmortization({ principal, annualRate, years, bullets, mode }), [principal, annualRate, years, bullets, mode]);

  return (
    <div className="container">
      <div className="header">
        <h1>BasicLoanCal — Loan calculator with multiple bullet payments</h1>
      </div>

      <div className="grid">
        <div>
          <LoanForm />
          <div style={{height:12}} />
          <BulletsList />
        </div>

        <div>
          <LoanChart />
          <div style={{height:12}} />
          <AmortizationTabs data={rows} />
        </div>
      </div>
    </div>
  );
}
