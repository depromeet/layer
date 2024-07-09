import { css } from "@emotion/react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
type AppBarProps = {
  children?: React.ReactNode;
  visible?: boolean;
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
const AppBar = ({ children, visible = true, LeftComp = <Back />, RightComp = <div></div> }: AppBarProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      css={css`
        width: 100vw;
        max-width: 480px;
        height: 4.8rem;
        background-color: transparent;
        padding: 0 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
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
        {children}
      </div>
      {RightComp}
    </div>
  );
};

export default AppBar;
