---
title: KILLA
summary: 한국형 미스터리 어드벤처. 팀의 유일한 프로그래머로 게임의 모든 코드를 작성하고, TOEI Games 퍼블리싱 계약 이후 최적화·배포·QA까지 출시 과정을 맡았습니다. 국내외 수상·선정 13건.
start: 2022-07-01
end: 2026-10-20
ongoing: true
featured: true
hidden: false
role: 단독 프로그래머 — 게임 전체 코드 작성, 기획 참여
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
links:
  - label: Steam
    url: https://store.steampowered.com/app/2524200/KILLA/
  - label: 퍼블리셔 TOEI Games
    url: https://store.steampowered.com/publisher/toeigames
  - label: "기사: TGS 2026 토에이 게임즈 부스 출전 (인벤)"
    url: https://www.inven.co.kr/webzine/news/?news=321276
  - label: "기사: BIC 2026 토에이 게임즈 부스 출전 (인벤)"
    url: https://www.inven.co.kr/webzine/news/?news=319595
---

*상용 프로젝트라 코드는 구조가 드러나는 부분만 발췌·축약해 접어 두었습니다.*

## 1. AI를 활용한 개발

출시 준비 단계부터 Unity MCP로 Claude를 에디터에 연결해 개발했습니다. **조사·분석·반복 작업은 Claude에 맡기고, 구조 설계와 최종 판단은 직접** 했습니다. 도구의 한계는 문서로 정리해 맡길 일의 기준으로 삼았고, 큰 수정은 **별도 서브에이전트로 교차 검토**했으며, AI의 분석과 측정 수치는 **같은 조건에서 다시 재서 확인**했습니다.

### 1-1. 시작 시 멈춤 제거

**문제** — 시작할 때 화면이 약 4초간 검게 멈췄습니다. 후처리 플러그인(VolFx)이 실행할 때마다 2048×2048 노이즈 이미지를 새로 그리고 있었습니다.

**설계** — 노이즈를 미리 베이크해 불러오도록 바꿨습니다. 쓰는 값이 한 채널뿐이라 RGBA32(16MB) 대신 R8(4MB)로 저장하고, Read/Write를 꺼 CPU 쪽 사본도 없앴습니다. 같은 빌드에서 원본·개선을 각 3회 A/B 측정했습니다.

| 지표 | 원본 | 개선 |
|---|---|---|
| 노이즈 생성 | 352ms | 0ms |
| 시작 직후 두 번째 프레임 | 766ms | 425ms (−44%) |
| 노이즈 이미지 메모리 | 16MB | 4MB (−75%) |

*i7-13700F / RTX 5060, Development 빌드 기준. Release 빌드·저사양 PC는 다시 측정하지 않음*

**발견** — Deep Profiling이 켜져 있으면 작은 함수를 많이 부르는 코드가 실제보다 크게 측정됩니다(같은 코드 352ms vs 3,227ms). 첫 측정의 "4초"는 이 왜곡이었습니다.

<details class="code-fold">
<summary>시각 자료 보기 — Profiler 전후 비교</summary>

<img src="/images/killa-perf-timeline.webp" alt="시작 직후 두 번째 프레임 Profiler Timeline 전후 비교" loading="lazy" decoding="async" />

<img src="/images/killa-perf-hierarchy.webp" alt="시작 직후 두 번째 프레임 Profiler Hierarchy 전후 비교" loading="lazy" decoding="async" />

*같은 빌드의 원본(위)과 개선(아래)을 Profiler로 캡처한 시작 직후 두 번째 프레임 — 노이즈 생성 구간(352ms)이 사라짐*

</details>

### 1-2. 설치 용량 감축

**문제** — 압축 설정을 해 둔 이미지가 압축되지 않아 빌드가 6.4GB였습니다. 원인은 크기가 4의 배수가 아닌 이미지(BC7은 4×4 블록 단위로 압축)였습니다.

