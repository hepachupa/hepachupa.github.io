---
title: KILLA
summary: 한국형 미스터리 비주얼노벨 어드벤처. 메인 클라이언트 개발자로 게임 시스템 전반을 만들고, TOEI 퍼블리싱 계약부터
  최적화·배포·QA까지 출시 과정을 이끌었습니다. 국내외 수상·선정 13건.
start: 2023-03-01
end: 2026-10-20
ongoing: true
featured: true
hidden: false
role: 메인 클라이언트 개발 (프로그래밍 리드)
team: 검귤단 (Black Tangerine)
tags:
  - Unity 6
  - C#
  - URP
  - Cinemachine
  - Spine
  - FMOD
  - Dialogue System
  - Steamworks
  - AI 활용
  - 팀 프로젝트
thumbnail: /images/killa-title.png
video: https://www.youtube.com/watch?v=tFxTB1mJmiE
highlights:
  - 2026년 3월 TOEI와 퍼블리싱 계약 체결 — 인디 프로젝트를 상용 출시 단계까지 끌어올림
  - Steam 데모 공개, 한국어·영어·일본어·중국어 간체/번체 5개 언어 지원
  - GIGDC 일반부문 대상 · SQOOL Award 대상 · 반다이남코 GYAAR Studio Award 2등 등 수상·선정 13건
  - 출시 파이프라인 직접 구축 — 씬 최적화, Normal/GameShow/QA 3종 빌드, Steamworks 연동, QA 전용 빌드·툴
  - Unity MCP로 AI 에이전트를 에디터에 연결해 최적화 감사·리팩터링·QA 툴 제작에 활용하고, 도구의 한계를 문서화해 팀 워크플로로
    정립
  - Bootstrap 씬 + 전역 매니저 14종 안정화 감사, 세이브/로드 전면 개편
links:
  - label: Steam
    url: https://store.steampowered.com/app/2524200/KILLA/
  - label: 퍼블리셔 TOEI GAMES
    url: https://store.steampowered.com/publisher/toeigames
  - label: GitHub
    url: https://github.com/hepachupa
---
## 기술 스택

Unity 6 (URP) · C# · PixelCrushers Dialogue System / Save System (Lua 변수) · Spine · FMOD · Cinemachine · Steamworks · Unity MCP (AI 에이전트 연동)

## 퍼블리싱: 인디 프로젝트에서 상용 출시로

교내 지원사업과 공모전으로 시작한 KILLA는 국내외 수상·선정 13건으로 완성도를 검증받았고, 2026년 3월 **TOEI와 퍼블리싱 계약**을 맺었습니다. 퍼블리셔와 일하면서 "재미있는 데모"가 아니라 **일정 안에 안정적으로 출시되는 빌드**를 만드는 것이 클라이언트 개발자의 일이 되었습니다. 아래는 그 과정에서 맡은 일입니다.

## 1. 최적화

**문제** — 장소(LOC) 씬이 늘어나면서 씬마다 불필요한 컴포넌트, 중복 라이트·볼륨, 미사용 오브젝트가 쌓였고, 사람이 일일이 확인하기엔 씬 수가 너무 많았습니다.

**해결** — 씬을 자동으로 훑어 문제 항목을 리포트하는 에디터 툴 `SceneOptimAudit`을 만들고, 여러 LOC 씬에 일괄 최적화 패스를 진행했습니다. 구버전 Post Processing Stack v2 설정은 URP Volume Profile로 이관했습니다.

**결과** — 최적화 대상을 사람의 감이 아니라 리포트 기준으로 관리하게 되었습니다.

## 2. 배포 · 빌드 파이프라인

**문제** — 전시용, QA용, 출시용 빌드마다 시작 지점과 설정이 달라 매번 손으로 바꿔야 했고, 실수가 곧 빌드 사고로 이어졌습니다.

