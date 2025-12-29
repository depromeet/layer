import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ButtonProvider, CategoryButton, FieldButton, IconButton } from "@/component/common/button";
import { Header, HeaderProvider } from "@/component/common/header";
import { Icon } from "@/component/common/Icon";
import { IconType } from "@/component/common/Icon/Icon";
import { Input, InputLabelContainer, TextArea, Label } from "@/component/common/input";
import { ProgressBar } from "@/component/common/ProgressBar";
import { Spacing } from "@/component/common/Spacing";
import { TipCard, Tooltip } from "@/component/common/tip";
import { Typography } from "@/component/common/typography";
import { categoryMap } from "@/component/space/space.const";
import { useFunnelModal } from "@/hooks/useFunnelModal";
import { useMixpanel } from "@/lib/provider/mix-pannel-provider";
import { DESIGN_TOKEN_COLOR } from "@/style/designTokens";
import { ProjectType, SpaceValue } from "@/types/space";
import { css } from "@emotion/react";
import { createContext, Dispatch, Fragment, SetStateAction, useContext, useEffect, useState } from "react";
import { TemplateList } from "../../component/retrospect/template/list";
import { useToast } from "@/hooks/useToast";
import { PeriodType, PurposeType } from "@/types/retrospectCreate/recommend";
import { periodArr, periodMap, purposeArr, purposeMap } from "@/component/retrospect/template/recommend/recommend.const";
import { api } from "@/api";
import { RecommendTemplateResponse } from "@/app/mobile/retrospect/template/recommend/RecommendTemplatePage";
import { createTemplateArr } from "@/utils/retrospect/createTemplateArr";
import { TemplateKey } from "@/component/retrospect/template/card/template.const";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { TemplateCard as SwiperTemplateCard } from "@/component/retrospect/template/card/TemplateCard";
import { TemplateCard as SelectedTemplateCard } from "@/app/desktop/component/retrospect/template/card/TemplateCard";
import { useGetCustomTemplate } from "@/hooks/api/template/useGetCustomTemplate";
import { Tag } from "@/component/common/tag";
import { QuestionList } from "@/component/common/list/QuestionList";
import { QuestionListItem } from "@/component/common/list/QuestionListItem";
import QuestionEditButton from "../../component/retrospectCreate/QuestionEditButton";
import { Questions, RetrospectCreateReq } from "@/types/retrospectCreate";
import { RadioButtonGroup } from "@/component/common/radioButton/RadioButtonGroup";
import { useRadioButton } from "@/hooks/useRadioButton";
import { Radio } from "@/component/common/radioButton";
import Lottie from "lottie-react";
import CreateDone from "@/assets/lottie/space/create_done.json";
import { useApiPostSpace } from "@/hooks/api/space/useApiPostSpace";
import { usePostRetrospectCreate } from "@/hooks/api/retrospect/create/usePostRetrospectCreate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetTemplateInfo } from "@/hooks/api/template/useGetTemplateInfo";
import { useApiGetSpace } from "@/hooks/api/space/useApiGetSpace";
import { shareKakaoWeb } from "@/utils/kakao/sharedKakaoLink";
import { useApiGetUser } from "@/hooks/api/auth/useApiGetUser";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { encryptId } from "@/utils/space/cryptoKey";
import useDesktopBasicModal from "@/hooks/useDesktopBasicModal";
import { useAtom } from "jotai";
import { CREATE_RETROSPECT_INIT_ATOM, DEFAULT_QUESTIONS } from "@/store/retrospect/retrospectCreate";
import { CREATE_SPACE_INIT_ATOM } from "@/store/space/spaceAtom";
import { useRetrospectCreateReset } from "@/hooks/store/useRetrospectCreateReset";
import { useSpaceCreateReset } from "@/hooks/store/useSpaceCreateReset";
import { DesktopDateTimeInput } from "../../component/retrospectCreate/DesktopDateTimeInput";
import { queryClient } from "@/lib/tanstack-query/queryClient";
import TemplateListDetailItem from "../../component/retrospect/template/list/TemplateListDetailItem";
import { PATHS } from "@layer/shared";

