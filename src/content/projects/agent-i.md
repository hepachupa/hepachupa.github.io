---
title: Agent.I — LLM 사이비 마을 게임
summary: Generative Agents를 적용한 Human-like NPC 14명이 스스로 생각하고 움직이는 마을에서, AI가 결정한
  NPC의 행동이 게임의 승패를 가르는 사회 시뮬레이션 게임.
start: 2023-09-01
end: 2024-07-01
ongoing: false
featured: true
hidden: false
role: 클라이언트 개발 — LLM 응답을 게임 월드로 옮기는 데이터 계층, NPC 지각·이동·대화 연출, 맵
team: 스윗팡이크루 3인 (이화여대 캡스톤 프로젝트)
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
  - LLM 서버와 게임 월드 사이의 클라이언트 데이터 계층 담당 — NPC 지각을 서버 형식으로 만들고, 돌아온 텍스트 응답을 이동·대화·이모지로 재생
  - 서버 없이 로컬 JSON 목업으로 같은 흐름을 돌려, 서버·클라이언트를 병렬로 개발
  - 플레이테스트 24명 중 91.7%가 "생성형 AI NPC가 다채로운 플레이를 제공한다", 95.8%가 "새로운 재미를 느꼈다"고 응답
  - NPC 인터뷰로 검증 — 집회 참석 NPC 3명 모두 "다른 NPC와의 대화로 소식을 들었다"고 답해, NPC 간 정보 확산을 확인
links:
  - label: GitHub (클라이언트)
    url: https://github.com/hepachupa/Frontend_Demo
---
## 문제: 게임 NPC는 왜 늘 같은 말만 할까

기존 게임 NPC는 **고정된 선택지**로만 대화합니다. 소통은 일방향이고, 모든 유저가 같은 내용을 플레이하게 되어 참여도와 세계관의 신뢰도가 떨어집니다. 시장의 AI NPC도 대부분 **챗봇 단계**에 머물러, 말은 자유롭지만 게임에는 아무 영향을 주지 못합니다.

Agent.I는 한 단계 더 나아가 **AI가 NPC의 행동을 결정하고, 그 행동이 게임의 승패를 바꾸는** 구조를 목표로 했습니다.

## 게임

AI를 섬기는 사이비 종교의 '나주교'가 8월 1일 자정에 종교 집회를 열려고 합니다. 마을 NPC들은 서로 대화하며 소식을 퍼뜨리고, **14명 중 7명 이상이 집회에 참석하면 플레이어가 패배**합니다. 플레이어는 NPC와 자유롭게 대화하며 각자의 페르소나를 알아내고, 퀴즈로 신뢰를 쌓아 종교의 확산을 막아야 합니다.

## AI 구조: Generative Agents

Stanford의 *Generative Agents* (Park et al., 2023)를 기반으로, NPC마다 페르소나와 기억을 갖고 LLM으로 사고하게 했습니다.


| 단계 | 내용 |
| ----------------- | --------------------------------- |
| **Perceive** | 주변의 다른 NPC, 현재 장소와 시간을 인식 |
| **Memory System** | 저장된 기억과 페르소나로 사람처럼 새로운 정보를 추론 |
| **Act** | 장소 이동, 행동(이모지 + 텍스트), 다른 NPC와의 대화 |


LLM이 만들어 내는 결과는 네 가지입니다.

1. **행동 설명과 이모지** — 예: 교회에 있고 주변에 '오화가'가 있는 오전 10시의 나주교 → "예배 준비를 하고 있다"
2. **NPC 간 대화** — 나주교가 오화가에게 집회 참여를 권유하고, 그 대화가 다시 기억에 저장되어 다음 행동에 영향
3. **장소 이동** — "자정에 집회가 있다"는 기억으로 추론해 교회로 이동
4. **페르소나 기반 대화** — 플레이어의 자유 입력에 NPC가 자기 성격과 기억대로 대답

![Agent.I NPC 간 대화 장면](/images/agent-i-npc-talk.webp)

*나주교가 오화가에게 집회 참여를 권유하는 장면 — LLM이 생성한 대화를 말풍선으로, 대화 상대를 하단 상태 표시로 보여줌*

## 내 역할: LLM 서버와 게임 월드 사이의 클라이언트 데이터 계층

