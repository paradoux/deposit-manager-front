import React from "react";
import { render } from "react-dom";
import { Outlet, Link } from "react-router-dom";

// import your route components tooimport { Button } from "./components/Button";

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-600">
      <h1>Deposit Manager</h1>
      <nav>
        <Link to="/home">Home</Link>|<Link to="/details">Details</Link>|
        <Link to="/create">Create</Link>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
