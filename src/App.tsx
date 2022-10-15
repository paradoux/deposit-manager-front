import React from "react";
import { Button } from "./components/Button";

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-600">
      <h1 className="text-3xl font-bold underline text-center text-white">
        Hello world!
      </h1>
      <Button className="bg-green-500">hello</Button>
    </div>
  );
}

export default App;
