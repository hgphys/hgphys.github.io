// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-私について",
    title: "私について",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "dropdown-研究紹介",
              title: "研究紹介",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/research/";
              },
            },{id: "dropdown-業績一覧",
              title: "業績一覧",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/publications/";
              },
            },{id: "dropdown-競争的資金",
              title: "競争的資金",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/grants/";
              },
            },{id: "nav-教育",
          title: "教育",
          description: "金沢学院大学での担当科目と出張授業の案内。",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-ブログ",
          title: "ブログ",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-arxiv-weekly-digest-2026-w47-11-16-11-20",
        
          title: "arXiv Weekly Digest: 2026-W47 (11/16–11/20)",
        
        description: "ハイパーグラフの位相や異種 LLM の討論といったネットワークの研究と、教育や日常での AI の利用の影響、LLM による注釈の置き換えを統計的に確かめる研究が並んだ週。",
        keywords: "時間発展するハイパーグラフ, デッサン・ダンファン, 曲面の種数, Stack Exchange, 異種 LLM の討論, 能力の移転, 教員が設計した AI, 無作為化比較試験, 授業録音, 話者の分離, LLM アノテータ, 非劣性検定, Krippendorff の α, AI 断ち, 孤独感",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w47/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w46-11-09-11-13",
        
          title: "arXiv Weekly Digest: 2026-W46 (11/09–11/13)",
        
        description: "集合知や熟議に人と LLM がどう関わるかを測る研究と、LLM と人の判定がどこまで信頼できるかを問う研究が並んだ週。",
        keywords: "集合知, Wikispeedia, 帰無モデル, マルチエージェント熟議, 悪魔の代弁者, 代理エージェント, 手続き的公正, 判定器と人の一致, Cohen の κ, 評価のドリフト, Chatbot Arena, 出力の均質化, 数学の課題の型, 蔵本モデル, 注意機構",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w46/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w45-11-02-11-06",
        
          title: "arXiv Weekly Digest: 2026-W45 (11/02–11/06)",
        
        description: "AI の利用が技能を削って抜け出せなくなる仕組みや、LLM エージェントでネットワークの支配方程式を見つける手法と、自動フィードバックや複数の LLM による質的分析のように人の判断を残したまま AI を使う手順の研究が並んだ週。",
        keywords: "技能の低下, ロックイン, ヒステリシス, 支配方程式の発見, LLM エージェント, 疎回帰, 単純閉路, 一様全域木, Horvitz–Thompson 推定, 構造的バランス, 模倣学習, 最適輸送, 微分可能シミュレータ, talk moves, 無作為化比較試験, 文献の総合, 質的分析, Krippendorff の α",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w45/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w44-10-26-10-30",
        
          title: "arXiv Weekly Digest: 2026-W44 (10/26–10/30)",
        
        description: "ネットワーク上の応答や平均場ゲームの均衡を統計力学で書き直す理論と、LLM エージェントの協力やコーディングエージェントの編集が言葉の小さな違いで大きく変わることを測る研究が並んだ週。",
        keywords: "LLM エージェント, 反復囚人のジレンマ, 提示順, ネットワーク密度行列, フォン・ノイマン・エントロピー, H 定理, 平均場ゲーム, 詳細釣り合い, ギブス分布, 相転移, 一人称映像, テニス, メタ認知の足場, 生産的な摩擦, コーディングエージェント, 過剰な同調",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w44/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w40-9-28-10-2",
        
          title: "arXiv Weekly Digest: 2026-W40 (9/28–10/2)",
        
        description: "層や解像度をまたいでネットワークを扱う理論と、クリーク複体をめぐる対照的な 2 本が並び、AI の使い方を精度以外の面から検証・設計する研究も出た週。",
        keywords: "相互依存ネットワーク, 多重ネットワーク, ネットワーク解体, 深層強化学習, カスケード故障, ネットワーク繰り込み, ノード集約, 重み付きネットワーク, 複合ポアソン, 母関数, 単体複体, クリーク複体, ダウカー複体, パーシステントホモロジー, 学習解析, 位置エンコーディング, ホッジ・ラプラシアン, Graph Transformer, 視覚言語モデル, アノテーション, 下流推論の妥当性, 概念的不整合, 人間と AI の協働, 認知的オフローディング, 生産的な摩擦",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w40/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w39-9-21-9-25",
        
          title: "arXiv Weekly Digest: 2026-W39 (9/21–9/25)",
        
        description: "高次ネットワークとパーコレーションの理論を整理し直す論文が並び、正答率や動きの再現度が高くても中身は人間と同じとは限らないことを示す研究も出た週。",
        keywords: "高次ネットワーク, ハイパーグラフ, ペアワイズモデル, 表現力, 同定可能性, 最小記述長, 確率的ブロックモデル, パーコレーション, コミュニティ構造, 分岐過程, 臨界平均次数, 巨大成分, 母関数, 自己無撞着方程式, 平均場理論, 動画基盤モデル, 物理推論, モデルと人間の乖離, 筋骨格シミュレーション, 模倣学習, 筋電図, 対話型 AI, オープンサイエンス, 追試, 信頼の較正, AI リテラシー",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w39/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w38-9-14-9-18",
        
          title: "arXiv Weekly Digest: 2026-W38 (9/14–9/18)",
        
        description: "高次ネットワークを測る・推定する道具が並んだ一方、その高次記述が本当に必要かを普遍性の観点から問い直す論文が出た週。学習者が AI にどこまで委ねているかを測る研究も続いた。",
        keywords: "高次ネットワーク, ハイパーグラフ, 時間的モチーフ, 帰無モデル, 列挙アルゴリズム, コア・ペリフェリー, ペナルティ付き尤度, ウェッジ, 三角形, 最大エントロピー, multiplex ネットワーク, 逆問題, 構造的可識別性, 単体的相互作用, メタポピュレーション, 普遍性クラス, 赤外成分, 還元可能性, パースモニー, Transformer, 入力表現, 位置符号化, 知識グラフ, 認知的オフローディング, 脱スキル化, プロセスデータ, キーストローク, 事前登録実験, メタ認知フィードバック",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w38/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w37-9-7-9-11",
        
          title: "arXiv Weekly Digest: 2026-W37 (9/7–9/11)",
        
        description: "2 者間では表せない高次の相互作用を、生成機構・相図・識別限界という別々の角度から詰める研究が並んだ週。カメラを使わない身体計測と、AI を組み込んだ後の検証可能性を問う研究も目立った。",
        keywords: "高次相互作用, ハイパーグラフ, 潜在幾何, 入れ子性, 有限サイズ効果, 次元削減, 相図, ティッピング, 双安定, ヒステリシス, 回復力, 時間ネットワーク, 識別可能性, 自己励起過程, リンク強化, フィッシャー情報, イベント間隔, 感染閾値, 音響センシング, 複数人姿勢推定, 慣性センサ, 校正不要, データ拡張, マルチエージェント模擬, 応答文体, AI 依存, 人間と AI の協働, 検証可能性, 段階分けワークフロー",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w37/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w36-8-31-9-4",
        
          title: "arXiv Weekly Digest: 2026-W36 (8/31–9/4)",
        
        description: "物理法則や解剖学的な制約、高次の相互作用をモデルの構造そのものに組み込む研究が分野をまたいで目立った週。少ない観測点から系の状態を読もうとする研究も複数あった。",
        keywords: "高次相互作用, ハイパーグラフ, 一般有向ハイパーグラフ, rich club, コネクトーム, 部分観測, レポーター選択, ショック分類, 休眠型レポーター, 早期警戒信号, 同期転移, 確率的蔵本モデル, 監視ノード, 局所秩序変数, ニューラル作用素, スペクトルウェーブレット, チェビシェフ多項式, 非構造メッシュ, 解像度同変, 単眼深度推定, 重心推定, 解剖学的事前知識, 端末上推論, アーキテクチャ復元, アーキテクチャドリフト",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w36/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w35-8-24-8-28",
        
          title: "arXiv Weekly Digest: 2026-W35 (8/24–8/28)",
        
        description: "ネットワーク科学の側で連結性やロバストネスの定義そのものを捉え直す論文が複数あった週。動作解析の側では、映像だけでなく筋活動とあわせて扱う研究が目についた。",
        keywords: "高次相互作用, ハイパーグラフ, 単体複体, k-core パーコレーション, アンカーノード, 不連続転移, 強2重連結成分, 生成関数, 有向ネットワーク, 自己平均性, 再帰的成長モデル, 閾値モデル, 相互作用レンジ, 核形成, 臨界分岐, 準安定相, エコーチェンバー検出, コンダクタンス最小化, NP 困難, シード展開, 動作品質評価, 表面筋電, Video2EMG, ナレッジグラフ, 視覚言語モデル, マルチエージェント戦術推論, バドミントン複式, 動的 Bradley-Terry モデル, 極値統計, 潜在強度推定",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w35/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w34-8-17-8-21",
        
          title: "arXiv Weekly Digest: 2026-W34 (8/17–8/21)",
        
        description: "物理法則や幾何構造を帰納バイアスとしてモデルに埋め込む方向が、ネットワーク科学と機械学習の両側で揃った週。高次相互作用とホッジ理論の側では、系の振る舞いを決めているのが局所の相互作用ではなくトポロジーそのものだと示す結果が続いた。",
        keywords: "高次相互作用, ハイパーグラフ, 単体複体, 単体閉包, 爆発的相転移, 次元縮約, レジリエンス, ホッジ分解, 調和成分, 第一コホモロジー, 大域アトラクタ, 転送作用素, Koopman 作用素, linear masking, 早期警戒信号, 臨界減速, 大規模言語モデル, エージェントシミュレーション, 統計力学, ゼロショット動作予測, 骨格系列, ストリーミング映像, イベント記憶, スポーツ実況生成",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w34/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w33-8-10-8-14",
        
          title: "arXiv Weekly Digest: 2026-W33 (8/10–8/14)",
        
        description: "ペアワイズを前提にしてきた枠組みを高次相互作用や複素数重みへ広げる研究と、言語モデルエージェントの集団を物理の道具立てで扱う研究が並んだ週。動作解析の側では、決まった一つの未来ではなく複数のありうる未来や隠れた物理量を推定する方向が目立った。",
        keywords: "高次相互作用, ハイパーグラフ, 適応的伝染, 不連続転移, 次元縮約, グラフの曲率, Ollivier-Ricci 曲率, Forman-Ricci 曲率, 複素数重みグラフ, magnetic Laplacian, エッジ疎化, テンポラルグラフ, 大規模言語モデル, エージェントシミュレーション, 状態符号化, 代理モデル, 動作予測, 多峰性, ラグランジュニューラルネットワーク, 微分可能物理",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w33/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w32-8-3-8-7",
        
          title: "arXiv Weekly Digest: 2026-W32 (8/3–8/7)",
        
        description: "物理法則や幾何・位相の制約をモデルの構造そのものに組み込む研究と、シミュレーションに頼らず解析的に答えや限界を出す研究が重なった週。姿勢推定の側では、関節位置を当てる運動学から接触力や収縮動態を読む力学へ軸足が移りつつある。",
        keywords: "テンポラルネットワーク, イベントグラフ, 到達可能性, 流行閾値, 識別可能性, 高次相互作用, 微分可能リフティング, トポロジカル深層学習, グラフの曲率, 混合曲率表現, 粗視化, コミュニティ検出, 検出可能性閾値, 大規模言語モデル, 表形式データ, 次元数, 物理を組み込んだ学習, 筋収縮動態, 接触圧力推定",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w32/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w31-7-27-7-31",
        
          title: "arXiv Weekly Digest: 2026-W31 (7/27–7/31)",
        
        description: "局所的な量では届かないところを大域的な構造へ置き換える研究が重なった週。グラフの曲率をどのスケールで測るか、潜在空間を経由して粗くするか、高次元の動力学を低次元へ落とすか。",
        keywords: "グラフの曲率, 幾何くりこみ, 粗視化, 転移学習, 次元削減, 不変多様体, 臨界遷移, 高次相互作用, キメラ状態, 意見動力学, 多数派の錯覚, 大規模言語モデル, マルチエージェント, 4 次元復元, 姿勢推定, 不確実性の定量化",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w31/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w30-7-20-7-24",
        
          title: "arXiv Weekly Digest: 2026-W30 (7/20–7/24)",
        
        description: "ハイパーグラフの生成・計量・学習が揃って並んだ週。ブロックモデルの厳密なパーコレーション解析、開示文書からの経済ネットワーク構築、姿勢から生体力学への橋渡しと長尺音声映像の適応的な推論。",
        keywords: "hypergraph, higher-order network, homophily, centrality, stochastic block model, percolation, public goods game, economic network, LLM, uncertainty estimation, biomechanics, long video reasoning",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w30/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w29-7-13-7-17",
        
          title: "arXiv Weekly Digest: 2026-W29 (7/13–7/17)",
        
        description: "高次ネットワーク上の免疫化と紛争による分断、ハイパーグラフや知識グラフを言語モデルへ橋渡しする手法、そして骨格と映像を統合する動作理解。",
        keywords: "higher-order network, network immunization, Hawkes process, percolation, social support, hypergraph, temporal knowledge graph, financial knowledge graph, skeleton, motion understanding",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w29/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w28-7-6-7-10",
        
          title: "arXiv Weekly Digest: 2026-W28 (7/6–7/10)",
        
        description: "裾の重いネットワーク上の凝縮、量子モデルの意見ダイナミクス、スケッチが映す概念の文化差、そしてスポーツ映像理解。",
        keywords: "opinion dynamics, network condensation, preferential attachment, quantum cognition, agent-based modeling, cultural variation, sketch embedding, sports video understanding, action quality assessment, long-form video QA",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w28/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w27-6-29-7-3",
        
          title: "arXiv Weekly Digest: 2026-W27 (6/29–7/3)",
        
        description: "均一な構造からのコミュニティ創発、LLM エージェント網のガラスの天井、動作の理解と描画。",
        keywords: "community detection, Ricci curvature, stochastic block model, temporal network, LLM agent, agent-based modeling, motion-language, Gaussian Splatting",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w27/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w26-6-22-6-26",
        
          title: "arXiv Weekly Digest: 2026-W26 (6/22–6/26)",
        
        description: "LLM エージェント社会の測定可能化と予測的群衆動力学、時間ネットワークの普遍スケール、そして単視点からの 4D・長尺動画理解まで8本。",
        keywords: "LLMエージェント社会, 予測的アクティブマター, 時間ネットワーク, グラフ構造同定, 経済複雑性, 4D復元, 長尺動画理解, クロスモーダル検索",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w26/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w25-6-15-6-18",
        
          title: "arXiv Weekly Digest: 2026-W25 (6/15–6/18)",
        
        description: "グラフ学習への LLM 統合をめぐる議論と、ネットワーク動力学の基盤モデル化・シミュレーションの新着から6本。",
        keywords: "グラフ基盤モデル, 情報拡散, ハイパーグラフ, マルチモーダル属性グラフ, LLM評価",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w25/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w24-6-8-6-12",
        
          title: "arXiv Weekly Digest: 2026-W24 (6/8–6/12)",
        
        description: "細胞複体上の演算子学習と離散 Hodge 分解による脳の有向情報流、適応的ハイパーエッジ学習という高次・位相構造を軸にした理論の進展と、骨格事前知識に頼らない 4D 人体再構成・多重確率テンソル拡散による自己教師あり姿勢推定・最小到達時間に基づくサッカー守備圧の定量化という人体動作 CV の実装、そして商業船隊フルスケール ABM による海上チョークポイント閉鎖の損失分析。",
        keywords: "topological neural operator, cell complex, discrete exterior calculus, Hodge decomposition, effective connectivity, multi-scale hypergraph, self-supervised pose estimation, polystochastic diffusion, 4D human reconstruction, video diffusion, defensive pressure, agent-based model, maritime chokepoint",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w24/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w23-6-1-6-5",
        
          title: "arXiv Weekly Digest: 2026-W23 (6/1–6/5)",
        
        description: "閉じていないエッジまで扱う空間ネットワークの絡み合い測度と、対称性だけで高次位相結合を選び出す選択規則、マルチエージェント LLM の社会的手抜きを記述するスケーリング則、そしてチームスポーツ映像の戦略的推論ベンチマークと NMS フリー姿勢推定・低コスト軌跡アノテーションという CV 実装側の進展。",
        keywords: "higher-order interaction, spatially embedded network, Gauss linking integral, coupled oscillators, symmetry selection rules, multi-agent LLM, Ringelmann effect, scaling law, strategic video intelligence, team sports, NMS-free, pose estimation, interactive annotation",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w23/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w22-5-25-5-29",
        
          title: "arXiv Weekly Digest: 2026-W22 (5/25–5/29)",
        
        description: "ハイパーグラフ上の確率過程を解く近似理論と並行性指標、LLM とニュース大規模分析で広げるサプライチェーンの可視化、出会いの機会と本質的選好を分離する学級ネットワークの推定、イベントカメラによるバドミントンのインパクト計測、そして同盟内強制をめぐる LLM 地政学のストレステスト。",
        keywords: "hypergraph, higher-order network, hyperedge approximation, temporal network, concurrency, supply chain, knowledge graph, circular economy, social network, Wallenius distribution, event camera, badminton, LLM agent, geopolitics",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w22/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w21-5-18-5-22",
        
          title: "arXiv Weekly Digest: 2026-W21 (5/18–5/22)",
        
        description: "高次ネットワークの入れ子構造を測る統一枠組み、疎な文脈層が多層ハイパーグラフの拡散幾何を再構成、意見動態や複雑系の軌跡からネットワークを逆同定する限界、双対性欠陥と時間ネットワークエントロピーによる構造変化の早期検出、そして LLM 社会シミュレーションの頑健性監査。",
        keywords: "PAC learning, network inference, weak identifiability, sparse identification, hypergraph nestedness, multilayer hypergraph, diffusion geometry, duality defect, spectral early warning, temporal network, conditional entropy, LLM social simulation, robustness audit",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w21/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w20-5-11-5-15",
        
          title: "arXiv Weekly Digest: 2026-W20 (5/11–5/15)",
        
        description: "Gaussian Splatting で映像から速度場と材料特性を同時逆推定、Hodge 分解で位相を保存するニューラルオペレータ、弱形式スパース回帰で動画から PDE 発見、開放系共進化ネットワークの持続的不均衡、LLM マルチエージェント合意を Ising モデルで分離、構造的多様性が破壊的科学イノベーションを駆動。",
        keywords: "Gaussian Splatting, inverse physics inference, differentiable simulator, video-to-physics, Hodge decomposition, neural operator, topology preservation, weak-form sparse regression, video-to-PDE, persistent imbalance, open coevolutionary networks, LLM multi-agent, 2D Ising, structural diversity, disruptive innovation, science of science",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w20/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w19-5-4-5-7",
        
          title: "arXiv Weekly Digest: 2026-W19 (5/4–5/7)",
        
        description: "複雑感染をシンプソンの集計バイアスで再解釈、多層ネットワーク動力学の決定版レビュー、経済ショックをホール効果のアナロジーで横方向ストレスとして定式化、都市交通混雑を秩序-無秩序相転移として記述、ホッジ・メッセージパッシングの無限幅カーネル、世界 1 万都市の道路ネットワーク標準化、Ego-Exo 多視点の習熟度評価と生成型フィードバック、人体メッシュ復元と 3D ガウススプラッティングの相互洗練。",
        keywords: "Simpson's contagion, aggregation bias, multiplex network dynamics, Hall sandpile, transversal stress, urban traffic phase transition, effective thermodynamic temperature, topological neural tangent kernel, Hodge message passing, global street networks, OSMnx, multi-view proficiency estimation, ProfVLM, HumanSplatHMR, CAMEL loss",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w19/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w18-4-27-5-1",
        
          title: "arXiv Weekly Digest: 2026-W18 (4/27–5/1)",
        
        description: "アストロサイト由来ゲインから自己注意が創発する力学系、料理コーパスに成立する Zipf 則と Menzerath-Altmann 関係、課税と極値置換が生む経済不平等の不連続相転移、自己教師ありの Action Motifs、ハイパーグラフ入れ子度による相転移制御、教室対話のマルチモーダル方法論、ソクラテス式問いかけの自動質問生成への統合。",
        keywords: "emergent self-attention, astrocyte-gated Hopfield, replicator dynamics, hypergraph nestedness, higher-order SIS, extremal economic inequality, Binder cumulant, culinary Zipf law, Menzerath-Altmann, Action Motifs, classroom discourse methodology, Socratic questioning",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w18/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w17-4-20-4-24",
        
          title: "arXiv Weekly Digest: 2026-W17 (4/20–4/24)",
        
        description: "サッカー戦術の生成モデル、人物-シーン相互作用の学習による高速化、ハイパーグラフの非単調最適性と近接行列表現、マイノリティコミュニティ検出の階層的相転移、軌跡データの同定可能性、ネットワーク形成の因果推論。",
        keywords: "football tactic generation, multi-agent diffusion, human-scene interaction, amortized optimization, hypergraph nestedness, FAME, proximity matrix, minority community detectability, structural identifiability, design-based causal inference",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w17/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w16-4-13-4-17",
        
          title: "arXiv Weekly Digest: 2026-W16 (4/13–4/17)",
        
        description: "サプライチェーンの政策介入、ハイパーグラフの創発、Ricci 曲率による経済レジリエンス、自律 AI エージェント社会、LLM ディベートのバイアス、スポーツ映像からの疲労評価、Elo の一般化。",
        keywords: "supply chain policy, higher-order network, Ricci curvature, AI agent society, LLM bias, agreement drift, sports fatigue, score-driven rating",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w16/";
          
        },
      },{id: "post-arxiv-weekly-digest-2026-w15-4-6-4-10",
        
          title: "arXiv Weekly Digest: 2026-W15 (4/6–4/10)",
        
        description: "時系列ハイパーグラフのバースト性、サプライチェーンのホッジ分解、LLMの科学的寿命、トランポリン姿勢推定、腸-脳軸の定量化。",
        keywords: "temporal hypergraph, burstiness, Hodge decomposition, supply chain, temporal bipartite network, LLM lifespan, trampoline pose estimation, sports commentary, gut-brain axis",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/arxiv-weekly-w15/";
          
        },
      },{id: "news-2024-年度-人工知能学会-研究会優秀賞-を受賞しました-対話型授業における児童-生徒の発話特徴とパーソナリティ特性の関係性",
          title: '2024 年度 人工知能学会 研究会優秀賞 を受賞しました（「対話型授業における児童・生徒の発話特徴とパーソナリティ特性の関係性」）。',
          description: "",
          section: "News",},{id: "news-rieti-discussion-paper-25-e-121-shifting-supply-chain-interdependencies-among-global-automakers-を公開しました",
          title: 'RIETI Discussion Paper 25-E-121 “Shifting Supply Chain Interdependencies among Global Automakers” を公開しました。',
          description: "",
          section: "News",},{id: "news-2026-年度科研費に-2-件採択されました-若手研究-26k16830-代表-llm-対話ネットワーク-と基盤研究-c-26k07935-分担-生成的経済学",
          title: '2026 年度科研費に 2 件採択されました。若手研究 26K16830（代表、LLM × 対話ネットワーク）と基盤研究(C) 26K07935（分担、生成的経済学）。',
          description: "",
          section: "News",},{id: "news-2026-年度-人工知能学会全国大会-第-40-回-で-授業音声からの指導案逆生成-グラフアンサンブルによる骨格同定とゆらぎの教育的価値の検討-を発表しました",
          title: '2026 年度 人工知能学会全国大会（第 40 回）で「授業音声からの指導案逆生成：グラフアンサンブルによる骨格同定とゆらぎの教育的価値の検討」を発表しました。',
          description: "",
          section: "News",},{id: "news-shifting-supply-chain-interdependencies-among-global-automakers-後藤-相馬-が-frontiers-in-big-data-に掲載されました-rieti-dp-25-e-121-の査読版",
          title: '“Shifting Supply Chain Interdependencies among Global Automakers”（後藤・相馬）が Frontiers in Big Data に掲載されました（RIETI DP...',
          description: "",
          section: "News",},{id: "news-マーカーレス-3d-姿勢推定データにおけるフェーズ別複素ヒルベルト主成分分析-後藤-陶-chia-が人工知能学会論文誌-特集論文-スポーツ情報学の萌芽-に採録されました-42-巻-1-号-2027-年掲載予定-プレプリント",
          title: '「マーカーレス 3D 姿勢推定データにおけるフェーズ別複素ヒルベルト主成分分析」（後藤・陶・Chia）が人工知能学会論文誌 特集論文「スポーツ情報学の萌芽」に採録されました（42 巻 1 号、2027 年掲載予定、プレプリント）。',
          description: "",
          section: "News",},{id: "news-日本学校教育学会-第-40-回研究大会で-対話型授業と生成-ai-に関する共同研究を-3-件発表しました",
          title: '日本学校教育学会 第 40 回研究大会で、対話型授業と生成 AI に関する共同研究を 3 件発表しました。',
          description: "",
          section: "News",},{id: "news-人工知能学会-第-107-回-言語-音声理解と対話処理研究会-slud-で-大規模言語モデルを用いた教育対話の深まりと集合知形成プロセスの定量化-を発表しました",
          title: '人工知能学会 第 107 回 言語・音声理解と対話処理研究会（SLUD）で「大規模言語モデルを用いた教育対話の深まりと集合知形成プロセスの定量化」を発表しました。',
          description: "",
          section: "News",},{id: "news-第-24-回-its-シンポジウム-2026-で-共同研究-グリッドロック現象における閉路の位置依存性と動的選択性-を岩岡浩一郎先生がポスター発表しました",
          title: '第 24 回 ITS シンポジウム 2026 で、共同研究「グリッドロック現象における閉路の位置依存性と動的選択性」を岩岡浩一郎先生がポスター発表しました。',
          description: "",
          section: "News",},{id: "projects-対話と集合知",
          title: '対話と集合知',
          description: "対話を通じて形成される知識と集合知の定量化",
          section: "Projects",handler: () => {
              window.location.href = "/research/dialogue-knowledge/";
            },},{id: "projects-社会インフラの数理解析",
          title: '社会インフラの数理解析',
          description: "交通ネットワークに生じるグリッドロックの構造",
          section: "Projects",handler: () => {
              window.location.href = "/research/infrastructure/";
            },},{id: "projects-身体の動きの解析",
          title: '身体の動きの解析',
          description: "3 次元姿勢推定データによるスポーツ動作の定量評価",
          section: "Projects",handler: () => {
              window.location.href = "/research/motion-analysis/";
            },},{id: "projects-素粒子現象論",
          title: '素粒子現象論',
          description: "隠れた QCD 相転移を起源とする重力波",
          section: "Projects",handler: () => {
              window.location.href = "/research/particle-physics/";
            },},{id: "projects-経済ネットワーク",
          title: '経済ネットワーク',
          description: "企業間取引から見る経済の構造と変化",
          section: "Projects",handler: () => {
              window.location.href = "/research/supply-chain/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%67%6F%74%6F@%6B%61%6E%61%7A%61%77%61-%67%75.%61%63.%6A%70", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/hgphys", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
