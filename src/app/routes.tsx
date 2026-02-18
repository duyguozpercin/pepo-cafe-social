import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Franchise } from "./pages/Franchise";
import { Career } from "./pages/Career";
import { Contact } from "./pages/Contact";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "franchise", Component: Franchise },
      { path: "kariyer", Component: Career },
      { path: "iletisim", Component: Contact },
    ],
  },
]);
