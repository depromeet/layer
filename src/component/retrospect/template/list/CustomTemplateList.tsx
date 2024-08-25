import { useContext, useMemo } from "react";

import { CustomTemplateListItem } from "./CustomTemplateListItem";

import { TemplateListPageContext } from "@/app/retrospect/template/list/TemplateListPage";
import { SkeletonCard } from "@/component/common/skeleton/SkeletonCard";
import { useGetCustomTemplateList } from "@/hooks/api/template/useGetCustomTemplateList";
import { useIntersectionObserve } from "@/hooks/useIntersectionObserve";
import { formatDateToString } from "@/utils/formatDate";

export function CustomTemplateList({ readOnly }: { readOnly?: boolean }) {
  const { spaceId } = useContext(TemplateListPageContext);
  /**
   * NOTE: 리드미 Props는 아래의 의미를 가지고 있습니다.
   * - ReadOnly: 버튼 유무 상태
   * */

  console.log(readOnly);
  const { data, fetchNextPage, hasNextPage } = useGetCustomTemplateList(+spaceId);
  const targetDivRef = useIntersectionObserve({
    options: { threshold: 0.5 },
    onIntersect: async () => {
      if (hasNextPage) {
        await fetchNextPage();
      }
    },
  });
  const templates = useMemo(() => data.pages.flatMap(({ content }) => content), [data.pages]);
  return (
    <>
      {templates.map((template) => (
        <CustomTemplateListItem
          key={template.id}
          id={template.id}
          title={template.title}
          tag={template.formTag}
          date={formatDateToString(new Date(template.createdAt), ". ")}
        />
      ))}
      {hasNextPage && <SkeletonCard ref={targetDivRef} />}
    </>
  );
}
