import {Outlet} from "react-router-dom";

export function DefaultLayout() {
    return (
        <main>
            <Outlet/>
        </main>
    )
}