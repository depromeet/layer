export const GA_EVENTS = {
  // 스페이스 관련 GA이벤트
  SPACE: {
    ADD_ICON: {
      action: "space_add",
      category: "space",
      label: "스페이스_추가버튼_상단_아이콘",
    },
    ADD_BUTTON: {
      action: "space_add",
      category: "space",
      label: "스페이스_추가버튼_하단",
    },
    ADD_MODAL_CLOSE: {
      action: "space_add_modal_close",
      category: "space",
      label: "스페이스_추가모달_닫기버튼",
    },
  },
  // 회고 관련 GA이벤트
  RETROSPECT: {
    ADD: {
      action: "retrospect_add",
      category: "retrospect",
      label: "회고_추가버튼",
    },
    COMPLETE: {
      action: "retrospect_complete",
      category: "retrospect",
      label: "회고_완료버튼",
    },
  },
} as const;
