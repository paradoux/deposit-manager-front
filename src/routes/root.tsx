import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

export default function Root() {
  return (
    <>
      <NavBar />
      <main className="flex flex-1 text-red-300">
        <Outlet />
      </main>
    </>
  );
}
