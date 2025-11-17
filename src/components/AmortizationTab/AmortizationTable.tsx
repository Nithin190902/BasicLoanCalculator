import { formatIndianNumber } from "../../utiles/helper";
import type { AmortizationEntry } from "../AmortizationTabs";

interface Props {
  data: AmortizationEntry[];
}

export default function AmortizationTable({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <table className="w-full border mt-2 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-2 py-1">Month</th>
          <th className="border px-2 py-1">EMI</th>
          <th className="border px-2 py-1">Principal Paid</th>
          <th className="border px-2 py-1">Interest Paid</th>
          <th className="border px-2 py-1">Balance</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr
            key={row.month}
            className="hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <td className="border px-2 py-1">{row.month}</td>
            <td className="border px-2 py-1">{formatIndianNumber(row.emi)}</td>
            <td className="border px-2 py-1">{formatIndianNumber(row.principalPaid)}</td>
            <td className="border px-2 py-1">{formatIndianNumber(row.interestPaid)}</td>
            <td className="border px-2 py-1">{formatIndianNumber(row.balance)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
