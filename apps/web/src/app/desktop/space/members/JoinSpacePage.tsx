import { JoinSpace } from "@/component/space/join/JoinSpace";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";
import { css } from "@emotion/react";

export function JoinSpacePage() {
  return (
    <section
      css={css`
        width: 100dvw;
        height: 100dvh;
        background-color: ${DESIGN_SYSTEM_COLOR.blue600};
      `}
    >
      <article
        css={css`
          max-width: 48rem;
          max-height: 68rem;
          width: 100%;
          height: 100%;
          position: absolute;
          border-radius: 2rem;
          overflow: hidden;

          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          main {
            padding-top 4.8rem;
            padding-inline: 3.2rem;
            padding-bottom: 3.2rem;
          }
        `}
      >
        <JoinSpace />
      </article>
    </section>
  );
}
