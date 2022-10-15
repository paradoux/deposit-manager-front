import React from "react";
import { Button } from "./components/Button";
import NavBar from "./components/navbar";

function App() {
  return (
    <div>
      <NavBar/>
    <div className="flex items-center justify-center h-screen bg-slate-600">
      <h1 className="text-3xl font-bold underline text-center text-white">
        Hello world!
      </h1>
      <Button className="bg-green-500">hello</Button>
    </div>
    </div>
  );
}

export default App;
