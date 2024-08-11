import { useMemo } from "react";

import { CustomTemplateListItem } from "./CustomTemplateListItem";

import { useGetCustomTemplateList } from "@/hooks/api/template/useGetCustomTemplateList";
import { useIntersectionObserve } from "@/hooks/useIntersectionObserve";
import { formatDateToString } from "@/utils/formatDate";

type CustomTemplateListProps = {
  spaceId: number;
};

export function CustomTemplateList({ spaceId }: CustomTemplateListProps) {
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
        />
      ))}
      <div ref={targetDivRef} />
    </>
  );
}
