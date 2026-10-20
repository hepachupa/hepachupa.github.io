---
title: KILLA
summary: 한국형 미스터리 비주얼노벨 어드벤처. 팀의 유일한 프로그래머로 게임의 모든 코드를 작성하고, TOEI 퍼블리싱 계약 이후 최적화·배포·QA까지 출시 과정을 맡았습니다. 국내외 수상·선정 13건.
tldr:
  - 팀의 유일한 프로그래머로 게임의 모든 코드를 작성 — 시스템 설계부터 빌드·출시 대응까지
  - TOEI GAMES 퍼블리싱 · 수상·선정 13건 · 5개국 전시 30회 이상
  - 단방향 구조를 회차 플레이 구조로 8개월 만에 전면 개편 (씬 30개 이상 → 약 15개)
  - 출시를 위한 최적화·배포·QA 파이프라인과 Claude(AI) 기반 개발 워크플로 구축
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
  - 단방향 진행 구조를 회차 플레이 구조로 8개월 만에 전면 개편 — 씬 30개 이상을 약 15개로 재구성, 상태 변수 약 130개 통합
  - 3D 사이드뷰 · 2D 화면 · 3인칭 쿼터뷰를 오가는 시점 구조 구현, Spine·카메라·셰이더 연출
  - 대사별 FMOD 효과음 자동 재생 툴 제작 — 씬·코드 수정 없이 대화 데이터만으로 사운드 반영
  - 2026년 3월 TOEI와 퍼블리싱 계약 체결 — 인디 프로젝트를 상용 출시 단계까지 끌어올림
  - Steam 데모 공개, 한국어·영어·일본어·중국어 간체/번체 5개 언어 지원
  - GIGDC 일반부문 대상 · SQOOL Award 대상 · 반다이남코 GYAAR Studio 콘테스트 2등 등 수상·선정 13건
  - 도쿄게임쇼·gamescom·BitSummit·타이베이 게임쇼 등 5개국 전시 30회 이상
  - 출시 파이프라인 직접 구축 — 씬 최적화, Normal/GameShow/QA 3종 빌드, Steamworks 연동, QA 전용 빌드·툴
  - Unity MCP로 Claude를 에디터에 연결해 최적화 감사·리팩터링·QA 툴 제작에 활용하고, 도구의 한계를 문서화해 팀 워크플로로
    정립
  - Bootstrap 씬 + 전역 매니저 14종 안정화 감사, 세이브/로드 전면 개편
links:
  - label: Steam
    url: https://store.steampowered.com/app/2524200/KILLA/
  - label: 퍼블리셔 TOEI GAMES
    url: https://store.steampowered.com/publisher/toeigames
  - label: GitHub
    url: https://github.com/hepachupa
  - label: "기사: TGS 2026 토에이 게임즈 부스 출전 (인벤)"
    url: https://www.inven.co.kr/webzine/news/?news=321276
  - label: "기사: BIC 2026 토에이 게임즈 부스 출전 (인벤)"
    url: https://www.inven.co.kr/webzine/news/?news=319595
---
## 기술 스택

Unity 6 (URP) · C# · PixelCrushers Dialogue System / Save System (Lua 변수) · Spine · FMOD · Cinemachine · Steamworks · Unity MCP + Claude (AI 에이전트 연동)

## 개발 방식: AI를 개발 도구로 활용

**방식** — 출시 준비 단계부터는 Unity MCP로 Claude를 Unity 에디터에 직접 연결해 개발했습니다. 씬·컴포넌트 조회, 스크립트 작성과 리팩터링, 감사용 에디터 툴 제작에 활용했으며, 아래 작업 중 1번의 상태 흐름 전수 조사, 3번의 최적화 감사, 5번의 전역 매니저 점검과 QA 툴 대부분이 이 방식으로 만들어졌습니다.

