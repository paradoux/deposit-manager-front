import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import { Home, Create, Vaults, Vault } from "./routes";
import { Web3Provider } from "./context/web3-context";
import { AnimatePresence } from "framer-motion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "vaults",
        element: <Vaults />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "vaults/:vaultId",
        element: <Vault />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Web3Provider>
      <RouterProvider router={router} />
    </Web3Provider>
  </React.StrictMode>
);

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <BrowserRouter>
//     <Route path="/" element={<App />}>
//       <Route path="home" element={<Home />} />
//       <Route path="details" element={<Details />} />
//       <Route path="create" element={<Create />} />
//     </Route>
//   </BrowserRouter>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