서버의 LLM은 "누가 어디로 가서 무엇을 한다"는 **텍스트**만 돌려줍니다. HTTP 통신 계층은 팀장이 만들었고, 저는 그 양 끝에서 **게임 월드 ↔ AI 데이터를 변환하는 클라이언트 쪽**을 맡았습니다. (GameManager·NPC·ChatManager 코드의 절반 이상, 맵 담당)

**게임 → AI: 지각 데이터 만들기**
- NPC 주변을 10° 간격 36방향 레이캐스트로 감지해 근처 NPC를 찾고, 장소 콜라이더로 현재 위치를 갱신
- 감지한 NPC·거리·장소를 Generative Agents 서버의 지각(Perceive) 형식에 맞춰 JSON으로 직렬화

**AI → 게임: 응답을 플레이로 바꾸기**
- LLM 행동 문자열의 `<persona> 이름` / `<location> 장소` 태그를 정규식으로 파싱해 **대화**와 **이동**으로 분기
- LLM이 말한 장소 이름을 맵의 실제 위치와 연결하고, 대기 시간이 있는 목적지 대기열로 NavMesh 이동 처리
- 이모지 문자열을 스프라이트로 바꿔 머리 위 말풍선에, 행동 설명을 설명 말풍선에 표시
- 마주친 두 NPC의 이름을 정렬한 키로 대화 쌍을 관리해, 같은 대화가 중복 재생되지 않도록 처리

**개발 방식: 서버 없이도 돌아가는 클라이언트**
- 서버 응답 대신 단계별 로컬 JSON 목업으로 같은 흐름을 재생할 수 있게 만들어, LLM 서버가 완성되기 전부터 클라이언트를 개발하고 테스트

**맵과 NPC**
- 2D 타일맵 마을과 LLM이 참조하는 장소 구성, 시간대별 행동 루틴, 방향별 걷기 애니메이션

## 핵심 코드: LLM의 텍스트를 게임 행동으로

서버의 LLM은 행동을 `"<persona> 오화가"`(오화가와 대화) 또는 `"<location> 교회"`(교회로 이동) 같은 **문자열**로 돌려줍니다. 아래는 이 문자열을 해석해 NPC의 실제 행동으로 바꾸는 부분입니다. ([GameManager.cs 원본](https://github.com/hepachupa/Frontend_Demo/blob/main/Assets/02.Scripts/_JW/NPC/GameManager.cs)에서 발췌. 가독성을 위해 디버그 로그를 빼고 변수명 일부를 줄였습니다)

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

**지금 다시 짠다면** — 장소와 NPC를 이름 문자열로 매번 순회해 찾는 대신 `Dictionary`로 바꾸고, 같은 두 NPC가 다시 대화할 수 있도록 대화 쌍 기록에 쿨타임을 두겠습니다. 또 LLM이 맵에 없는 장소 이름을 돌려주는 경우를 대비해, 찾지 못하면 가장 가까운 장소로 보내는 예외 처리를 추가하겠습니다.

## 검증

- **플레이테스트 (24명)** — 91.7%가 "생성형 AI NPC가 다채로운 게임 플레이를 제공한다", 95.8%가 "생성형 AI가 새로운 재미를 줬다"고 응답
- **NPC 인터뷰** — 게임이 끝난 뒤 NPC에게 직접 질문해 AI가 의도대로 움직였는지 확인
  - 집회에 참석한 NPC 6명 중 4명이 집회 시간과 장소를 알고 있었음
  - 그중 3명 모두 "오화가와 대화하다가 소식을 들었다"고 답변 → NPC 사이의 대화로 정보가 퍼진 것을 확인
  - 나주교와 대화한 NPC 3명 모두 나주교를 기억

## 배운 점

생성형 AI는 플레이 경험을 풍부하게 만들지만, 선행 연구와 테스트 모두 **AI 대화와 게임 시스템 사이의 연결이 약하면 사용성이 떨어진다**는 점을 보여줬습니다. 그래서 AI의 결과를 그대로 보여주는 데서 끝내지 않고, 승패와 이동, 연출 같은 **게임 규칙에 묶어 주는 클라이언트 설계**가 핵심이라는 것을 배웠습니다.