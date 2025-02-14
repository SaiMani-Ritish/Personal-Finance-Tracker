import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import BudgetPlanner from "./components/BudgetPlanner";
import ExpenseRecords from "./components/ExpenseRecords";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/").then((response) => {
      setMessage(response.data);
    });
  }, []);

  return (
    <div>
      <Navbar setActivePage={setActivePage} />
      {activePage === "dashboard" && <Dashboard />}
      {activePage === "budget" && <BudgetPlanner />}
      {activePage === "expenses" && <ExpenseRecords />}
      <p>{message}</p>
    </div>
  );
}

export default App;