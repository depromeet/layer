import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@/component/common/Icon";
import { Typography } from "@/component/common/typography";
import { InfoBox } from "@/component/info";
import { info } from "@/config/info";
import { DefaultLayout } from "@/layout/DefaultLayout";

export function NoticePage() {
  const navigate = useNavigate();
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null);

  return (
    <DefaultLayout
      title="공지사항"
      LeftComp={
        <Icon
          icon="ic_arrow_left"
          onClick={() => {
            selectedNotice === null ? navigate(-1) : setSelectedNotice(null);
          }}
        />
      }
    >
      {selectedNotice === null &&
        info.notices.map((notice, index) => <InfoBox key={index} content={notice.title} onClick={() => setSelectedNotice(index)} />)}

      {selectedNotice !== null && (
        <div>
          <Typography as="p" variant="subtitle16SemiBold">
            {info.notices[selectedNotice].title}
          </Typography>
          <Typography as="p" variant="body16Medium">
            {info.notices[selectedNotice].content}
          </Typography>
        </div>
      )}
    </DefaultLayout>
  );
}
