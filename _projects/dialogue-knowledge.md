---
layout: page
title: 対話と集合知
description: 対話を通じて形成される知識と集合知の定量化
year: 2024
img:
importance: 3
category: quantification
related_publications: true
---

対話を通じて形成される知識と集合知を、大規模言語モデル（LLM）などの AI を使って定量化しています。そのために、教員の授業の振り返りを支えるウェブアプリケーションや、問い返しで運動部の選手の内省を深める対話システムを開発し、対話のデータが生まれる場面から研究を設計しています。

分析の面では、対話の音声から LLM で知識グラフを構築し、その構造から、教室で生まれる知識や教師の暗黙知を評価する研究を進めています。

授業の発話については、[順番交替のネットワーク](#goto2024complexnets_dialogue)や[グループ対話](#goto2026jasse_group)を分析してきました。また、[対話型授業での児童・生徒の発話の特徴とパーソナリティ特性（Big Five）の関係を分析した研究](#goto2025slud)は、2024 年度 人工知能学会 研究会優秀賞を受賞しました。

さらに、個々の発話から授業全体へと対象を広げ、授業音声からマルチモーダル LLM で[指導案を逆生成](#goto2026jsai)する手法をつくりました。LLM の出力は試行ごとにゆらぐため、これをグラフのアンサンブルとして扱い、試行間で変わらない骨格を取り出しています。同じく LLM を用いて、対話のログから談話グラフと知識グラフを抽出し、[集合知の形成を測る手法](#goto2026slud107)もつくっています。{% nocite goto2026slud107 goto2026jasse_lesson goto2026jasse_group goto2026jasse_inhibit goto2026jsai goto2025slud goto2024complexnets_dialogue %}
