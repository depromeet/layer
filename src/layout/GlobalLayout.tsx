import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

export default function GlobalLayout() {
  return (
    <div
      css={css`
        width: 100vw;
        max-width: 48rem;
        min-height: 100dvh;
        box-shadow:
          0 0.1rem 0.3rem 0 rgb(0 0 0 / 0.1),
          0 0.1rem 0.2rem -0.1rem rgb(0 0 0 / 0.1);
        margin: 0 auto;
        padding: 0 2rem;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        background-color: #ffffff;
      `}
    >
      <Outlet />
    </div>
  );
}
