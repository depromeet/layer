import { Fragment, useContext } from "react";

import { PhaseContext } from "@/app/write/RetrospectWritePage.tsx";
import { Answer } from "@/component/write/phase/Write";
import { CAchievementTemplate } from "@/component/write/template/complete/Achievement";
import { CDescriptiveTemplate } from "@/component/write/template/complete/Descriptive";
import { CSatisfactionTemplate } from "@/component/write/template/complete/Satisfaction";

type CompleteProps = {
  answers: Answer[];
};

export function Confirm({ answers }: CompleteProps) {
  const { data } = useContext(PhaseContext);
  return (
    <Fragment>
      {data?.questions.map((item) => {
        return (
          <Fragment key={item.order}>
            {
              {
                number: <CSatisfactionTemplate question={item.question} index={parseInt(answers[item.questionId].answer)} />,
                range: <CAchievementTemplate question={item.question} index={parseInt(answers[item.questionId].answer)} />,
                plain_text: <CDescriptiveTemplate question={item.question} answer={answers[item.questionId].answer} />,
              }[item.questionType]
            }
          </Fragment>
        );
      })}
    </Fragment>
  );
}
