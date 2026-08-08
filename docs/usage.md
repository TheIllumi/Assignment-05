# End-User Usage Guide

This guide provides operational workflows and step-by-step instructions for managing personal finances using the **Expense Management System**.

---

## 1. Authentication & Demo Mode

### Demo Credentials
On initial startup, the backend automatically seeds a guest demo account:
- **Email**: `guest@example.com`
- **Password**: `guest123`

### Registering a New Account
1. Navigate to `http://localhost:3000/register`.
2. Provide your Full Name, Email, Password, and Preferred Currency.
3. Upon registration, default financial categories and a Cash account are automatically initialized for your account.

---

## 2. Managing Financial Accounts

Navigate to **Accounts** from the navigation sidebar:

- **Create Account**: Click **New Account**, enter the Account Name (e.g. "HBL Checking", "Petty Cash", "Visa Credit Card"), select the Account Type (`BANK`, `CASH`, `CREDIT_CARD`, `MOBILE_WALLET`), specify the currency, and enter initial balance.
- **Real-Time Balances**: Account current balances automatically update when transactions are recorded or cleared.
- **Archiving Accounts**: Archive inactive accounts to hide them from transaction dropdowns while preserving historical transaction logs.

---

## 3. Recording Transactions

Navigate to **Transactions** or click **New Transaction** in the toolbar:

### A. Income & Expense Entry
1. Select transaction type tab (**Expense** or **Income**).
2. Select target Account and Category.
3. Enter Amount, Transaction Date, and optional Description/Merchant.
4. Set status to `CLEARED` (immediately updates account balance) or `PENDING`.
5. Optionally attach receipt files (PNG, JPEG, PDF).

### B. Account Transfers (Double-Leg Atomic Operations)
1. Select the **Transfer** tab.
2. Select **Source Account** ("From Account") and **Destination Account** ("To Account").
3. Enter Transfer Amount and Date.
4. Click **Save**. The system records paired outgoing (`EXPENSE`) and incoming (`INCOME`) transaction legs atomically.

---

## 4. Budget Tracking

Navigate to **Budgets**:

1. Click **New Budget**.
2. Define a Budget Name (e.g. "Monthly Groceries & Dining"), select Period Type (`MONTHLY`, `WEEKLY`, `ANNUAL`), and set start date.
3. Add target categories with limit caps (e.g. "Food & Dining" limit 15,000 PKR).
4. Monitor visual progress bars on the Dashboard to track spending against limits.

---

## 5. Chart of Accounts & General Ledger

Navigate to **Chart of Accounts** or **General Ledger**:

- **Chart of Accounts**: Displays standardized financial accounting hierarchies:
  - `1000` Assets (Bank accounts, Cash)
  - `2000` Liabilities (Credit Cards)
  - `4000` Income
  - `5000` Expenses
- **Net Worth Overview**: Calculates Net Worth ($\text{Assets} - \text{Liabilities}$).

---

## 6. Financial Reports & Exporting

Navigate to **Reports**:

- **CSV Export**: Generate downloadable `.csv` transaction spreadsheets using Apache Commons CSV formatting filtered by custom date ranges.
- **JSON Export**: Export full structured account summaries and transaction history in JSON schema format for backup or external analysis.
