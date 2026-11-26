---
title: Agent.I
summary: Generative Agents를 적용한 Human-like NPC 14명이 스스로 생각하고 움직이는 마을에서, AI가 결정한
  NPC의 행동이 게임의 승패를 가르는 사회 시뮬레이션 게임.
start: 2023-09-01
end: 2024-07-01
ongoing: false
featured: true
hidden: false
role: 클라이언트 개발 — Generative Agents의 Perceive·Act 단계, NPC 이동·대화 연출, LLM 응답 지연 처리, 맵, 기획 참여
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
links:
  - label: GitHub (클라이언트)
    url: https://github.com/hepachupa/Frontend_Demo
---

## 게임 소개

AI를 섬기는 사이비 종교의 '나주교'가 자정에 집회를 엽니다. 마을 NPC 14명은 서로 대화하며 소식을 퍼뜨리고, **7명 이상이 집회에 참석하면 플레이어가 패배**합니다. 플레이어는 NPC와 자유롭게 대화하며 확산을 막아야 합니다.

**기획 방향** — 대부분의 AI NPC는 말만 자유로운 챗봇에 머뭅니다. Agent.I는 **AI가 정한 NPC의 행동이 승패를 바꾸는** 구조를 목표로 했습니다.

## 1. AI 구조

Stanford *Generative Agents* (Park et al., 2023) 기반으로 NPC마다 페르소나와 기억을 두고 LLM으로 판단하게 했습니다. **Perceive와 Act를 클라이언트에서 직접 구현**했습니다.

| 단계 | 내용 | 담당 |
|---|---|---|
| **Perceive** | 주변 NPC, 현재 장소·시간 인식 | 클라이언트 (직접 구현) |
| **Memory System** | 기억·페르소나로 다음 행동 추론 | 서버 (팀원) |
| **Act** | 장소 이동, 행동(이모지 + 텍스트), NPC 간 대화 | 클라이언트 (직접 구현) |

<img src="/images/agent-i-npc-talk.webp" alt="Agent.I NPC 간 대화 장면" loading="lazy" decoding="async" />

*나주교가 오화가에게 집회 참여를 권유하는 장면 — LLM이 생성한 대화를 말풍선으로 표시*

## 2. NPC 행동 구조 전환

**문제** — 처음에는 Behavior Tree로 루틴 NPC를 만들었습니다. 하지만 NPC가 무엇을 언제 할지 **사람이 미리 설계**해야 해서, 스스로 판단하는 마을이라는 목표와 맞지 않았습니다.

**설계** — LLM이 페르소나와 기억을 바탕으로 **어디로 갈지, 누구와 대화할지 실시간으로 결정**하게 바꿨습니다. 루틴은 응답을 기다리는 동안의 기본 행동으로만 남겼습니다.

| | 초기 (Behavior Tree) | 최종 (LLM 결정) |
|---|---|---|
| 행동 결정 | 사람이 설계한 트리·루틴 | LLM이 실시간 결정 |
| 루틴의 역할 | 행동의 전부 | 응답 대기 중 기본 행동 |
| 클라이언트 역할 | 조건 판단 + 실행 | 지각 데이터 생성 + 실행·연출 |

## 3. 클라이언트 구현

서버의 LLM은 "누가 어디로 가서 무엇을 한다"는 **텍스트만** 반환합니다. 이 텍스트와 게임 월드 사이를 변환하는 클라이언트를 맡았고, 맵·GameManager·NPC·ChatManager를 처음 설계·구현했습니다.

### 3-1. Perceive — 지각 데이터 생성

- 1초 주기 코루틴으로 36방향(10°) 레이캐스트를 쏴 근처 NPC를 감지. 매 프레임 8방향이던 초기 방식보다 비용은 줄이고 놓치는 대상도 줄임
- 감지한 NPC·거리·장소를 서버 형식의 JSON으로 직렬화

### 3-2. Act — 텍스트를 행동으로

- `<persona> 이름` / `<location> 장소` 태그를 정규식으로 파싱해 **대화**와 **이동**으로 분기
- 장소 이름을 맵의 실제 위치에 연결해 NavMesh 이동 대기열에 추가, 이모지는 머리 위 말풍선으로 표시
- 두 NPC 이름을 정렬한 키로 대화 쌍을 관리해 같은 대화가 중복 재생되지 않게 함

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

### 3-3. 행동 우선순위

1. **시간대 루틴** — 기본 행동
2. **LLM 지시** — 목적지와 머무는 시간을 대기열에 추가해 루틴보다 우선 실행
3. **플레이어 대화** — 즉시 멈추고 응답 후 루틴으로 복귀, 10초간 재대화 차단

**아쉬운 점** — 태그 문자열 대신 정해진 JSON 형식으로 응답을 받았다면 해석 실패 가능성을 줄일 수 있었습니다.

### 3-4. LLM 응답 지연 감추기

응답에 수 초가 걸려 NPC가 멈춰 보이는 문제를, 기다리는 동안 루틴대로 움직이고 머리 위 이모지로 생각하는 연출을 보여 주어 **로딩이 아닌 캐릭터의 행동**처럼 보이게 했습니다.

### 3-5. 서버 없이 병렬 개발

서버 팀원과 Perceive 입력·Act 응답 형식을 먼저 맞추고, 로컬 JSON 목업으로 같은 흐름을 재생해 서버 완성 전부터 클라이언트를 개발·테스트했습니다.
