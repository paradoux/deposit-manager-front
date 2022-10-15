import { Link, Outlet } from "react-router-dom";

interface NavItemProps {
  route: string;
  label: string;
}

const NavItem = ({ route, label }: NavItemProps) => (
  <li className="mr-2 hover:text-white">
    <Link to={route}>{label}</Link>
  </li>
);

export default function Root() {
  return (
    <>
      <nav className="bg-red-300 flex justify-between py-4">
        <h1>Deposit Manager</h1>
        <ul className="flex justify-between">
          <NavItem route="home" label="Home" />
          <NavItem route="vaults" label="Vaults" />
          <NavItem route="create" label="Create" />
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
