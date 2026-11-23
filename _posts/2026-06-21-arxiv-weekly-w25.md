---
layout: post
title: "arXiv Weekly Digest: 2026-W25 (6/15–6/18)"
date: 2026-06-21
description: "グラフ学習への LLM 統合をめぐる議論と、ネットワーク動力学の基盤モデル化・シミュレーションの新着から6本。"
tags: [gnn-representation, llm-agent, multilayer-network, epidemics-contagion, hypergraph, higher-order-dynamics, llm-evaluation, education]
keywords: "グラフ基盤モデル, 情報拡散, ハイパーグラフ, マルチモーダル属性グラフ, LLM評価"
published: true
toc:
  beginning: true
---

## 今週の拾い読み

<!-- ユーザーへのヒアリング後に加筆修正する -->

今週の arXiv は、グラフ学習に大規模言語モデルをどう組み合わせるかという話題が目立ちました。テキストや画像といった属性をグラフ構造とどう整合させるか、あるいは逆に安易な結合がかえって性能を下げるという報告まで、統合の効かせ方をめぐる論文が複数本ありました。あわせて、ネットワーク上の拡散や影響伝播という古典的なテーマでも、基盤モデル化やマルチエージェント・シミュレーションといった新しい道具立てを持ち込む動きが見られました。

