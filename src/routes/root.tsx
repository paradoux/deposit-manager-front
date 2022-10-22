import { Outlet } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { ParticlesBackground } from "../components/particles-background";

export default function Root() {
  return (
    <>
      <NavBar />
      <main className="flex flex-1 text-white">
        <ParticlesBackground />

        <Outlet />
      </main>
    </>
  );
}
