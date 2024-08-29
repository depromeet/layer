import { Fragment, useContext } from "react";

import { PhaseContext } from "@/app/write/RetrospectWritePage.tsx";
import { Answer } from "@/component/write/phase/Write";
import { CAchievementTemplate, CDescriptiveTemplate, CSatisfactionTemplate } from "@/component/write/template/complete";

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
                number: <CSatisfactionTemplate question={item.question} index={parseInt(answers[item.order].answerContent)} />,
                range: <CAchievementTemplate question={item.question} index={parseInt(answers[item.order].answerContent)} />,
                plain_text: <CDescriptiveTemplate question={item.question} answer={answers[item.order].answerContent} />,
                combobox: null,
                card: null,
                markdown: null,
              }[item.questionType]
            }
          </Fragment>
        );
      })}
    </Fragment>
  );
}