**검증** — AI 결과물을 그대로 믿지 않았습니다. 도구를 사용하며 발견한 한계(중복 메서드 오탐, 코드 실행 기능 미동작, 파일 해시 불일치 시 편집 실패)를 문서로 정리하고, 어떤 작업을 AI에 맡기고 어떤 작업은 직접 확인할지 기준을 세워 팀 워크플로로 만들었습니다. Claude가 제안한 수정도 기존 구조와 맞는지 먼저 검토하고, 프로젝트의 다른 시스템과 같은 패턴을 따르도록 직접 조정했습니다.

**결과** — 반복적인 감사·리팩터링 작업은 AI에 맡기고, 구조 설계와 최종 검증에 시간을 집중할 수 있었습니다.

## 퍼블리싱: 인디 프로젝트에서 상용 출시로

교내 지원사업과 공모전으로 시작한 KILLA는 국내외 수상·선정 13건으로 완성도를 검증받았고, 2026년 3월 **TOEI와 퍼블리싱 계약**을 맺었습니다. 퍼블리셔와 일하면서 "재미있는 데모"가 아니라 **일정 안에 안정적으로 출시되는 빌드**를 만드는 것이 클라이언트 개발자의 일이 되었습니다. 아래는 그 과정에서 맡은 일이며, 30회 이상의 전시 이력은 페이지 맨 아래에 정리했습니다.

*각 항목의 코드는 접어 두었습니다. 퍼블리싱 중인 상용 프로젝트라 구조가 드러나는 부분만 발췌했으며, 스포일러가 될 수 있는 변수명과 씬 이름, 인스펙터 툴팁과 일부 필드·예외 처리는 제외하고 축약했습니다.*

## 1. 회차 플레이 구조 전면 개편 (8개월)

**문제** — 기획 의도는 엔딩 후 처음부터 다시 플레이하는 회차 구조였지만, Claude로 프로젝트 전체의 상태 흐름을 조사한 결과 실제 구현은 한 번 지나간 장면에 다시 오지 않는다는 전제의 단방향 구조였습니다. 진행 상태가 30개 이상의 씬과 오브젝트에 분산되어 있어, 같은 장면을 다시 지나가면 상태가 어긋났습니다.

**해결** — 약 130개 상태 변수의 사용처를 찾는 전수 조사와 점검 도구 제작은 Claude에 맡기고, 새 구조 설계와 최종 판단은 직접 담당했습니다.

- 30개 이상의 씬을 장소 기준 약 15개로 재구성
- 흩어진 상태 변수를 대화 시스템의 전역 변수(`GLOBAL.XXX`)로 통합
- 스토리 단계에 따라 오브젝트를 전환하는 레이어 구조(`StoryLayerController`), 세이브 시스템, ScriptableObject 데이터를 새로 설계
- AI가 작성한 코드 중 프레임 수로 타이밍을 추측하거나 매니저 생성 순서에 의존하는 부분은 복원 완료 이벤트와 명시적 실행 순서로 교체

**결과** — 2022년부터 개발해 온 프로젝트를 8개월 만에 회차 플레이 구조로 전면 개편했습니다.

**코드: 스토리 단계를 데이터로 관리 — `StoryLayerController`**

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

**코드: 조건부 씬 이동 — `PortalStoryRouter`**

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

**문제** — 장소(LOC) 씬이 늘어나면서 씬마다 불필요한 컴포넌트, 중복 라이트·볼륨, 미사용 오브젝트가 쌓였고, 수작업으로 확인하기에는 씬 수가 많았습니다.

**해결** — 씬을 자동으로 검사해 문제 항목을 리포트하는 에디터 툴 `SceneOptimAudit`을 만들고, 여러 LOC 씬에 일괄 최적화 패스를 진행했습니다. 구버전 Post Processing Stack v2 설정은 URP Volume Profile로 이관했습니다.

**결과** — 최적화 대상을 사람의 감이 아니라 리포트 기준으로 관리하게 되었습니다.

**출시 전 성능 분석 (2026.10)** — 출시를 앞두고 Unity Profiler, Memory Profiler, Build Report로 실행부터 인게임까지 측정해 병목을 수치로 정리하고, 개선 우선순위를 팀 회의에서 공유했습니다. 현재 분석을 마치고 출시 전 적용을 준비하고 있습니다.

