import { css } from "@emotion/react";
import { MouseEvent, useRef } from "react";

import { BottomSheet } from "@/component/BottomSheet";
import { Icon } from "@/component/common/Icon";
import type { IconType } from "@/component/common/Icon/Icon";
import { Portal } from "@/component/common/Portal";
import { ProfileImage } from "@/component/common/ProfileImage";
import Tooltip from "@/component/common/Tooltip";
import {
  ReactionGroup,
  ReactionOverlayState,
  useReactionOverlay,
} from "@/component/retrospect/analysis/useReactionOverlay";
import { useApiGetUser } from "@/hooks/api/auth/useApiGetUser";
import { useDeleteRetrospectReaction } from "@/hooks/api/retrospect/reaction/useDeleteRetrospectReaction";
import { useGetRetrospectReactions } from "@/hooks/api/retrospect/reaction/useGetRetrospectReactions";
import { usePostRetrospectReaction } from "@/hooks/api/retrospect/reaction/usePostRetrospectReaction";
import { DESIGN_TOKEN_COLOR, DESIGN_TOKEN_TEXT } from "@/style/designTokens";
import { Z_INDEX } from "@/style/zIndex";
import {
  RETROSPECT_REACTIONS,
  RetrospectReaction,
  RetrospectReactionCode,
} from "@/types/retrospectReaction";
import { getDeviceType } from "@/utils/deviceUtils";

interface ReactionBlockProps {
  spaceId: number;
  retrospectId: number;
  answerId: number;
  showEmptyTooltip?: boolean;
}

const MAX_VISIBLE_REACTIONS = 3;
const EMPTY_REACTIONS: RetrospectReaction[] = [];

const getPendingReactionKey = (answerId: number, memberId: number, emojiCode: RetrospectReactionCode) =>
  `${answerId}:${memberId}:${emojiCode}`;

const getReactionGroups = (reactions: RetrospectReaction[]) => {
  const groups: ReactionGroup[] = [];

  for (const code of Object.keys(RETROSPECT_REACTIONS) as RetrospectReactionCode[]) {
    const codeReactions: RetrospectReaction[] = [];

    for (const reaction of reactions) {
      if (reaction.emojiCode === code) {
        codeReactions.push(reaction);
      }
    }

    if (codeReactions.length > 0) {
      groups.push({ code, reactions: codeReactions });
    }
  }

  return groups;
};

const getSelectedReactionCodes = (reactions: RetrospectReaction[], memberId: number) => {
  const codes = new Set<RetrospectReactionCode>();

  for (const reaction of reactions) {
    if (reaction.memberId === memberId) {
      codes.add(reaction.emojiCode);
    }
  }

  return codes;
};

const REACTION_COLORS = {
  blue: DESIGN_TOKEN_COLOR.blue600,
  purple: DESIGN_TOKEN_COLOR.purple600,
  green: DESIGN_TOKEN_COLOR.green500,
  red: DESIGN_TOKEN_COLOR.red400,
} as const;

