# 🏡 Smart Bullet Home Loan Calculator

A transparent home loan EMI calculator that clearly shows **how interest drops after each bullet (lump-sum) payment**, helping users plan smarter prepayments and reduce long-term interest.

## 🔗 Live Demo:

**[Bullet Home Loan Calculator](https://basicloancalculator.vercel.app/)**

## 🚩 Problem Statement

Most home loan calculators show EMI and tenure, but **don’t clearly visualize how interest reduces after bullet (lump-sum) payments**.

This makes it difficult for borrowers to:
- Understand the real impact of prepayments
- Plan bullet payments using bonuses, savings, PF, etc.
- See long-term interest savings clearly

This project fills that gap with **clarity and transparency**.



## 💡 What is a Bullet Payment?

A **bullet (lump-sum) payment** is an extra amount paid directly towards the **principal** during the loan tenure, in addition to regular EMIs.

Since interest is calculated on the **outstanding principal**, every bullet payment:

- Immediately reduces future interest
- Accelerates principal repayment
- Shortens loan tenure or reduces EMI

## ✨ Key Features

- 📊 Month-wise loan amortization
- 💸 Multiple bullet (lump-sum) payments supported
- 🔄 Mode toggle:
  - Constant EMI (reduce tenure)
  - Long-term mode (reduce EMI)
- 📉 Interest drop visualization (chart)
- 🧮 Clear principal vs interest breakdown

## 🧠 Smart Repayment Strategy

A common and effective approach:

1. Start with a longer tenure to keep EMIs comfortable
2. Use bullet payments whenever extra money is available (bonus, savings, PF)
3. Reduce principal aggressively in the early years
4. Save a significant amount in total interest

### Example

A ₹50L home loan at 8.5% for 30 years
→ A ₹5L bullet payment in the early years can:
  - Reduce the loan by 4–6 years
  - Save ₹20L+ in interest

This calculator visualizes this **month by month.**

## 🛠 Tech Stack

**Frontend:** React
**State Management:** Zustand
**Charts:** react-chartjs-2
**Core Logic:** Pure frontend loan simulation
**Rendering:** react-dom
No backend — All calculations happen *entirely on the frontend.*

## 🚀 Future Scope & Contributions
This project is actively open for improvement.
There’s a lot of room to build here, and contributions are welcome 🙌

### Planned / Ideas:

- 🔍 Comparison mode (with vs without bullet payments)
- 📄 Export to PDF / Excel
- 🧾 Tax benefit calculation
- 🏦 Multiple loan comparison
- 🎛 Adjustable EMI scenarios