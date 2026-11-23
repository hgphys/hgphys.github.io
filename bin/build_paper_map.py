#!/usr/bin/env python3
"""ブログでピックアップした論文のネットワーク（論文マップ）を作る。

- ノード: 公開済みの記事（_posts/*.md）でピックアップした論文。
- 大分類: arXiv の主カテゴリ（記事の「分野」の先頭）。数本しかないものはまとめる。
- 小分類: Knowledge/papers のノートのタグから、下の SUB の対応で付ける（1 本に 1〜3 個）。
- エッジ: Knowledge のノートどうしの [[内部リンク]]（実線）と、
  細かいタグを 3 個以上共有する組（点線、内部リンクのない組だけ）。
- 出力: assets/json/paper-map.json
- --retag を付けると、各記事の tags を、その記事の論文の小分類で付け直し、
  ブログの一覧に出す _data/paper_tags.yml も作る。本文のキーワードの行が残っていれば
  front matter の keywords（サイト内検索用）へ移す。

Knowledge/papers は GitHub 上にないので、記事を足したら手元で実行して JSON をコミットする:
    python3 bin/build_paper_map.py --retag
"""
import argparse
import collections
import glob
import itertools
import json
import os
import re
import sys

HOME = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KNOWLEDGE = os.path.expanduser("~/Dropbox/Lab/Knowledge/papers")
OUT = os.path.join(HOME, "assets/json/paper-map.json")

# 大分類（arXiv 主カテゴリ → 表示の大分類）。ここにないものは "other"。
BIG = {
    "physics.soc-ph": "physics.soc-ph",
    "cs.SI": "cs.SI",
    "cs.CV": "cs.CV",
    "cs.LG": "cs.LG",
    "stat.ML": "cs.LG",
    "cs.HC": "cs.HC",
    "cs.CY": "cs.HC",
    "cs.CL": "cs.CL",
    "cs.AI": "cs.CL",
    "cs.MA": "cs.CL",
    "stat.AP": "stat.AP",
}
BIG_LABEL = {
    "physics.soc-ph": "physics.soc-ph（社会物理）",
    "cs.SI": "cs.SI（社会・情報ネットワーク）",
    "cs.CV": "cs.CV（コンピュータビジョン）",
    "cs.LG": "cs.LG（機械学習）",
    "cs.HC": "cs.HC・cs.CY（人とコンピュータ・社会）",
    "cs.CL": "cs.CL・cs.AI・cs.MA（言語・AI・マルチエージェント）",
    "stat.AP": "stat.AP（応用統計）",
    "other": "その他（cond-mat・nlin・math・q-bio など）",
}
BIG_ORDER = list(BIG_LABEL)

