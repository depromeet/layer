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
    // 회고 추가 버튼 클릭 시
    ADD: {
      action: "retrospect_add",
      category: "retrospect",
      label: "회고_추가버튼",
    },
    // 회고 추가 완료 버튼 클릭 시
    ADD_COMPLETE: {
      action: "retrospect_complete",
      category: "retrospect",
      label: "회고_완료버튼",
    },
    // 우상단 제출하기 버튼 (모달 오픈)
    WRITE_SUBMIT_OPEN: {
      action: "retrospect_write_submit_open",
      category: "retrospect",
      label: "회고_작성_제출하기버튼_상단",
    },
    // 팝업 안의 제출하기 버튼 (실제 제출)
    WRITE_SUBMIT_CONFIRM: {
      action: "retrospect_write_submit_confirm",
      category: "retrospect",
      label: "회고_작성_제출하기버튼_모달",
    },
    // 제출 완료 팝업의 완료 버튼
    WRITE_SUBMIT_DONE: {
      action: "retrospect_write_submit_complete",
      category: "retrospect",
      label: "회고_작성_제출완료버튼",
    },
    // 회고 생성 퍼널 진입 시
    FUNNEL_VIEW_CREATE: {
      action: "retrospect_funnel_view",
      category: "retrospect",
      label: "회고생성_단계_진입",
    },
    // 템플릿 추천 퍼널 진입 시
    FUNNEL_VIEW_RECOMMEND: {
      action: "retrospect_funnel_view",
      category: "retrospect",
      label: "템플릿추천_단계_진입",
    },
    // 템플릿 리스트 퍼널 진입 시
    FUNNEL_VIEW_LIST: {
      action: "retrospect_funnel_view",
      category: "retrospect",
      label: "템플릿리스트_단계_진입",
    },
  },
  // 실행목표 관련 GA 이벤트
  ACTION_ITEM: {
    // 실행목표 추가 버튼 클릭 시
    ADD: {
      action: "action_item_add",
      category: "action_item",
      label: "실행목표_추가버튼",
    },
    // 실행목표 추가 완료 버튼 클릭 시
    ADD_DONE: {
      action: "action_item_add_done",
      category: "action_item",
      label: "실행목표_추가완료버튼",
    },
    // 실행목표 편집 버튼 클릭 시
    EDIT: {
      action: "action_item_edit",
      category: "action_item",
      label: "실행목표_편집버튼",
    },
    // 실행목표 편집 완료 버튼 클릭 시
    EDIT_DONE: {
      action: "action_item_edit_complete",
      category: "action_item",
      label: "실행목표_편집완료버튼",
    },
  },
} as const;
