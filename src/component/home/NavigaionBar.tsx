import { css } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { PATHS } from "@/config/paths";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

export function NavigationBar() {
  const location = useLocation();

  const getSelectedColor = (path: string): keyof typeof DESIGN_SYSTEM_COLOR => (location.pathname === path ? "grey900" : "grey400");

  return (
    <>
      <nav
        css={css`
          width: 100%;
          max-width: 48rem;
          height: 8.4rem;
          background-color: ${DESIGN_SYSTEM_COLOR.white};
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: space-between;
          padding: 0.8rem;
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
          <Icon icon="ic_home" size="2.4rem" color={getSelectedColor(PATHS.home())} />
          <Typography variant="caption11Medium" color={getSelectedColor(PATHS.home())}>
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
          <Icon icon="ic_chart" size="2.4rem" color={getSelectedColor(PATHS.goals())} />
          <Typography variant="caption11Medium" color={getSelectedColor(PATHS.goals())}>
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
          <Icon icon="ic_barChart" size="2.4rem" color={getSelectedColor(PATHS.analysis())} />
          <Typography variant="caption11Medium" color={getSelectedColor(PATHS.analysis())}>
            분석
          </Typography>
        </Link>
      </nav>
    </>
  );
}
