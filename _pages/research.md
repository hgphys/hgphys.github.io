---
layout: page
permalink: /research/
title: 研究紹介
description:
nav: false
---

数理とデータエンジニアリングを掛け合わせ、"捉えられる世界"を広げることを目指しています。研究は次の方向に分かれます。

{% assign groups = "structure|複雑系の構造解明|多変量解析やネットワーク解析などの手法を、高次元で時間とともに変わる実データやシミュレーションに適用し、経済システムや社会インフラ、人間の動作に潜む構造を明らかにします。;quantification|未踏の定量化|定性的にしか語れなかった対象について、対話システムやアプリケーションを開発し、データを生み出す仕組みから設計します。得られたデータを大規模言語モデル（LLM）などの AI で構造化し、定量的に評価する手法をつくります。;other|その他の研究|" | split: ";" %}
{% for g in groups %}
{% assign kv = g | split: "|" %}
{% assign items = site.projects | where: "category", kv[0] | sort: "year" %}
{% if items.size > 0 %}
<h2>{{ kv[1] }}</h2>
{% if kv[2] and kv[2] != "" %}<p class="group-desc">{{ kv[2] }}</p>{% endif %}
<ul class="project-list">
{% for project in items %}
  <li><span class="project-year">{{ project.year }}</span><a href="{{ project.url | relative_url }}">{{ project.title }}</a><span class="project-desc">{{ project.description }}</span></li>
{% endfor %}
</ul>
{% endif %}
{% endfor %}
