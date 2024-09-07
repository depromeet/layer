import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";

export function NavigationBar() {
  const location = useLocation();

  const getSelectedIconColor = (path: string): string => (location.pathname === path ? DESIGN_TOKEN_COLOR.gray900 : DESIGN_TOKEN_COLOR.gray400);
  const getSelectedTextColor = (path: string): keyof typeof DESIGN_TOKEN_COLOR => (location.pathname === path ? "gray900" : "gray400");

  return (
    <>
      <nav
        css={css`
          width: 100%;
          max-width: 48rem;
          max-height: var(--nav-bar-height);
          background-color: ${DESIGN_TOKEN_COLOR.gray00};
          border-top: 0.1rem solid rgba(6, 8, 12, 0.04);
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: space-between;
          padding: 0.9rem;

          span,
          svg {
            transition: 0.4s all;
          }
        `}
      >
        <Link
          to={PATHS.home()}
          css={css`
            width: 33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;
            text-decoration: none;
          `}
        >
          <Icon icon="ic_home" size="2.4rem" color={getSelectedIconColor(PATHS.home())} />
          <Typography variant="caption11Medium" color={getSelectedTextColor(PATHS.home())}>
            회고
          </Typography>
        </Link>

        <Link
          to={PATHS.goals()}
          css={css`
            width: 33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;
            text-decoration: none;
          `}
        >
          <Icon icon="ic_chart" size="2.4rem" color={getSelectedIconColor(PATHS.goals())} />
          <Typography variant="caption11Medium" color={getSelectedTextColor(PATHS.goals())}>
            실행 목표
          </Typography>
        </Link>

        <Link
          to={PATHS.analysis()}
          css={css`
            width: 33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;
            text-decoration: none;
          `}
        >
          <Icon icon="ic_barChart" size="2.4rem" color={getSelectedIconColor(PATHS.analysis())} />
          <Typography variant="caption11Medium" color={getSelectedTextColor(PATHS.analysis())}>
            분석
          </Typography>
        </Link>
      </nav>
    </>
  );
}