**해결** — `BuildConfig`로 Normal / GameShow / QA 세 가지 빌드 모드를 분리하고, `StartPoint`(씬 + 스토리 레이어 + 스폰 위치 + 날짜 + 초기 Lua)로 어느 지점에서든 시작할 수 있게 했습니다. 전시 빌드에는 무인 운영(`AttractController`, `ExpoIdleWatcher`)과 요약 씬을, 출시 빌드에는 Steamworks 연동을 넣었습니다.

**결과** — 빌드 종류를 설정만으로 전환할 수 있게 되어 BIC 등 전시와 QA 빌드를 코드 수정 없이 내보냈습니다.

## 3. QA · 안정화

**문제** — 분기 서사 게임이라 특정 지점을 재현하려면 앞부분 대사를 전부 넘겨야 했고, 전역 매니저가 늘면서 중복 생성·초기화 순서 문제가 간헐적으로 터졌습니다.

**해결**

- `DEBUG_QA` 심볼로 묶은 QA 전용 대사 스킵(`QADialogueSkipper`)과 QA 빌드 모드로 재현 시간을 단축
- 전역 매니저 14종을 전수 감사 — DontDestroyOnLoad 중복 가드, 실행 순서 정리, Lua 변수명 `GLOBAL.XXX` 규칙으로 통일
- `GlobalVarAuditor`로 대화 데이터베이스의 변수 오탈자·미사용 변수를 자동 검출
- 세이브/로드 전면 개편: 슬롯 불일치, 씬 전환 중 저장 타이밍, NPC 위치 복원, 대화 중복 재생 문제 해결
- 프로젝트 손상(URP 렌더러, 스크립팅 심볼, 자막 프리팹) 발생 시 Git 이력으로 복구

**결과** — QA가 "처음부터 다시 플레이"가 아니라 "원하는 지점에서 바로 확인"하는 방식으로 바뀌었습니다.

## 4. AI를 개발 도구로 쓰기

**방식** — Unity MCP로 AI 에이전트를 Unity 에디터에 직접 연결해, 씬·컴포넌트 조회, 스크립트 작성과 리팩터링, 감사용 에디터 툴 제작에 활용했습니다. 위의 최적화 감사, 전역 매니저 점검, QA 툴 대부분이 이 방식으로 만들어졌습니다.

**검증** — AI 결과물을 그대로 믿지 않았습니다. 도구를 쓰면서 발견한 한계(중복 메서드 오탐, 코드 실행 기능 미동작, 파일 해시 불일치 시 편집 실패)를 문서로 정리하고, 어떤 작업을 AI에 맡기고 어떤 작업은 직접 확인할지 기준을 세워 팀 워크플로로 만들었습니다.

**결과** — 반복적인 감사·리팩터링 작업은 AI에 맡기고, 저는 구조 설계와 최종 검증에 시간을 쓸 수 있었습니다.

## 게임 시스템

- **분기 서사 구조** — 스토리 진행 단계를 `StoryLayer`로 정의하고 `StoryLayerController`가 레이어별 오브젝트 세트를 전환. `PortalStoryRouter` / `PortalRequirementRouter`로 조건부 씬 이동
- **카메라** — Cinemachine Global/Local 카메라 매니저로 컷신 ↔ 플레이 전환, 그룹 대화용 마스터/투샷/클로즈업 연출, Impulse 카메라 셰이크
- **게임플레이** — 심문(`InterrogationManager`), 범인 추리 퀴즈, 기호 조합(`SympathyManager`), 카세트 플레이어 미니게임, 천장 걷기 중력 존
- **게임오버** — 콘텐츠별 목숨을 Lua 변수로 관리, 게임오버마다 자동 저장, 누적 횟수에 따른 히든 엔딩
- **UI** — 아이템/퀘스트 분리 알림 큐, `QuestCatalog` ScriptableObject, 로컬라이제이션 연동 `ConfirmDialog`, Spine 말하기 애니메이션 홀드

