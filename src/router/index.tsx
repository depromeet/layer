import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {DefaultLayout} from "@/layout/default.tsx";
import {Fragment} from "react";
import App from "@/App.tsx";

const routerChildren = [
    {
        path: '/',
        element: <App/>
    }
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        errorElement: <Fragment/>,
        children: routerChildren,
    }
])
export const Routers = () => {
    return <RouterProvider router={router}/>
}