# 小分類: (グループ, 表示名, 一致させる語)。語は「タグの一部に含まれる」で一致させる。
# 語の頭に ^ を付けたものは、タグをハイフンで区切った語と完全に一致させる。
SUB = {
    "community-detection": ("ネットワークの構造", "コミュニティ検出", ["community-detection", "community-structure", "block-model", "modularity", "graph-clustering", "spectral-clustering"]),
    "network-geometry": ("ネットワークの構造", "幾何・埋め込み", ["curvature", "network-geometry", "hyperbolic", "latent-space", "graph-embedding", "network-embedding"]),
    "temporal-network": ("ネットワークの構造", "時間発展するネットワーク", ["temporal-network", "temporal-graph", "temporal-hypergraph", "dynamic-network"]),
    "social-network": ("ネットワークの構造", "社会ネットワークの実証", ["social-network", "online-community", "social-support"]),
    "network-formation": ("ネットワークの構造", "ネットワークの生成", ["preferential-attachment", "small-world", "scale-free", "network-growth", "network-formation"]),
    "multilayer-network": ("ネットワークの構造", "多層ネットワーク", ["multilayer", "multiplex"]),
    "network-inference": ("ネットワークの構造", "推定・帰無モデル", ["network-inference", "network-reconstruction", "null-model", "identifiab", "observab", "sampling"]),
    "opinion-dynamics": ("ネットワーク上のダイナミクス", "意見のダイナミクス", ["opinion", "polariz", "consensus", "voter", "structural-balance", "signed"]),
    "epidemics-contagion": ("ネットワーク上のダイナミクス", "感染・伝播", ["epidem", "contagion", "spreading", "cascade", "diffusion-on"]),
    "synchronization": ("ネットワーク上のダイナミクス", "同期", ["synchron", "kuramoto", "oscillator"]),
    "percolation-phase": ("ネットワーク上のダイナミクス", "パーコレーション・相転移", ["percolat", "phase-transition", "tipping", "criticality", "critical-transition", "condensation"]),
    "resilience-control": ("ネットワーク上のダイナミクス", "頑健性・制御", ["resilience", "network-robustness", "network-control", "controllab", "sensor-placement", "^control"]),
    "game-cooperation": ("ネットワーク上のダイナミクス", "ゲーム・協力", ["game-theory", "evolutionary-game", "cooperation", "public-goods"]),
    "hypergraph": ("高次の構造", "ハイパーグラフ", ["hypergraph"]),
    "simplicial-topology": ("高次の構造", "単体複体・位相", ["simplicial", "topolog", "hodge", "sheaf", "cell-complex", "persistent-homology"]),
    "higher-order-dynamics": ("高次の構造", "高次の相互作用", ["higher-order-interaction", "higher-order-dynamics", "higher-order-network"]),
    "economic-network": ("社会と経済", "経済・サプライチェーン", ["supply-chain", "economic", "trade", "firm", "production-network", "financ"]),
    "urban-mobility": ("社会と経済", "都市・移動", ["urban", "mobility", "traffic"]),
    "culture-language": ("社会と経済", "文化・言語", ["cultur", "linguistic", "culinary"]),
    "science-of-science": ("社会と経済", "科学の科学", ["science-of-science", "citation", "scientometric", "bibliometric"]),
    "llm-agent": ("LLM", "LLM エージェント", ["llm-agent", "ai-agent", "multi-agent", "social-simulation", "agent-based", "generative-agent"]),
    "llm-evaluation": ("LLM", "LLM の評価", ["llm-as-a-judge", "llm-judge", "evaluation", "benchmark", "annotation", "reliability"]),
    "collective-deliberation": ("LLM", "議論・集合知", ["deliberation", "debate", "collective-intelligence", "wisdom", "collective-decision"]),
    "knowledge-graph": ("LLM", "知識グラフ・談話", ["knowledge-graph", "discourse", "argument", "concept-map"]),
    "human-ai-interaction": ("LLM", "人と AI の協働", ["human-ai", "human-llm", "collaboration", "co-creation", "mixed-initiative"]),
    "education": ("教育", "教育・学習の分析", ["education", "learning-analytics", "classroom", "teacher", "student", "tutor"]),
    "pose-estimation": ("画像と動作", "姿勢推定", ["pose", "skeleton", "motion-capture", "human-motion", "body-mesh", "smpl", "text-to-motion", "motion-language"]),
    "3d-reconstruction": ("画像と動作", "3 次元復元", ["gaussian-splatting", "3d-reconstruction", "3d-human-reconstruction", "nerf", "depth-estimation", "multi-view"]),
    "video-understanding": ("画像と動作", "動画の理解", ["video", "action-recognition", "object-tracking", "multi-object-tracking"]),
    "sports-analytics": ("画像と動作", "スポーツ", ["^sports", "sports-", "soccer", "football", "basketball", "athlet", "biomechanic", "musculoskeletal", "tennis", "baseball"]),
    "gnn-representation": ("方法", "GNN・表現学習", ["graph-neural", "gnn", "representation-learning", "graph-transformer", "graph-foundation"]),
    "physics-informed-ml": ("方法", "物理と機械学習", ["physics-based", "physics-informed", "pde", "neural-operator", "dynamical-system", "inverse-problem", "equation-discovery"]),
    "causal-inference": ("方法", "因果推論・実験", ["causal", "randomized", "field-experiment"]),
    "time-series": ("方法", "時系列・統計の検定", ["time-series", "cross-correlation", "two-sample"]),
    "statistical-physics": ("方法", "統計物理", ["statistical-physics", "statistical-mechanics", "entropy", "ising", "renormalization", "maximum-entropy", "non-equilibrium"]),
}
SUB_ORDER = list(SUB)
MAX_SUB = 3
# 対応表で小分類が付かない論文、付き方が合わない論文を手で決める（arXiv ID → 小分類）。
OVERRIDE = {
    "2608.02412": ["llm-evaluation"],  # LLM の表形式予測の失敗
    "2608.28403": ["human-ai-interaction"],  # 開発記録からのアーキテクチャ意図の復元
}

