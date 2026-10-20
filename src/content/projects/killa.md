---
title: KILLA
summary: 한국형 미스터리 비주얼노벨 어드벤처. 팀의 유일한 프로그래머로 게임의 모든 코드를 작성하고, TOEI 퍼블리싱 계약 이후 최적화·배포·QA까지 출시 과정을 맡았습니다. 국내외 수상·선정 12건.
start: 2022-07-01
end: 2026-10-20
ongoing: true
featured: true
hidden: false
role: 단독 프로그래머 — 게임 전체 코드 작성
team: 검귤단 (Black Tangerine) — 프로그래머 1인
contribution: 프로그래밍 100%
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
  - 팀 내 유일한 프로그래머 — 시스템 설계부터 툴, 빌드, 출시 대응까지 게임의 모든 코드를 직접 작성
  - 2026년 4월 TOEI Games와 퍼블리싱 계약, GIGDC 대상 · SQOOL Award 대상 · GYAAR Studio 2등 등 수상·선정 12건
  - 단방향 진행 구조를 회차 플레이 구조로 8개월 만에 전면 개편 — 씬 30개 이상을 약 15개로 재구성
  - Claude와 원인을 분석하고 A/B 측정으로 검증해 시작 시 멈춤 제거 — 노이즈 생성 352ms → 0ms
  - Claude와 빌드 리포트를 분석해 압축되지 않던 이미지 1,645장을 자동 변환 — 설치 용량 6.4GB → 4.7GB(−27%)
  - 기획·사운드 작업이 코드 수정 없이 반영되도록 툴 제작 — 인스펙터 기반 씬 분기, 대사별 효과음 자동 재생
  - 도쿄게임쇼·gamescom·BitSummit·Unite Seoul 등 5개국 전시 30회 이상, Steam 데모 5개 언어 지원
links:
  - label: Steam
    url: https://store.steampowered.com/app/2524200/KILLA/
  - label: 퍼블리셔 TOEI Games
    url: https://store.steampowered.com/publisher/toeigames
  - label: GitHub
    url: https://github.com/hepachupa
  - label: "기사: TGS 2026 토에이 게임즈 부스 출전 (인벤)"
    url: https://www.inven.co.kr/webzine/news/?news=321276
  - label: "기사: BIC 2026 토에이 게임즈 부스 출전 (인벤)"
    url: https://www.inven.co.kr/webzine/news/?news=319595
---
## 게임 소개

잔혹동화 같은 인형극 세계에서 용의자들의 기억을 들여다보며 진실을 추리하는 미스터리 어드벤처입니다. 장소를 오가며 NPC와 대화하고 단서를 모으며, 선택에 따라 결말이 달라집니다.

**기획 방향** — 일반적인 추리 게임은 사건이 일어나면 현장의 증거와 증언을 논리적으로 따져 범인을 찾는 데 집중합니다. KILLA는 범인 찾기보다 **인물들 사이의 관계**와, 각자가 사건에 얽히게 된 **이야기**에 집중합니다. 짧은 행복이 갈등과 오해를 거쳐 비극으로 이어지는 과정을 플레이어가 따라가는 구조입니다. 그래서 클라이언트에서는 인물별 관계와 스토리 진행 상태를 정확하게 추적하고, 플레이어의 선택을 결말까지 이어 주는 시스템이 핵심 과제가 되었습니다.

## 기술 스택

Unity 6 (URP) · C# · PixelCrushers Dialogue System / Save System (Lua 변수) · Spine · FMOD · Cinemachine · Steamworks · Unity MCP + Claude (AI 에이전트 연동)

## 개발 방식: AI를 개발 도구로 활용

**방식** — 출시 준비 단계부터는 Unity MCP로 Claude를 Unity 에디터에 직접 연결해 개발했습니다. 씬·컴포넌트 조회, 스크립트 작성과 리팩터링, 감사용 에디터 툴 제작에 활용했으며, 아래 작업 중 1번의 상태 흐름 전수 조사, 3번의 최적화 감사, 5번의 전역 매니저 점검과 QA 툴 대부분이 이 방식으로 만들어졌습니다.