**설계** — 가장자리에 투명 여백을 붙여 크기만 맞추고 화면 위치는 유지했습니다. 아티스트가 원본을 다시 작업할 필요가 없고, 137장 시범 적용 후 1,645장 전체에 적용했습니다.

| 항목 | 이전 | 이후 |
|---|---|---|
| 빌드 전체 | 6,418MB | 4,675MB (−27%) |
| 이미지 | 5,151MB | 3,933MB |
| 영상 17개 | 873MB | 349MB (−60%) |

**아쉬운 점** — 일괄 변환이라 새 이미지가 같은 문제를 다시 만들 수 있습니다. 임포트 시 크기를 검사하는 `AssetPostprocessor`가 재발을 막는 방법입니다.

**Addressables** — 5개 언어 Localization에 사용 중입니다. 상시 로드 리소스로 확장하는 것은 약 15MB로 측정돼 이득이 작아 출시 전 도입을 보류했습니다.

<details class="code-fold">
<summary>시각 자료 보기 — 원본 · 압축 결과 비교</summary>

<img src="/images/killa-bc7-compare.webp" alt="원본, 압축 결과, 차이 8배 확대 비교" loading="lazy" decoding="async" />

*왼쪽부터 원본 · 압축 결과 · 차이를 8배 확대한 이미지 — 차이가 거의 보이지 않음*

</details>

### 1-3. QA 자동화

**문제** — 분기 서사라 버그 하나를 재현하려면 앞 대사를 모두 진행해야 했고, QA 시트로 수십 건씩 들어오는 버그를 분류·수정·빌드·공유까지 손으로 반복했습니다.

