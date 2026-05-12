# Git 워크플로우 가이드

> Layer 프로젝트의 Git 관리 핵심 원칙입니다. 한 번만 읽고 따르면 사고 없이 협업할 수 있습니다.

## 📚 문서 구성

- **[README.md](./README.md)** (현재 문서) — 평상시 따라야 할 핵심 룰
- **[../git-workflow-conflict-2026_05_12.md](../git-workflow-conflict-2026_05_12.md)** — 충돌 해소 시 절대 하지 말아야 할 안티패턴 (사고 사례 포함)

---

## 🌿 브랜치 전략

```
main          ← 프로덕션 배포 브랜치 (보호)
 ↑
develop       ← 통합 브랜치 (보호)
 ↑
feature/*     ← 기능 개발
fix/*         ← 버그 수정
chore/*       ← 설정/문서/기타
```

### 규칙

- **`main`, `develop`은 보호 브랜치** — 직접 푸시 금지, 반드시 PR 머지
- **feature 브랜치는 `develop`에서 분기**해서 `develop`으로 머지
- **릴리즈는 `develop` → `main`** PR로 진행
- 브랜치 이름은 `<type>/<short-description>` 또는 `<type>/<issue-number>-<description>`

---

## ✍️ 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다.

```
<type>: <subject>

[optional body]
```

### Type

| Type | 용도 |
|---|---|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `chore` | 빌드/설정/문서/리팩토링 등 기능 외 변경 |
| `refactor` | 동작 변경 없는 코드 재구성 |
| `style` | 포맷팅, 세미콜론 등 |
| `docs` | 문서만 변경 |
| `test` | 테스트 추가/수정 |

### 예시

```
feat: #123 회고 작성 화면에 자동 저장 추가
fix: #145 템플릿 리스트 클릭 시 발생하는 에러 수정
chore: Git workflow 가이드 문서 추가
```

---

## 🔄 일상 작업 흐름

### 1. 새 기능 개발

```bash
# 최신 develop 받기
git checkout develop
git pull origin develop

# 브랜치 생성
git checkout -b feature/123-auto-save

# 작업 후 커밋
git add .
git commit -m "feat: #123 회고 자동 저장 추가"

# 푸시 후 PR 생성 (base: develop)
git push -u origin feature/123-auto-save
gh pr create --base develop
```

### 2. 작업 중 develop의 최신 변경 받기

```bash
# 권장: merge (협업 안전)
git fetch origin
git merge origin/develop

# feature 브랜치를 본인만 쓴다면 rebase도 OK
git rebase origin/develop
git push --force-with-lease
```

> ⚠️ **다른 사람과 공유하는 브랜치는 절대 rebase 금지.**

### 3. PR 머지 옵션

| 옵션 | 사용 시점 |
|---|---|
| **Squash and merge** | 일반 feature/fix PR — 커밋 정리 |
| **Create a merge commit** | `main` ↔ `develop` 동기화 PR — ancestry 보존 필수 |
| **Rebase and merge** | ❌ **사용 금지** — 중복 커밋 사고의 원인 |

---

## 🚀 릴리즈 (develop → main)

```bash
# 충돌이 없으면 그냥 PR
gh pr create --base main --head develop --title "chore: release YYYY-MM-DD"
# → "Create a merge commit"으로 머지
```

### 충돌이 있는 경우 (가장 사고 잦은 시나리오)

```bash
# 1. release sync 브랜치를 develop에서 분기
git checkout -b release/sync-$(date +%Y-%m-%d) develop

# 2. main 위로 rebase하며 충돌 해결
git rebase origin/main

# 3. ⚠️ PR base는 반드시 main (rebase 기준 브랜치)
gh pr create --base main --head release/sync-YYYY-MM-DD

# 4. 머지 후 develop 동기화 (merge-back)
gh pr create --base develop --head main --title "chore: sync develop with main"
# → "Create a merge commit"
```

> 🚨 **rebase한 브랜치를 원래 브랜치(develop)에 다시 merge하면 안 됩니다.**
> 자세한 메커니즘은 [git-workflow-conflict-2026_05_12.md](../git-workflow-conflict-2026_05_12.md) 참고.

---

## ✅ PR 머지 전 체크리스트

- [ ] PR base가 의도한 목적지인가?
- [ ] PR 커밋 수가 예상 범위 안인가? (의도와 크게 다르면 멈추기)
- [ ] 같은 메시지의 커밋이 중복으로 보이지 않는가?
- [ ] CI/lint 통과했는가?
- [ ] 머지 옵션이 올바른가? (sync PR은 반드시 "Create a merge commit")
- [ ] 셀프 리뷰 또는 리뷰어 승인을 받았는가?

---

## 🚨 사고 신호 — 즉시 멈춰야 할 패턴

PR을 만들었는데 다음 중 하나라도 보이면 base가 잘못됐을 가능성이 큽니다.

- PR이 가져오는 커밋 수가 의도보다 비정상적으로 많음 (예: 10개 의도 → 50+ 표시)
- 같은 메시지의 커밋이 PR 안에 2번 이상 등장
- `Merge branch 'X' into Y` 자동 머지 커밋이 일반 feature PR에 포함됨
- 다른 PR에서 이미 머지된 변경사항이 또 보임

**→ 즉시 PR을 닫고 base/head를 재검토하세요.**

---

## 📎 참고

- [Conventional Commits](https://www.conventionalcommits.org/ko/)
- [Atlassian Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- 충돌 해소 안티패턴 상세 분석: [git-workflow-conflict-2026_05_12.md](../git-workflow-conflict-2026_05_12.md)

---

_최초 작성: 2026-05-12_
