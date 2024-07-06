import {css} from "@emotion/react";

interface ProgressBarProps {
    curPage: number,
    lastPage: number,
}

export default function ProgressBar({ curPage, lastPage }: ProgressBarProps) {
    if (curPage > lastPage) curPage = lastPage;
    return (
        // FIXME: 추후 디자인 토큰 연동 후 컬러 값 변경
        <div css={css`
          position: relative;
          width: 100%;
          background-color: #F1F3F5;
          border-radius: 50px;
          height: 4px;
        `}>
            <div css={css`
              position: absolute;
              width: ${100 - (lastPage - curPage) * 10}%;
              background-color: #608DFF;
              height: inherit;
              border-radius: ${lastPage === curPage ? `50px` : `50px 0 0 50px`};
              transition: 0.4s all;
            `}></div>
        </div>
    )
}