<figure class="flow"><svg viewBox="0 0 910 268" role="img" aria-label="QA 자동화 흐름: QA 시트 새 행부터 시트에 결과 기록까지" style="width:100%;height:auto;font-family:inherit"><rect x="20" y="46" width="150" height="56" rx="10" style="fill:var(--surface);stroke:var(--border)" stroke-width="1.5"/><text x="95.0" y="69" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">QA 시트</text><text x="95.0" y="88" text-anchor="middle" font-size="12" style="fill:var(--muted)">새 행 추가</text><rect x="200" y="46" width="150" height="56" rx="10" style="fill:var(--surface);stroke:var(--border)" stroke-width="1.5"/><text x="275.0" y="69" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">감지</text><text x="275.0" y="88" text-anchor="middle" font-size="12" style="fill:var(--muted)">3시간 수정 없음</text><line x1="173" y1="74.0" x2="197" y2="74.0" style="stroke:var(--muted)" stroke-width="1.6"/><polygon points="197.0,74.0 189.0,69.0 189.0,79.0" style="fill:var(--muted)"/><rect x="380" y="46" width="150" height="56" rx="10" style="fill:var(--surface);stroke:var(--border)" stroke-width="1.5"/><text x="455.0" y="69" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">Preflight</text><text x="455.0" y="88" text-anchor="middle" font-size="12" style="fill:var(--muted)">플레이·컴파일·씬·git</text><line x1="353" y1="74.0" x2="377" y2="74.0" style="stroke:var(--muted)" stroke-width="1.6"/><polygon points="377.0,74.0 369.0,69.0 369.0,79.0" style="fill:var(--muted)"/><rect x="560" y="46" width="150" height="56" rx="10" style="fill:var(--surface);stroke:var(--border)" stroke-width="1.5"/><text x="635.0" y="69" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">브랜치</text><text x="635.0" y="88" text-anchor="middle" font-size="12" style="fill:var(--muted)">qa-auto/MMDD</text><line x1="533" y1="74.0" x2="557" y2="74.0" style="stroke:var(--muted)" stroke-width="1.6"/><polygon points="557.0,74.0 549.0,69.0 549.0,79.0" style="fill:var(--muted)"/><rect x="740" y="46" width="150" height="56" rx="10" style="fill:var(--surface);stroke:var(--accent)" stroke-width="2"/><text x="815.0" y="69" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">분류 · 수정</text><text x="815.0" y="88" text-anchor="middle" font-size="12" style="fill:var(--muted)">Claude + Unity MCP</text><line x1="713" y1="74.0" x2="737" y2="74.0" style="stroke:var(--muted)" stroke-width="1.6"/><polygon points="737.0,74.0 729.0,69.0 729.0,79.0" style="fill:var(--muted)"/><rect x="740" y="176" width="150" height="56" rx="10" style="fill:var(--surface);stroke:var(--border)" stroke-width="1.5"/><text x="815.0" y="199" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">스모크 검증</text><text x="815.0" y="218" text-anchor="middle" font-size="12" style="fill:var(--muted)">QASmokeRunner</text><rect x="560" y="176" width="150" height="56" rx="10" style="fill:var(--surface);stroke:var(--accent)" stroke-width="2"/><text x="635.0" y="199" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">커밋 · PR</text><text x="635.0" y="218" text-anchor="middle" font-size="12" style="fill:var(--muted)">작업 중 파일 제외</text><line x1="737" y1="204.0" x2="713" y2="204.0" style="stroke:var(--muted)" stroke-width="1.6"/><polygon points="713.0,204.0 721.0,209.0 721.0,199.0" style="fill:var(--muted)"/><rect x="380" y="176" width="150" height="56" rx="10" style="fill:var(--surface);stroke:var(--border)" stroke-width="1.5"/><text x="455.0" y="199" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">빌드 · zip</text><text x="455.0" y="218" text-anchor="middle" font-size="12" style="fill:var(--muted)">build_result.json</text><line x1="557" y1="204.0" x2="533" y2="204.0" style="stroke:var(--muted)" stroke-width="1.6"/><polygon points="533.0,204.0 541.0,209.0 541.0,199.0" style="fill:var(--muted)"/><rect x="200" y="176" width="150" height="56" rx="10" style="fill:var(--surface);stroke:var(--border)" stroke-width="1.5"/><text x="275.0" y="199" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">Drive 업로드</text><text x="275.0" y="218" text-anchor="middle" font-size="12" style="fill:var(--muted)">동기화 폴더</text><line x1="377" y1="204.0" x2="353" y2="204.0" style="stroke:var(--muted)" stroke-width="1.6"/><polygon points="353.0,204.0 361.0,209.0 361.0,199.0" style="fill:var(--muted)"/><rect x="20" y="176" width="150" height="56" rx="10" style="fill:var(--surface);stroke:var(--border)" stroke-width="1.5"/><text x="95.0" y="199" text-anchor="middle" font-size="15" font-weight="700" style="fill:var(--text)">시트에 기록</text><text x="95.0" y="218" text-anchor="middle" font-size="12" style="fill:var(--muted)">결과 · 원인 · 링크</text><line x1="197" y1="204.0" x2="173" y2="204.0" style="stroke:var(--muted)" stroke-width="1.6"/><polygon points="173.0,204.0 181.0,209.0 181.0,199.0" style="fill:var(--muted)"/><line x1="815.0" y1="105" x2="815.0" y2="173" style="stroke:var(--muted)" stroke-width="1.6"/><polygon points="815.0,173.0 820.0,165.0 810.0,165.0" style="fill:var(--muted)"/><text x="890" y="32" text-anchor="end" font-size="12" style="fill:var(--accent-text)">애매하면 고치지 않고 "확인 필요" + 질문</text><text x="635.0" y="254" text-anchor="middle" font-size="12" style="fill:var(--accent-text)">사람이 검토 후 병합</text></svg><figcaption>매일 정기 실행되는 QA 흐름 — 주황 테두리는 사람이 판단하는 지점</figcaption></figure>

**설계** — 사람이 판단할 지점만 남기고 나머지를 자동화했습니다.

