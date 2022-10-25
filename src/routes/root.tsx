import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../components/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { ParticlesBackground } from "../components/particles-background";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  // type: "tween",
  // ease: "linear",
  duration: 1,
};

export default function Root() {
  const { pathname } = useLocation();
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
