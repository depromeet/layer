import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { CustomTemplateListItem } from "./CustomTemplateListItem";

import { PATHS } from "@/config/paths";
import { useGetCustomTemplateList } from "@/hooks/api/template/useGetCustomTemplateList";
import { useIntersectionObserve } from "@/hooks/useIntersectionObserve";
import { formatDateToString } from "@/utils/formatDate";

type CustomTemplateListProps = {
  spaceId: number;
  isCreateRetrospect?: boolean;
};

export function CustomTemplateList({ spaceId, isCreateRetrospect }: CustomTemplateListProps) {
  const navigate = useNavigate();
  const { data, fetchNextPage } = useGetCustomTemplateList(spaceId);
  const targetDivRef = useIntersectionObserve({
    options: { threshold: 0.5 },
    onIntersect: async () => {
      await fetchNextPage();
    },
  });
  const templates = useMemo(() => data.pages.flatMap(({ content }) => content), [data]);
  return (
    <>
      {templates.map((template) => (
        <CustomTemplateListItem
          key={template.id}
          title={template.title}
          tag={template.formTag}
          date={formatDateToString(new Date(template.createdAt), ". ")}
          createRetrospect={
            isCreateRetrospect
              ? () => {
                  navigate(PATHS.retrospectCreate(), {
                    state: { spaceId, templateId: template.id },
                  });
                }
              : undefined
          }
        />
      ))}
      <div ref={targetDivRef} />
    </>
  );
}
