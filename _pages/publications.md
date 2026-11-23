---
layout: page
permalink: /publications/
title: 業績一覧
description: 論文・学会発表の一覧。
nav: false
---

<div class="publications">

{% capture pub_list %}{% bibliography %}{% endcapture %}
{% assign pub_note = '</h2><p class="pub-note">○は発表者を示します。</p>' %}
{% assign note_intl = '講演（国際会議）' | append: pub_note %}{% assign note_dom = '講演（国内学会・研究会）' | append: pub_note %}{{ pub_list | replace: '講演（国際会議）</h2>', note_intl | replace: '講演（国内学会・研究会）</h2>', note_dom }}

</div>
