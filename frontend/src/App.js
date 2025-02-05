import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/").then((response) => {
      setMessage(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Full Stack App with SQLite</h1>
      <p>{message}</p>
    </div>
  );
};

export default App;
