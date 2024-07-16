import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Icon from "@/component/common/Icon/Icon";
import { Typography } from "@/component/common/typography";
import { ViewSelectTab, GoMakeReviewButton } from "@/component/home";
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

  const GoMakeReview = () => {
    navigate("/review");
  };

  return (
    <DefaultLayout
      height="6.4rem"
      LeftComp={
        <Typography as="h1" variant="T4">
          회고
        </Typography>
      }
      RightComp={<Icon icon="basicProfile" size="3.2rem" />}
    >
      <ViewSelectTab viewState={viewState} setViewState={setViewState} />
      <GoMakeReviewButton onClick={GoMakeReview} />
    </DefaultLayout>
  );
}
