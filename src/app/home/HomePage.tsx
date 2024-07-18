import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { ViewSelectTab, GoMakeReviewButton, SpaceOverview } from "@/component/home";
import { DefaultLayout } from "@/layout/DefaultLayout";

type ViewState = {
  viewName: string;
  selected: boolean;
};

export function HomePage() {
  const navigate = useNavigate();

  const [viewState, setViewState] = useState<ViewState[]>([
    { viewName: "전체", selected: true },
    { viewName: "개인", selected: false },
    { viewName: "팀", selected: false },
  ]);
  const selectedView = viewState.find((view) => view.selected)?.viewName;

  const goMakeReview = () => {
    navigate("/review");
  };

  return (
    <DefaultLayout
      theme="gray"
      height="6.4rem"
      LeftComp={
        <Typography as="h1" variant="T4">
          회고
        </Typography>
      }
      RightComp={<Icon icon="basicProfile" size="3.2rem" />}
    >
      <ViewSelectTab viewState={viewState} setViewState={setViewState} />
      <GoMakeReviewButton onClick={goMakeReview} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          gap: 1.2rem;
          margin: 1.4rem 0;
        `}
      >
        {spaces
          .filter((space) => (selectedView === "전체" ? true : space.collaborationType === selectedView))
          .map((space, idx) => (
            <SpaceOverview key={idx} space={space} />
          ))}
      </div>
    </DefaultLayout>
  );
}

//FIXME: API 연결시에 해당 데이터 삭제
type Space = {
  imgUrl: string;
  spaceName: string;
  introduction: string;
  projectCategory: string;
  collaborationType: string;
  headCount: string;
};

const spaces: Space[] = [
  {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s",
    spaceName: "공간 A",
    introduction: "이곳은 협업을 위한 작업 환경인 공간 A입니다.",
    projectCategory: "협업",
    collaborationType: "팀",
    headCount: "10",
  },
  {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s",
    spaceName: "공간 B",
    introduction: "창의적인 사고를 위한 공간 B에 오신 것을 환영합니다.",
    projectCategory: "디자인",
    collaborationType: "개인",
    headCount: "15",
  },
  {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s",
    spaceName: "공간 C",
    introduction: "혁신과 네트워킹의 중심지인 공간 C를 발견하세요.",
    projectCategory: "IT개발",
    collaborationType: "팀",
    headCount: "8",
  },
  {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s",
    spaceName: "공간 D",
    introduction: "혁신과 네트워킹의 중심지인 공간 C를 발견하세요.",
    projectCategory: "IT개발",
    collaborationType: "팀",
    headCount: "8",
  },
  {
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s",
    spaceName: "공간 E",
    introduction: "혁신과 네트워킹의 중심지인 공간 C를 발견하세요.",
    projectCategory: "IT개발",
    collaborationType: "팀",
    headCount: "8",
  },
];
