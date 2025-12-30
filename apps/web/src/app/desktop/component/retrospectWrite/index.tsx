import { useGetQuestions } from "@/hooks/api/write/useGetQuestions";
import { QuestionData } from "@/types/write";

import { createContext, useEffect, useState } from "react";
import { WriteDialog } from "./writeDialog";
import { LoadingModal } from "@/component/common/Modal/LoadingModal";
import { useSearchParams } from "react-router-dom";
import { useNavigation } from "@/component/common/LocalNavigationBar/context/NavigationContext";

export type PhaseContextProps = {
  data: QuestionData;
  phase: number;
  maxPhase: number;
  movePhase: (phase: number) => void;
  incrementPhase: () => void;
  decrementPhase: () => void;
  spaceId: number;
  retrospectId: number;
  title: string | null;
  introduction: string | null;
};

export const AdvanceQuestionsNum = 2;
export const PhaseContext = createContext<PhaseContextProps>({
  data: { isTemporarySaved: false, questions: [] },
  phase: 1,
  maxPhase: 1,
  spaceId: -1,
  retrospectId: -1,
  title: "",
  introduction: "",
  movePhase: () => {},
  incrementPhase: () => {},
  decrementPhase: () => {},
});

function adjustOrder(data: QuestionData): QuestionData {
  return {
    ...data,
    questions: data.questions.map((q) => ({
      ...q,
      order: q.order - 1,
    })),
  };
}

interface RetrospectWriteProps {
  isOverviewVisible: boolean;
  handleToggleOverview: () => void;
}

function RetrospectWrite({ isOverviewVisible, handleToggleOverview }: RetrospectWriteProps) {
  const [searchParams] = useSearchParams();
  const spaceId = searchParams.get("spaceId");
  const retrospectId = searchParams.get("retrospectId");
  const title = searchParams.get("title");
  const introduction = searchParams.get("introduction");

  const [phase, setPhase] = useState(0);
  const { data, isLoading } = useGetQuestions({ spaceId: Number(spaceId), retrospectId: Number(retrospectId) });
  const defaultData: QuestionData = { isTemporarySaved: false, questions: [] };
  const [adjustedData, setAdjustedData] = useState<QuestionData>();

  const { isCollapsed, handleCollapse } = useNavigation();

  const maxPhase = (adjustedData?.questions.length ?? 0) - 1;

  const incrementPhase = () => {
    setPhase((prevPhase) => prevPhase + 1);
  };

  const decrementPhase = () => {
    if (phase > 0) setPhase((prevPhase) => prevPhase - 1);
  };

  const movePhase = (phase: number) => {
    setPhase(phase);
  };

  useEffect(() => {
    if (!isCollapsed) {
      handleCollapse(true);
    }
  }, []);

  useEffect(() => {
    if (data) {
      setAdjustedData(adjustOrder(data));
    }
  }, [data]);

  return (
    <>
      {isLoading && <LoadingModal purpose={"회고 작성을 위한 데이터를 가져오고 있어요"} />}
      <PhaseContext.Provider
        value={{
          data: adjustedData ?? defaultData,
          phase,
          maxPhase,
          movePhase,
          incrementPhase,
          decrementPhase,
          spaceId: Number(spaceId),
          retrospectId: Number(retrospectId),
          title,
          introduction,
        }}
      >
        <WriteDialog isOverviewVisible={isOverviewVisible} handleToggleOverview={handleToggleOverview} />
      </PhaseContext.Provider>
    </>
  );
}

export default RetrospectWrite;
