import { formatIndianNumber } from "../../utiles/helper";
import type { AmortizationEntry } from "../AmortizationTabs";

interface Props {
  data: AmortizationEntry[];
}

export default function Summary({ data }: Props) {
  if (!data || data.length === 0) return null;

  const totalInterest = data.reduce((sum, m) => sum + m.interestPaid, 0);
  const totalPrincipal = data.reduce((sum, m) => sum + m.principalPaid, 0);
  const totalPayment = totalInterest + totalPrincipal;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Loan Summary</h2>

      <div className="space-y-2">
        <p>
          <strong>Total Principal Paid:</strong> ₹{formatIndianNumber(totalPrincipal)}.
        </p>
        <p>
          <strong>Total Interest Paid:</strong> ₹{formatIndianNumber(totalInterest)}.
        </p>
        <p>
          <strong>Total Payment:</strong> ₹{formatIndianNumber(totalPayment)}.
        </p>
      </div>
    </div>
  );
}
