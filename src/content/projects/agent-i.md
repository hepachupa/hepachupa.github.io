---
title: Agent.I — LLM 사이비 마을 게임
summary: Generative Agents를 적용한 Human-like NPC 14명이 스스로 생각하고 움직이는 마을에서, AI가 결정한
  NPC의 행동이 게임의 승패를 가르는 사회 시뮬레이션 게임.
start: 2023-09-01
end: 2024-07-01
ongoing: false
featured: true
hidden: false
role: 클라이언트 개발 — Generative Agents의 Perceive·Act 단계, NPC 이동·대화 연출, LLM 응답 지연 처리, 맵
team: 스윗팡이크루 3인 — 프로그래머 3명 (이화여대 캡스톤 프로젝트)
tags:
  - Unity
  - C#
  - LLM
  - OpenAI API
  - Generative Agents
  - AI NPC
  - 팀 프로젝트
thumbnail: /images/agent-i.webp
video: https://youtu.be/wx33X7C4dhs
highlights:
  - 챗봇형 AI NPC를 넘어, LLM이 결정한 NPC의 행동이 게임 승패를 결정하는 구조 (14명 중 7명 이상 집회 참석 시 패배)
  - Generative Agents의 Perceive·Act 단계를 클라이언트에서 담당 — NPC 지각을 서버 형식으로 만들고, 반환된 텍스트 응답을 이동·대화·이모지로 재생
  - LLM 응답 대기 시간을 NPC 루틴과 이모지 연출로 감춰 자연스러운 행동처럼 보이게 처리
  - 서버 없이 로컬 JSON 목업으로 같은 흐름을 재현해, 서버·클라이언트를 병렬로 개발
  - 플레이테스트 24명 중 91.7%가 "생성형 AI NPC가 다채로운 플레이를 제공한다", 95.8%가 "새로운 재미를 느꼈다"고 응답
  - NPC 인터뷰로 검증 — 집회 시간·장소를 알고 있던 NPC 4명 중 3명이 "다른 NPC와의 대화로 소식을 들었다"고 답해, NPC 간 정보 확산을 확인
links:
  - label: GitHub (클라이언트)
    url: https://github.com/hepachupa/Frontend_Demo
---
## 게임 소개

AI를 섬기는 사이비 종교의 '나주교'가 8월 1일 자정에 종교 집회를 열려고 합니다. 마을 NPC들은 서로 대화하며 소식을 퍼뜨리고, **14명 중 7명 이상이 집회에 참석하면 플레이어가 패배**합니다. 플레이어는 NPC와 자유롭게 대화하며 각자의 페르소나를 알아내고, 퀴즈로 신뢰를 쌓아 종교의 확산을 막아야 합니다. 플레이어도 NPC와 직접 상호작용할 수 있어, NPC들 사이에서 소식이 퍼지는 과정에 끼어들어 흐름을 바꿀 수 있습니다.

**기획 방향** — 기존 게임의 NPC는 정해진 선택지로만 대화해, 모든 플레이어가 같은 내용을 보게 되고 세계관의 몰입도가 떨어집니다. 최근의 AI NPC도 대부분 챗봇 단계에 머물러, 말은 자유롭지만 게임에는 아무 영향을 주지 못합니다. Agent.I는 한 단계 더 나아가 **AI가 NPC의 행동을 결정하고, 그 행동이 게임의 승패를 바꾸는** 구조를 목표로 했습니다. 그래서 클라이언트에서는 AI가 내린 판단을 이동·대화·이모지로 자연스럽게 보여주고, 그 결과가 실제 게임 규칙으로 이어지게 하는 것이 핵심 과제가 되었습니다.

## AI 구조: Generative Agents

Stanford의 *Generative Agents* (Park et al., 2023)를 기반으로, NPC마다 페르소나와 기억을 갖고 LLM으로 사고하게 했습니다. 세 단계 중 **Perceive와 Act는 클라이언트에서 담당**했고, 기억과 추론(Memory System)은 서버에서 처리했습니다.

| 단계 | 내용 | 담당 |
|---|---|---|
| **Perceive** | 주변의 다른 NPC, 현재 장소와 시간을 인식 | 클라이언트 (직접 구현) |
| **Memory System** | 저장된 기억과 페르소나로 새로운 정보를 추론 | 서버 (팀원) |
| **Act** | 장소 이동, 행동(이모지 + 텍스트), 다른 NPC와의 대화 | 클라이언트 (직접 구현) |