type flowType = "INFO" | "RECOMMEND" | "RECOMMEND_PROGRESS" | "CREATE" | "COMPLETE";
type templateType = { id: number; title: string; imageUrl: string; templateName: string };
// TODO: 추후 Context API와 Atom의 불필요한 혼용 제거하기
interface phaseContextType {
  // getter
  phase: number;
  flow: flowType;
  title: string;
  spaceId: number | null;
  description: string;
  questions: Questions;
  deadLine: string;
  period: PeriodType | null;
  periodic: "REGULAR" | "IRREGULAR" | null;
  purpose: PurposeType[];
  selectedRecommendTemplate: templateType | null;
  selectedRecommendTemplateId: number | null;
  recommendTemplateType: "recommendation" | "list" | null;
  recommendTemplateList: Omit<templateType, "id">[];
  selectedCategory: ProjectType;

  // setter functions
  setPhase: Dispatch<SetStateAction<number>>;
  setPurpose: Dispatch<SetStateAction<PurposeType[]>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setDescription: Dispatch<SetStateAction<string>>;
  setQuestions: Dispatch<SetStateAction<Questions>>;
  setDeadLine: Dispatch<SetStateAction<string>>;
  setSpaceId: Dispatch<SetStateAction<number | null>>;
  setPeriod: Dispatch<SetStateAction<PeriodType | null>>;
  setPeriodic: Dispatch<SetStateAction<"REGULAR" | "IRREGULAR" | "">>;
  setSelectedRecommendTemplate: Dispatch<SetStateAction<templateType | null>>;
  setSelectedRecommendTemplateId: Dispatch<SetStateAction<number | null>>;
  setRecommendTemplateType: Dispatch<SetStateAction<"recommendation" | "list" | null>>;
  setRecommendTemplateList: Dispatch<SetStateAction<Omit<templateType, "id">[]>>;
  setSelectedCategory: Dispatch<SetStateAction<ProjectType>>;

  // phase functions
  setFlow: (flow: flowType, phase?: number) => void;
  isLastPhase: boolean;
  isFirstPhase: boolean;
  nextPhase: () => void;
  prevPhase: () => void;
}

// 각 단계에서 필요한 상태와 함수를 Context로 관리해요
// 해당 Context는 AddSpacePage 컴포넌트에서 세팅이 이루어져요
const PhaseContext = createContext<phaseContextType>({
  // getter
  phase: 0,
  period: null,
  title: "",
  description: "",
  questions: [],
  periodic: null,
  purpose: [],
  flow: "INFO",
  deadLine: "",
  spaceId: null,
  isLastPhase: false,
  isFirstPhase: true,
  selectedRecommendTemplate: null,
  selectedRecommendTemplateId: null,
  recommendTemplateList: [],
  recommendTemplateType: null,
  selectedCategory: ProjectType.Individual,
  // setter
  setPhase: () => {},
  setPeriod: () => {},
  setTitle: () => {},
  setDescription: () => {},
  setQuestions: () => {},
  setDeadLine: () => {},
  setPeriodic: () => {},
  setPurpose: () => {},
  setSpaceId: () => {},
  setSelectedRecommendTemplate: () => {},
  setSelectedRecommendTemplateId: () => {},
  setRecommendTemplateType: () => {},
  setRecommendTemplateList: () => {},
  setSelectedCategory: () => {},
  // phase functions
  setFlow: () => {},
  nextPhase: () => {},
  prevPhase: () => {},
});

