import LoanForm from "./components/LoanForm";
import BulletsList from "./components/BulletsList";
import LoanChart from "./components/LoanChart";
import AmortizationTable from "./components/AmortizationTable";

export default function App() {
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
          <AmortizationTable />
        </div>
      </div>
    </div>
  );
}
