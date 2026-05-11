# Git 워크플로우 가이드 — 충돌 해소 시 주의사항

> 2026년 5월 develop ↔ main 사이에서 발생한 중복 커밋 사고 분석 및 재발 방지 가이드입니다.
> **요약**: `git rebase`로 새로 만든 브랜치를 원래 브랜치(develop)에 다시 머지하지 마세요. 그 브랜치는 rebase의 기준이었던 브랜치(main)로 가야 합니다.

---

## 📌 TL;DR — 한 페이지 룰

### ❌ 절대 하지 말 것

```bash
# 패턴 A: rebase한 브랜치를 같은 브랜치에 다시 merge
git checkout -b temp/fix develop
git rebase origin/main           # ← 새 SHA 생성
git checkout develop
git merge temp/fix               # ❌ 중복 커밋 영구 발생

# 패턴 B: rebase한 브랜치의 PR base를 잘못 잡기
# PR base=develop, head=<main 위로 rebase한 브랜치>   ← ❌ 패턴 A와 동일
```

### ✅ 올바른 방법

```bash
# 시나리오: develop 변경사항을 main에 올리는데 충돌이 생긴 경우
git checkout -b release/sync-$(date +%Y-%m-%d) develop
git rebase origin/main           # main 위로 rebase, 충돌 해결
# PR base=main, head=release/sync-...   ← ✅ rebase 기준 브랜치로 PR

# 머지 후 develop를 main과 다시 연결:
# PR base=develop, head=main (Merge commit 옵션으로 머지)
```

### 🚨 즉시 멈춰야 하는 신호

PR을 만들었는데 다음 중 하나라도 보이면 base가 잘못됐을 확률이 매우 높습니다:

- PR이 가져오는 커밋 수가 의도보다 많음 (예: 14커밋 의도였는데 50+ 커밋)
- 같은 메시지의 커밋이 PR 안에 2번 이상 등장
- `Merge branch 'develop' into <feature>` 같은 자동 머지커밋이 PR에 포함됨
- 다른 PR(#X)이 이미 머지됐는데 그 PR의 변경사항이 또 보임

**즉시 PR을 닫고 base/head를 재검토하세요.**

---

## 🧪 사고 사례 — 무엇이 일어났는가

### 타임라인

| 시점 | 사건 | 결과 |
|---|---|---|
| ~Apr 20, 2026 | 정상 운영 | develop이 main보다 약간 앞서있을 뿐, 중복 없음 |
| **May 4, 2026 09:22** | 누군가 `git rebase origin/main` 으로 `temp/resolve-crash` 생성 | 14개 커밋이 새 SHA로 main 위에 깔끔히 올라감 ✅ |
| **May 4, 2026 15:42** | `temp/resolve-crash` 위에서 `git merge develop` 실행 | 원본+사본이 같은 브랜치에 공존하기 시작 ⚠️ |
| **May 5, 2026 21:21** | PR #866으로 `temp/resolve-crash` → **develop** 머지 | develop에 중복 커밋 14쌍(28개) 영구 잔존 ❌ |
| **May 8, 2026 11:04** | `fix-merge-conflicts-2026-05-08` 브랜치도 동일 패턴 반복 | 3중 중복 발생 (한 커밋이 최대 3회 등장) ❌ |
| **May 9, 2026** | develop → main PR(#867) 열어보니 75커밋, 중복 다수 → 사고 인지 | |
| **May 11, 2026** | `fix-merge-conflicts-…` → **main** PR(#874)로 정정, develop ← main merge-back(#875)으로 정상화 | ✅ |

### 결정적 증거 — `git rebase`의 지문

중복 커밋 14쌍을 비교했을 때 **author date는 동일, commit date만 다름**:

```
원본:  adate: Apr 15 18:50 | cdate: Apr 20 10:50 | feat: A/B 브랜치...
사본1: adate: Apr 15 18:50 | cdate: May 4 09:22 | feat: A/B 브랜치...   ← temp/resolve-crash
사본2: adate: Apr 15 18:50 | cdate: May 8 11:04 | feat: A/B 브랜치...   ← fix-merge-conflicts-…
```

이는 **`git rebase`**가 14개 커밋을 한꺼번에 재적용하면서 같은 commit date를 도장 찍은 흔적입니다.

---

## 🧬 근본 원인 — Rebase 후 Merge-back 안티패턴

### 메커니즘

`git rebase`는 커밋의 **author 정보는 그대로**, **commit 정보(SHA, parent, cdate)는 새로** 만듭니다. 즉:

```
develop:  ──── A ──── B ──── C   (원본 SHA)

git checkout -b temp develop
git rebase origin/main

main:     ──── M
                ╲
                 A' ─── B' ─── C'   (temp, 새 SHA — 내용은 A,B,C와 동일)
```

이 시점에 `temp`는 main 위에 깔끔하게 올라간 클린 브랜치입니다. **여기까지는 정상.**

문제는 그다음입니다. `temp`를 다시 develop에 머지하면:

```
git checkout develop
git merge temp

develop:  ──── A ──── B ──── C ────┐
                                    M(merge)
main:     ──── M ──── A' ─── B' ─ C' ┘
```

merge commit `M`이 reachable한 모든 커밋은 develop의 history에 포함됩니다. 즉:
- 원본 A, B, C (develop 쪽 부모로 reachable)
- 사본 A', B', C' (temp 쪽 부모로 reachable)

**git은 이 둘을 다른 커밋으로 봅니다** (SHA 다르니까). 중복 제거 같은 건 일어나지 않음.

### 왜 이게 영구적인가

기본적으로 `develop` 같은 공유 브랜치는 **force-push가 막혀있습니다** (브랜치 보호 규칙). 즉 history에서 커밋을 빼는 게 불가능. revert도 안 됩니다 — `git revert -m 1`은 머지의 net effect만 되돌릴 뿐, 머지로 들어온 커밋들을 reachability에서 제거하지 못합니다.

결과: 한 번 발생하면 그 브랜치의 history에 **영구적으로 흉터로 남음.**

### 왜 이번 사고는 두 번 일어났나

PR #866이 패턴을 만들고, PR #872가 그 패턴을 답습했습니다. **이미 더러워진 develop를 다시 main 위로 rebase**하면 그 안의 원본+사본이 모두 또 새 SHA로 사본화되어, 3중 중복까지 발생.

➡️ **하나의 사고가 다음 사고를 부르는 구조**. 그래서 안티패턴을 인지하고 차단하는 게 결정적으로 중요합니다.

---

## ❌ 절대 하지 말아야 할 행동 (DON'T)

### 1. `git rebase` 한 브랜치를 원래 브랜치에 다시 `git merge`

```bash
# ❌ 이 조합은 거의 항상 사고
git rebase origin/main
git checkout develop
git merge <rebased-branch>
```

### 2. rebase한 브랜치를 잘못된 PR base로 머지

```
# ❌ rebase 기준은 main이었는데 base는 develop
PR base: develop ← head: <main 위로 rebase한 브랜치>
```

GitHub PR을 만들 때 **base를 반드시 확인**하세요. rebase한 브랜치는 항상 **rebase의 기준 브랜치**로 가야 합니다.

### 3. `git revert -m 1`로 사고를 "되돌리려고" 시도

```bash
# ❌ 머지 커밋을 revert해도 중복은 사라지지 않음
git revert -m 1 <merge-commit>
```

`git revert -m 1`은 머지로 인해 net으로 변한 파일만 되돌립니다. 머지로 reachable해진 커밋들은 그대로 남습니다. 이번 사고에서 PR #873이 이 함정에 빠졌습니다.

### 4. "한번만"이라는 생각으로 rebase 후 merge-back

이번 사고 메커니즘의 핵심은 **한 번이라도 일어나면 영구**라는 점입니다. 두 번째부터는 복구가 기하급수적으로 어려워집니다.

---

## ✅ 올바른 방법 (DO)

### 시나리오 A — develop를 main으로 릴리즈할 때 충돌이 있는 경우

```bash
# 1. release sync 브랜치 생성
git checkout -b release/sync-YYYY-MM-DD develop

# 2. main 위로 rebase하면서 충돌 해결
git rebase origin/main
# (충돌 해결, git rebase --continue 반복)

# 3. PR 생성 — ⚠️ base는 main!
gh pr create --base main --head release/sync-YYYY-MM-DD \
  --title "chore: sync main with develop" \
  --body "release sync"

# 4. PR 머지 (Create a merge commit)
```

머지 후 develop를 main과 동기화:

```bash
# PR 생성 — base는 develop, head는 main
gh pr create --base develop --head main \
  --title "chore: sync develop with main" \
  --body "post-release merge-back"

# 머지 (Create a merge commit) — 트리 동일하므로 file changes 0건
```

### 시나리오 B — develop가 main보다 뒤처져 있어서 최신 main을 받고 싶을 때

```bash
# 가장 안전: PR 통해서 main → develop merge
gh pr create --base develop --head main --title "chore: sync develop with main"
# 머지 (Create a merge commit)
```

**절대로** `git rebase origin/main`을 develop에서 직접 하지 마세요. develop가 보호 브랜치라면 force-push가 안 되어서 의미가 없고, 보호가 풀려있더라도 협업 브랜치 rebase는 다른 팀원의 작업을 깨뜨립니다.

### 시나리오 C — feature 브랜치에서 develop의 최신 변경사항을 받고 싶을 때

```bash
git checkout feature/my-work
git fetch origin
git merge origin/develop          # ✅ merge (force-push 우려 없음)
# 또는
git rebase origin/develop         # ✅ rebase OK (feature 브랜치는 본인만 작업)
git push --force-with-lease       # rebase 했다면 force-push
```

feature 브랜치는 **본인만 작업하는 브랜치**라는 전제하에 rebase가 안전합니다. 다른 사람이 같은 feature 브랜치를 쓰고 있다면 merge가 안전.

---

## 📋 PR 머지 전 체크리스트

PR을 머지하기 직전에 다음 항목들을 확인하세요. 하나라도 ⚠️ 해당하면 일단 멈추고 검토.

- [ ] **PR base가 의도한 목적지인가?**
  - rebase한 브랜치의 base는 rebase의 기준 브랜치여야 함
  - 예: `git rebase origin/main` 했으면 base=main
- [ ] **PR이 가져오는 커밋 수가 예상 범위 안인가?**
  - 의도가 "10개 미만 커밋"인데 50+ 커밋이 보이면 무언가 잘못된 것
- [ ] **PR 내에 중복 메시지의 커밋이 없는가?**
  - 같은 메시지가 2번 이상 보이면 base 잘못된 것
- [ ] **`Merge branch 'X' into Y` 같은 자동 머지커밋이 PR에 포함됐는가?**
  - 일반 feature PR에는 절대 나올 수 없는 메시지
- [ ] **머지 옵션이 적절한가?**
  - 머지 옵션 의미:
    - **Create a merge commit**: 두 브랜치 history를 잇는 머지커밋 생성. ancestry 연결 유지. 대부분의 경우 안전한 기본값.
    - **Squash and merge**: 모든 커밋을 1개로 압축. 브랜치 history 소실 + 머지커밋이 아니므로 ancestry 연결 끊김.
    - **Rebase and merge**: 모든 커밋이 새 SHA로 base 위에 재적용. **중복 사고의 원인이므로 release sync PR에는 사용 금지.**
  - sync PR(특히 main ↔ develop 사이)은 **반드시 Create a merge commit**

---

## 🔍 사고 발견 시 대응 절차

### 1. 일단 멈추기

이미 PR을 머지해버렸다면, **추가 PR 머지를 멈추세요**. 사고 위에 사고를 쌓으면 복구가 기하급수로 어려워집니다.

### 2. 손상 범위 파악

```bash
# 중복 커밋 메시지 검사
git log origin/develop --format="%s" | sort | uniq -c | sort -rn | head -20

# author date 동일/cdate 다른 커밋 찾기 (rebase 흔적)
git log origin/develop --format="%h | adate=%ad | cdate=%cd | %s" --date=iso | head -30
```

### 3. 복구 전략 선택

| 상황 | 전략 |
|---|---|
| 사고 직후, 머지 1건 | 사고 PR을 revert하기보다는 force-push가 가능하면 reset이 더 깨끗 |
| 사고 누적, force-push 가능 | 클린 상태로 force-push (관리자와 협의) |
| 사고 누적, force-push 불가 | (1) rebase 결과물을 올바른 base로 PR (2) sync용 merge-back PR로 최소한 미래는 깨끗하게 |

### 4. 팀에 공유

같은 안티패턴이 반복되지 않게 사례 공유 + 이 가이드 다시 한 번 안내.

---

## 📎 부록: 이번 사고로 develop history에 남은 흔적

PR #874 + #875로 미래의 PR들은 깨끗해지지만, develop의 `git log`에는 다음 커밋들이 영구히 남습니다 (force-push 청소를 별도로 수행하지 않은 경우):

- `3e349a21` — PR #872 머지커밋 (사고의 원흉)
- `30587045` — PR #866 머지커밋 (1차 사고)
- `241de20b` — `Merge branch 'develop' into temp/resolve-crash`
- `14d88572`, `bbbe2c27` 등 — 옛 SHA 커밋 (rebase 사본의 원본)
- `62663b27`, `6f967cb9` 등 — rebase 사본

기능적으로는 무해하지만 `git log`/`git blame`에서 노이즈로 보입니다. 별도 청소가 필요하다면 release 직후(작업 in-flight 최소 시점)에 관리자가 force-push로 진행할 수 있습니다.

---

## 🔗 관련 PR

- PR #866 (`temp/resolve-crash` → develop) — 1차 사고 발생 지점
- PR #872 (`fix-merge-conflicts-2026-05-08` → develop) — 2차 사고 발생 지점
- PR #867 (`develop` → main) — 사고로 인해 75커밋이 되어 닫힘
- PR #873 (`revert-872-…` → develop) — 잘못된 복구 시도, 닫힘
- PR #874 (`fix-merge-conflicts-2026-05-08` → main) — 올바른 정정 PR
- PR #875 (`main` → develop) — merge-back으로 미래 깨끗하게 보장

---

_작성: 2026-05-11_
