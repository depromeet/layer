import { JoinSpace } from "@/component/space/join/JoinSpace";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { css } from "@emotion/react";

export function JoinSpacePage() {
  return (
    <section
      css={css`
        width: 100dvw;
        height: 100dvh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${DESIGN_SYSTEM_COLOR.blue600};
      `}
    >
      <article
        css={css`
          max-width: 48rem;
          max-height: 68rem;
          width: 100%;
          height: 100%;
          border-radius: 2rem;
          overflow: hidden;
        `}
      >
        <div
          css={css`
            width: 100%;
            height: 100%;
            background-color: #f2f4f8;
            padding-top: 4.8rem;
            padding-inline: 3.2rem;
            padding-bottom: 0.8rem;
            position: relative;
            display: flex;
            flex-direction: column;
          `}
        >
          <JoinSpace />
        </div>
      </article>
    </section>
  );
}