export default function ReactionBlock({
  spaceId,
  retrospectId,
  answerId,
  showEmptyTooltip = false,
}: ReactionBlockProps) {
  const { isMobile } = getDeviceType();
  const { data, isSuccess } = useGetRetrospectReactions({ spaceId, retrospectId });
  const { data: currentUser } = useApiGetUser();
  const postReaction = usePostRetrospectReaction();
  const deleteReaction = useDeleteRetrospectReaction();
  const pendingCreateRef = useRef(new Map<string, Promise<void>>());
  const {
    overlay,
    sheetId,
    popper,
    setPopperElement,
    clearCloseTimer,
    closeOverlay,
    scheduleClose,
    openStatus,
    openSelector,
  } = useReactionOverlay({ answerId, isMobile });

  const answerReactions =
    data?.answerReactions.find((item) => item.answerId === answerId)?.reactions ?? EMPTY_REACTIONS;
  const reactionGroups = getReactionGroups(answerReactions);
  const selectedReactionCodes = getSelectedReactionCodes(answerReactions, currentUser.memberId);
  const visibleGroups = reactionGroups.slice(0, MAX_VISIBLE_REACTIONS);
  const hiddenGroups = reactionGroups.slice(MAX_VISIBLE_REACTIONS);
  const shouldShowEmptyTooltip =
    showEmptyTooltip && isSuccess && !data.answerReactions.some((item) => item.reactions.length > 0);

  const handleOpenSelector = (event: MouseEvent<HTMLButtonElement>) => {
    openSelector(event);
  };

  const handleCreate = (emojiCode: RetrospectReactionCode) => {
    if (selectedReactionCodes.has(emojiCode)) return;

    closeOverlay();
    const pendingReactionKey = getPendingReactionKey(answerId, currentUser.memberId, emojiCode);
    const mutationParams = {
      spaceId,
      retrospectId,
      answerId,
      emojiCode,
      member: {
        memberId: currentUser.memberId,
        memberName: currentUser.name,
        memberProfileImgUrl: currentUser.imageUrl || null,
      },
    };

    const pendingCreate = postReaction.optimisticMutateAsync(mutationParams);
    pendingCreateRef.current.set(pendingReactionKey, pendingCreate);
    void pendingCreate
      .finally(() => {
        if (pendingCreateRef.current.get(pendingReactionKey) === pendingCreate) {
          pendingCreateRef.current.delete(pendingReactionKey);
        }
      })
      .catch(() => undefined);
  };

  const getPendingCreate = (reaction: RetrospectReaction) => {
    if (reaction.retrospectReactionId > 0) return null;
    return pendingCreateRef.current.get(getPendingReactionKey(answerId, reaction.memberId, reaction.emojiCode)) ?? null;
  };

  const handleDelete = (reaction: RetrospectReaction) => {
    deleteReaction.optimisticMutate({
      spaceId,
      retrospectId,
      retrospectReactionId: reaction.retrospectReactionId,
      answerId,
      memberId: reaction.memberId,
      emojiCode: reaction.emojiCode,
      pendingCreate: getPendingCreate(reaction),
    });
    closeOverlay();
  };

  const addReactionButton = (
    <button
      type="button"
      css={[chipStyle(false), addButtonStyle]}
      onClick={handleOpenSelector}
      aria-label="반응 추가"
    >
      <Icon icon="smilePlus" size={1.7} />
    </button>
  );

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: 1.6rem;
      `}
    >
      {visibleGroups.map((group) => (
        <ReactionChip
          key={group.code}
          group={group}
          selected={group.reactions.some((reaction) => reaction.memberId === currentUser.memberId)}
          onMouseEnter={isMobile ? undefined : (event) => openStatus(event, [group])}
          onMouseLeave={isMobile ? undefined : scheduleClose}
          onClick={(event) => openStatus(event, [group])}
        />
      ))}

      {hiddenGroups.length > 0 && (
        <button
          type="button"
          css={chipStyle(false)}
          onMouseEnter={isMobile ? undefined : (event) => openStatus(event, reactionGroups)}
          onMouseLeave={isMobile ? undefined : scheduleClose}
          onClick={(event) => openStatus(event, reactionGroups)}
          aria-label="전체 반응 보기"
        >
          +{hiddenGroups.length}
        </button>
      )}

      {shouldShowEmptyTooltip ? (
        <Tooltip
          placement="bottom"
          align="start"
          theme="blue"
          defaultOpen
          triggerEvents={false}
          autoHideDuration={5000}
        >
          <Tooltip.Trigger>{addReactionButton}</Tooltip.Trigger>
          <Tooltip.Content tag="NEW" arrow sideOffset={12}>
            작성된 회고에 새롭게 반응을 남겨보세요!
          </Tooltip.Content>
        </Tooltip>
      ) : (
        addReactionButton
      )}

      {overlay && isMobile && (
        <BottomSheet
          id={sheetId}
          title={overlay.type === "selector" ? "반응 남기기" : "반응한 멤버"}
          sheetHeight={overlay.type === "selector" ? 320 : 420}
          contents={
            <div
              css={css`
                padding-top: 3.6rem;
              `}
            >
              <ReactionOverlayContent
                overlay={overlay}
                selectedCodes={selectedReactionCodes}
                currentMemberId={currentUser.memberId}
                onSelect={handleCreate}
                onDelete={handleDelete}
              />
            </div>
          }
        />
      )}

      {overlay && !isMobile && (
        <Portal id="dropdown-root">
          <div
            ref={setPopperElement}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={overlay.type === "status" ? scheduleClose : undefined}
            css={popoverStyle}
            style={popper.styles.popper}
            {...popper.attributes.popper}
          >
            <ReactionOverlayContent
              overlay={overlay}
              selectedCodes={selectedReactionCodes}
              currentMemberId={currentUser.memberId}
              onSelect={handleCreate}
              onDelete={handleDelete}
            />
          </div>
        </Portal>
      )}
    </div>
  );
}

function ReactionChip({
  group,
  selected,
  ...props
}: { group: ReactionGroup; selected: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const option = RETROSPECT_REACTIONS[group.code];

  return (
    <button type="button" css={chipStyle(selected)} {...props}>
      <span css={reactionLabelStyle(option.color)}>{option.label}</span>
      <Icon icon={option.icon as IconType} size={1.4} />
      {group.reactions.length > 1 && <span css={countStyle}>{group.reactions.length}</span>}
    </button>
  );
}

function ReactionOverlayContent({
  overlay,
  selectedCodes,
  currentMemberId,
  onSelect,
  onDelete,
}: {
  overlay: Exclude<ReactionOverlayState, null>;
  selectedCodes: Set<RetrospectReactionCode>;
  currentMemberId: number;
  onSelect: (code: RetrospectReactionCode) => void;
  onDelete: (reaction: RetrospectReaction) => void;
}) {
  if (overlay.type === "selector") {
    return <ReactionSelector onSelect={onSelect} selectedCodes={selectedCodes} />;
  }

  return <ReactionStatus groups={overlay.groups} currentMemberId={currentMemberId} onDelete={onDelete} />;
}

function ReactionSelector({
  onSelect,
  selectedCodes,
}: {
  onSelect: (code: RetrospectReactionCode) => void;
  selectedCodes: Set<RetrospectReactionCode>;
}) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(5, max-content);
        gap: 1.2rem 1.6rem;

        @media (max-width: 767px) {
          grid-template-columns: repeat(2, 1fr);
        }
      `}
    >
      {(
        Object.entries(RETROSPECT_REACTIONS) as [
          RetrospectReactionCode,
          (typeof RETROSPECT_REACTIONS)[RetrospectReactionCode],
        ][]
      ).map(([code, option]) => (
          <button
            key={code}
            type="button"
            disabled={selectedCodes.has(code)}
            onClick={() => onSelect(code)}
            css={css`
              ${DESIGN_TOKEN_TEXT.body13Bold}
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.3rem;
              color: ${REACTION_COLORS[option.color]};
              white-space: nowrap;
              padding: 0.4rem;
              border-radius: 0.6rem;

              &:hover {
                background: ${DESIGN_TOKEN_COLOR.gray100};
              }

              &:disabled {
                cursor: default;
                opacity: 0.35;
              }
            `}
          >
            {option.label}
            <Icon icon={option.icon as IconType} size={1.4} />
          </button>
        ))}
    </div>
  );
}

