import {Outlet} from "react-router-dom";
import {css} from "@emotion/react";

export function DefaultLayout() {
    return (
        <main css={css`
          width: 100vw;
          max-width: 480px;
          min-height: 100dvh;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          margin: 0 auto;
          padding: 0 16px;
        `}>
            <Outlet/>
        </main>
    )
}