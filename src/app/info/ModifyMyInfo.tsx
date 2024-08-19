import { css } from "@emotion/react";
import axios from "axios";
import { useAtom } from "jotai";
import { useRef, useState, useEffect } from "react";

import { Button, ButtonProvider } from "@/component/common/button";
import { Icon } from "@/component/common/Icon";
import { Input, Label } from "@/component/common/input";
import { Spacing } from "@/component/common/Spacing";
import { usePatchUpdateProfile } from "@/hooks/api/user/usePatchUpdateProfile";
import { useInput } from "@/hooks/useInput";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { authAtom } from "@/store/auth/authAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { api } from "@/api";

export function ModifyMyInfo() {
  const [{ name, imageUrl }] = useAtom(authAtom);

  const { value: nickName, handleInputChange: handleChangeNickName } = useInput(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(imageUrl);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (!nickName) {
      setIsButtonEnabled(false);
    } else if (nickName.trim() !== name || selectedImage !== imageUrl) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [nickName, selectedImage, name, imageUrl]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const {
          data: { presignedUrl, imageUrl: imageUrl },
        } = await api.get<{ presignedUrl: string; imageUrl: string }>("/external/image/presigned?domain=SPACE");

        await axios.put(presignedUrl, file, {
          headers: {},
        });

        setSelectedImage(imageUrl);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const { mutate: updateProfile } = usePatchUpdateProfile();

  const handleSubmit = () => {
    updateProfile({ name: nickName.trim(), profileImageUrl: selectedImage || "" });
  };

  return (
    <DefaultLayout title="프로필 수정">
      <Spacing size={3} />
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: center;
        `}
      >
        <div
          css={css`
            position: relative;
            width: 12rem;
            height: 12rem;
            border-radius: 50%;
            background-color: ${selectedImage ? "transparent" : DESIGN_TOKEN_COLOR.gray00};
            background-image: ${selectedImage ? `url(${selectedImage})` : "none"};
            background-size: cover;
            background-position: center;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          `}
          onClick={handleIconClick}
        >
          {!selectedImage && <Icon size={12} icon="ic_choose_picture" />}
          {selectedImage && (
            <Icon
              icon="ic_camera"
              size={3}
              css={css`
                position: absolute;
                bottom: 0.5rem;
                right: 0.5rem;
                background-color: ${DESIGN_TOKEN_COLOR.gray500};
                border-radius: 50%;
                padding: 0.6rem;
                box-shadow: 0 0 0 3px white;
              `}
            />
          )}
        </div>

        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: "none" }} />
      </div>
      <Spacing size={2.8} />
      <Label>이름</Label>
      <Spacing size={0.8} />
      <Input ref={inputRef} onChange={handleChangeNickName} value={nickName} />
      <ButtonProvider>
        <Button onClick={handleSubmit} disabled={!isButtonEnabled}>
          완료
        </Button>
      </ButtonProvider>
    </DefaultLayout>
  );
}