function ReactionStatus({
  groups,
  currentMemberId,
  onDelete,
}: {
  groups: ReactionGroup[];
  currentMemberId: number;
  onDelete: (reaction: RetrospectReaction) => void;
}) {
  return (
    <div
      css={css`
        display: flex;
        width: 28rem;
        max-height: 28rem;
        overflow-y: auto;
        flex-direction: column;
        gap: 0.4rem;

        @media (max-width: 767px) {
          width: 100%;
        }
      `}
    >
      {groups.flatMap((group) =>
        group.reactions.map((reaction) => {
          const option = RETROSPECT_REACTIONS[group.code];
          const isMine = reaction.memberId === currentMemberId;

          return (
            <div
              key={reaction.retrospectReactionId}
              css={css`
                display: flex;
                min-height: 4rem;
                align-items: center;
                gap: 0.8rem;
                padding: 0.4rem;
              `}
            >
              <ProfileImage src={reaction.memberProfileImgUrl ?? undefined} size={2.4} showCameraButton={false} />
              <span
                css={css`
                  ${DESIGN_TOKEN_TEXT.body13Medium}
                  flex: 1;
                  color: ${DESIGN_TOKEN_COLOR.gray900};
                `}
              >
                {isMine ? "나" : reaction.memberName}
              </span>
              <span css={reactionLabelStyle(option.color)}>
                {option.label} <Icon icon={option.icon as IconType} size={1.4} />
              </span>
              {isMine && (
                <button
                  type="button"
                  aria-label="내 반응 삭제"
                  onPointerDown={(event) => event.stopPropagation()}
                  onTouchStart={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(reaction);
                  }}
                  css={css`
                    ${DESIGN_TOKEN_TEXT.body12SemiBold}
                    display: inline-flex;
                    min-width: 4.4rem;
                    min-height: 3.2rem;
                    flex-shrink: 0;
                    align-items: center;
                    justify-content: center;
                    padding: 0.6rem 1rem;
                    border-radius: 0.6rem;
                    color: ${DESIGN_TOKEN_COLOR.gray700};
                    background: ${DESIGN_TOKEN_COLOR.gray100};
                    cursor: pointer;
                    touch-action: manipulation;

                    &:hover {
                      background: ${DESIGN_TOKEN_COLOR.gray200};
                    }

                    &:active {
                      background: ${DESIGN_TOKEN_COLOR.gray300};
                    }

                    &:disabled {
                      cursor: default;
                      opacity: 0.5;
                    }
                  `}
                >
                  삭제
                </button>
              )}
            </div>
          );
        }),
      )}
    </div>
  );
}

