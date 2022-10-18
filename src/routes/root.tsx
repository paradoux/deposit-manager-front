import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

export default function Root() {
  return (
    <>
      <NavBar />
      <main className="h-screen bg-neutral-100 text-red-300">
        <Outlet />
      </main>
    </>
  );
}
