# 폰트 자산

- 원본: 저장소의 `apps/mobile/assets/fonts/PretendardVariable.ttf`
- `PretendardVariable.woff2`: 원본의 전체 글리프를 유지한 WOFF2 압축본. 페이지 문구 변경 시 재생성할 필요가 없습니다.
- `LayerOG.ttf`: 공유 이미지 문구에 필요한 글리프만 포함한 굵기 700 정적 파생본. 원본의 Reserved Font Name 조건에 따라 내부 이름을 `Layer OG`로 변경했습니다. 공유 이미지 문구를 바꾸면 글리프를 다시 생성해야 합니다.
- 라이선스: `OFL.txt` (공식 Pretendard 저장소의 LICENSE).

FontTools의 `TTFont`로 원본을 열어 `flavor = "woff2"`로 저장했습니다. 공유 이미지용 폰트는 `subset.Subsetter`로 이미지의 글자들을 선택한 뒤 `varLib.instancer.instantiateVariableFont(font, {"wght": 700})`으로 변환했습니다. 파생본의 name 테이블 중 1, 3, 4, 16은 `Layer OG`, 6은 `LayerOG-Bold`입니다.
