---
layout: page
permalink: /blog/map/
title: 論文マップ
description: ブログでピックアップした論文のつながり
nav: false
---

[ブログ]({{ '/blog/' | relative_url }})でピックアップした論文を、ネットワークとして描いています。色は arXiv の主カテゴリを表し、線は内容の関連する論文どうしを結んでいます。点を押すと、その論文をピックアップした記事に移ります。

<div id="paper-map" class="paper-map">
  <div class="pm-controls">
    <label>主題
      <select id="pm-sub"><option value="">すべて</option></select>
    </label>
    <label class="pm-check"><input type="checkbox" id="pm-tags" checked> 主題の近い組も点線で結ぶ</label>
    <span id="pm-count" class="pm-count"></span>
  </div>
  <ul id="pm-legend" class="pm-legend"></ul>
  <div class="pm-canvas"><svg id="pm-svg" role="img" aria-label="ブログでピックアップした論文のネットワーク"></svg><div id="pm-tip" class="pm-tip" hidden></div></div>
  <details class="pm-table">
    <summary>表で見る</summary>
    <div id="pm-list"></div>
  </details>
</div>

<script defer src="https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js" integrity="{{ site.third_party_libraries.d3.integrity.js }}" crossorigin="anonymous"></script>
<script defer src="{{ '/assets/js/paper-map.js' | relative_url | bust_file_cache }}" data-src="{{ '/assets/json/paper-map.json' | relative_url }}" id="pm-script"></script>
