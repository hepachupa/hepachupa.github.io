---
title: Agent.I — LLM 사이비 마을 게임
summary: LLM 기반 생성형 에이전트 NPC 14명이 스스로 생활하는 마을에서, 사이비 교주에게 포섭되는 주민들을 대화로 설득해 막아내는 2D 시뮬레이션 게임.
start: 2023-03-01
end: 2023-12-01
featured: true
tags: [Unity, C#, LLM, OpenAI API, Generative Agents, Django, 팀 프로젝트]
thumbnail: ""
role: ""
team: 스윗팡이크루
contribution: ""
highlights:
  - Stanford "Generative Agents" 시뮬레이션을 게임 서버로 옮기고 Unity 클라이언트와 실시간 연동
  - NPC마다 기억·계획·반응을 LLM이 생성 — 플레이어의 자유 입력 대화가 NPC의 다음 행동에 반영
  - 종교친화지수(0~40)를 서버와 동기화하고 3단계 시각 피드백으로 표시
  - 시간대별 이벤트와 집회 참석 인원에 따른 성공/실패 멀티 엔딩
video: ""
gallery: []
links:
  - label: GitHub (클라이언트)
    url: https://github.com/hepachupa/Frontend_Demo
---

## 기획

조용한 마을에 사이비 교주 '나주교'가 나타나 주민들을 하나씩 포섭합니다. 주민 14명은 각자 성격·직업·일과를 가진 **생성형 에이전트**로, 정해진 스크립트 없이 스스로 하루를 계획하고 서로 대화합니다. 플레이어는 주민과 **자유롭게 텍스트로 대화**하고 퀴즈로 신뢰를 쌓아, 8월 1일 밤 종교 집회에 사람들이 가지 않도록 설득해야 합니다. 집회 참석 인원에 따라 엔딩이 갈립니다.

## 구조

- **클라이언트** — Unity 2021.3 (2D 타일맵, NavMesh 2D, WebGL 대응)
- **서버** — Django REST + OpenAI API. Stanford *Generative Agents* (Park et al., 2023)의 Reverie 시뮬레이션을 기반으로 페르소나·기억 스트림·인지 모듈 구성
- **동기화 루프** — 매 스텝마다 클라이언트가 NPC들의 지각 정보(위치, 주변 대상)를 `npc/perceive`로 보내고, 서버가 LLM으로 계산한 다음 행동을 `npc/movement`로 내려주면 클라이언트가 NavMesh 이동·말풍선·이모지로 재생

## 게임 시스템

- 서버 시간 기반 게임 시계와 시간대별 이벤트 (교회 전단, 집회 카운트다운 타이머)
- NPC별 종교친화지수 로드/업데이트 API 연동, 지수 구간에 따른 머리 위 아이콘 단계 표시
- 집회 시간이 되면 지수 30 이상 NPC가 자동으로 집회 장소로 이동 → 참석 인원 집계 → 성공/실패 엔딩 연출
- 플레이어 ↔ NPC 채팅 UI와 대화 기록 불러오기, NPC 퀴즈를 통한 신뢰도 시스템

## 내 역할

(직접 작성: 담당한 시스템과 기여 범위)
