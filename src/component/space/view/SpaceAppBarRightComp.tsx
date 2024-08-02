import { css } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { retrospectDelete } from "@/api/space";
import { Icon } from "@/component/common/Icon";
import { Toast } from "@/component/common/Toast";
import { Typography } from "@/component/common/typography";
import { useToast } from "@/hooks/useToast";
import { Modal } from "@/component/common/Modal";
import { useModal } from "@/hooks/useModal";
import { Spacing } from "@/component/common/Spacing";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable";

type RightCompProps = {
  spaceId: string | undefined;
};

type ErrorResponse = {
  status: number;
  message: string;
};

export function SpaceAppBarRightComp({ spaceId }: RightCompProps) {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { open } = useModal();
  const handleDeleteFun = async () => {
    try {
      if (!spaceId) {
        throw new Error("Space ID is undefined.");
      }
      await retrospectDelete(spaceId);
      navigate("/home/retrospect");
    } catch (err) {
      const error = err as ErrorResponse;
      console.error("삭제 실패:", error.message);

      if (error.status === 400) {
        toast.error(error.message);
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  };

  const handleModifyFun = () => {
    navigate(`/space/modify/${spaceId}`);
  };

  const toggleBoxVisibility = () => {
    setIsBoxVisible((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setIsBoxVisible(false);
    }
  };

  const handleDeleteOpenModal = () => {
    console.log("click");
    setIsBoxVisible(false);
    open({
      title: "",
      content: (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <Typography
            variant="S3"
            style={css`
              text-align: center;
            `}
          >
            스페이스를 삭제하시겠어요?
          </Typography>
          <Spacing size={1.2} />
          <Typography
            variant="B1"
            color="grey500"
            style={css`
              text-align: center;
            `}
          >
            스페이스를 다시 되돌릴 수 없어요.
          </Typography>
          <Spacing size={2} />
          <div
            css={css`
              width: 100%;
              display: flex;
              gap: 0.8rem;
            `}
          >
            <button
              css={css`
                width: 50%;
                height: 4.8rem;
                border-radius: 12px;
                background-color: ${DESIGN_SYSTEM_COLOR.grey300};
              `}
            >
              <Typography variant="S3" color="grey800">
                취소
              </Typography>
            </button>
            <button
              css={css`
                width: 50%;
                height: 4.8rem;
                border-radius: 12px;
                background-color: ${DESIGN_SYSTEM_COLOR.grey800};
              `}
            >
              <Typography variant="S3" color="white">
                삭제
              </Typography>
            </button>
          </div>
        </div>
      ),
      callBack: handleDeleteFun,
    });
  };

  useEffect(() => {
    if (isBoxVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBoxVisible]);

  return (
    <div
      css={css`
        display: flex;
        gap: 2.6rem;
        position: relative;
      `}
    >
      <Icon icon="ic_file" size={2.5} />
      <Icon icon="ic_3point" size={2} onClick={toggleBoxVisibility} />
      {isBoxVisible && (
        <div
          ref={boxRef}
          css={css`
            position: absolute;
            top: 150%;
            right: 0rem;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 1rem;
            box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.1);
            z-index: 99;
            width: 16.5rem;
            height: 9.2rem;
            padding: 0.3rem 2rem;
          `}
        >
          <button
            onClick={handleModifyFun}
            css={css`
              display: block;
              width: 100%;
              padding: 1.3rem 0;
              text-align: left;
            `}
          >
            <Typography variant="B2_SEMIBOLD">스페이스 수정</Typography>
          </button>
          <button
            onClick={handleDeleteOpenModal}
            css={css`
              display: block;
              width: 100%;
              padding: 1.3rem 0;
              text-align: left;
            `}
          >
            <Typography variant="B2_SEMIBOLD" color="red600">
              스페이스 삭제
            </Typography>
          </button>
        </div>
      )}
      <Modal />
      <Toast />
    </div>
  );
}
