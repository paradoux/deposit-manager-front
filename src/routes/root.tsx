import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

export default function Root() {
  return (
    <>
      <NavBar />
      <main className="flex items-center justify-center h-screen bg-slate-600 text-red-300">
        <Outlet />
      </main>
    </>
  );
}
