import { api } from "@/api";
import { useApiEditSpace } from "@/hooks/api/space/edit/useApiEditSpace";
import { useApiDeleteSpace } from "@/hooks/api/space/useApiDeleteSpace";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { useInput } from "@/hooks/useInput";
import { queryClient } from "@/lib/tanstack-query/queryClient";
import { currentSpaceState } from "@/store/space/spaceAtom";
import { Space } from "@/types/spaceType";
import axios from "axios";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ModifySpaceProps {
  id: string;
}

export default function useModifySpace({ id }: ModifySpaceProps) {
  const { data, isLoading } = useApiGetSpace(id);
  const setterCurrentSpace = useSetAtom(currentSpaceState);
  const navigate = useNavigate();

  const { mutate: editSpace, isPending, isSuccess: isEditSuccess } = useApiEditSpace();
  const { mutate: deleteSpace, isSuccess: isDeleteSuccess } = useApiDeleteSpace();

  const [imgFile, setImgFile] = useState<File | null>(null);
  const { value: name, handleInputChange: handleChangeName, setValue: setName } = useInput();
  const { value: introduction, handleInputChange: handleChangeIntroduction, setValue: setIntroduction } = useInput();

  const initializeSearchQuery = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete("method");
    searchParams.delete("spaceId");
    navigate({ search: searchParams.toString() }, { replace: true });
  };

  const onSubmitEditSpace = async () => {
    try {
      if (imgFile) {
        const { data } = await api.get<{ presignedUrl: string; imageUrl: string }>("/external/image/presigned?domain=SPACE");

        await axios.put(data.presignedUrl, imgFile, {
          headers: {
            "Content-Type": imgFile.type || "image/png",
          },
        });
        editSpace({
          spaceId: id,
          name,
          introduction,
          imgUrl: data.imageUrl,
        });
      } else {
        editSpace({
          spaceId: id,
          name,
          introduction,
          imgUrl: data?.bannerUrl || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setIntroduction(data.introduction || "");
    }
  }, [data]);

  useEffect(() => {
    if (isEditSuccess || isDeleteSuccess) {
      if (isEditSuccess) {
        // 수정이 성공하면 현재 스페이스 전역 스토어 정보를 업데이트
        setterCurrentSpace((prev) => ({ ...prev, ...{ name, introduction } }) as Space);
        // 수정이 성공하면 현재 스페이스 정보를 상세 조회하는 쿼리를 리패치
        queryClient.refetchQueries({
          queryKey: ["getSpace", id],
        });
      }
      // 수정이나 삭제가 성공하면 스페이스 목록과 현재 스페이스 정보를 리패치
      queryClient.refetchQueries({
        queryKey: ["spaces"],
      });
    }
  }, [isEditSuccess, isDeleteSuccess]);

  return {
    data,
    isLoading,
    isPending,
    imgFile,
    setImgFile,
    name,
    handleChangeName,
    introduction,
    handleChangeIntroduction,
    onSubmitEditSpace,
    onSubmitDeleteSpace: deleteSpace,
    initializeSearchQuery,
  };
}