**검증** — AI 결과물을 그대로 믿지 않았습니다. 도구를 사용하며 발견한 한계(중복 메서드 오탐, 코드 실행 기능 미동작, 파일 해시 불일치 시 편집 실패)를 문서로 정리하고, 어떤 작업을 AI에 맡기고 어떤 작업은 직접 확인할지 기준을 세워 팀 워크플로로 만들었습니다. Claude가 제안한 수정도 기존 구조와 맞는지 먼저 검토하고, 프로젝트의 다른 시스템과 같은 패턴을 따르도록 직접 조정했습니다.

**결과** — 반복적인 감사·리팩터링 작업은 AI에 맡기고, 구조 설계와 최종 검증에 시간을 집중할 수 있었습니다.

## 퍼블리싱: 인디 프로젝트에서 상용 출시로

게임개발연합동아리 브릿지에서 시작해 스마일게이트 멤버십에 선정된 KILLA는 국내외 수상·선정 12건으로 완성도를 검증받았고, 2026년 4월 **TOEI Games와 퍼블리싱 계약**을 맺었습니다. 퍼블리셔와 일하면서 "재미있는 데모"가 아니라 **일정 안에 안정적으로 출시되는 빌드**를 만드는 것이 클라이언트 개발자의 일이 되었습니다. 아래는 그 과정에서 맡은 일이며, 30회 이상의 전시 이력은 페이지 맨 아래에 정리했습니다.

*각 항목의 코드는 접어 두었습니다. 퍼블리싱 중인 상용 프로젝트라 구조가 드러나는 부분만 발췌했으며, 스포일러가 될 수 있는 변수명과 씬 이름, 인스펙터 툴팁과 일부 필드·예외 처리는 제외하고 축약했습니다.*

## 팀 협업: 다른 직군이 기다리지 않게

KILLA는 게임개발연합동아리 브릿지에서 시작해 지금까지 같은 팀(검귤단)으로 이어 온 프로젝트입니다. 프로그래머는 한 명이지만 기획·아트·사운드 팀원과 함께 일하며, 다른 직군의 작업이 프로그래머를 거치지 않고 게임에 반영되는 구조를 만드는 데 집중했습니다.

- **기획** — 같은 문이라도 스토리 단계·퀘스트·변수에 따라 다른 곳으로 이동하는 분기를 기획자가 인스펙터에서 경로만 추가해 만들 수 있게 설계 (`PortalStoryRouter`)
- **사운드** — 대화 데이터에 효과음만 지정하면 대사와 함께 재생되는 툴로, 씬 수정과 반복 입력 없이 사운드를 반영 (6번)
- **아트** — 이미지 압축 문제의 원인을 찾아 아티스트가 그린 원본의 화면 결과를 바꾸지 않는 방식으로 해결 (3-3)
- **전시·퍼블리셔** — 30회 이상의 전시에 맞춰 무인 운영이 되는 전시 빌드를 만들고, 퍼블리셔 일정에 맞춰 QA 빌드를 내보냄 (4번)

## 1. 회차 플레이 구조 전면 개편 (8개월)

**문제** — 기획 의도는 엔딩 후 처음부터 다시 플레이하는 회차 구조였지만, Claude로 프로젝트 전체의 상태 흐름을 조사한 결과 실제 구현은 한 번 지나간 장면에 다시 오지 않는다는 전제의 단방향 구조였습니다. 진행 상태가 30개 이상의 씬과 오브젝트에 분산되어 있어, 같은 장면을 다시 지나가면 상태가 어긋났습니다.

**해결** — 약 130개 상태 변수의 사용처를 찾는 전수 조사와 점검 도구 제작은 Claude에 맡기고, 새 구조 설계와 최종 판단은 직접 담당했습니다.

- 30개 이상의 씬을 장소 기준 약 15개로 재구성
- 흩어진 상태 변수를 대화 시스템의 전역 변수(`GLOBAL.XXX`)로 통합
- 스토리 단계에 따라 오브젝트를 전환하는 레이어 구조(`StoryLayerController`), 세이브 시스템, ScriptableObject 데이터를 새로 설계
- AI가 작성한 코드 중 프레임 수로 타이밍을 추측하거나 매니저 생성 순서에 의존하는 부분은 복원 완료 이벤트와 명시적 실행 순서로 교체

**결과** — 2022년부터 개발해 온 프로젝트를 8개월 만에 회차 플레이 구조로 전면 개편했습니다.

### 1-1. 코드: 스토리 단계를 데이터로 관리 — `StoryLayerController`

씬마다 조건문을 분산하는 대신, 스토리 단계 이름과 **같은 이름의 오브젝트 묶음만 활성화하는** 방식으로 분기를 단순화했습니다. 시나리오가 늘어도 씬에 레이어 오브젝트만 추가하면 되며, 코드는 수정할 필요가 없습니다.

**개선 이력:** 초기 구현은 세이브 복원이 끝났을 것이라 가정하고 **3프레임을 대기한 뒤** 적용했습니다. 복원이 늦어지는 씬에서는 잘못된 레이어가 활성화될 수 있는 구조였습니다. 현재는 세이브 시스템의 **복원 완료 이벤트(`saveDataApplied`)에 맞춰 적용**하고, 세이브를 거치지 않는 로드에만 폴백으로 대기하도록 변경했습니다. 같은 프로젝트의 스폰 처리와 같은 패턴으로 맞췄고, 단계 이름에 맞는 레이어가 없으면 경고를 출력해 데이터 오타를 즉시 발견할 수 있게 했습니다. 직렬화 필드와 공개 메서드는 유지해 기존 씬과 호출부를 수정할 필요가 없습니다.

<details class="code-fold">
<summary>코드 보기 — StoryLayerController</summary>

```csharp
public class StoryLayerController : MonoBehaviour
{
    public Transform storyLayersRoot;
    public bool applyOnStart = true;
    [Min(0)] public int fallbackFrameTimeout = 3; // 세이브를 거치지 않는 로드 대비

    private readonly List<GameObject> _layers = new List<GameObject>();
    private readonly HashSet<string> _layerNames = new HashSet<string>(StringComparer.Ordinal);
    private bool _appliedOnce;

    private void Awake()     => BuildCache();
    private void OnEnable()  => SaveSystem.saveDataApplied += HandleSaveDataApplied;
    private void OnDisable() => SaveSystem.saveDataApplied -= HandleSaveDataApplied;

    // 모든 Saver(위치 등) 복원이 끝난 직후 호출됨 → 프레임 수 추측 없이 정확한 시점에 적용
    private void HandleSaveDataApplied()
    {
        if (applyOnStart) ApplyFromLua();
    }

    // 폴백: 복원 이벤트가 오지 않는 일반 씬 로드
    private IEnumerator Start()
    {
        if (!applyOnStart) yield break;
        while (DialogueManager.instance == null) yield return null;
        for (int f = 0; f < fallbackFrameTimeout && !_appliedOnce; f++) yield return null;
        if (!_appliedOnce) ApplyFromLua();
    }

    public void ApplyFromLua()
    {
        if (storyLayersRoot == null) return;
        string step = DialogueLua.GetVariable(StoryVars.StoryStep).asString;

        if (!string.IsNullOrEmpty(step) && !_layerNames.Contains(step))
            Debug.LogWarning($"STORYSTEP '{step}' 에 맞는 레이어가 없습니다.", this); // 데이터 오타 조기 발견

        foreach (var go in _layers)
            go.SetActive(go.name == step); // 현재 단계와 이름이 같은 레이어만 활성화

        _appliedOnce = true;
    }
}
```

</details>

### 1-2. 코드: 조건부 씬 이동 — `PortalStoryRouter`

같은 문이라도 스토리 단계, 퀘스트 상태, 변수에 따라 다른 목적지로 이동시켜야 했습니다. **조건이 있는 경로는 배열 순서대로 우선 검사**하고, 하나도 맞지 않으면 **조건 없는 기본 경로**로 이동하도록 설계해, 기획자가 인스펙터에서 경로를 추가하는 것만으로 분기를 만들 수 있게 했습니다.

<details class="code-fold">
<summary>코드 보기 — PortalStoryRouter</summary>

```csharp
public bool TryResolve(out string scene, out string storyStep, out string spawnId)
{
    scene = storyStep = spawnId = "";
    string current = StoryFlow.GetStoryStep();
    if (string.IsNullOrEmpty(current) || routes == null) return false;

    Route fallback = null;
    foreach (var r in routes)
    {
        if (r == null || !string.Equals(r.fromStoryStep, current, StringComparison.Ordinal))
            continue;

        if (!r.HasCondition)
        {
            // 조건 없는 경로는 기본 분기로 보관 (가장 먼저 만난 것 우선)
            if (fallback == null) fallback = r;
            continue;
        }

        // 조건부 경로: 만족하면 즉시 채택 (배열 순서 = 우선순위)
        if (ConditionMet(r)) { Assign(r, out scene, out storyStep, out spawnId); return true; }
    }

    if (fallback != null) { Assign(fallback, out scene, out storyStep, out spawnId); return true; }
    return false; // 매칭 없음 → 호출부의 기본 이동 처리에 위임
}

private static bool ConditionMet(Route r)
{
    bool varOk   = string.IsNullOrEmpty(r.requiredBoolVariable)
                   || DialogueLua.GetVariable(r.requiredBoolVariable).asBool;
    bool questOk = string.IsNullOrEmpty(r.requiredQuest)
                   || MatchesQuestState(QuestLog.GetQuestState(r.requiredQuest), r.requiredQuestState);
    bool luaOk   = string.IsNullOrWhiteSpace(r.requiredLuaCondition)
                   || Lua.IsTrue(r.requiredLuaCondition);
    return varOk && questOk && luaOk;
}
```

</details>


## 2. 시점 구조와 연출

- 콘텐츠에 따라 **3D 사이드뷰, 2D 화면, 3인칭 쿼터뷰**를 오가는 시점 구조를 구현해 한 가지 시점의 단조로움을 해소
- Spine 애니메이션과 Cinemachine 카메라 연출로 스테이지를 구성하고, 플레이어가 NPC와 직접 상호작용한다고 느끼도록 콘텐츠별 연출 설계
- 전시에서 반응이 밋밋한 구간을 찾아 애니메이션과 셰이더를 추가해 긴장감과 깊이감을 보강 — 이후 전시에서 "화면이 풍부해졌다"는 평가

<img src="/images/killa-symbol-fx.webp" alt="KILLA 기호 조합 장면 연출" loading="lazy" decoding="async" />

<img src="/images/killa-stage-fx.webp" alt="KILLA 추리 장면 연출" loading="lazy" decoding="async" />

<img src="/images/killa-evidence-ui-v2.webp" alt="KILLA 증거 선택 UI 연출" loading="lazy" decoding="async" />

*(현재 공개 가능 자료 - Unity 에디터 캡처)*

## 3. 최적화

### 3-1. 씬 최적화 감사 툴

**문제** — 장소(LOC) 씬이 늘어나면서 씬마다 불필요한 컴포넌트, 중복 라이트·볼륨, 미사용 오브젝트가 쌓였고, 수작업으로 확인하기에는 씬 수가 많았습니다.

**해결** — 씬을 자동으로 검사해 문제 항목을 리포트하는 에디터 툴 `SceneOptimAudit`을 만들고, 여러 LOC 씬에 일괄 최적화 패스를 진행했습니다. 구버전 Post Processing Stack v2 설정은 URP Volume Profile로 이관했습니다.

**결과** — 최적화 대상을 사람의 감이 아니라 리포트 기준으로 관리하게 되었습니다.

### 3-2. 시작 시 멈춤 제거 — 노이즈 생성 352ms → 0ms

**문제** — 게임을 시작하면 로딩 중 화면이 약 4초간 검게 보이는 현상이 있었습니다. Profiler로 측정하자 그 구간에서 후처리 플러그인(VolFx)이 시작할 때마다 노이즈 이미지를 매번 새로 그리는 작업이 가장 큰 비중을 차지하는 것으로 나타났습니다.

**AI 활용** — Claude에게 원인 코드 분석과 개선안 비교를 맡겼습니다. 대안 중 생성 시점만 늦추는 방법은 멈춤이 다른 장면으로 옮겨갈 뿐이라 버리고, 미리 그려 둔 이미지를 불러오는 방법을 선택했습니다.

**검증** — 개선 폭을 숫자로 확인하기 위해, 같은 빌드에서 원본과 개선을 번갈아 실행하는 A/B 측정 도구를 만들게 하고 각 3회 측정했습니다. 화면 결과가 원본과 같은지도 픽셀 단위로 비교하게 했습니다.

| 지표 | 원본 | 개선 | 차이 |
|---|---|---|---|
| 노이즈 생성 시간 | 352ms | 0ms | 제거 |
| 시작 직후 두 번째 프레임 | 766ms | 425ms | −44% |
| 노이즈 이미지 메모리 | 16MB | 4MB | −75% |

*i7-13700F / RTX 5060, Development 빌드, 1920×1080 기준*

<img src="/images/killa-perf-timeline.webp" alt="시작 직후 두 번째 프레임 Profiler Timeline 전후 비교" loading="lazy" decoding="async" />

<img src="/images/killa-perf-hierarchy.webp" alt="시작 직후 두 번째 프레임 Profiler Hierarchy 전후 비교" loading="lazy" decoding="async" />

*같은 빌드의 원본(위)과 개선(아래)을 Profiler로 캡처한 시작 직후 두 번째 프레임 — 노이즈 생성 구간(352ms)이 사라짐*

**발견** — 처음 측정에서는 노이즈 생성 하나가 약 4초를 차지하는 것처럼 보였지만, 실제 비용은 352ms였습니다. 상세 측정 모드(Deep Profiling)가 켜져 있으면 작은 함수를 많이 부르는 코드일수록 실제보다 훨씬 느리게 측정되기 때문입니다(같은 코드가 352ms vs 3,227ms). AI의 분석도, 측정 도구의 숫자도 그대로 믿지 않고 같은 조건에서 다시 재는 원칙을 이 과정에서 세웠습니다.

### 3-3. 설치 용량 감축 — 6.4GB → 4.7GB (−27%)

**문제** — 출시용 빌드가 6.4GB였고, 대부분이 압축되지 않은 이미지였습니다. 압축 설정을 해 두었는데도 용량이 줄지 않고 있었습니다.

**AI 활용** — "압축 설정인데 왜 압축이 안 됐는가"를 질문으로 정하고, Claude에게 빌드 리포트와 이미지 설정의 교차 분석을 맡겼습니다. 원인은 이미지 크기가 4의 배수가 아니면 압축이 적용되지 않는 엔진 규칙이었고, 아티스트가 그린 크기를 그대로 쓴 이미지 대부분이 여기에 해당했습니다.

**판단** — AI가 제시한 방법 중 이미지 크기를 줄이는 방법은 그림이 미세하게 바뀌어 버렸고, 여러 이미지를 하나로 묶는 방법은 저사양 PC의 메모리가 늘 수 있어 택하지 않았습니다. 대신 가장자리에 투명 여백을 붙여 크기만 맞추고, 화면 위치는 그대로 유지하는 방법을 선택했습니다.

**검증** — 1,600여 장을 한꺼번에 바꾸는 작업이라, 자동 처리 도구에 백업·시범 적용(137장)·되돌리기 기능을 먼저 갖추게 한 뒤 전체에 적용했습니다. 결과는 원본과 수치로 비교해 눈으로 구분하기 어려운 수준인지 확인했고, 영상 17개도 화질을 유지하는 선에서 다시 인코딩했습니다.

| 항목 | 이전 | 이후 | 차이 |
|---|---|---|---|
| 출시용 빌드 전체 | 6,418MB | 4,675MB | −27% |
| 이미지 | 5,151MB | 3,933MB | −1,218MB |
| 영상 | 873MB | 349MB | −60% |

<img src="/images/killa-bc7-compare.webp" alt="원본, 압축 결과, 차이 8배 확대 비교" loading="lazy" decoding="async" />

*왼쪽부터 원본 · 압축 결과 · 차이를 8배 확대한 이미지 — 차이가 거의 보이지 않음*

## 4. 배포 · 빌드 파이프라인

**문제** — 전시용, QA용, 출시용 빌드마다 시작 지점과 설정이 달라 매번 수동으로 변경해야 했고, 작은 실수가 빌드 사고로 이어졌습니다.

**해결** — `BuildConfig`로 Normal / GameShow / QA 세 가지 빌드 모드를 분리하고, `StartPoint`(씬 + 스토리 레이어 + 스폰 위치 + 날짜 + 초기 Lua)로 어느 지점에서든 시작할 수 있게 했습니다. 전시 빌드에는 무인 운영(`AttractController`, `ExpoIdleWatcher`)과 요약 씬을, 출시 빌드에는 Steamworks 연동을 넣었습니다.

**결과** — 빌드 종류를 설정만으로 전환할 수 있게 되어 BIC 등 전시와 QA 빌드를 코드 수정 없이 내보냈습니다.

### 4-1. 코드: 어디서든 시작하는 빌드 — `BuildConfig.StartPoint`