CAT_RE = re.compile(r"\b((?:cs|physics|stat|math|q-bio|q-fin|econ|eess|nlin|cond-mat)\.[A-Za-z\-]+)")


def front_matter(text):
    parts = text.split("---", 2)
    return parts[1] if len(parts) >= 3 else ""


def yaml_list(fm, key):
    m = re.search(rf"^{key}:\s*\n((?:\s+- .*\n?)+)", fm, re.M)
    if m:
        return [x.strip()[2:].strip().strip('"') for x in m.group(1).splitlines() if x.strip()]
    m = re.search(rf"^{key}:\s*\[(.*?)\]", fm, re.M)
    return [x.strip().strip('"') for x in m.group(1).split(",") if x.strip()] if m else []


def yaml_str(fm, key):
    m = re.search(rf'^{key}:\s*"?(.*?)"?\s*$', fm, re.M)
    return m.group(1) if m else ""


def match_subs(tags):
    scores = collections.Counter()
    for tag in tags:
        words = tag.split("-")
        for key, (_, _, keys) in SUB.items():
            for k in keys:
                if (k[1:] in words) if k.startswith("^") else (k in tag):
                    scores[key] += 1
                    break
    # 一致したタグの数が多い順、同数なら SUB の並び順
    ranked = sorted(scores, key=lambda s: (-scores[s], SUB_ORDER.index(s)))
    return ranked[:MAX_SUB]


def load_knowledge():
    notes = {}
    for f in glob.glob(os.path.join(KNOWLEDGE, "*.md")):
        text = open(f, encoding="utf-8").read()
        fm = front_matter(text)
        aid = yaml_str(fm, "arxiv_id")
        if not aid:
            continue
        key = os.path.basename(f)[:-3]
        notes[aid] = {
            "key": key,
            "title": yaml_str(fm, "title"),
            "authors": yaml_list(fm, "authors"),
            "year": yaml_str(fm, "year"),
            "tags": {t.lower() for t in yaml_list(fm, "tags")},
            "links": set(re.findall(r"\[\[([^\]|#]+)", text)),
        }
    return notes


def move_keywords(text):
    """本文の「**キーワード**:」の行を、front matter の keywords（サイト内検索用）へ移す。"""
    m = re.search(r"^\*\*キーワード\*\*[:：]\s*(.+)\n+", text, re.M)
    if not m:
        return text
    words = list(dict.fromkeys(w.strip() for w in re.split(r"[,、，]", m.group(1)) if w.strip()))
    body = text[: m.start()] + text[m.end() :]
    if re.search(r"^keywords:", front_matter(body), re.M):
        return body
    line = "keywords: " + json.dumps(", ".join(words), ensure_ascii=False)
    return re.sub(r"^(tags:.*)$", lambda t: t.group(1) + "\n" + line, body, count=1, flags=re.M)