- **스모크 테스트 러너**(`QASmokeRunner`) — 메뉴 하나로 엔딩 판정·포탈 조건·모든 씬 레이어·실제 대사 진행을 검사하고 리포트를 남김
- **판단 기준을 규칙으로** — 번역·아트·사운드는 건드리지 않고, 애매한 행은 고치지 않고 질문으로 남김
- **사람 작업 보호** — 시작 시점에 이미 바뀌어 있던 파일은 커밋에서 자동 제외, `qa-auto/MMDD` 브랜치 → PR → 검토 후 병합
- **파일 기반 요청/결과** — 빌드 중 MCP 호출이 타임아웃되므로 요청·진행 상태를 JSON 파일로 주고받고 폴링

**아쉬운 점** — 에디터가 켜진 PC 한 대에 의존합니다. 규모가 커지면 빌드는 CI 서버(batchmode)로 옮기고 Claude는 분류·수정만 맡는 구조가 맞습니다.

<details class="code-fold">
<summary>코드 보기 — QAAutoBuild.GitCommit (사람의 작업 파일 제외)</summary>

```csharp
public static void GitCommit()
{
    AssetDatabase.SaveAssets();
    var req = ReadJson<GitReq>("git_req.json");
    var res = new GitResult { time = Now, action = "commit" };

    // Preflight 시점에 이미 바뀌어 있던 파일 = 사람이 작업 중이던 파일 → 커밋 제외
    var userDirty = new HashSet<string>();
    string pre = AutoFile("preflight_git_dirty.txt");
    if (File.Exists(pre))
        foreach (var l in File.ReadAllLines(pre, Encoding.UTF8)) if (l.Length > 0) userDirty.Add(l);

    string[] skipPrefix = { "Builds/", "Library/", "Temp/", "Logs/", "UserSettings/", "obj/" };
    var mine = GitDirtyPaths().Where(p => !userDirty.Contains(p) && !p.Contains("_QAReports~")
                     && !skipPrefix.Any(x => p.StartsWith(x, StringComparison.OrdinalIgnoreCase))).ToList();
    if (mine.Count == 0) { res.ok = true; res.output = "커밋할 변경 없음"; WriteJson("git_result.json", res); return; }

    File.WriteAllText(AutoFile("commit_paths.txt"), string.Join("\n", mine) + "\n", new UTF8Encoding(false));
    int code = Git($"add -A --pathspec-from-file=\"{AutoFile("commit_paths.txt")}\"", out var o1);
    // ... 커밋 메시지 파일로 commit, 결과(브랜치·해시·파일 목록)를 git_result.json 에 기록
}
```

</details>

## 2. 콘텐츠 시스템 설계

엔딩 후 처음부터 다시 플레이하는 회차 게임이라, **상태를 어디에 두고 언제 되돌릴지**가 콘텐츠 설계의 중심이었습니다. 기획 변경에 맞춰 단방향 구조를 이 기준으로 개편하고, 그 위에 게임오버·히든 엔딩 같은 회차 콘텐츠를 얹었습니다.

| 구분 | 저장 위치 | 예 |
|---|---|---|
| 되돌릴 상태 | 세이브 슬롯 (대화 시스템 변수) | 스토리 단계, 퀘스트, 호감도, 남은 목숨 |
| 남길 상태 | 영구 프로필 `profile.json` | 엔딩·데드씬 수집, 게임오버 기록, 플레이타임 |
| 저장하지 않는 값 | 매번 계산 | 하루 남은 행동력 = 한도 − 오늘 대화한 NPC 수 |

### 2-1. 회차 플레이 구조 개편 (8개월)

**문제** — 처음에는 지나간 장면에 다시 오지 않는 단방향 게임이었지만, 개발 중반 기획이 통째로 바뀌어 회차 플레이를 지원해야 했습니다. 상태가 30개 이상의 씬에 흩어져 있어 같은 장면을 다시 지나가면 어긋났습니다.

**설계** — 흩어진 상태를 한곳으로 모으고, 장면 구성을 데이터로 바꿨습니다.

