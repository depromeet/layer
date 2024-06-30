import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "@/App.tsx";
import { DefaultLayout } from "@/layout/default.tsx";

const routerChildren = [
  {
    path: "/",
    element: <App />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <Fragment />,
    children: routerChildren,
  },
]);
export const Routers = () => {
  return <RouterProvider router={router} />;
};
