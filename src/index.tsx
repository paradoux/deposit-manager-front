import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import { Create, Home, Vault, Vaults } from "./routes";
import Root from "./routes/root";
import { Config, DAppProvider } from "@usedapp/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        path: "vaults/:vaultAddress",
        element: <Vault />,
      },
    ],
  },
]);

const config: Config = {
  // readOnlyChainId: Mainnet.chainId
  // readOnlyUrls: {
  //   [Mainnet.chainId]: getDefaultProvider("mainnet"),
  //   [Goerli.chainId]: getDefaultProvider("goerli")
  // }
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <RouterProvider router={router} />
    </DAppProvider>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);