LLM이 만들어 내는 결과는 네 가지입니다.

1. **행동 설명과 이모지** — 예: 교회에 있고 주변에 '오화가'가 있는 오전 10시의 나주교 → "예배 준비를 하고 있다"
2. **NPC 간 대화** — 나주교가 오화가에게 집회 참여를 권유하고, 그 대화가 다시 기억에 저장되어 다음 행동에 영향
3. **장소 이동** — "자정에 집회가 있다"는 기억으로 추론해 교회로 이동
4. **페르소나 기반 대화** — 플레이어의 자유 입력에 NPC가 자기 성격과 기억대로 대답

<img src="/images/agent-i-npc-talk.webp" alt="Agent.I NPC 간 대화 장면" loading="lazy" decoding="async" />

*나주교가 오화가에게 집회 참여를 권유하는 장면 — LLM이 생성한 대화를 말풍선으로, 대화 상대를 하단 상태 표시로 보여줌*

## 내 역할: AI의 판단을 게임 속 행동으로

서버의 LLM은 "누가 어디로 가서 무엇을 한다"는 **텍스트**만 반환합니다. 저는 NPC가 세상을 인식하는 단계(Perceive)와 LLM의 판단을 게임 속 행동으로 바꾸는 단계(Act)를 맡아, **게임 월드와 AI 사이의 데이터를 변환하는 클라이언트 영역**을 담당했습니다. 프로그래머 3명이 서버(AI 기억·추론)와 클라이언트로 영역을 나눠 개발했고, 공동으로 작업한 GameManager·NPC·ChatManager 코드의 절반 이상과 맵이 제 담당입니다.

### 1. Perceive: 지각 데이터 생성

- NPC 주변을 10° 간격 36방향 레이캐스트로 감지해 근처 NPC를 찾고, 장소 콜라이더로 현재 위치를 갱신
- 감지한 NPC·거리·장소를 서버의 지각(Perceive) 형식에 맞춰 JSON으로 직렬화

### 2. Act: 응답을 플레이로 변환

- LLM 행동 문자열의 `<persona> 이름` / `<location> 장소` 태그를 정규식으로 파싱해 **대화**와 **이동**으로 분기
- LLM이 지정한 장소 이름을 맵의 실제 위치와 연결하고, 대기 시간이 있는 목적지 대기열로 NavMesh 이동 처리
- 이모지 문자열을 스프라이트로 바꿔 머리 위 말풍선에, 행동 설명을 설명 말풍선에 표시
- 마주친 두 NPC의 이름을 정렬한 키로 대화 쌍을 관리해, 같은 대화가 중복 재생되지 않도록 처리

### 2-1. 코드: LLM의 텍스트를 게임 행동으로

