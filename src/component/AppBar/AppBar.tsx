import { css } from "@emotion/react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export type AppBarProps = {
  title?: React.ReactNode;
  appBarVisible?: boolean;
  LeftComp?: React.ReactNode;
  RightComp?: React.ReactNode;
};

//FIXME: 색깔 디자인 토큰에 따라 변경
const Back = () => {
  const navigate = useNavigate();

  return (
    <IoChevronBack
      color="#868E96"
      size="20px"
      onClick={() => {
        navigate(-1);
      }}
    />
  );
};

//FIXME : 디자인 토큰에 따라 색깔 변경, 폰트 수정
const AppBar = ({ title, appBarVisible = true, LeftComp = <Back />, RightComp = <div></div> }: AppBarProps) => {
  if (!appBarVisible) {
    return null;
  }

  return (
    <>
      <div
        css={css`
          width: 100%;
          max-width: 48rem;
          height: 4.8rem;
          padding: 0 2rem;
          background-color: transparent;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          box-sizing: border-box;
        `}
      >
        {LeftComp}
        <div
          css={css`
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            font-size: 1.8rem;
          `}
        >
          {title}
        </div>
        {RightComp}
      </div>
      <div
        css={css`
          width: 100%;
          height: 4.8rem;
        `}
      />
    </>
  );
};

export default AppBar;
