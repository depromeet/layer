import { ButtonProvider, CategoryButton } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { IconType } from "@/component/common/Icon/Icon";
import { Input, InputLabelContainer, TextArea, Label } from "@/component/common/input";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Spacing } from "@/component/common/Spacing";
import { TipCard } from "@/component/common/tip";
import { Typography } from "@/component/common/typography";
import { categoryMap } from "@/component/space/space.const";
import { useInput } from "@/hooks/useInput";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { createSpaceState, spaceState } from "@/store/space/spaceAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { ProjectType } from "@/types/space";
import { css } from "@emotion/react";
import { useAtom, useAtomValue } from "jotai";
import { createContext, Fragment, useContext, useState } from "react";

// 각 단계에서 필요한 상태와 함수를 Context로 관리해요
// 해당 Context는 AddSpacePage 컴포넌트에서 세팅이 이루어져요
const PhaseContext = createContext<{
  phase: number;
  setPhase: (phase: number) => void;
  isLastPhase: boolean;
  isFirstPhase: boolean;
  nextPhase: () => void;
  prevPhase: () => void;
}>({
  phase: 0,
  setPhase: () => {},
  isLastPhase: false,
  isFirstPhase: true,
  nextPhase: () => {},
  prevPhase: () => {},
});

// 1단계 퍼널: 프로젝트 유형 선택
function SelectSpaceTypeFunnel() {
  const { category } = useAtomValue(spaceState);
  const [selectedCategory, setSeletedCategory] = useState(category);
  const { nextPhase } = useContext(PhaseContext);

  const handleButtonClick = (category: ProjectType) => {
    setSeletedCategory(category);
  };

  return (
    <Fragment>
      <Spacing size={3.2} />
      <Header title={`어떤 형태의\n프로젝트를 진행하나요?`} />
      <Spacing size={6.5} />
      <div
        css={css`
          display: flex;
        `}
      >
        <CategoryButton
          category={categoryMap[ProjectType.Individual]}
          onClick={() => handleButtonClick(ProjectType.Individual)}
          isClicked={selectedCategory === ProjectType.Individual}
        />
        <Spacing size={0.8} direction="horizontal" />
        <CategoryButton
          category={categoryMap[ProjectType.Team]}
          onClick={() => handleButtonClick(ProjectType.Team)}
          isClicked={selectedCategory === ProjectType.Team}
        />
      </div>
      <ButtonProvider
        onlyContainerStyle={css`
          padding: 0;
        `}
      >
        <ButtonProvider.Primary disabled={selectedCategory === undefined} onClick={nextPhase}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}

// 2단계 퍼널: 프로젝트 정보 입력
function InputSpaceInfoFunnel() {
  const { nextPhase, prevPhase } = useContext(PhaseContext);
  const [createSpaceInfoAtom, setCreateSpaceInfoAtom] = useAtom(createSpaceState);
  // TODO : @jae1n - 퍼널 이야기 후, atom 관리로 체계 일부 변경 필요
  const { value: title, handleInputChange: handleNameChange } = useInput(createSpaceInfoAtom.title);
  const { value: introduction, handleInputChange: handleDescriptionChange } = useInput(createSpaceInfoAtom.description);
  const { track } = useMixpanel();

  const handleDataSave = () => {
    // FIXME: 무언가 이제는 불필요한 믹스패널 트래커같은데.. 일단 보류
    track("RETROSPECT_CREATE_MAININFO", {
      titleLength: title.length,
      introLength: introduction.length,
    });
    nextPhase();
    setCreateSpaceInfoAtom((prev) => ({ ...prev, title, introduction }));
  };

  return (
    <>
      <Header title={"프로젝트의\n이름은 무엇인가요?"} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 4rem;
          margin-top: 4rem;
        `}
      >
        <InputLabelContainer id="name">
          <Label>프로젝트 이름</Label>
          <Input value={title} onChange={handleNameChange} maxLength={10} count placeholder="프로젝트 이름을 적어주세요" />
        </InputLabelContainer>

        <div>
          <InputLabelContainer id="name">
            <Label>한 줄 설명</Label>
            <TextArea
              value={introduction}
              onChange={handleDescriptionChange}
              maxLength={20}
              count
              placeholder="프로젝트에 대한 한 줄 설명을 적어주세요"
            />
          </InputLabelContainer>
          <TipCard
            message="회고 설명 또는 진행 목표에 대해 적어도 좋아요 :)"
            css={css`
              margin-top: 0.8rem;
            `}
          />
        </div>
      </div>

      <ButtonProvider
        onlyContainerStyle={css`
          padding: 0;
        `}
        sort="horizontal"
      >
        <ButtonProvider.Gray onClick={prevPhase}>이전</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={handleDataSave} disabled={!title}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </>
  );
}

function SelectRetrospectTemplateFunnel() {
  const { prevPhase, nextPhase } = useContext(PhaseContext);
  // TODO: @jae1n - 프로젝트 유형에 따른 텍스트 변경 필요
  const { title } = useAtomValue(createSpaceState);
  const [templateType, setTemplateType] = useState<"recommendation" | "list">("recommendation");

  const TEMPLATE_SELECTION_OPTIONS: Array<{
    id: string;
    icon: IconType;
    iconColor?: string;
    label: string;
    onClick: () => void;
  }> = [
    {
      id: "recommendation",
      icon: "ic_stars",
      label: "추천받기",
      onClick: () => setTemplateType("recommendation"),
    },
    {
      id: "list",
      icon: "ic_list",
      iconColor: DESIGN_TOKEN_COLOR.purple600,
      label: "리스트 보기",
      onClick: () => setTemplateType("list"),
    },
  ];

  return (
    <Fragment>
      <Header title={`${title}에 맞는\n회고 템플릿을 찾아볼까요?`} />
      <Spacing size={4} />
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 1rem;
        `}
      >
        {TEMPLATE_SELECTION_OPTIONS.map(({ id, onClick, icon, iconColor, label }) => (
          <button
            key={id}
            onClick={onClick}
            css={css`
              width: 100%;
              background-color: #f6f8fa;
              border-radius: 1.2rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1.6rem;
              padding: 3.2rem 0;
              transition: all 0.4s;
              border: none;
              cursor: pointer;

              ${templateType === id &&
              css`
                background-color: ${DESIGN_TOKEN_COLOR.blue600};
                span {
                  color: ${DESIGN_TOKEN_COLOR.gray00};
                }
              `}
            `}
          >
            <Icon icon={icon} size={4.8} color={iconColor} />
            <Typography as="span" variant="body16Medium" color="black">
              {label}
            </Typography>
          </button>
        ))}
      </div>

      <ButtonProvider
        onlyContainerStyle={css`
          padding: 0;
        `}
        sort="horizontal"
      >
        <ButtonProvider.Gray onClick={prevPhase}>이전</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={nextPhase} disabled={!templateType}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}

export default function AddSpacePage() {
  const TOTAL_PHASE = 3;
  const [phase, setPhase] = useState(0);

  const isLastPhase = phase === TOTAL_PHASE - 1;
  const isFirstPhase = phase === 0;
  const nextPhase = () => setPhase((prev) => (prev > TOTAL_PHASE - 1 ? prev : prev + 1));
  const prevPhase = () => setPhase((prev) => (prev < 1 ? prev : prev - 1));

  return (
    <PhaseContext.Provider
      value={{
        phase: phase,
        setPhase: (phase: number) => setPhase(phase),
        isLastPhase,
        isFirstPhase,
        nextPhase,
        prevPhase,
      }}
    >
      <section
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        `}
      >
        <ProgressBar curPage={phase + 1} lastPage={TOTAL_PHASE} />
        {
          {
            0: <SelectSpaceTypeFunnel />,
            1: <InputSpaceInfoFunnel />,
            2: <SelectRetrospectTemplateFunnel />,
          }[phase]
        }
      </section>
    </PhaseContext.Provider>
  );
}