- **실행 직후 4초 멈춤** — 첫 프레임이 4,030ms. VolFx의 `NoiseTexGenerator`가 메인 스레드에서 `Mathf.PerlinNoise`와 `Texture2D.SetPixel`로 노이즈 텍스처를 픽셀 단위로 생성하는 것이 원인. 텍스처를 미리 에셋으로 만들어 로드하고, 런타임 생성이 불가피한 경우 `SetPixels32`·`GetRawTextureData`로 한 번에 쓰는 방식으로 개선 예정
- **씬 전환 끊김** — 인게임 씬 전환 시 0.53초 + 0.34초의 프레임 정지. 에셋 통합, 대량의 `Debug.Log`, 첫 렌더링이 각각 수백 ms를 차지하는 것을 확인
- **설치 용량** — 설치 용량 6.0GB 중 텍스처가 4.9GB이며, 그중 88%(4.3GB)가 비압축 RGBA32. 263장(1.75GB)은 즉시 BC7로 변환하고, 가로세로가 4의 배수가 아닌 1,685장은 크기를 조정한 뒤 압축. 약 29Mbps인 영상을 8~10Mbps로 재인코딩해 **6GB → 2~3GB** 축소 예상
- **저사양 대응** — 인게임 텍스처 메모리 1.44GB(최대 1.56GB), 화질 옵션은 Very High·Ultra 두 가지뿐. Baked GI가 꺼져 있어 컷신당 최대 115개의 조명이 실시간으로 계산되고, 풀스크린 이펙트 17개가 상시 활성화된 상태로, 화질 옵션(Render Scale 등) 추가와 Baked GI 재적용을 계획

<img src="/images/killa-profiler-timeline.webp" alt="실행부터 인게임까지 프레임별 CPU 소요 시간" loading="lazy" decoding="async" />

<img src="/images/killa-profiler-volfx.webp" alt="첫 프레임 메인 스레드 소요 시간 상위 함수" loading="lazy" decoding="async" />

*(Unity Profiler 실측 — Development 빌드, RTX 4070 Laptop)*

## 4. 배포 · 빌드 파이프라인

**문제** — 전시용, QA용, 출시용 빌드마다 시작 지점과 설정이 달라 매번 수동으로 변경해야 했고, 작은 실수가 빌드 사고로 이어졌습니다.

**해결** — `BuildConfig`로 Normal / GameShow / QA 세 가지 빌드 모드를 분리하고, `StartPoint`(씬 + 스토리 레이어 + 스폰 위치 + 날짜 + 초기 Lua)로 어느 지점에서든 시작할 수 있게 했습니다. 전시 빌드에는 무인 운영(`AttractController`, `ExpoIdleWatcher`)과 요약 씬을, 출시 빌드에는 Steamworks 연동을 넣었습니다.

**결과** — 빌드 종류를 설정만으로 전환할 수 있게 되어 BIC 등 전시와 QA 빌드를 코드 수정 없이 내보냈습니다.

**코드: 어디서든 시작하는 빌드 — `BuildConfig.StartPoint`**

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
- **카메라** — Cinemachine Global/Local 카메라 매니저로 컷신 ↔ 플레이 전환, 그룹 대화용 마스터/투샷/클로즈업 연출, Impulse 카메라 셰이크
- **게임플레이** — 심문(`InterrogationManager`), 범인 추리 퀴즈, 기호 조합(`SympathyManager`), 카세트 플레이어 미니게임, 천장 걷기 중력 존
- **게임오버** — 콘텐츠별 목숨을 Lua 변수로 관리, 게임오버마다 자동 저장, 누적 횟수에 따른 히든 엔딩
- **UI** — 아이템/퀘스트 분리 알림 큐, `QuestCatalog` ScriptableObject, 로컬라이제이션 연동 `ConfirmDialog`, Spine 말하기 애니메이션 홀드

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
- Unite Seoul 2026 Legendary & Indie Showcase

외 일러스타 페스, 서울팝콘, GXG, GLS, UGDAP, 도쿄 게임 던전, GAME AiCON 등
