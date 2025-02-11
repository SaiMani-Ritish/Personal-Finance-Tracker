import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import BudgetPlanner from "./components/BudgetPlanner";
import ExpenseRecords from "./components/ExpenseRecords";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div>
      <Navbar setActivePage={setActivePage} />
      {activePage === "dashboard" && <Dashboard />}
      {activePage === "budget" && <BudgetPlanner />}
      {activePage === "expenses" && <ExpenseRecords />}
    </div>
  );
}

export default App;
// Compare this snippet from frontend/src/index.js: