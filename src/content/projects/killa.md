---
title: KILLA
summary: 한국형 미스터리 비주얼노벨 어드벤처. 팀의 유일한 프로그래머로 게임의 모든 코드를 작성하고, TOEI 퍼블리싱 계약 이후 최적화·배포·QA까지 출시 과정을 맡았습니다. 국내외 수상·선정 13건.
tldr:
  - 팀의 유일한 프로그래머로 게임의 모든 코드를 작성 — 시스템 설계부터 빌드·출시 대응까지
  - TOEI GAMES 퍼블리싱 · 수상·선정 13건 · 5개국 전시 30회 이상
  - 출시를 위한 최적화·배포·QA 파이프라인과 AI 에이전트 기반 개발 워크플로 구축
start: 2023-03-01
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
  - 2026년 3월 TOEI와 퍼블리싱 계약 체결 — 인디 프로젝트를 상용 출시 단계까지 끌어올림
  - Steam 데모 공개, 한국어·영어·일본어·중국어 간체/번체 5개 언어 지원
  - GIGDC 일반부문 대상 · SQOOL Award 대상 · 반다이남코 GYAAR Studio 콘테스트 2등 등 수상·선정 13건
  - 도쿄게임쇼·gamescom·BitSummit·타이베이 게임쇼 등 5개국 전시 30회 이상
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

## 전시 이력 — 30회 이상 · 5개국

**해외**
- 도쿄게임쇼 2024 **Selected Indie 80** (일본)
- 도쿄게임쇼 2025 · 2026 (일본) — 2026년은 TOEI GAMES 부스
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

외 일러스타 페스, 서울팝콘, GXG, GLS, UGDAP, 도쿄 게임 던전, GAME AiCON 등

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

## 핵심 코드 발췌

퍼블리싱 중인 상용 프로젝트라 구조가 드러나는 부분만 일부 발췌했습니다. 스포일러가 될 수 있는 변수명과 씬 이름, 인스펙터 툴팁과 일부 필드·예외 처리는 빼고 줄였습니다.

### 1. 스토리 단계를 데이터로 관리 — `StoryLayerController`

씬마다 조건문을 흩어 두는 대신, 스토리 단계 이름과 **같은 이름의 오브젝트 묶음만 켜는** 방식으로 분기를 단순하게 만들었습니다. 시나리오가 늘어도 씬에 레이어 오브젝트만 추가하면 되고, 코드는 그대로입니다.

**개선 이력:** 처음에는 "세이브 복원이 끝났겠지" 하고 **3프레임을 기다린 뒤** 적용했습니다. 복원이 늦어지는 씬에서는 잘못된 레이어가 켜질 수 있는 구조였습니다. 지금은 세이브 시스템의 **복원 완료 이벤트(`saveDataApplied`)에 맞춰 적용**하고, 세이브를 거치지 않는 로드에만 폴백으로 대기하도록 바꿨습니다. 같은 프로젝트의 스폰 처리와 같은 패턴으로 맞췄고, 단계 이름에 맞는 레이어가 없으면 경고를 띄워 데이터 오타를 바로 잡을 수 있게 했습니다. 직렬화 필드와 공개 메서드는 그대로 둬서 기존 씬과 호출부는 수정할 필요가 없습니다.

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

### 2. 조건부 씬 이동 — `PortalStoryRouter`

같은 문이라도 스토리 단계, 퀘스트 상태, 변수에 따라 다른 곳으로 보내야 했습니다. **조건이 있는 경로는 배열 순서대로 우선 검사**하고, 하나도 맞지 않으면 **조건 없는 기본 경로**로 보내도록 해서, 기획자가 인스펙터에서 경로를 추가하는 것만으로 분기를 만들 수 있게 했습니다.

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

### 3. 어디서든 시작하는 빌드 — `BuildConfig.StartPoint`

전시·QA 빌드를 코드 수정 없이 만들기 위해, "어디서부터 시작할지"를 **씬 + 스토리 단계 + 스폰 위치 + 날짜 + 초기 Lua**의 데이터 묶음으로 정의했습니다. ScriptableObject 하나로 Normal / GameShow / QA 모드를 전환합니다.

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

## 게임 시스템

- **분기 서사 구조** — 스토리 진행 단계를 `StoryLayer`로 정의하고 `StoryLayerController`가 레이어별 오브젝트 세트를 전환. `PortalStoryRouter` / `PortalRequirementRouter`로 조건부 씬 이동
- **카메라** — Cinemachine Global/Local 카메라 매니저로 컷신 ↔ 플레이 전환, 그룹 대화용 마스터/투샷/클로즈업 연출, Impulse 카메라 셰이크
- **게임플레이** — 심문(`InterrogationManager`), 범인 추리 퀴즈, 기호 조합(`SympathyManager`), 카세트 플레이어 미니게임, 천장 걷기 중력 존
- **게임오버** — 콘텐츠별 목숨을 Lua 변수로 관리, 게임오버마다 자동 저장, 누적 횟수에 따른 히든 엔딩
- **UI** — 아이템/퀘스트 분리 알림 큐, `QuestCatalog` ScriptableObject, 로컬라이제이션 연동 `ConfirmDialog`, Spine 말하기 애니메이션 홀드

