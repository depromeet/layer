import { css } from "@emotion/react";
import { Fragment, PropsWithChildren } from "react";

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      {/* FIXME: 헤더 컴포넌트 작업 시, 해당 헤더 엘리먼트 제거 */}
      <header
        css={css`
          height: 4.6rem;
        `}
      />
      <main
        css={css`
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
        `}
      >
        {children}
      </main>
    </Fragment>
  );
}