서버의 LLM은 행동을 `"<persona> 오화가"`(오화가와 대화) 또는 `"<location> 교회"`(교회로 이동) 같은 **문자열**로 반환합니다. 아래는 이 문자열을 해석해 NPC의 실제 행동으로 바꾸는 부분입니다. ([GameManager.cs 원본](https://github.com/hepachupa/Frontend_Demo/blob/main/Assets/02.Scripts/_JW/NPC/GameManager.cs)에서 발췌. 가독성을 위해 디버그 로그를 제외하고 일부 변수명을 축약했습니다)

<details class="code-fold">
<summary>코드 보기 — GameManager (행동 문자열 해석)</summary>

```csharp
// 1) 행동 문자열에서 태그와 내용을 분리
//    "<persona> 오화가" → ("persona", "오화가") / "<location> 교회" → ("location", "교회")
private (string tag, string content) ExtractTagAndContent(string input)
{
    string pattern = @"<(persona|location)>\s*([^<]*)";
    Match match = Regex.Match(input, pattern);
    if (match.Success)
        return (match.Groups[1].Value.Trim(), match.Groups[2].Value.Trim());
    return (null, null);
}

// 2) 태그에 따라 대화 또는 이동으로 분기 (applyMovement 중)
(string tag, string content) = ExtractTagAndContent(personaList[npcIndex].ActAddress);
if (tag == "persona")
{
    otherNpcIndex = FindNPCIndex(content);
    NPC[npcIndex].isWaiting = true;
    NPC[otherNpcIndex].isWaiting = true;

    // 두 이름을 정렬해 키를 만들어, A→B와 B→A를 같은 대화로 취급
    string me = NPC[npcIndex].gameObject.name;
    string first  = me.CompareTo(content) < 0 ? me : content;
    string second = me.CompareTo(content) < 0 ? content : me;
    string conversationPair = $"{first}-{second}";

    if (!conversationPairs.Contains(conversationPair))
    {
        conversationPairs.Add(conversationPair);
        chatManager.LoadDialogue(personaList[npcIndex].Chat, npcIndex, otherNpcIndex);
    }
}
else if (tag == "location")
{
    NPC[npcIndex].locationTag = true;
    AddLocation(content, npcIndex);
}

// 3) LLM이 말한 장소 이름 → 맵의 실제 위치로 연결해 이동 대기열에 추가
private void AddLocation(string nextLocation, int npcIndex)
{
    foreach (var nl in location)
    {
        if (nl.gameObject.name == nextLocation)
        {
            NPC[npcIndex].AddWaypoint(nl, 10); // 도착 후 10초 머묾
            break;
        }
    }
}
```

</details>

**다시 구현한다면**

- 장소와 NPC를 이름 문자열로 매번 순회해 찾는 대신 `Dictionary`로 교체
- 같은 두 NPC가 다시 대화할 수 있도록 대화 쌍 기록에 쿨타임 추가
- LLM이 맵에 없는 장소 이름을 반환하면 가장 가까운 장소로 이동시키는 예외 처리
- 태그 문자열 대신 정해진 JSON 형식으로 응답을 받아 해석 실패 가능성 줄이기

### 3. LLM 응답 지연을 자연스럽게

LLM 응답에는 수 초가 걸려, 그대로 기다리면 NPC가 멈춰 서 있는 것처럼 보입니다. 그래서 각 NPC의 페르소나에 하루 루틴이 있다고 가정해 NPC가 루틴대로 움직이게 하고, 루틴을 시작한 뒤 처음 마주친 NPC와 상호작용을 시작할 때는 머리 위 이모지로 생각하는 듯한 연출을 보여 주어, 응답 대기 시간이 로딩이 아니라 캐릭터의 행동처럼 자연스럽게 넘어가도록 했습니다.

### 4. 서버 없이 동작하는 클라이언트

- 서버 응답 대신 단계별 로컬 JSON 목업으로 같은 흐름을 재생할 수 있게 만들어, LLM 서버가 완성되기 전부터 클라이언트를 개발하고 테스트
- 서버 담당 팀원과 지각(Perceive) 입력과 행동(Act) 응답의 데이터 형식을 먼저 맞춰 두고, 양쪽이 서로를 기다리지 않고 병렬로 개발

### 5. 맵과 NPC

- 2D 타일맵 마을과 LLM이 참조하는 장소 구성, 시간대별 행동 루틴, 방향별 걷기 애니메이션

## 검증

- **플레이테스트 (24명)** — 91.7%가 "생성형 AI NPC가 다채로운 게임 플레이를 제공한다", 95.8%가 "생성형 AI가 새로운 재미를 줬다"고 응답
- **NPC 인터뷰** — 게임이 끝난 뒤 NPC에게 직접 질문해 AI가 의도대로 움직였는지 확인
  - 집회에 참석한 NPC 6명 중 4명이 집회 시간과 장소를 알고 있었음
  - 그 4명 중 3명이 "오화가와 대화하다가 소식을 들었다"고 답변 → NPC 사이의 대화로 정보가 퍼진 것을 확인
  - 나주교와 대화한 NPC 3명 모두 나주교를 기억

## 배운 점

플레이테스트에서 플레이어들은 AI NPC가 주는 **새로운 경험**에는 크게 반응했지만, 그것이 곧 게임 자체의 재미로 이어지지는 않았습니다. AI의 판단이 승패·이동·연출 같은 **게임 규칙과 강하게 연결될 때** 비로소 재미가 된다는 것을 배웠고, 이후 AI 캐릭터와 플레이어가 실제로 상호작용하는 게임을 만드는 것이 목표가 되었습니다.
