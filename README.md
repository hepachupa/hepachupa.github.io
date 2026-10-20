# 포트폴리오 (Astro + GitHub Pages + Pages CMS)

프로젝트 · 수상 · 대외활동을 한 페이지에 보여주는 인터랙티브 포트폴리오입니다.
내용은 **Pages CMS 웹 화면에서 폼으로 편집**하고, 저장하면 1~2분 뒤 사이트에 자동 반영됩니다.

- 카드 / 타임라인 보기 전환, 종류 탭(전체·프로젝트·수상·대외활동), 태그 필터
- 카드 클릭 → 상세 모달 (유튜브는 클릭 전까지 로드 안 함)
- 항목별 **딥링크**: 모달의 `링크 복사` → `https://…/#item/project-killa` 처럼 해당 항목이 바로 열리는 주소
- 다크/라이트 테마, 모바일 대응
- 상단 `PDF` 버튼 → 인쇄 화면에서 "PDF로 저장" 하면 모든 상세가 펼쳐진 PDF가 나옴 (링크 입력란이 없는 지원처용)
- 카카오톡·슬랙 링크 미리보기(OG 태그), 마지막 업데이트 날짜 자동 표시

---

## 1. 처음 한 번만: 배포 세팅 (10분)

1. GitHub에서 **새 레포 생성** — 이름을 정확히 `USERNAME.github.io` 로 (USERNAME = 내 GitHub 아이디), Public.
2. 이 폴더 전체를 레포에 올리기
   ```bash
   cd portfolio
   git init && git add . && git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
   git push -u origin main
   ```
   (git이 익숙하지 않으면 GitHub 웹에서 "uploading an existing file"로 드래그해도 됩니다. 단 `.github`, `.pages.yml` 같은 점(.)으로 시작하는 파일도 꼭 포함)
3. `astro.config.mjs` 의 `site: 'https://USERNAME.github.io'` 를 내 주소로 수정 → 커밋
4. 레포 **Settings → Pages → Build and deployment → Source: `GitHub Actions`** 선택
5. **Actions** 탭에서 초록 체크가 뜨면 `https://USERNAME.github.io` 접속 확인

## 2. 편집 환경 연결: Pages CMS

1. https://app.pagescms.org 접속 → **Sign in with GitHub**
2. 레포 접근 권한 허용 → `USERNAME.github.io` 선택
3. 왼쪽 메뉴에 **프로필 / 프로젝트 / 수상 / 대외활동** 이 생깁니다
4. 항목 추가·수정 → **Save** → 자동 커밋 → 1~2분 뒤 사이트 반영

> 폰에서도 app.pagescms.org 로 편집 가능합니다.

### 항목별 팁

| 필드 | 설명 |
|---|---|
| 대표 프로젝트로 크게 노출 | 체크한 프로젝트가 상단 "대표 프로젝트"에 큰 카드로 나옵니다. 1~2개 권장 |
| 숨기기 | 지우지 않고 잠시 감출 때 (예: 특정 회사 지원 시 관련 없는 항목) |
| 진행 중 | 체크하면 기간이 "2025.03 – ● 진행 중" 으로 표시되고 최상단 정렬 |
| 영상 | 유튜브 링크 그대로 붙여넣기 (일부공개 영상도 OK) |
| 썸네일 | 16:9, 가로 1280px 이하, WebP/JPG 권장 (용량 300KB 이하) |
| 핵심 성과 | 한 줄씩 추가. **숫자**가 들어가면 훨씬 강합니다 (예: "로딩 시간 4.2초 → 1.1초") |
| 상세 설명 | `문제 → 해결 → 결과` 순서로. 소제목(H2) 쓰면 모달에서 깔끔하게 나옵니다 |
| 관련 프로젝트 (수상) | 프로젝트 **파일명**을 적으면 (예: `killa`) 수상 모달에 "관련 프로젝트: KILLA →" 링크가 생김 |

### 예시 항목 지우기
`(예시)` 가 붙은 항목은 Pages CMS에서 열어서 우측 상단 메뉴 → **Delete** 하면 됩니다.

## 3. 링크로 지원할 때 체크리스트

- [ ] **시크릿 창 + 폰**으로 직접 열어보기
- [ ] 카카오톡에 링크 보내서 미리보기 확인
  - 이미지/설명이 예전 것으로 나오면 [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 캐시 초기화
- [ ] 미리보기 이미지 교체: 프로필 → "링크 미리보기 이미지"에 1200×630 이미지 업로드 (기본값은 `public/og.png`)
- [ ] 특정 프로젝트를 강조하고 싶으면 **딥링크**로 지원: 모달 → `링크 복사`
- [ ] 링크 입력란 없는 곳: 상단 `PDF` → 인쇄 → "PDF로 저장"
- [ ] **지원 후엔 주소를 바꾸지 말 것** (내용만 수정)

### 어느 회사가 열어봤는지 보기 (선택)
1. https://cloud.umami.is 무료 가입 → Add website → 내 주소 입력
2. 발급된 **Website ID** 를 Pages CMS 프로필 → "Umami 방문 분석 ID"에 붙여넣기
3. 지원할 때 회사별로 꼬리표를 붙인 링크 사용
   ```
   https://USERNAME.github.io/?utm_source=nexon
   https://USERNAME.github.io/?utm_source=smilegate#item/project-killa
   ```
4. Umami 대시보드 → UTM / Pages 에서 회사별 방문 확인

## 4. 커스텀 도메인 (선택, 연 1~2만 원)

1. 가비아/Cloudflare/Namecheap 등에서 도메인 구매 (예: `myname.dev`)
2. DNS 설정
   - `A` 레코드 4개 (`@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` (`www`) → `USERNAME.github.io`
3. `public/CNAME` 파일을 만들고 내용에 `myname.dev` 한 줄
4. `astro.config.mjs` 의 `site` 를 `https://myname.dev` 로 변경
5. 레포 Settings → Pages → Custom domain 입력 → **Enforce HTTPS** 체크

## 5. 디자인 바꾸기

- 포인트 색: `src/styles/global.css` 맨 위 `--accent` 값
- 레이아웃/섹션 순서: `src/pages/index.astro`
- 카드 모양: `src/components/Card.astro` / 상세 모달: `src/components/Detail.astro`

## 6. 내 컴퓨터에서 미리보기 (선택)

Node.js 22.22 이상 필요.
```bash
npm install
npm run dev     # http://localhost:4321
```

## 폴더 구조

```
.pages.yml                 ← Pages CMS 편집 화면 정의
.github/workflows/deploy.yml ← push 하면 자동 배포
src/data/profile.json      ← 프로필 (이름, 소개, 링크)
src/content/projects/*.md  ← 프로젝트 1개 = 파일 1개
src/content/awards/*.md    ← 수상
src/content/activities/*.md← 대외활동
public/images/             ← 업로드한 이미지가 저장되는 곳
```