- 씬 30개 이상 → 장소 기준 약 15개로 재구성
- 상태를 대화 시스템 전역 변수(`GLOBAL.XXX`) 한곳으로 통합 — 대사 분기·세이브·QA가 같은 값을 읽음
- 스토리 단계와 **같은 이름의 오브젝트 묶음만 켜는** 레이어 구조(`StoryLayerController`), 조건부 경로를 순서대로 검사하는 문 이동(`PortalStoryRouter`)
- 레이어 적용을 "3프레임 대기 후"에서 세이브 **복원 완료 이벤트** 기준으로 바꿔, 복원이 늦은 씬에서 잘못된 레이어가 켜지던 문제 제거
- 안정화 — 전역 매니저 14종 감사(중복 생성 가드·실행 순서), 세이브/로드 개편(슬롯 불일치·씬 전환 중 저장 타이밍·NPC 위치 복원)

**아쉬운 점** — 처음부터 상태를 한곳에 두었다면 기획이 바뀌어도 개편 범위가 훨씬 작았을 것입니다. 이후 새 기능은 "어디에 저장되고 다시 지나갈 때 어떻게 복원되는가"부터 정합니다.

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

### 2-2. 게임오버 → 히든 엔딩

콘텐츠마다 목숨을 두고, 게임오버 횟수가 기준을 넘으면 같은 흐름이 히든 엔딩으로 이어집니다.

- **기록 먼저** — 연출 전에 프로필에 저장해 도중에 꺼도 횟수 유지
- **세이브와 분리** — 직전 세이브를 불러와도 히든 엔딩 조건이 되돌아가지 않음
- **조건은 데이터로** — 기준(총 횟수 / 콘텐츠 종류 수)은 카탈로그 ScriptableObject에서 지정, 등록 안 된 ID는 요청 자체를 거부

**아쉬운 점** — 프로필을 바로 덮어써서 저장 중 꺼지면 기록이 사라질 수 있습니다. 임시 파일 교체 + 백업, 버전 필드가 출시 전에 필요합니다.

<details class="code-fold">
<summary>코드 보기 — GameOverService.RequestInternal (발췌)</summary>

```csharp
private bool RequestInternal(GameOverData data)
{
    if (isRunning || data == null) return false;
    string normalScene = ResolveNormalScene(data);
    if (!Application.CanStreamedLevelBeLoaded(normalScene)) return false; // 빌드에 없는 씬이면 취소

    // 1. 기록 먼저 (연출 도중 종료해도 카운트). 세이브 슬롯이 아니라 영구 프로필에 누적
    GameOverRecord record = PlayerProfile.Instance?.AddGameOverRecord(data.Id, maxStoredRecords);

    // 2. 히든 엔딩 판정 (이번 기록 포함)
    bool hidden = IsHiddenEndingConditionMet();
    string target = hidden && Application.CanStreamedLevelBeLoaded(catalog.HiddenEndingSceneName)
        ? catalog.HiddenEndingSceneName : normalScene;
    if (hidden && catalog.MarkEndingOnTrigger) MarkHiddenEndingSeen();

    LastResult = new GameOverResult { Data = data, Record = record, HiddenEnding = hidden, SceneName = target };
    StartCoroutine(GameOverRoutine(LastResult)); // 3. 게임오버 UI → 4. 씬 로드 후 GameOverZone이 결과를 읽어 오브젝트 활성화
    return true;
}

public bool IsHiddenEndingConditionMet()
{
    if (catalog == null || !catalog.HiddenEndingEnabled) return false;
    var profile = PlayerProfile.Instance;
    if (profile == null || profile.HasAchievedEnding(catalog.HiddenEndingId)) return false; // 이미 봤으면 다시 발동하지 않음

    int progress = catalog.CountMode == HiddenEndingCountMode.UniqueContents
        ? profile.GetUniqueGameOverCount()   // 서로 다른 콘텐츠에서 당한 수
        : profile.GetGameOverCount();        // 총 횟수
    return progress >= catalog.HiddenEndingThreshold;
}
```

</details>

## 3. 개발 툴

기획·사운드·QA가 프로그래머를 기다리지 않고 직접 확인·수정할 수 있게 만든 도구입니다.

### 3-1. 엔딩 분기 QA 툴