// 1단계 퍼널: 프로젝트 유형 선택
function SelectSpaceTypeFunnel() {
  const { nextPhase, selectedCategory, setSelectedCategory } = useContext(PhaseContext);

  const handleButtonClick = (category: ProjectType) => {
    setSelectedCategory(category);
  };

  const isSelected = selectedCategory !== null;

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
        disabled={!isSelected}
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
  const { nextPhase, prevPhase, title, description, setTitle, setDescription } = useContext(PhaseContext);
  // TODO : @jae1n - 퍼널 이야기 후, atom 관리로 체계 일부 변경 필요
  const { track } = useMixpanel();

  const handleDataSave = () => {
    // FIXME: 무언가 이제는 불필요한 믹스패널 트래커같은데.. 일단 보류
    track("RETROSPECT_CREATE_MAININFO", {
      titleLength: title.length,
      introLength: description.length,
    });
    nextPhase();
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
          <Input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={10} count placeholder="프로젝트 이름을 적어주세요" />
        </InputLabelContainer>

        <div>
          <InputLabelContainer id="name">
            <Label>한 줄 설명</Label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
  const { prevPhase, nextPhase, setFlow, title, recommendTemplateType, setSelectedRecommendTemplateId, setRecommendTemplateType } =
    useContext(PhaseContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const isSelected = recommendTemplateType !== null;

  const { toast } = useToast();

  const handleMoveToCreateRetrospect = () => {
    if (recommendTemplateType === "list") {
      // 다른 퍼널로 이동하기 위해 URL에 타입을 명시해요
      setSearchParams({ template_type: "new_space" });
      openFunnelModal({
        title: "템플릿 리스트",
        step: "listTemplate",
        contents: <TemplateList />,
        overlayIndex: 10002,
      });
    } else if (recommendTemplateType === "recommendation") {
      nextPhase();
      setFlow("RECOMMEND", 0);
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
      label: "추천 받기",
      onClick: () => setRecommendTemplateType("recommendation"),
    },
    {
      id: "list",
      icon: "ic_list",
      iconColor: DESIGN_TOKEN_COLOR.purple600,
      label: "리스트 보기",
      onClick: () => setRecommendTemplateType("list"),
    },
  ];

  useEffect(() => {
    const selectedTemplateId = searchParams.get("selected_template_id");

    if (selectedTemplateId) {
      setSelectedRecommendTemplateId(Number(selectedTemplateId));
      setSearchParams({});
      setFlow("CREATE", 0);
    }
  }, [searchParams]);

  useEffect(() => {
    // 컴포넌트 언마운트 시점에 쿼리 스트링을 정리
    return () => setSearchParams({});
  }, []);

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

              ${recommendTemplateType === id &&
              css`
                background-color: ${DESIGN_TOKEN_COLOR.blue600};
                span {
                  color: ${DESIGN_TOKEN_COLOR.gray00};
                }
                // 추천 받기 아이콘의 활성화 색상을 정의해요
                svg#star-icon {
                  path:nth-of-type(1) {
                    fill: #e9f0ff;
                  }
                  path:nth-of-type(2) {
                    fill: #fff;
                  }
                  path:nth-of-type(3) {
                    fill: #c4d7fd;
                  }
                }
                // 리스트 보기 아이콘의 활성화 색상을 정의해요
                svg#list-icon {
                  path {
                    fill: #e2ebfe;
                  }
                }
              `}
            `}
          >
            <Icon icon={icon} size={3.4} color={iconColor} />
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
        <ButtonProvider.Primary disabled={!isSelected} onClick={handleMoveToCreateRetrospect}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}

// 4-1-a단계 퍼널 : 회고 템플릿 추천
function TemplateRecommendFunnel() {
  const { nextPhase, setFlow, periodic, setPeriodic } = useContext(PhaseContext);
  const isSelected = periodic !== null;

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
        <ButtonProvider.Gray onClick={() => setFlow("INFO", 2)}>이전</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={nextPhase} disabled={!isSelected}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </Fragment>
  );
}

// 4-2-a단계 퍼널 : 회고 템플릿 추천 - 주기 선택
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

// 4-3-a단계 퍼널 : 회고 템플릿 추천 - 목적 선택
function SelectedRetrospectPurposeFunnel() {
  const {
    purpose,
    setPurpose,
    setSelectedRecommendTemplate,
    setRecommendTemplateList,
    setSelectedRecommendTemplateId,
    prevPhase,
    setFlow,
    period,
    periodic,
  } = useContext(PhaseContext);
  const { toast } = useToast();
  const [loader, setLoader] = useState(false);

  const { track } = useMixpanel();

  const handleNextPhase = async () => {
    setLoader(true);
    try {
      const { data } = await api.get<RecommendTemplateResponse>("/form/recommend", {
        params: {
          periodic,
          period,
          purpose: purpose.join(","),
        },
      });
      const templateArray = createTemplateArr(data.formId as unknown as TemplateKey);
      setRecommendTemplateList(templateArray);
      setSelectedRecommendTemplateId(data.formId);
      setSelectedRecommendTemplate({
        id: data.formId,
        title: data.formName,
        imageUrl: data.formImageUrl,
        templateName: data.tag,
      });
      track("TEMPLATE_RECOMMEND", {
        formId: data.formId,
        formName: data.formName,
        tag: data.tag,
      });
    } catch (error) {
      // 템플릿 추천에 실패를 하게 된다면 이전 단계로 돌아가요
      toast.error("템플릿 추천에 실패했어요, 다시 시도해주세요");
    } finally {
      setLoader(false);
      setFlow("RECOMMEND_PROGRESS", 0);
    }
  };

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
      <ButtonProvider
        sort={"horizontal"}
        onlyContainerStyle={css`
          padding: 0;
        `}
      >
        <ButtonProvider.Gray onClick={prevPhase}>이전</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={handleNextPhase} disabled={purpose?.length === 0} isProgress={loader}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}

// 5-1 단계 퍼널 : 회고 템플릿 추천 - 템플릿 선택
function TemplateSelectedRetrospectFunnel() {
  const { recommendTemplateList, title, nextPhase } = useContext(PhaseContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const targetSlideIndex = 4; // 멈추고 싶은 n번째 슬라이드 인덱스 (0부터 시작)

  const getSlideClassName = (index: number): string => {
    if (isAnimating && index === targetSlideIndex - 1) return "slide-content left";
    if (isAnimating && index === targetSlideIndex) return "slide-content animate";
    return "";
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Header title={`${title} 스페이스에 어울리는\n회고 템플릿을 찾았어요!`} />
      <Spacing size={10} />
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={16}
        initialSlide={1}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        allowTouchMove={false}
        modules={[Autoplay]}
        onSlideChange={(swiper) => {
          if (swiper.activeIndex === targetSlideIndex) {
            swiper.autoplay.stop();
            setIsAnimating(true);
            setTimeout(() => {
              nextPhase();
            }, 2500);
          }
        }}
        onInit={(swiper) => {
          swiper.autoplay.start();
        }}
        className="card-carousel"
      >
        {recommendTemplateList.map((template, index) => (
          <SwiperSlide key={index} className={getSlideClassName(index)}>
            <SwiperTemplateCard
              name={template.templateName}
              tag={template.title}
              imgUrl={template.imageUrl}
              scale={0.8}
              size="small"
              readOnly={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
// 5-2 단계 퍼널 : 템플릿 추천 완료 및 질문 선정 전 확정 단계
function RecommendRetrospectTemplateConfirmFunnel() {
  const { selectedRecommendTemplate, setFlow } = useContext(PhaseContext);
  const { openFunnelModal, closeFunnelModal } = useFunnelModal();

  // TODO: 추후에 퍼널에 종속되지 않는 템플릿 조회 페이지로 개발하기
  const handleShowTemplateDetailInfo = () => {
    const { title, id, templateName } = selectedRecommendTemplate!;
    openFunnelModal({
      title,
      step: "listTemplateDetail",
      contents: <TemplateListDetailItem templateId={id} />,
      templateTag: templateName,
      overlayIndex: 100002,
      onPrevious: closeFunnelModal,
    });
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Header title={"추천받은 템플릿 질문들로\n회고를 진행할까요?"} contents="템플릿을 기반으로 질문을 커스텀 할 수 있어요" />
      <Spacing size={10} />
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <Tooltip>
          <Tooltip.Trigger>
            <SelectedTemplateCard
              name={selectedRecommendTemplate!.templateName}
              tag={selectedRecommendTemplate!.title}
              imgUrl={selectedRecommendTemplate!.imageUrl}
              onClick={handleShowTemplateDetailInfo}
            />
          </Tooltip.Trigger>
          <Tooltip.Content message="자세히 알고싶다면 카드를 클릭해보세요!" placement="top-start" offsetY={15} hideOnClick={false} autoHide={false} />
        </Tooltip>
      </div>
      <ButtonProvider
        sort={"horizontal"}
        onlyContainerStyle={css`
          padding: 0;
        `}
      >
        <ButtonProvider.Gray onClick={() => setFlow("INFO", 2)}>템플릿 변경</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={() => setFlow("CREATE", 0)}>진행하기</ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}

// 6-1 단계 퍼널 : 회고 질문 생성 단계
function CreateRetrospectQuestionFunnel() {
  const { selectedRecommendTemplateId, setSelectedRecommendTemplate, setFlow, nextPhase, questions, setQuestions } = useContext(PhaseContext);
  const { data: customTemplateInfo, isSuccess: isSuccessGetCustomTemplateInfo } = useGetCustomTemplate(selectedRecommendTemplateId!);
  const { open: openDesktopModal } = useDesktopBasicModal();
  const { data: defaultTemplateInfo, isSuccess: isSuccessGetTemplateInfo } = useGetTemplateInfo({ templateId: selectedRecommendTemplateId! });
  const { resetAll: resetRetrospectInfo } = useRetrospectCreateReset();
  const { resetAll: resetSpaceInfo } = useSpaceCreateReset();

  const isEmptyQuestions = questions.length === 0;

  useEffect(() => {
    if (isSuccessGetTemplateInfo) {
      setSelectedRecommendTemplate({
        id: selectedRecommendTemplateId!,
        title: defaultTemplateInfo?.title || `${customTemplateInfo.title} 스페이스의 회고`,
        imageUrl: defaultTemplateInfo?.templateImageUrl || "",
        templateName: defaultTemplateInfo?.title || `${customTemplateInfo.title} 스페이스의 회고`,
      });
    }
  }, [isSuccessGetTemplateInfo]);

  useEffect(() => {
    if (isSuccessGetCustomTemplateInfo && isEmptyQuestions) {
      setQuestions(customTemplateInfo.questions);
    }
  }, [isSuccessGetCustomTemplateInfo]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Header title={`추천받은 템플릿으로 회고를 진행할까요?`} contents="템플릿을 기반으로 질문을 커스텀할 수 있어요" />
      <Spacing size={4} />
      <div
        css={css`
          position: relative;
          display: flex;
          flex-direction: column;
          border: 1px solid #dfe3ea;
          border-radius: 1.2rem;
          padding: 2rem;
          overflow-y: auto;
        `}
      >
        <Typography
          variant={"S1"}
          css={css`
            padding-right: 13rem;
          `}
        >
          {customTemplateInfo.title}
        </Typography>
        <Tag styles="margin-top: 0.8rem">{customTemplateInfo.tag}</Tag>
        <Spacing size={3} />
        <div
          css={css`
            overflow-y: auto;
            margin-bottom: -2rem;
            padding: 1.2rem 0;
            padding-bottom: 2rem;
          `}
        >
          <QuestionList>
            {questions.map(({ questionContent }, index) => (
              <QuestionListItem key={index} order={index + 1} content={questionContent} />
            ))}
          </QuestionList>
        </div>
        <QuestionEditButton
          onClose={() => {
            openDesktopModal({
              title: "",
              contents: <AddSpacePage />,
              options: {
                enableFooter: false,
                needsBackButton: false,
              },
              onClose: () => {
                resetRetrospectInfo();
                resetSpaceInfo();
              },
            });
          }}
        />
      </div>
      <Spacing size={4} />
      <ButtonProvider
        sort={"horizontal"}
        onlyContainerStyle={css`
          padding: 0;
        `}
      >
        <ButtonProvider.Gray onClick={() => setFlow("INFO", 2)}>이전</ButtonProvider.Gray>
        <ButtonProvider.Primary onClick={nextPhase}>진행하기</ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}

// 6-2 단계 퍼널 : 회고 확정 단계 - 마감일 지정
function CreateRetrospectDeadlineFunnel() {
  const { questions, selectedRecommendTemplate, setSpaceId, deadLine, setDeadLine, title, description, selectedCategory, setFlow } =
    useContext(PhaseContext);
  const { selectedValue, isChecked, onChange } = useRadioButton();
  const { toast } = useToast();
  const { mutateAsync: postSpace } = useApiPostSpace();
  const { mutateAsync: postRetrospect, isSuccess: isSuccessCreateRetrospect } = usePostRetrospectCreate();
  const [loader, setLoader] = useState(false);

  const handleChangeRadioType = (type: string) => {
    // 여기서 type 값은 has-duedate-neg(마감일 미지정) 또는 has-duedate-pos(마감일 지정) 값으로 반환되어요
    if (type === "has-duedate-pos") {
      setDeadLine("");
    }
    onChange?.(type);
  };

  const create = async () => {
    const createSpace = async () => {
      const params = {
        name: title,
        introduction: description,
        category: selectedCategory,
        imgUrl: null,
      } as SpaceValue;
      const res = await postSpace(params);
      return res;
    };

    const createRetrospect = async (spaceId: number) => {
      const params = {
        title: `${title}의 첫 번째 회고`,
        introduction: "",
        questions: [...DEFAULT_QUESTIONS, ...questions],
        deadline: deadLine,
        isNewForm: false,
        hasChangedOriginal: false,
        curFormId: selectedRecommendTemplate!.id,
      } as RetrospectCreateReq;
      const res = await postRetrospect(
        { spaceId, body: params },
        {
          onSuccess: () => {
            toast.success("스페이스와 회고가 생성되었어요!");
            setFlow("COMPLETE", 0);
          },
        },
      );
      return res;
    };

    // 스페이스 생성 후, 리턴되는 스페이스 아이디를 통해 회고를 이어서 생성해요
    setLoader(true);
    const { spaceId } = await createSpace();
    setSpaceId(spaceId);
    await createRetrospect(spaceId);
    setLoader(false);
  };

  useEffect(() => {
    if (isSuccessCreateRetrospect) {
      // 스페이스 생성이 완료되면 스페이스 목록을 리패치
      queryClient.invalidateQueries({
        queryKey: ["spaces"],
      });
    }
  }, [isSuccessCreateRetrospect]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Header title={"회고는\n언제까지 작성할까요?"} />
      <Spacing size={4} />
      <RadioButtonGroup
        radioName="has-duedate"
        onChange={handleChangeRadioType}
        isChecked={isChecked}
        direction={"column"}
        styles={css`
          margin-bottom: 1.2rem;
        `}
      >
        <Radio value={"has-duedate-neg"} rounded="lg" size="lg">
          마감일 미지정
        </Radio>
        <Radio value={"has-duedate-pos"} rounded="lg" size="lg">
          마감일 지정
        </Radio>
      </RadioButtonGroup>
      <div
        css={css`
          position: relative;
        `}
      >
        {selectedValue === "has-duedate-pos" && (
          <DesktopDateTimeInput
            onValueChange={(value) => {
              value && setDeadLine(value);
            }}
          />
        )}
      </div>
      <ButtonProvider
        onlyContainerStyle={{
          padding: 0,
        }}
        sort={"horizontal"}
      >
        <ButtonProvider.Gray onClick={() => setFlow("CREATE", 0)}>이전</ButtonProvider.Gray>
        <ButtonProvider.Primary
          isProgress={loader}
          onClick={create}
          disabled={(selectedValue === "has-duedate-pos" && !deadLine) || !selectedValue}
          type="submit"
        >
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}

// 최종단계 퍼널 : 스페이스 생성 완료 단계
function CompleteCreateSpace() {
  const { spaceId } = useContext(PhaseContext);
  const { toast } = useToast();
  const { data: userData } = useApiGetUser();
  const { close: closeModalDesktop } = useDesktopBasicModal();
  const { data: spaceData, isLoading } = useApiGetSpace(spaceId!.toString());
  const { resetAll: resetRetrospectInfo } = useRetrospectCreateReset();
  const { resetAll: resetSpaceInfo } = useSpaceCreateReset();
  const isCreatedIndividualSpace = spaceData?.category === ProjectType.Individual;
  const isCreatedTeamSpace = spaceData?.category === ProjectType.Team;
  const [animate, setAnimate] = useState(isCreatedIndividualSpace);
  const encryptedId = encryptId(spaceId!.toString());
  const navigate = useNavigate();

  const handleShareKakao = async () => {
    shareKakaoWeb(
      `${window.location.protocol}//${window.location.host}/space/join/${encryptedId}`,
      `${userData.name}님의 회고 초대장`,
      `함께 회고해요! ${userData.name}님이 ${spaceData?.name} 스페이스에 초대했어요`,
    );
  };

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/space/join/${encryptedId}`);
      toast.success("링크 복사가 완료되었어요!");
    } catch (e) {
      alert("링크 복사에 실패했어요!");
    }
  };

  const handleComplete = () => {
    navigate(PATHS.spaceDetail(spaceId!.toString()));
    closeModalDesktop();
    resetRetrospectInfo();
    resetSpaceInfo();
  };

  useEffect(() => {
    if (spaceData && isCreatedTeamSpace) {
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [spaceData]);

  if (isLoading) return <LoadingModal />;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <HeaderProvider>
        <HeaderProvider.Description contents="스페이스 생성 완료!" />
        <HeaderProvider.Subject
          contents={isCreatedTeamSpace ? "함께 회고를 진행하는\n팀원들을 초대해볼까요?" : "회고 공간이 준비됐어요.\n나만의 성장을 시작해볼까요?"}
        />
      </HeaderProvider>
      <Spacing size={isCreatedTeamSpace ? 4 : 7} />
      <div
        css={css`
          position: relative;
          text-align: center;
          height: 18.6rem;
        `}
      >
        <Lottie
          animationData={CreateDone}
          loop={false}
          css={css`
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
            transition: all 0.5s ease;
            height: auto;
            margin-bottom: 4rem;
            width: ${animate ? "18rem" : "24rem"};
          `}
        />
      </div>
      {spaceData!.category === ProjectType.Team && (
        <Fragment>
          <IconButton
            onClick={handleShareKakao}
            icon="ic_kakao"
            css={css`
              background-color: #ffe400;
              color: #000000;
              opacity: ${animate ? 1 : 0};
              transition: all 0.5s ease;
              transition-delay: 0.5s;
              pointer-events: ${animate ? "default" : "none"};
            `}
          >
            카카오톡 전달
          </IconButton>
          <Spacing size={0.8} />
          <IconButton
            onClick={handleCopyClipBoard}
            icon="ic_copy"
            css={css`
              background-color: #f1f3f5;
              color: #000000;
              opacity: ${animate ? 1 : 0};
              transition: all 0.5s ease;
              transition-delay: 0.5s;
              pointer-events: ${animate ? "default" : "none"};
            `}
          >
            초대링크 복사
          </IconButton>
        </Fragment>
      )}
      <ButtonProvider>
        <ButtonProvider.Primary onClick={handleComplete} disabled={spaceData!.category === ProjectType.Individual ? false : !animate}>
          다음
        </ButtonProvider.Primary>
      </ButtonProvider>
    </div>
  );
}

// 전체 퍼널의 흐름을 관리해요
export default function AddSpacePage() {
  const [flow, setFlow] = useAtom(CREATE_SPACE_INIT_ATOM.flow);
  const [period, setPeriod] = useAtom(CREATE_SPACE_INIT_ATOM.period);
  const [periodic, setPeriodic] = useAtom(CREATE_SPACE_INIT_ATOM.periodic);
  const [purpose, setPurpose] = useAtom(CREATE_RETROSPECT_INIT_ATOM.purpose);
  const [phase, setPhase] = useAtom(CREATE_SPACE_INIT_ATOM.phase);
  const [title, setTitle] = useAtom(CREATE_SPACE_INIT_ATOM.title);
  const [description, setDescription] = useAtom(CREATE_SPACE_INIT_ATOM.description);
  const [selectedCategory, setSelectedCategory] = useAtom(CREATE_SPACE_INIT_ATOM.category);
  const [recommendTemplateType, setRecommendTemplateType] = useAtom(CREATE_SPACE_INIT_ATOM.recommendTemplateType);

  const [deadLine, setDeadLine] = useAtom(CREATE_RETROSPECT_INIT_ATOM.deadline);
  const [selectedRecommendTemplateId, setSelectedRecommendTemplateId] = useAtom(CREATE_RETROSPECT_INIT_ATOM.curFormId);
  const [questions, setQuestions] = useAtom(CREATE_RETROSPECT_INIT_ATOM.questions);
  const [spaceId, setSpaceId] = useState<number | null>(null);
  const [selectedRecommendTemplate, setSelectedRecommendTemplate] = useState<{
    id: number;
    title: string;
    imageUrl: string;
    templateName: string;
  } | null>(null);
  const [recommendTemplateList, setRecommendTemplateList] = useState<
    {
      title: string;
      templateName: string;
      imageUrl: string;
    }[]
  >([]);

  const FLOW_COMPONENTS = {
    INFO: {
      0: SelectSpaceTypeFunnel,
      1: InputSpaceInfoFunnel,
      2: SelectRetrospectTemplateFunnel,
    },
    RECOMMEND: {
      0: TemplateRecommendFunnel,
      1: TemplateSelectedPeriodFunnel,
      2: SelectedRetrospectPurposeFunnel,
    },
    RECOMMEND_PROGRESS: {
      0: TemplateSelectedRetrospectFunnel,
      1: RecommendRetrospectTemplateConfirmFunnel,
    },
    CREATE: {
      0: CreateRetrospectQuestionFunnel,
      1: CreateRetrospectDeadlineFunnel,
    },
    COMPLETE: {
      0: CompleteCreateSpace,
    },
  } as const;
  const TOTAL_PHASE = ((flow: flowType): number => {
    return Object.keys(FLOW_COMPONENTS[flow]).length;
  })(flow);

  const isLastPhase = phase === TOTAL_PHASE - 1;
  const isFirstPhase = phase === 0;

  const nextPhase = () => setPhase((prev) => prev + 1);
  const prevPhase = () => setPhase((prev) => (prev < 1 ? prev : prev - 1));

  const isVisibleProgressBar = (() => {
    if (["COMPLETE", "RECOMMEND_PROGRESS"].includes(flow)) return false;

    return true;
  })();
  const CurrentComponent = FLOW_COMPONENTS[flow][phase as keyof (typeof FLOW_COMPONENTS)[typeof flow]];

  return (
    <PhaseContext.Provider
      value={
        {
          // getter
          phase: phase,
          flow: flow,
          title,
          description,
          questions,
          period,
          periodic,
          deadLine,
          purpose,
          selectedRecommendTemplate,
          selectedRecommendTemplateId,
          recommendTemplateType,
          selectedCategory,
          spaceId,
          recommendTemplateList,
          // setter
          setPhase,
          setPeriod,
          setTitle,
          setDescription,
          setQuestions,
          setPeriodic,
          setPurpose,
          setDeadLine,
          setSelectedRecommendTemplate,
          setSelectedRecommendTemplateId,
          setRecommendTemplateType,
          setRecommendTemplateList,
          setSelectedCategory,
          // phase functions
          isLastPhase,
          isFirstPhase,
          nextPhase,
          prevPhase,
          setSpaceId,
          setFlow: (flow: flowType, phase: number) => {
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
        {isVisibleProgressBar && (
          <ProgressBar
            curPage={phase + 1}
            lastPage={TOTAL_PHASE}
            css={css`
              margin-top: 0rem;
            `}
          />
        )}
        {CurrentComponent && <CurrentComponent />}
      </section>
    </PhaseContext.Provider>
  );
}
