import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { InfoBox } from "@/component/info";
import { info } from "@/config/info";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function HelpPage() {
  const navigate = useNavigate();
  const [selectedHelp, setSelectedHelp] = useState<number | null>(null);

  return (
    <DefaultLayout
      title="도움말"
      LeftComp={
        <Icon
          icon="ic_arrow_left"
          onClick={() => {
            selectedHelp === null ? navigate(-1) : setSelectedHelp(null);
          }}
        />
      }
    >
      {selectedHelp === null && info.help.map((help, index) => <InfoBox key={index} content={help.title} onClick={() => setSelectedHelp(index)} />)}

      {selectedHelp !== null && (
        <div>
          <Typography as="p" variant="subtitle16SemiBold">
            {info.help[selectedHelp].title}
          </Typography>
          <Typography as="p" variant="body16Medium">
            {info.help[selectedHelp].content}
          </Typography>
        </div>
      )}
    </DefaultLayout>
  );
}