전시·QA 빌드를 코드 수정 없이 만들기 위해, "어디서부터 시작할지"를 **씬 + 스토리 단계 + 스폰 위치 + 날짜 + 초기 Lua**의 데이터 묶음으로 정의했습니다. ScriptableObject 하나로 Normal / GameShow / QA 모드를 전환합니다.

<details class="code-fold">
<summary>코드 보기 — BuildConfig.StartPoint</summary>

```csharp
[CreateAssetMenu(fileName = "BuildConfig", menuName = "Game/Build Config")]
public class BuildConfig : ScriptableObject
{
    public enum BuildMode { Normal = 0, GameShow = 1, QA = 2 }

    [Serializable]
    public class StartPoint
    {
        public string sceneName;   // 로드할 씬
        public string storyStep;   // 활성화할 스토리 레이어 이름
        public string spawnId;     // 스폰 포인트 이름
        public bool overrideDay = true;
        [Min(0)] public int day = 0;
        [TextArea(2, 8)] public string seedLua; // 퀘스트·플래그·아이템 초기 상태

        public bool IsValid => !string.IsNullOrEmpty(sceneName);
    }

    [SerializeField] private BuildMode mode = BuildMode.Normal;
    [SerializeField] private StartPoint gameShowStart = new StartPoint();
    [SerializeField, Range(30f, 600f)] private float idleTimeoutSeconds = 300f; // 전시장 무입력 시 복귀

    public bool IsGameShowMode => mode == BuildMode.GameShow;
    public bool IsQAMode => mode == BuildMode.QA;
    public StartPoint GameShowStart => gameShowStart;
}
```

</details>


## 5. QA · 안정화

**문제** — 분기 서사 게임이라 특정 지점을 재현하려면 앞부분 대사를 모두 진행해야 했고, 전역 매니저가 늘면서 중복 생성·초기화 순서 문제가 간헐적으로 발생했습니다.

**해결**

- `DEBUG_QA` 심볼로 묶은 QA 전용 대사 스킵(`QADialogueSkipper`)과 QA 빌드 모드로 재현 시간을 단축
- 전역 매니저 14종을 전수 감사 — DontDestroyOnLoad 중복 가드, 실행 순서 정리, Lua 변수명 `GLOBAL.XXX` 규칙으로 통일
- `GlobalVarAuditor`로 대화 데이터베이스의 변수 오탈자·미사용 변수를 자동 검출
- 세이브/로드 전면 개편: 슬롯 불일치, 씬 전환 중 저장 타이밍, NPC 위치 복원, 대화 중복 재생 문제 해결
- 프로젝트 손상(URP 렌더러, 스크립팅 심볼, 자막 프리팹) 발생 시 Git 이력으로 복구

**결과** — QA가 "처음부터 다시 플레이"가 아니라 "원하는 지점에서 바로 확인"하는 방식으로 바뀌었습니다.

## 6. 협업 툴: 대사별 FMOD 효과음 자동 재생

**문제** — 대사에 맞춰 효과음을 넣으려면 씬에 이벤트를 따로 배치하거나, 대사 노드마다 이벤트를 일일이 입력해야 했습니다. 효과음을 추가하거나 교체할 때마다 씬 수정과 반복 입력 작업이 필요했습니다.

**해결** — 대화 데이터베이스의 각 대사 항목에 FMOD 이벤트를 지정해 두면, 그 대사가 시작될 때 자동으로 재생하는 런타임 플레이어 `DialogueFmodLocalPlayer`를 만들었습니다.

- `RuntimeInitializeOnLoadMethod`로 게임 시작 시 스스로 설치 — 씬과 프리팹을 하나도 수정하지 않음
- 이벤트를 경로가 아닌 GUID로 조회해, FMOD에서 이벤트 이름이나 폴더를 변경해도 연결이 유지됨
- 2D 원샷 이벤트만 재생하고 다른 이벤트·버스는 제어하지 않아 BGM과 기존 씬 이벤트에 영향 없음
- 같은 대사가 여러 경로로 중복 통지되어도 한 번만 재생하고, 잘못된 GUID나 로드되지 않은 뱅크는 대화·항목 ID와 함께 경고로 출력

**결과** — 효과음 추가·교체가 대화 데이터 수정만으로 끝나, 사운드 작업이 코드나 씬 수정 없이 게임에 즉시 반영됩니다.

<details class="code-fold">
<summary>코드 보기 — DialogueFmodLocalPlayer.OnLine</summary>