엔딩 판정을 순서가 곧 우선순위인 Lua 규칙 목록(`EndingRuleSet`)으로 만들고, 엔딩 경로를 프리셋으로 정의했습니다. QA는 F9 한 번으로 원하는 엔딩 지점에 이동하고, 규칙별 참/거짓으로 판정 원인을 바로 확인합니다. 에디터 창과 QA 빌드 오버레이 모두에서 쓰며, 출시 빌드에는 포함되지 않습니다(`DEBUG_QA`).

<details class="code-fold">
<summary>코드 보기 — EndingRuleSet (판정 · 판정 미리보기)</summary>

```csharp
/// 위에서부터 평가해서 처음으로 참인 규칙의 엔딩을 반환한다. 순서 = 우선순위.
[CreateAssetMenu(menuName = "KILLA/Ending/Ending Rule Set")]
public class EndingRuleSet : ScriptableObject
{
    [Serializable]
    public class Rule
    {
        public string note;                       // 기획 메모
        [TextArea(1, 3)] public string luaCondition;
        public EndingDefinition ending;
    }

    [SerializeField] private List<Rule> rules = new List<Rule>();

    public EndingDefinition Evaluate(out int ruleIndex)
    {
        for (int i = 0; i < rules.Count; i++)
        {
            var rule = rules[i];
            if (rule == null || rule.ending == null) continue;
            if (string.IsNullOrWhiteSpace(rule.luaCondition))
            {
                Debug.LogError($"규칙 #{i} ({rule.note}) 조건이 비어 있음. 건너뜀", this);
                continue;
            }
            if (Lua.IsTrue(rule.luaCondition)) { ruleIndex = i; return rule.ending; }
        }
        ruleIndex = -1;
        return null; // fallback 없음 → Resolver가 에러 로그
    }

    /// QA용: 규칙별 현재 평가 결과
    public string DumpEvaluation()
    {
        var sb = new System.Text.StringBuilder();
        for (int i = 0; i < rules.Count; i++)
        {
            var r = rules[i];
            bool ok = !string.IsNullOrWhiteSpace(r.luaCondition) && Lua.IsTrue(r.luaCondition);
            sb.AppendLine($"#{i:00} [{(ok ? "O" : " ")}] {r.ending?.Id,-10} {r.note}");
        }
        return sb.ToString();
    }
}
```

</details>

### 3-2. 빌드 모드 · 시작 지점

Normal / GameShow / QA 빌드를 ScriptableObject 하나로 전환하고, 시작 지점(씬 + 스토리 단계 + 스폰 + 날짜 + 초기 Lua)을 데이터로 지정합니다. 전시·QA 빌드를 코드 수정 없이 내보냅니다.

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

### 3-3. 대사별 FMOD 효과음 자동 재생

대화 데이터의 대사 항목에 FMOD 이벤트만 지정하면 그 대사와 함께 재생됩니다. 씬·프리팹 수정 없이 자동 설치되고, 경로 대신 GUID로 조회해 이벤트 이름이 바뀌어도 연결이 유지됩니다. 사운드 담당이 프로그래머를 기다리지 않습니다.

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

### 3-4. 그 밖의 툴 · 연동

**사건 데이터 CSV 연동** — 수첩 사건 데이터(ScriptableObject)를 Excel용 CSV로 내보내고, 수정한 CSV를 Undo 가능한 형태로 다시 가져옵니다.

**그 밖의 에디터 툴** — 씬 최적화 점검 `SceneOptimAudit`, 전역 변수 감사 `GlobalVarAuditor`, 빌드 용량 분석 `BuildSizeAudit`, 텍스처 일괄 압축 `TextureCompressTool`, 시작 성능 측정 `StartupPerfRunner`, 스모크 테스트 `QASmokeRunner`

**외부 SDK 연동** — Steamworks, FMOD, Spine, Dialogue System(Lua)

## 4. 플레이 화면

