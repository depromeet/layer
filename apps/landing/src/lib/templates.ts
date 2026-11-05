export const templates = [
  {
    slug: "kpt",
    name: "KPT",
    label: "개선을 위한 가장 명확한 시작",
    color: "blue",
    summary: "잘한 점은 이어가고, 아쉬운 점은 새로운 시도로 바꿔보세요.",
    audience:
      "프로젝트를 마친 팀이나 짧은 주기로 개선점을 찾고 싶은 팀에 잘 맞아요.",
    intro:
      "KPT 회고는 유지할 점(Keep), 문제점(Problem), 시도할 점(Try)을 나누어 경험을 돌아보는 방법이에요. 막연한 감상을 구체적인 다음 행동으로 연결하고 싶을 때 활용해 보세요.",
    questions: [
      {
        label: "유지할 점",
        term: "Keep",
        question: "계속 유지하고 싶은 것은 무엇인가요?",
        example:
          "매일 짧게 진행 상황을 공유하니 막히는 부분을 빨리 해결할 수 있었어요.",
      },
      {
        label: "아쉬운 점",
        term: "Problem",
        question: "어려움을 느꼈던 부분은 무엇인가요?",
        example: "요구사항 변경이 늦게 전달되어 같은 작업을 두 번 했어요.",
      },
      {
        label: "시도할 점",
        term: "Try",
        question: "새롭게 시도해볼 내용은 무엇인가요?",
        example:
          "다음 작업부터 변경사항을 한곳에 기록하고 시작 전에 함께 확인해 볼게요.",
      },
    ],
    tip: "문제마다 너무 많은 해결책을 만들기보다, 다음 회고 전까지 시도할 수 있는 행동 하나를 골라보세요.",
  },
  {
    slug: "5f",
    name: "5F",
    label: "경험을 깊이 돌아보고 싶다면",
    color: "purple",
    summary: "사실부터 감정, 배움과 다음 행동까지 차근차근 정리해요.",
    audience:
      "프로젝트 전체를 돌아보거나, 개인의 경험과 배움을 깊이 정리하고 싶을 때 좋아요.",
    intro:
      "5F 회고는 사실(Fact), 감정(Feeling), 배움(Finding), 앞으로의 행동(Future action), 피드백(Feedback)을 따라 경험을 돌아보는 방식이에요. 결과뿐 아니라 그 과정에서 느낀 점에도 귀를 기울여 보세요.",
    questions: [
      {
        label: "사실",
        term: "Fact",
        question: "작업 진행 상황이나 결과는 어떤가요?",
        example:
          "팀과 함께 첫 번째 제품 시안을 완성하고 사용자 의견을 받았어요.",
      },
      {
        label: "감정",
        term: "Feeling",
        question: "작업을 하며 어떤 감정들을 느꼈나요?",
        example:
          "처음에는 막막했지만, 시안에 대한 의견을 들으며 자신감이 생겼어요.",
      },
      {
        label: "배움",
        term: "Finding",
        question: "문제점이나 배운 점은 무엇이었나요?",
        example:
          "완성도를 높이기 전에 작은 시안으로 의견을 듣는 것이 도움이 됐어요.",
      },
      {
        label: "다음 행동",
        term: "Future action",
        question: "더 나은 결과를 위해 무엇을 해야 할까요?",
        example: "다음에는 초안을 더 일찍 공유해 볼게요.",
      },
      {
        label: "피드백",
        term: "Feedback",
        question: "지난 회고 내용이 잘 반영되었나요?",
        example: "지난번에 정한 중간 공유 시간을 지켜 수정할 여유가 있었어요.",
      },
    ],
    tip: "사실과 감정을 구분해서 적으면 경험을 더 선명하게 이해할 수 있어요. 마지막에는 지난 회고에서 정한 행동도 확인해 보세요.",
  },
  {
    slug: "mad-sad-glad",
    name: "Mad Sad Glad",
    label: "팀의 마음에도 귀 기울이기",
    color: "pink",
    summary: "화났던 일, 아쉬웠던 일, 기뻤던 일을 나누며 서로를 이해해요.",
    audience:
      "팀의 분위기를 돌아보고, 결과에 가려진 구성원의 감정을 함께 이해하고 싶을 때 활용해요.",
    intro:
      "Mad Sad Glad 회고는 화남, 슬픔, 기쁨이라는 감정을 중심으로 경험을 정리하는 방법이에요. 감정이 생긴 구체적인 상황을 이야기하면서 팀이 함께 바꿀 수 있는 부분을 찾아보세요.",
    questions: [
      {
        label: "화났던 일",
        term: "Mad",
        question: "무엇이 당신을 화나게 하거나 방해하나요?",
        example: "일정이 바뀌었는데 이유를 알 수 없어 작업하기 어려웠어요.",
      },
      {
        label: "아쉬웠던 일",
        term: "Sad",
        question: "무엇이 당신을 속상하게 하거나 실망하게 하나요?",
        example: "준비한 아이디어를 이야기할 시간이 부족해 아쉬웠어요.",
      },
      {
        label: "기뻤던 일",
        term: "Glad",
        question: "무엇이 당신을 기쁘게 하나요?",
        example: "어려운 작업을 팀원이 함께 풀어줘서 고마웠어요.",
      },
    ],
    tip: "누가 잘못했는지보다 어떤 상황에서 그런 감정이 생겼는지 이야기해요. 서로 다른 감정도 평가하지 않고 들어주세요.",
  },
  {
    slug: "ssc",
    name: "SSC",
    label: "다음 행동을 정하는 회고",
    color: "green",
    summary: "시작할 것, 멈출 것, 계속할 것을 정하고 팀의 방향을 맞춰요.",
    audience:
      "일하는 방식을 점검하거나 다음 주기의 행동을 명확하게 정하고 싶은 팀에 적합해요.",
    intro:
      "SSC 회고는 시작할 것(Start), 멈출 것(Stop), 계속할 것(Continue)을 구분하는 방법이에요. 회고에서 나온 이야기를 실제 업무 습관과 행동으로 바꾸는 데 집중해 보세요.",
    questions: [
      {
        label: "시작할 것",
        term: "Start",
        question: "앞으로 해야 할 것은 무엇인가요?",
        example: "작업을 시작하기 전에 완료 기준을 함께 정해요.",
      },
      {
        label: "멈출 것",
        term: "Stop",
        question: "성과를 저해하는 요소는 무엇인가요?",
        example: "목적과 안건이 정해지지 않은 회의를 줄여요.",
      },
      {
        label: "계속할 것",
        term: "Continue",
        question: "계속 이어가고 싶은 것은 무엇인가요?",
        example: "작은 성과도 함께 나누는 주간 공유 시간을 이어가요.",
      },
    ],
    tip: "‘소통 잘하기’처럼 넓은 표현보다 언제, 무엇을 할지 알 수 있는 행동으로 적어보세요.",
  },
  {
    slug: "pmi",
    name: "PMI",
    label: "경험을 여러 각도에서 보기",
    color: "yellow",
    summary: "좋았던 점과 아쉬운 점, 흥미로웠던 발견을 함께 살펴봐요.",
    audience:
      "새로운 시도나 프로젝트의 결과를 균형 있게 돌아보고 싶을 때 활용해요.",
    intro:
      "PMI 회고는 긍정적인 점(Plus), 부정적인 점(Minus), 흥미로운 점(Interesting)을 나누어 경험을 살펴보는 방법이에요. 성공과 실패라는 두 가지 평가를 넘어, 새롭게 발견한 가능성도 기록해 보세요.",
    questions: [
      {
        label: "좋았던 점",
        term: "Plus",
        question: "계획대로 잘 진행된 부분은 무엇이었나요?",
        example: "작업 우선순위를 함께 정해 중요한 기능에 집중했어요.",
      },
      {
        label: "아쉬운 점",
        term: "Minus",
        question: "개선이 필요한 점은 무엇인가요?",
        example: "중간 점검이 부족해 일정 지연을 뒤늦게 알게 됐어요.",
      },
      {
        label: "흥미로운 점",
        term: "Interesting",
        question: "특히 흥미로웠던 점은 무엇인가요?",
        example: "예상하지 못한 사용자 의견에서 새로운 사용 방법을 발견했어요.",
      },
    ],
    tip: "흥미로운 점을 억지로 장점이나 단점으로 나누지 않아도 괜찮아요. 더 알아보고 싶은 질문으로 남겨보세요.",
  },
] as const;

export type Template = (typeof templates)[number];
