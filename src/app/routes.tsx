import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Franchise } from "./pages/Franchise";
import { Career } from "./pages/Career";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "franchise", Component: Franchise },
      { path: "kariyer", Component: Career },
    ],
  },
]);
