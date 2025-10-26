import { css } from "@emotion/react";
import { useContext, useMemo } from "react";

import { CustomTemplateListItem } from "./CustomTemplateListItem";
import { TemplateListPageContext as DesktopTemplateListPageContext } from "@/app/desktop/component/retrospect/template/list";
import { TemplateListPageContext as MobileTemplateListPageContext } from "@/app/mobile/retrospect/template/list/TemplateListPage";

import { EmptyList } from "@/component/common/empty";
import { SkeletonCard } from "@/component/common/skeleton/SkeletonCard";
import { useGetCustomTemplateList } from "@/hooks/api/template/useGetCustomTemplateList";
import { useIntersectionObserve } from "@/hooks/useIntersectionObserve";
import { formatDateToString } from "@/utils/formatDate";
import { getDeviceType } from "@/utils/deviceUtils";

export function CustomTemplateList() {
  const { isDesktop } = getDeviceType();
  const desktopContext = useContext(DesktopTemplateListPageContext);
  const mobileContext = useContext(MobileTemplateListPageContext);
  const { spaceId } = isDesktop ? desktopContext : mobileContext;

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
      {templates.length === 0 ? (
        <EmptyList
          icon={"ic_empty_list"}
          iconSize={14}
          message={"아직 커스텀 템플릿이 없어요"}
          css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          `}
        />
      ) : (
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
      )}
    </>
  );
}
