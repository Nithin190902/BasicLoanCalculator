import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { useLoanStore } from "../store/useLoanStore";
import { generateAmortization } from "../utiles/generateAmortization";
import { formatIndianNumber } from "../utiles/helper";

Chart.register(...registerables);
Chart.register(annotationPlugin);

export default function LoanChart() {
  const { principal, annualRate, years, bullets, mode } = useLoanStore();

  const rows = useMemo(() => generateAmortization({ principal, annualRate, years, bullets, mode }), [principal, annualRate, years, bullets, mode]);

  const labels = rows?.map(r => `M${r.month}`);
  const balanceData = rows.map(r => r.balance);
  const bulletsPoints = rows.filter(r => r.extraPrincipal && r.extraPrincipal > 0).map(r => ({ x: r.month, y: r.balance, extra: r.extraPrincipal }));

  const annotationObj: any = {};
  bulletsPoints.forEach((p, idx) => {
    annotationObj[`b${idx}`] = {
      type: "line",
      xMin: p.x - 1 + 0.5,
      xMax: p.x - 1 + 0.5,
      borderColor: "rgba(0,0,0,0.15)",
      borderDash: [4, 4],
      label: {
        enabled: true,
        content: `+₹${p.extra}`,
        position: "start",
        backgroundColor: "rgba(255,255,255,0.9)",
        color: "#111",
      }
    };
  });

  const data:any = {
    labels,
    datasets: [
      {
        label: "Balance (₹)",
        data: balanceData,
        tension: 0.2,
        fill: false,
        borderWidth: 2,
        pointRadius: 2,
      },
      {
        label: "Bullets",
        data: bulletsPoints.map(p => ({ x: `M${p.x}`, y: p.y })),
        type: "scatter" as const,
        pointStyle: "triangle",
        pointRadius: 6,
        showLine: false,
      }
    ]
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "nearest", intersect: false },
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const i = ctx.dataIndex;
            const row = rows[i];
            if (!row) return "";
            return [
              `Balance: ₹${formatIndianNumber(row.balance)}`,
              `EMI: ₹${formatIndianNumber(row.emi)}`,
              `Principal: ₹${formatIndianNumber(row.principalPaid)}`,
              `Interest: ₹${formatIndianNumber(row.interestPaid)}`,
              `Bullet: ₹${formatIndianNumber(row.extraPrincipal || 0)}`,
            ];
          },
        },
      },
      legend: { position: "top" },
      annotation: {
        annotations: annotationObj
      }
    },
    scales: {
      x: { title: { display: true, text: "Month" } },
      y: {
        title: { display: true, text: "Amount (₹)" },
        ticks: {
          callback: function(value: any) {
            if (value >= 1e7) return (value / 1e7).toFixed(1) + "Cr"; // Crore
            if (value >= 1e5) return (value / 1e5).toFixed(1) + "L"; // Lakh
            if (value >= 1e3) return (value / 1e3).toFixed(1) + "k"; // Thousand
            return String(value);
          }
        }
      }
    }
  };

  return (
    <div className="card" style={{height:420, padding:12}}>
      <h3>Loan chart</h3>
      <div style={{height:340}}>
        <Line data={data} options={options} />
      </div>
      <div className="legend">
        <div className="item"><div style={{width:10,height:10,background:'#0b5cff',borderRadius:3}}></div> Balance</div>
        <div className="item"><div style={{width:10,height:10,background:'#666',opacity:0.2}}></div> EMI</div>
        <div className="item"><div style={{width:10,height:10,background:'#333',transform:'rotate(45deg)'}}></div> Bullet</div>
      </div>
    </div>
  );
}
