// 論文マップ: bin/build_paper_map.py が作る assets/json/paper-map.json を描く
(function () {
  const script = document.getElementById("pm-script");
  const root = document.getElementById("paper-map");
  if (!script || !root) return;

  function start() {
    if (!window.d3) return setTimeout(start, 50);
    fetch(script.dataset.src)
      .then((r) => r.json())
      .then(draw);
  }

  function draw(data) {
    const d3 = window.d3;
    const bigs = data.big.map((b) => b.id);
    const bigLabel = Object.fromEntries(data.big.map((b) => [b.id, b.label]));
    const subLabel = Object.fromEntries(data.sub.map((s) => [s.id, s.label]));
    const color = (big) => `var(--pm-c${bigs.indexOf(big) + 1})`;

    // 主題の選択肢（グループごと、論文のあるものだけ）
    const subCount = {};
    data.nodes.forEach((n) => n.subs.forEach((s) => (subCount[s] = (subCount[s] || 0) + 1)));
    const select = document.getElementById("pm-sub");
    const groups = [...new Set(data.sub.map((s) => s.group))];
    groups.forEach((g) => {
      const og = document.createElement("optgroup");
      og.label = g;
      data.sub
        .filter((s) => s.group === g && subCount[s.id])
        .forEach((s) => {
          const o = document.createElement("option");
          o.value = s.id;
          o.textContent = `${s.label}（${subCount[s.id]}）`;
          og.appendChild(o);
        });
      if (og.children.length) select.appendChild(og);
    });

    // 凡例（押すとそのカテゴリを強調）
    const bigCount = d3.rollup(data.nodes, (v) => v.length, (n) => n.big);
    const legend = document.getElementById("pm-legend");
    let activeBig = null;
    data.big.forEach((b) => {
      if (!bigCount.get(b.id)) return;
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.big = b.id;
      btn.innerHTML = `<span class="pm-swatch" style="background:${color(b.id)}"></span>${b.label}<span class="pm-n">${bigCount.get(b.id)}</span>`;
      btn.addEventListener("click", () => {
        activeBig = activeBig === b.id ? null : b.id;
        legend.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x.dataset.big === activeBig));
        update();
      });
      li.appendChild(btn);
      legend.appendChild(li);
    });

    // 表
    const list = document.getElementById("pm-list");
    const byBig = d3.group(data.nodes, (n) => n.big);
    list.innerHTML = data.big
      .filter((b) => byBig.get(b.id))
      .map(
        (b) =>
          `<h3>${b.label}</h3><ul>` +
          byBig
            .get(b.id)
            .map((n) => `<li><a href="${n.url}">${n.title}</a> <span class="pm-meta">${n.week}・${n.subs.map((s) => subLabel[s]).join("・")}</span></li>`)
            .join("") +
          "</ul>"
      )
      .join("");

    // ネットワーク
    const nodes = data.nodes.map((n) => ({ ...n }));
    const edges = data.edges.map((e) => ({ ...e }));
    const deg = {};
    edges.forEach((e) => {
      deg[e.source] = (deg[e.source] || 0) + 1;
      deg[e.target] = (deg[e.target] || 0) + 1;
    });
    const radius = (n) => 4 + Math.sqrt(deg[n.id] || 0) * 1.6;

    const svg = d3.select("#pm-svg");
    const W = 900,
      H = 640;
    svg.attr("viewBox", [0, 0, W, H]);
    const gZoom = svg.append("g");
    svg.call(
      d3
        .zoom()
        .scaleExtent([0.4, 5])
        .on("zoom", (ev) => gZoom.attr("transform", ev.transform))
    );
    const gEdge = gZoom.append("g").attr("class", "pm-edges");
    const gNode = gZoom.append("g").attr("class", "pm-nodes");

    const edgeSel = gEdge
      .selectAll("line")
      .data(edges)
      .join("line")
      .attr("class", (e) => (e.type === "link" ? "pm-link" : "pm-tagedge"));
    const nodeSel = gNode
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", radius)
      .attr("fill", (n) => color(n.big))
      .attr("tabindex", 0)
      .on("click", (ev, n) => (window.location.href = n.url))
      .on("keydown", (ev, n) => ev.key === "Enter" && (window.location.href = n.url))
      .on("mouseenter focus", (ev, n) => showTip(ev, n))
      .on("mousemove", (ev, n) => showTip(ev, n))
      .on("mouseleave blur", hideTip);

    // カテゴリごとに緩く寄せる
    const angle = (b) => (2 * Math.PI * bigs.indexOf(b)) / bigs.length;
    const sim = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(edges).id((n) => n.id).distance((e) => (e.type === "link" ? 40 : 70)).strength((e) => (e.type === "link" ? 0.6 : 0.08)))
      .force("charge", d3.forceManyBody().strength((n) => (deg[n.id] ? -40 : -12)))
      .force("x", d3.forceX((n) => W / 2 + Math.cos(angle(n.big)) * 230).strength((n) => (deg[n.id] ? 0.05 : 0.18)))
      .force("y", d3.forceY((n) => H / 2 + Math.sin(angle(n.big)) * 175).strength((n) => (deg[n.id] ? 0.05 : 0.18)))
      .force("collide", d3.forceCollide((n) => radius(n) + 1.5))
      .on("tick", () => {
        edgeSel.attr("x1", (e) => e.source.x).attr("y1", (e) => e.source.y).attr("x2", (e) => e.target.x).attr("y2", (e) => e.target.y);
        nodeSel.attr("cx", (n) => n.x).attr("cy", (n) => n.y);
      });

    const tip = document.getElementById("pm-tip");
    const canvas = root.querySelector(".pm-canvas");
    function showTip(ev, n) {
      const authors = n.authors.join(", ");
      tip.innerHTML = `<strong>${n.title}</strong><div>${authors}</div><div class="pm-meta">${n.week}・${bigLabel[n.big]}</div><div class="pm-meta">${n.subs.map((s) => subLabel[s]).join("・")}</div>`;
      tip.hidden = false;
      const box = canvas.getBoundingClientRect();
      const x = (ev.clientX || box.left + box.width / 2) - box.left;
      const y = (ev.clientY || box.top + box.height / 2) - box.top;
      const tw = tip.offsetWidth;
      tip.style.left = Math.min(Math.max(x + 14, 4), box.width - tw - 4) + "px";
      tip.style.top = y + 16 + "px";
    }
    function hideTip() {
      tip.hidden = true;
    }

    const tagBox = document.getElementById("pm-tags");
    select.addEventListener("change", update);
    tagBox.addEventListener("change", update);
    function update() {
      const sub = select.value;
      const hit = (n) => (!sub || n.subs.includes(sub)) && (!activeBig || n.big === activeBig);
      nodeSel.classed("dim", (n) => !hit(n));
      edgeSel
        .classed("hidden", (e) => e.type === "tags" && !tagBox.checked)
        .classed("dim", (e) => !(hit(e.source) && hit(e.target)));
      const k = nodes.filter(hit).length;
      document.getElementById("pm-count").textContent = `${k} / ${nodes.length} 本`;
    }
    update();
  }

  start();
})();