const chipStyle = (selected: boolean) => css`
  ${DESIGN_TOKEN_TEXT.body13Bold}
  display: flex;
  width: fit-content;
  height: 2.8rem;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  border-radius: 99rem;
  border: 0.1rem solid ${selected ? DESIGN_TOKEN_COLOR.blue600 : DESIGN_TOKEN_COLOR.gray300};
  color: ${DESIGN_TOKEN_COLOR.gray700};
  background: ${selected ? DESIGN_TOKEN_COLOR.blue50 : DESIGN_TOKEN_COLOR.gray00};

  &:disabled {
    cursor: default;
  }
`;

const addButtonStyle = css`
  width: 4.4rem;
  height: 3rem;
  padding: 0;
`;

const reactionLabelStyle = (color: keyof typeof REACTION_COLORS) => css`
  ${DESIGN_TOKEN_TEXT.body12SemiBold}
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: ${REACTION_COLORS[color]};
  white-space: nowrap;
`;

const countStyle = css`
  ${DESIGN_TOKEN_TEXT.body13Medium}
  margin-left: 0.3rem;
  color: ${DESIGN_TOKEN_COLOR.gray800};
`;

const popoverStyle = css`
  z-index: ${Z_INDEX.popover};
  padding: 1.2rem;
  border-radius: 1.2rem;
  background: ${DESIGN_TOKEN_COLOR.gray00};
  box-shadow: ${DESIGN_TOKEN_COLOR.shadow.shadow300};
`;