ネットワーク動力学では、[Czuba et al.](#graph-foundation-models-for-dynamics) が拡散ダイナミクスの基盤モデル化を、多層ネットワークのスーパースプレッダー同定を題材に検討しています。[Lexi Liu et al.](#midsim-multi-channel-diffusion) は、ソーシャルリンクだけでなく推薦アルゴリズムによる拡散チャネルも含めて情報伝播を LLM マルチエージェントで再現する枠組みを提案しています。[Abhelakh et al.](#fair-influence-maximization-in-hypergraphs) は、影響最大化をハイパーグラフに広げ、コミュニティ間の公平性を保ちながらシードを選ぶ手法を扱っています。

グラフの構造（トポロジー）から得られる表現と、テキストや画像から得られる表現は、それぞれ別の空間で学習されるため、そのまま足し合わせても噛み合いません。両者をどう対応づける（整合させる）かが鍵になります。[Zhang et al.](#comag-multimodal-attributed-graphs) は、モダリティ（テキスト・画像）由来の表現とトポロジー由来の表現を同時に対応づける統一バックボーンを提案しています。一方 [Wang and Vemuri](#llm-features-can-hurt-gnns) は、こうした整合を経ずに LLM の特徴量をグラフ側へ単純連結すると、同好性の高いベンチマークでむしろ精度が落ちる「連結干渉」が生じると報告しています。最後に [Tao Liu et al.](#elmes-educational-rubrics) は、教育シナリオに特化した LLM の評価ルーブリックを自動構築する試みで、LLM 審判のバイアスにも触れています。

---

## ピックアップ論文

### Towards Graph Foundation Models for Dynamics in Complex Networked Systems {#graph-foundation-models-for-dynamics}

- **著者**: Michał Czuba et al.
- **arXiv**: [2606.08306](https://arxiv.org/abs/2606.08306)
- **分野**: GFM Workshop @ ICML 2026 / arXiv preprint (cs.LG)

**背景**: 拡散・影響最大化・疫病モデルといったネットワーク動力学のモデルは transductive 学習に依存し、新しいネットワークごとに再学習が必要であった。未知ネットワークへ適用可能な Graph Foundation Model (GFM) を構築するには、inductive なクロスネットワーク汎化が不可欠であると著者らは主張する。

**手法と結果**: 合成マルチレイヤーネットワーク（MLN）のみで学習する ts-net (TopSpreadersNetwork) を提案し、ネットワーク動力学の基盤モデルを可能にする 4 つの設計特性を整理した。ts-net はサイズ・層数の異なる実世界 MLN へゼロショット汎化し、4 指標中 3 つで古典的ヒューリスティクスおよび transductive ベースラインを上回った。さらに scale・多層汎化・自己教師事前学習・クロスタスク転移・ノード属性統合という 5 つの未解決課題を提示した。

### MIDSim: Simulating Multi-Channel Information Diffusion in Social Media {#midsim-multi-channel-diffusion}

- **著者**: Lexi Liu et al.
- **arXiv**: [2606.13140](https://arxiv.org/abs/2606.13140)
- **分野**: arXiv preprint (cs.SI)

**背景**: 情報拡散はソーシャルメディア上で世論を形成するが、既存の拡散モデルはソーシャルリンク伝播に偏り、プラットフォームのアルゴリズム（推薦システム）が可能にする別の拡散チャネルを見落としていた。また個々のユーザーの行動的複雑性を十分に捉えられていなかった。

**手法と結果**: 大規模言語モデルで個別化したユーザーエージェント系を構築し、ソーシャルネットワークによる伝播と推薦アルゴリズムによる拡散の複数チャネルを同時にモデル化する情報伝播シミュレーション手法 MIDSim を提案した。Sina Weibo・RedNote・Twitter の 3 実データセット（拡散記録・ユーザープロフィール・投稿履歴・社会関係を含む）で検証し、マクロな拡散現象をリアルに再現するとともに多様なコメント内容を生成し、ベースラインを有意に上回ることを示した。

### Fair Influence Maximization in Hypergraphs {#fair-influence-maximization-in-hypergraphs}

- **著者**: Zoë Abhelakh et al.
- **arXiv**: [2606.14189](https://arxiv.org/abs/2606.14189)
- **分野**: arXiv preprint (cs.SI)

**背景**: 影響最大化（Influence Maximization, IM）はバイラルマーケティング・公衆衛生キャンペーン・社会的影響の促進などで広く研究されてきたが、コミュニティ構造が顕著なネットワークでは影響されるノードがコミュニティ間で不均等に分布し不公平を生む。公平な影響最大化（Fair Influence Maximization, FIM）はペアワイズネットワークでは研究されてきたものの、群間相互作用をより正確に表現するハイパーグラフではほぼ未開拓だった。

**手法と結果**: Susceptible-Infected Contact Process (SICP) 拡散モデル下で動作するヒューリスティック・シード選択アルゴリズム FIMH を提案。各候補ノードの「影響」と「公平性」への寄与を反復的に見積もり、ハイパーパラメータ調整不要の utopia-distance（ユートピア距離）基準で両目的の最適トレードオフとなるノードを追加シードとして選択する。7 つの実ハイパーグラフでの実験により、FIMH は最先端 IM 手法と同等の影響範囲を維持しつつコミュニティ間の影響格差（influence disparity）を有意に削減した。選択されたシードノードのトポロジー特性とその影響・公平性への寄与を解析し、手法の有効性を構造的に裏付けた。

### Context-aware Modality-Topology Co-Alignment for Multimodal Attributed Graphs {#comag-multimodal-attributed-graphs}

- **著者**: Sirui Zhang et al.
- **arXiv**: [2606.14172](https://arxiv.org/abs/2606.14172)
- **分野**: arXiv preprint (cs.LG; cross-list cs.CV)

**背景**: マルチモーダル属性グラフ（Multimodal Attributed Graph, MAG）はグラフトポロジーとテキスト・画像などの異種属性を結合して実世界エンティティをモデル化し、構造的・クラス判別的表現を要するグラフ中心タスクと、細粒度のクロスモーダル対応を要するモダリティ中心タスクの双方を支える。しかし既存 MAG 手法は固定的なグラフコンテキストや一様な融合表現に依存し、タスク非依存な伝播と過圧縮融合が、多様なタスク要求とモダリティ固有の証拠保持を阻害していた。

**手法と結果**: 統一 MAG バックボーン CoMAG を提案。(1) Reliable Context Learning では、マルチモーダル意味整合からエッジ信頼度を推定し、意味的近傍で生トポロジーを補完、タスク認識ゲートでコンテキスト要素を選択する。(2) Modality-preserving Hop-token Alignment では、モダリティ固有のマルチホップ軌跡を保持し、モダリティ間でホップトークンを整合させ、共有表現と固有表現を分離する。これにより 1 回の forward pass でグラフ表現とモダリティ表現を同時生成しつつモダリティ固有の手がかりを保持する。9 つの OpenMAG データセットで graph-level 予測・modality matching・graph-conditioned generation の全タスクにおいて各種ベースラインを上回り、sparse edge-linear の計算量を維持した。

### LLM Features Can Hurt GNNs: Concatenation Interference on Homophilous Graph Benchmarks {#llm-features-can-hurt-gnns}

- **著者**: Zhongyuan Wang and Pratyusha Vemuri
- **arXiv**: [2606.17579](https://arxiv.org/abs/2606.17579)
- **分野**: arXiv preprint (cs.LG)

**背景**: グラフニューラルネットワーク（GNN）の性能向上のため LLM 生成のノードテキスト特徴量を単純連結（concatenation）するアプローチは、多くのベンチマークで有効と一般に信じられてきた。しかし既存報告は end-to-end の joint-training や知識蒸留を施した結果に偏り、単純連結を選んだ場合のマイナス干渉効果とその発生メカニズムは体系的に理解されていなかった。

**手法と結果**: LLM 特徴量を入力層で単純連結すると、Cora や PubMed など同質性（homophily）が極めて高い代表的ベンチマークでノード分類精度がそれぞれ −4.3±0.6 pp、−17.0±0.3 pp も系統的に低下する「concatenation interference（連結干渉）」を実証した。この劣化を予測・解釈する指標として LLM 単体の表現識別力に基づく Delta_sig を提案し、Delta_sig ≤ τ（≈13.8 pp）なら単純連結が非正のコスト（悪影響）を及ぼすという決定ルールが 9 データセット中 7 つで正しく機能することを示した。同次元ガウスノイズや PCA 次元削減を用いた統制実験により、次元増大や L2 正則化といった表層的アーティファクトではなく、表現ベクトル間の相乗効果の欠如に起因する本質的な情報干渉であることを証明した。

### Elmes*: Automated Construction of Fine-Grained Evaluation Rubrics for LLMs in Long-Tail Educational Scenarios {#elmes-educational-rubrics}

- **著者**: Tao Liu et al.
- **arXiv**: [2606.06546](https://arxiv.org/abs/2606.06546)
- **分野**: arXiv preprint (cs.LG)

**背景**: 既存の LLM 評価ベンチマークは領域的な正答性に偏り、教育的有効性（pedagogical effectiveness）を測れていない。また手作りのルーブリックはニッチでロングテールな教育文脈にスケールしないという課題があった。

**手法と結果**: 教師-生徒-審判（teacher–student–judge）の相互作用を記述する宣言的マルチエージェントエンジンと、評価基準とテストデータを共最適化する自己進化モジュール SceneGen を組み合わせたフレームワーク Elmes* を提案した。11 教科×3 学年帯×10 タスク型・1,000 以上の秒単位指標からなる Edu-330 データセット（330 シナリオ）を構築。上位 LLM は創造性と価値統合で主に差が出ること、知識の強いモデルが Socratic な足場かけ（scaffolding）で失敗しうること、教育特化の InnoSpark が人間評価で最高スコアを達成することを示した。LLM 審判は人間並みのランキングをはるかに低い採点分散で出す一方、審判固有のバイアスを示すことも報告した。