def post_url(path):
    name = os.path.basename(path)[:-3]
    m = re.match(r"(\d{4})-\d{2}-\d{2}-(.+)", name)
    return f"/blog/{m.group(1)}/{m.group(2)}/"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--retag", action="store_true", help="記事の tags を小分類で付け直す")
    args = ap.parse_args()

    notes = load_knowledge()
    nodes, post_subs, missing = {}, {}, []
    for path in sorted(glob.glob(os.path.join(HOME, "_posts/*.md"))):
        text = open(path, encoding="utf-8").read()
        fm = front_matter(text)
        published = "published: false" not in fm
        week = yaml_str(fm, "title")
        m = re.search(r"(\d{4}-W\d+)", week)
        week = m.group(1) if m else os.path.basename(path)[:10]
        tag_count = collections.Counter()
        for block in re.split(r"\n### ", text)[1:]:
            head = block.splitlines()[0]
            am = re.search(r"arxiv\.org/abs/([0-9]{4}\.[0-9]{4,5})", block)
            anchor = re.search(r"\{#([^}]+)\}", head)
            if not am:
                continue
            aid = am.group(1)
            fm_cat = re.search(r"\*\*分野\*\*:\s*(.+)", block)
            cm = CAT_RE.search(fm_cat.group(1)) if fm_cat else None
            primary = cm.group(1) if cm else ""
            big = BIG.get(primary, "other")
            note = notes.get(aid)
            if note is None:
                if published:
                    missing.append(aid)
                continue
            subs = OVERRIDE.get(aid) or match_subs(note["tags"])
            tag_count.update(subs)
            if not published:
                continue
            nodes[aid] = {
                "id": aid,
                "key": note["key"],
                "title": re.sub(r"\s*\{#.*\}\s*$", "", head).strip(),
                "authors": note["authors"][:3] + (["…"] if len(note["authors"]) > 3 else []),
                "year": note["year"],
                "primary": primary,
                "big": big,
                "subs": subs,
                "week": week,
                "url": post_url(path) + (f"#{anchor.group(1)}" if anchor else ""),
                "arxiv": f"https://arxiv.org/abs/{aid}",
            }
        post_subs[path] = (published, sorted(tag_count, key=lambda t: (-tag_count[t], SUB_ORDER.index(t))))

    # エッジ
    by_key = {n["key"]: aid for aid, n in nodes.items()}
    links = set()
    for aid in nodes:
        for target in notes[aid]["links"]:
            other = by_key.get(target.strip())
            if other and other != aid:
                links.add(tuple(sorted((aid, other))))
    edges = [{"source": a, "target": b, "type": "link"} for a, b in sorted(links)]
    for a, b in itertools.combinations(sorted(nodes), 2):
        if (a, b) in links:
            continue
        shared = notes[a]["tags"] & notes[b]["tags"]
        if len(shared) >= 3:
            edges.append({"source": a, "target": b, "type": "tags", "shared": sorted(shared)})

    data = {
        "big": [{"id": b, "label": BIG_LABEL[b]} for b in BIG_ORDER],
        "sub": [{"id": s, "group": SUB[s][0], "label": SUB[s][1]} for s in SUB_ORDER],
        "nodes": sorted(nodes.values(), key=lambda n: n["id"]),
        "edges": edges,
    }
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))

    # 報告
    nolabel = [n["id"] for n in nodes.values() if not n["subs"]]
    print(f"nodes {len(nodes)}  edges link {len(links)} / tags {len(edges) - len(links)}")
    print("big:", dict(collections.Counter(n["big"] for n in nodes.values()).most_common()))
    print("sub:", dict(collections.Counter(s for n in nodes.values() for s in n["subs"]).most_common()))
    if nolabel:
        print("小分類なし（OVERRIDE で決める）:", nolabel)
    if missing:
        print("Knowledge にノートがない:", missing)

    if args.retag:
        changed = 0
        for path, (_, tags) in post_subs.items():
            text = open(path, encoding="utf-8").read()
            new = re.sub(r"^tags:.*$", "tags: [" + ", ".join(tags) + "]", text, count=1, flags=re.M)
            new = re.sub(r"^categories:\s*weekly\s*\n", "", new, count=1, flags=re.M)  # 全記事に付くので外す
            new = move_keywords(new)
            # 冒頭の定型文はブログのトップと記事テンプレートに移した
            new = re.sub(r"^arXiv の新着論文から、AI の力も借りつつ.*\n+", "", new, count=1, flags=re.M)
            new = re.sub(r"^(title:.*\d)--(\d.*)$", r"\1–\2", new, count=1, flags=re.M)  # 日付の範囲は –
            if new != text:
                open(path, "w", encoding="utf-8").write(new)
                changed += 1
        print(f"retagged {changed} posts")
        n_posts = collections.Counter(t for pub, tags in post_subs.values() if pub for t in tags)
        lines = ["# bin/build_paper_map.py --retag が作る。手で編集しない。"]
        for group in dict.fromkeys(v[0] for v in SUB.values()):
            items = [k for k in SUB_ORDER if SUB[k][0] == group and n_posts[k]]
            if items:
                lines.append(f'- group: "{group}"\n  tags:')
                lines += [f'    - {{ id: "{k}", label: "{SUB[k][1]}", posts: {n_posts[k]} }}' for k in items]
        with open(os.path.join(HOME, "_data/paper_tags.yml"), "w", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")
        counts = [len(tags) for pub, tags in post_subs.values() if pub]
        print(f"tags per post: min {min(counts)} / max {max(counts)} / mean {sum(counts) / len(counts):.1f}")
        print("posts per tag:", dict(n_posts.most_common()))
    return 0


if __name__ == "__main__":
    sys.exit(main())
