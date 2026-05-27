import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Franchise } from "./pages/Franchise";
import { Career } from "./pages/Career";
import { Contact } from "./pages/Contact";
import { TvPage } from "./pages/TvPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "franchise", Component: Franchise },
      { path: "kariyer", Component: Career },
      { path: "iletisim", Component: Contact },
    ],
  },
  {
    path: "/tv",
    Component: TvPage,
  },
]);