import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, ButtonProvider } from "@/component/common/button";
import { TextArea } from "@/component/common/input";
import { Spacing } from "@/component/common/Spacing";
import { Typography } from "@/component/common/typography";
import { WSatisfactionTemplate } from "@/component/write/template/write";
import { useInput } from "@/hooks/useInput";
import { useToast } from "@/hooks/useToast";
import { DefaultLayout } from "@/layout/DefaultLayout";
import { PATHS } from "@layer/shared";

export function FeedbackPage() {
  const navigate = useNavigate();
  const [satisfaction, setSatisfaction] = useState<number>(-1);
  const { toast } = useToast();

  const { value: feedback, handleInputChange: handleChangeFeedback } = useInput("");

  const handleSatisfactionClick = (index: number) => {
    setSatisfaction(index);
  };

  const handleSummit = () => {
    toast.success("소중한 피드백 감사합니다.");
    navigate(PATHS.myInfo());
  };

  return (
    <DefaultLayout title="평가 및 피드백">
      <Typography variant="title16Bold">레이어에서의 경험이 만족스러우신가요?</Typography>
      <Spacing size={4} />
      <WSatisfactionTemplate index={satisfaction} onClick={handleSatisfactionClick} />
      <Spacing size={5.4} />
      <Typography variant="subtitle14SemiBold">자세한 피드백이 있다면 함께 남겨주세요!</Typography>
      <TextArea
        value={feedback}
        onChange={handleChangeFeedback}
        placeholder="좋았던 점이나 불편했던 점을 알려주세요!"
        count
        maxLength={20}
        height="7.4rem"
      />
      <ButtonProvider>
        <Button colorSchema="primary" disabled={satisfaction === -1} onClick={handleSummit}>
          제출
        </Button>
      </ButtonProvider>
    </DefaultLayout>
  );
}