```csharp
// 대사가 준비되는 시점에 해당 항목의 FMOD 이벤트를 재생 (발췌)
private void OnLine(Subtitle subtitle)
{
    var entry = subtitle?.dialogueEntry;
    if (entry?.fields == null || entry.isRoot || entry.isGroup) return;
    if (string.IsNullOrEmpty(Field.LookupValue(entry.fields, GuidField))) return; // 지정 안 된 대사는 기존 방식 그대로

    // 여러 컨트롤러·캐치업 경로로 같은 대사가 두 번 와도 한 번만 재생
    if (ReferenceEquals(lastSubtitle, subtitle) && lastFrame == Time.frameCount) return;
    lastSubtitle = subtitle;
    lastFrame = Time.frameCount;

    if (!TryReadGuid(entry, out var guid)) { Warn(entry, "Invalid event GUID."); return; }

    var description = RuntimeManager.GetEventDescription(guid); // 경로가 아닌 GUID로 조회
    description.isOneshot(out var oneShot);
    description.is3D(out var spatial);
    if (!oneShot || spatial) { Warn(entry, "Only 2D one-shot events are played."); return; }

    description.createInstance(out var instance);
    instance.start();
    instance.release(); // 원샷: 재생이 끝나면 FMOD가 자동 해제
}
```

</details>

## 게임 시스템

- **분기 서사 구조** — 스토리 진행 단계를 `StoryLayer`로 정의하고 `StoryLayerController`가 레이어별 오브젝트 세트를 전환. `PortalStoryRouter` / `PortalRequirementRouter`로 조건부 씬 이동
- **인벤토리** — 아이템을 ScriptableObject로 정의하고 id 기반으로 관리. 아이템마다 사용 가능한 씬·스토리 단계를 데이터로 지정해, 대화 중 인벤토리를 열어 아이템을 제출하면 그 결과가 대화 변수로 돌아가 분기에 쓰이도록 연결(`InventoryDialogueBridge`). 세이브 시스템 연동, 대화 데이터에서 소지 여부를 바로 확인하는 Lua 조건 함수, 수량 변경 이벤트로 퀘스트 조건·알림 UI와 연결
- **호감도** — NPC별 호감도를 대화 시스템 전역 변수로 저장해 세이브·로드와 대화 분기에서 그대로 사용. 하루 행동력 안에서 대화할 NPC를 고르는 구조로, 남은 행동력을 따로 저장하지 않고 "오늘 대화한 NPC 수"로 매번 계산해 세이브 로드 후에도 상태가 어긋나지 않게 설계
- **추리 콘텐츠** — 장면마다 조작 방식이 다른 추리·퍼즐 미니게임 여러 종 구현 (스포일러 방지를 위해 세부 내용은 생략)
- **카메라** — Cinemachine Global/Local 카메라 매니저로 컷신 ↔ 플레이 전환, 그룹 대화용 마스터/투샷/클로즈업 연출, Impulse 카메라 셰이크
- **게임오버** — 콘텐츠별 목숨을 Lua 변수로 관리, 게임오버마다 자동 저장
- **UI** — 아이템/퀘스트 분리 알림 큐, `QuestCatalog` ScriptableObject, 로컬라이제이션 연동 `ConfirmDialog`, Spine 말하기 애니메이션 홀드

## 전시 이력 — 30회 이상 · 5개국

**해외**
- 도쿄게임쇼 2024 **Selected Indie 80** (일본)
- 도쿄게임쇼 2025 · 2026 (일본) — 2026년은 TOEI Games 부스
- **gamescom 2024** Indie Arena Booth (독일)
- BitSummit Drift 2024 · BitSummit PUNCH 2026 (일본 교토)
- Taipei Game Show 2025 (대만)
- Tokyo Indie Games Summit 2025 (일본)
- LA COMIC-CON (미국), ANIMAGIC (독일)

**국내**
- G-STAR 2023 · 2024 인디 쇼케이스
- BIC 2023 · 2026 (부산인디커넥트 페스티벌)
- 버닝비버 2023 · 2024 — 2년 연속 '올해의 버닝비버'
- 플레이엑스포 2024 Indie Arcade
- Unite Seoul 2026 Legendary & Indie Showcase

외 일러스타 페스, 서울팝콘, GXG, GLS, UGDAP, 도쿄 게임 던전, GAME AiCON 등
