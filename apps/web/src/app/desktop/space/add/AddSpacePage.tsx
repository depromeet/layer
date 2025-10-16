import { ButtonProvider, CategoryButton, FieldButton } from "@/component/common/button";
import { Header } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { IconType } from "@/component/common/Icon/Icon";
import { Input, InputLabelContainer, TextArea, Label } from "@/component/common/input";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Spacing } from "@/component/common/Spacing";
import { TipCard } from "@/component/common/tip";
import { Typography } from "@/component/common/typography";
import { categoryMap } from "@/component/space/space.const";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useInput } from "@/hooks/useInput";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { createSpaceState, spaceState } from "@/store/space/spaceAtom";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { ProjectType } from "@/types/space";
import { css } from "@emotion/react";
import { useAtom, useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { createContext, Fragment, useContext, useEffect, useState } from "react";
import { TemplateList } from "../../component/retrospect/template/list";
import { useToast } from "@/hooks/useToast";
import { PeriodType, PurposeType } from "@/types/retrospectCreate/recommend";
import { periodArr, periodMap, purposeArr, purposeMap } from "@/component/retrospect/template/recommend/recommend.const";

interface phaseContextType {
  phase: number;
  flow: "INFO" | "RECOMMEND" | "SELECTED_LIST";
  period: PeriodType | null;
  periodic: "REGULAR" | "IRREGULAR" | "";
  purpose: PurposeType[];
  setPhase: (phase: number) => void;
  setPurpose: (purpose: PurposeType[] | ((prev: PurposeType[]) => PurposeType[])) => void;
  setPeriod: (period: PeriodType | null) => void;
  setPeriodic: (periodic: "REGULAR" | "IRREGULAR" | "") => void;
  setFlow: (flow: "INFO" | "RECOMMEND" | "SELECTED_LIST", phase?: number) => void;
  isLastPhase: boolean;
  isFirstPhase: boolean;
  nextPhase: () => void;
  prevPhase: () => void;
}

// 각 단계에서 필요한 상태와 함수를 Context로 관리해요
// 해당 Context는 AddSpacePage 컴포넌트에서 세팅이 이루어져요
const PhaseContext = createContext<phaseContextType>({
  phase: 0,
  period: null,
  periodic: "REGULAR",
  purpose: [],
  flow: "INFO",
  isLastPhase: false,
  isFirstPhase: true,
  setPhase: () => {},
  setPurpose: () => {},
  nextPhase: () => {},
  prevPhase: () => {},
  setFlow: () => {},
  setPeriod: () => {},
  setPeriodic: () => {},
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
  const { value: description, handleInputChange: handleDescriptionChange } = useInput(createSpaceInfoAtom.description);
  const { track } = useMixpanel();

  const handleDataSave = () => {
    // FIXME: 무언가 이제는 불필요한 믹스패널 트래커같은데.. 일단 보류
    track("RETROSPECT_CREATE_MAININFO", {
      titleLength: title.length,
      introLength: description.length,
    });
    nextPhase();
    setCreateSpaceInfoAtom((prev) => ({ ...prev, title, description }));
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
              value={description}
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

// 3단계 퍼널: 회고 템플릿 선택
function SelectRetrospectTemplateFunnel() {
  const { openFunnelModal } = useFunnelModal();
  const { prevPhase, nextPhase, setFlow } = useContext(PhaseContext);
  // TODO: @jae1n - 프로젝트 유형에 따른 텍스트 변경 필요
  const { title } = useAtomValue(createSpaceState);
  const [templateType, setTemplateType] = useState<"recommendation" | "list">("recommendation");
  const { toast } = useToast();

  const handleMoveToCreateRetrospect = () => {
    if (templateType === "list") {
      openFunnelModal({
        title: "템플릿 리스트",
        step: "listTemplate",
        contents: <TemplateList />,
      });
    } else if (templateType === "recommendation") {
      nextPhase();
      setFlow("RECOMMEND");
    } else {
      toast.error("템플릿 선택이 올바르지 않아요, 다시 시도해주세요.");
    }
  };

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
        <ButtonProvider.Primary onClick={handleMoveToCreateRetrospect} disabled={!templateType}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}

// 4-1단계 퍼널 : 회고 템플릿 추천
function TemplateRecommendFunnel() {
  const { nextPhase, setFlow, periodic, setPeriodic } = useContext(PhaseContext);

  return (
    <Fragment>
      <Header title={`어떤 패턴으로\n회고를 작성하시나요?`} />
      <Spacing size={4} />
      <div
        css={css`
          display: flex;
        `}
      >
        <CategoryButton
          category={{ name: "주기적 작성", icon_color: "ic_regular_color", icon_white: "ic_regular_white" }}
          onClick={() => setPeriodic("REGULAR")}
          isClicked={periodic === "REGULAR"}
        />
        <Spacing size={0.8} direction="horizontal" />
        <CategoryButton
          category={{ name: "불규칙적 작성", icon_color: "ic_irRegular_color", icon_white: "ic_irRegular_white" }}
          onClick={() => setPeriodic("IRREGULAR")}
          isClicked={periodic === "IRREGULAR"}
        />
      </div>
      <ButtonProvider
        onlyContainerStyle={css`
          padding: 0;
        `}
        sort="horizontal"
      >
        <ButtonProvider.Gray onClick={() => setFlow("INFO", 2)} disabled={periodic === ""}>
          이전
        </ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={nextPhase} disabled={periodic === ""}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}

// 4-2단계 퍼널 : 회고 템플릿 추천 - 주기 선택
function TemplateSelectedPeriodFunnel() {
  const { prevPhase, setPeriod, period, nextPhase } = useContext(PhaseContext);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Header title={`어떤 주기로\n회고를 작성하시나요?`} />
      <Spacing size={4} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        `}
      >
        {periodArr.map((item) => (
          <FieldButton key={item} field={periodMap[item]} onClick={() => setPeriod(item)} isChecked={period === item} />
        ))}
      </div>
      <ButtonProvider
        sort={"horizontal"}
        onlyContainerStyle={css`
          padding: 0;
        `}
      >
        <ButtonProvider.Gray onClick={prevPhase}>이전</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={nextPhase} disabled={period === null}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}

// 4-3단계 퍼널 : 회고 템플릿 추천 - 목적 선택
function SelectedRetrospectPurposeFunnel() {
  const { purpose, setPurpose, prevPhase } = useContext(PhaseContext);
  const { toast } = useToast();

  const handleSelectPurpose = (item: PurposeType) => {
    if (purpose?.includes(item)) {
      setPurpose(purpose?.filter((pre) => pre !== item));
    } else {
      if (purpose?.length! <= 2) {
        setPurpose((pre: PurposeType[]) => [...pre, item]);
      } else {
        toast.error("최대 3개까지 선택 가능해요");
      }
    }
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Header title={`회고를 하는\n목적이 무엇인가요?`} contents="최대 3개까지 선택가능해요" />
      <Spacing size={4} />
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        `}
      >
        {purposeArr.map((item) => (
          <FieldButton key={item} field={purposeMap[item]} onClick={() => handleSelectPurpose(item)} isChecked={purpose?.includes(item)} size={1.8} />
        ))}
      </div>
      <ButtonProvider sort={"horizontal"}>
        <ButtonProvider.Gray onClick={prevPhase}>이전</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={() => {}} disabled={purpose?.length === 0}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}

export default function AddSpacePage() {
  const PHASE_TOTAL_SET = {
    INFO: 3,
    RECOMMEND: 3,
    SELECTED_LIST: 3,
  };
  const [flow, setFlow] = useState<"INFO" | "RECOMMEND" | "SELECTED_LIST">("INFO");
  const [period, setPeriod] = useState<PeriodType | null>(null);
  const [periodic, setPeriodic] = useState<"REGULAR" | "IRREGULAR" | "">("REGULAR");
  const [purpose, setPurpose] = useState<PurposeType[]>([]);
  const TOTAL_PHASE = PHASE_TOTAL_SET[flow];
  const [phase, setPhase] = useState(0);
  const isLastPhase = phase === TOTAL_PHASE - 1;
  const isFirstPhase = phase === 0;
  const nextPhase = () => setPhase((prev) => prev + 1);
  const prevPhase = () => setPhase((prev) => (prev < 1 ? prev : prev - 1));
  const resetCreateSpaceAtom = useResetAtom(createSpaceState);

  useEffect(() => {
    return () => resetCreateSpaceAtom();
  }, []);

  return (
    <PhaseContext.Provider
      value={
        {
          phase: phase,
          flow: flow,
          period,
          periodic,
          purpose,
          setPhase: (phase) => setPhase(phase),
          setPeriod: (period) => setPeriod(period),
          setPeriodic: (periodic) => setPeriodic(periodic),
          setPurpose: (purpose) => setPurpose(purpose),
          isLastPhase,
          isFirstPhase,
          nextPhase,
          prevPhase,
          setFlow: (flow, phase) => {
            setFlow(flow);
            setPhase(phase ?? 0);
          },
        } as phaseContextType
      }
    >
      <section
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        `}
      >
        <ProgressBar
          curPage={phase + 1}
          lastPage={TOTAL_PHASE}
          css={css`
            margin-top: 0rem;
          `}
        />
        {
          {
            INFO: {
              0: <SelectSpaceTypeFunnel />,
              1: <InputSpaceInfoFunnel />,
              2: <SelectRetrospectTemplateFunnel />,
            }[phase],
            SELECTED_LIST: {
              0: <></>,
            }[phase],
            RECOMMEND: {
              0: <TemplateRecommendFunnel />,
              1: <TemplateSelectedPeriodFunnel />,
              2: <SelectedRetrospectPurposeFunnel />,
            }[phase],
          }[flow]
        }
      </section>
    </PhaseContext.Provider>
  );
}