장면마다 조작 방식이 다른 UI와 퍼즐, 기믹을 만들었습니다. 스포일러를 피하기 위해 장면과 인물은 밝히지 않습니다. 이 밖에 아이템을 끌어 대상에 사용하는 드래그 앤 드롭 퍼즐 여러 종을 공통 구조로 만들었습니다.

### 4-1. 가방 · 수첩 UI

메뉴·인벤토리·수첩·지도·파우치 5개 화면이 Spine 연출로 전환되는 가방 UI와 셰이더로 책장을 넘기는 수첩. 화면 전환·입력 잠금을 한 매니저가 관리하고, 대화 중 아이템 제출, 미확인 항목 느낌표 배지, 알림 큐를 함께 구현

<img src="/images/killa-note-suspect.gif" alt="수첩 — 용의자에 대하여와 사건에 대하여" loading="lazy" decoding="async" />

### 4-2. 두 세계 전환

겹쳐 있는 두 세계를 버튼 하나로 오가며 렌더링·충돌·레이캐스트를 함께 전환

<img src="/images/killa-two-worlds.gif" alt="두 세계 전환" loading="lazy" decoding="async" />

### 4-3. 중력 반전 이동

발사 구역에서 쏘아 올려 천장을 바닥처럼 걷는 이동

<img src="/images/killa-gravity.gif" alt="중력 반전 이동" loading="lazy" decoding="async" />

### 4-4. 체스말 퍼즐

체스말의 이동 규칙대로 말을 옮겨 길을 찾는 퍼즐, 틀린 수는 연출과 함께 초기화

<img src="/images/killa-chess-puzzle.gif" alt="체스말 퍼즐" loading="lazy" decoding="async" />

### 4-5. 진실의 필름 퍼즐

인물의 필름 장면을 넘겨 보며 질문에 맞는 장면을 골라 필름 릴을 채우는 추리 퍼즐

<img src="/images/killa-film-puzzle.gif" alt="진실의 필름 퍼즐" loading="lazy" decoding="async" />

### 4-6. 간수 이동 경로 퍼즐

같은 색 점을 이어 모든 칸을 채우는 경로 퍼즐, 보드가 바뀔 때마다 판정하고 상태머신으로 정답을 한 번만 처리

<img src="/images/killa-guard-route.gif" alt="간수 이동 경로 퍼즐" loading="lazy" decoding="async" />

### 4-7. 공명 시스템

상징을 끌어 다른 상징에 놓으면 선을 따라 합쳐지며 새 상징이 나오는 조합 UI, 조합 결과는 ScriptableObject 데이터로 정의

<img src="/images/killa-symbol-fx.webp" alt="공명 시스템" loading="lazy" decoding="async" />

## 전시 이력

5개국 30회 이상 전시했습니다.

<div class="expo">
<div class="expo-r"><div class="expo-k">일본</div><div class="expo-chips"><span class="chip">도쿄게임쇼<span class="y">24 · 25 · 26</span> · Selected Indie 80</span><span class="chip">BitSummit<span class="y">24 · 26</span></span><span class="chip">Tokyo Indie Games Summit<span class="y">25</span></span></div></div>
<div class="expo-r"><div class="expo-k">독일</div><div class="expo-chips"><span class="chip">gamescom<span class="y">24</span> · Indie Arena Booth</span><span class="chip">ANIMAGIC</span></div></div>
<div class="expo-r"><div class="expo-k">대만</div><div class="expo-chips"><span class="chip">Taipei Game Show<span class="y">25</span></span></div></div>
<div class="expo-r"><div class="expo-k">미국</div><div class="expo-chips"><span class="chip">LA COMIC-CON</span></div></div>
<div class="expo-r"><div class="expo-k">국내</div><div class="expo-chips"><span class="chip">G-STAR<span class="y">23 · 24 · 26</span></span><span class="chip">BIC<span class="y">23 · 26</span></span><span class="chip">버닝비버<span class="y">23 · 24</span> · 2년 연속 올해의 버닝비버</span><span class="chip">플레이엑스포<span class="y">24</span></span><span class="chip">Unite Seoul<span class="y">26</span></span></div></div>
</div>
