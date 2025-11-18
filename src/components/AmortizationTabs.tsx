import { useState } from "react";
import AmortizationTable from "./AmortizationTab/AmortizationTable";
import Summary from "./AmortizationTab/Summary";

export interface AmortizationEntry {
  month: number;
  emi: number;
  principalPaid: number;
  extraPrincipal?: number;
  interestPaid: number;
  balance: number;
}

interface Props {
  data: AmortizationEntry[];
}

export default function AmortizationTabs({ data }: Props) {
  const [activeTab, setActiveTab] = useState<"table" | "summary">("table");

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
      {/* --- Tabs Header --- */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "table" ? "border-b-2 border-blue-500 font-semibold" : ""
          }`}
          onClick={() => setActiveTab("table")}
        >
          Amortization Table
        </button>

        <button
          className={`px-4 py-2 ml-4 ${
            activeTab === "summary" ? "border-b-2 border-blue-500 font-semibold" : ""
          }`}
          onClick={() => setActiveTab("summary")}
        >
          Summary
        </button>
      </div>

      {/* --- Tab Content --- */}
      {activeTab === "table" ? (
        <AmortizationTable data={data} />
      ) : (
        <Summary data={data} />
      )}
    </div>
  );
}
