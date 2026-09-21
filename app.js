(function () {
  "use strict";

  const questions = window.ASSESSMENT_QUESTIONS || [];
  const norms = window.NEO_NORMS;
  const options = ["十分不同意", "不同意", "無意見", "同意", "十分同意"];
  const domainOrder = ["N", "E", "O", "A", "C"];
  const domainNames = { N:"情緒敏感度", E:"外向性", O:"開放性", A:"親和性", C:"盡責性" };
  const domainIcons = { N:"◌", E:"◎", O:"✦", A:"♡", C:"◉" };
  const storageKey = document.documentElement.dataset.private === "true" ? "neo-private-responses-v1" : "big-five-classroom-responses-v1";
  const normSexKey = `${storageKey}-norm-sex`;
  const app = document.getElementById("app");
  const perPage = 20;
  let page = 0;
  let answers = JSON.parse(localStorage.getItem(storageKey) || "{}");
  let normSex = localStorage.getItem(normSexKey) || "";

  function layout(content) {
    app.innerHTML = `<div class="shell"><section class="card">${content}</section></div>`;
  }

  function bandKey(t) {
    if (t <= 34) return "very-low";
    if (t <= 44) return "low";
    if (t <= 55) return "average";
    if (t <= 65) return "high";
    return "very-high";
  }

  function tPosition(t) {
    return Math.max(0, Math.min(100, ((t - 20) / 60) * 100));
  }

  function home() {
    const title = document.documentElement.dataset.private === "true" ? "NEO PI-R 參考版" : "五大人格探索";
    const intro = document.documentElement.dataset.private === "true" ? "只供參考" : "透過 240 條自我描述，探索五個主要人格向度。";
    const isComplete = questions.length > 0 && questions.every(q => answers[q.id] !== undefined);
    const startLabel = isComplete ? "查看結果" : Object.keys(answers).length ? "繼續作答" : "開始";

    layout(`
      <div class="topline"><span class="tag">Personality reference</span></div>
      <h1>${title}</h1>
      <p class="lead">${intro}</p>
      <div class="meta"><span>${questions.length} 題</span><span>約 25–35 分鐘</span><span>毋須登入</span></div>
      <div class="domains">${domainOrder.map(d=>`<div class="domain"><div class="icon">${domainIcons[d]}</div><strong>${domainNames[d]}</strong></div>`).join("")}</div>
      <fieldset class="sex-picker">
        <legend class="sr-only">選擇男或女</legend>
        <div class="sex-options">
          <label><input type="radio" name="norm-sex" value="male" ${normSex === "male" ? "checked" : ""}><span>男</span></label>
          <label><input type="radio" name="norm-sex" value="female" ${normSex === "female" ? "checked" : ""}><span>女</span></label>
        </div>
        <div class="form-error" id="norm-error" hidden>請先選擇男或女。</div>
      </fieldset>
      <button class="primary" id="start">${startLabel}</button>
      <p class="note">這是課堂／個人參考工具，不是臨床診斷，也不是正式心理評估報告。請按你平時的情況作答。</p>
    `);

    app.querySelectorAll('input[name="norm-sex"]').forEach(el => el.onchange = e => {
      normSex = e.target.value;
      localStorage.setItem(normSexKey, normSex);
      document.getElementById("norm-error").hidden = true;
    });

    document.getElementById("start").onclick = () => {
      if (!normSex) {
        document.getElementById("norm-error").hidden = false;
        app.querySelector(".sex-picker").scrollIntoView({behavior:"smooth", block:"center"});
        return;
      }
      if (isComplete) {
        results();
        return;
      }
      page = Math.floor(firstUnanswered() / perPage);
      renderPage();
    };
  }

  function firstUnanswered() {
    const i = questions.findIndex(q => answers[q.id] === undefined);
    return i < 0 ? 0 : i;
  }

  function renderPage(showMissing = false) {
    const start = page * perPage;
    const slice = questions.slice(start, start + perPage);
    const answered = Object.keys(answers).length;

    layout(`
      <div class="progress-head">
        <div><span class="tag">Part ${page + 1} / ${Math.ceil(questions.length / perPage)}</span><h1>你有多同意以下描述？</h1></div>
        <div class="progress-text" id="progress-count">${answered} / ${questions.length}</div>
      </div>
      <div class="progress"><div id="progress-bar" style="width:${answered / questions.length * 100}%"></div></div>
      <div class="question-list">${slice.map(q=>`
        <fieldset class="question ${showMissing && answers[q.id] === undefined ? "missing" : ""}" data-id="${q.id}">
          <legend class="q-title"><span class="q-num">${q.id}.</span><span>${q.text}</span></legend>
          <div class="options">${options.map((label,value)=>`<label class="option"><input type="radio" name="q${q.id}" value="${value}" ${answers[q.id] === value ? "checked" : ""}><span>${label}</span></label>`).join("")}</div>
        </fieldset>`).join("")}</div>
      <div class="actions"><button class="secondary" id="prev" ${page === 0 ? "disabled" : ""}>上一節</button><button class="primary" id="next">${start + perPage >= questions.length ? "完成並計分" : "下一節"}</button></div>
      <div class="save">每次選擇後自動儲存於此瀏覽器</div>
    `);

    app.querySelectorAll("input[type=radio]").forEach(el => el.onchange = e => {
      answers[e.target.name.slice(1)] = Number(e.target.value);
      localStorage.setItem(storageKey, JSON.stringify(answers));
      e.target.closest("fieldset")?.classList.remove("missing");
      const count = Object.keys(answers).length;
      document.getElementById("progress-count").textContent = `${count} / ${questions.length}`;
      document.getElementById("progress-bar").style.width = `${count / questions.length * 100}%`;
    });

    document.getElementById("prev").onclick = () => {
      if (page > 0) {
        page--;
        scrollTo(0, 0);
        renderPage();
      }
    };

    document.getElementById("next").onclick = () => {
      const missing = slice.some(q => answers[q.id] === undefined);
      if (missing) {
        renderPage(true);
        app.querySelector(".missing")?.scrollIntoView({behavior:"smooth", block:"center"});
        return;
      }
      if (start + perPage < questions.length) {
        page++;
        scrollTo(0, 0);
        renderPage();
        return;
      }
      const allMissing = questions.find(q => answers[q.id] === undefined);
      if (allMissing) {
        page = Math.floor((allMissing.id - 1) / perPage);
        renderPage(true);
        return;
      }
      results();
    };
  }

  function calculateResults() {
    const domainRaw = {N:0,E:0,O:0,A:0,C:0};
    const facetRaw = {};

    questions.forEach(q => {
      const raw = answers[q.id];
      const score = q.reverse ? 4 - raw : raw;
      domainRaw[q.domain] += score;
      facetRaw[q.facet] = facetRaw[q.facet] || {code:q.facet, domain:q.domain, label:q.facetLabel, raw:0};
      facetRaw[q.facet].raw += score;
    });

    const domains = domainOrder.map(code => {
      const raw = domainRaw[code];
      const t = norms.tScore(normSex, code, raw);
      return {code, label:domainNames[code], raw, t, band:norms.band(t), bandKey:bandKey(t)};
    });

    const facets = domainOrder.flatMap(domain => Array.from({length:6}, (_, index) => `${domain}${index + 1}`)).map(code => {
      const item = facetRaw[code];
      const t = norms.tScore(normSex, code, item.raw);
      return {...item, t, band:norms.band(t), bandKey:bandKey(t)};
    });

    return {domains, facets};
  }

  function polarPoint(cx, cy, radius, index) {
    const angle = (-Math.PI / 2) + (index * Math.PI * 2 / 6);
    return {x:cx + Math.cos(angle) * radius, y:cy + Math.sin(angle) * radius};
  }

  function polygonPoints(cx, cy, radius) {
    return Array.from({length:6}, (_, index) => {
      const point = polarPoint(cx, cy, radius, index);
      return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
    }).join(" ");
  }

  function radarChart(domain, rows) {
    const width = 520;
    const height = 430;
    const cx = width / 2;
    const cy = 204;
    const maxRadius = 124;
    const radiusForT = t => Math.max(0, Math.min(maxRadius, ((t - 20) / 60) * maxRadius));
    const gridScores = [35, 45, 50, 55, 65, 80];
    const averageOuter = polygonPoints(cx, cy, radiusForT(55));
    const averageInner = polygonPoints(cx, cy, radiusForT(45));
    const dataPoints = rows.map((row, index) => {
      const point = polarPoint(cx, cy, radiusForT(row.t), index);
      return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
    }).join(" ");

    const axes = rows.map((row, index) => {
      const end = polarPoint(cx, cy, maxRadius, index);
      const label = polarPoint(cx, cy, maxRadius + 45, index);
      const anchor = label.x > cx + 12 ? "start" : label.x < cx - 12 ? "end" : "middle";
      const yAdjust = index === 0 ? -5 : index === 3 ? 8 : 0;
      return `
        <line class="radar-axis" x1="${cx}" y1="${cy}" x2="${end.x.toFixed(1)}" y2="${end.y.toFixed(1)}"></line>
        <text class="radar-label" x="${label.x.toFixed(1)}" y="${(label.y + yAdjust).toFixed(1)}" text-anchor="${anchor}">
          <tspan x="${label.x.toFixed(1)}">${row.code} · ${row.label}</tspan>
          <tspan class="radar-label-value band-text-${row.bandKey}" x="${label.x.toFixed(1)}" dy="19">T ${row.t} · ${row.band}</tspan>
        </text>`;
    }).join("");

    return `
      <article class="radar-card">
        <div class="chart-heading"><div><span>${domain.code}</span><h3>${domain.label}</h3></div><strong class="band-text-${domain.bandKey}">T ${domain.t} · ${domain.band}</strong></div>
        <svg class="radar-chart" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="radar-${domain.code}-title radar-${domain.code}-desc">
          <title id="radar-${domain.code}-title">${domain.label}六項特質輪廓</title>
          <desc id="radar-${domain.code}-desc">由中心 T20 至外圈 T80；六個頂點顯示各項特質的 T-score。</desc>
          <polygon class="radar-average-outer" points="${averageOuter}"></polygon>
          <polygon class="radar-average-inner" points="${averageInner}"></polygon>
          ${gridScores.map(score => `<polygon class="radar-grid-line ${score === 50 ? "radar-midline" : ""}" points="${polygonPoints(cx, cy, radiusForT(score))}"></polygon>`).join("")}
          ${axes}
          <polygon class="radar-shape" points="${dataPoints}"></polygon>
          ${rows.map((row, index) => {
            const point = polarPoint(cx, cy, radiusForT(row.t), index);
            return `<circle class="radar-point band-${row.bandKey}" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="6"><title>${row.code} ${row.label}：T ${row.t}，${row.band}</title></circle>`;
          }).join("")}
        </svg>
        <div class="radar-mobile-list">${rows.map(row => `<div><span><strong>${row.code}</strong> ${row.label}</span><span class="band-text-${row.bandKey}">T ${row.t} · ${row.band}</span></div>`).join("")}</div>
      </article>`;
  }

  function updateRadarViewboxes() {
    const compact = window.matchMedia("(max-width:520px)").matches;
    app.querySelectorAll(".radar-chart").forEach(chart => {
      chart.setAttribute("viewBox", compact ? "104 50 312 310" : "0 0 520 430");
    });
  }

  function facetAxis() {
    const ticks = [20, 35, 45, 55, 65, 80];
    return `<div class="facet-axis" aria-hidden="true">${ticks.map(t => `<span style="left:${tPosition(t)}%">${t}</span>`).join("")}</div>`;
  }

  function facetOverview(facets) {
    return domainOrder.map(domainCode => {
      const rows = facets.filter(row => row.domain === domainCode);
      return `
        <section class="facet-group" aria-labelledby="facet-group-${domainCode}">
          <div class="facet-group-title"><span>${domainCode}</span><h3 id="facet-group-${domainCode}">${domainNames[domainCode]}</h3></div>
          <div class="facet-axis-row"><span></span>${facetAxis()}<span></span></div>
          ${rows.map(row => {
            const position = tPosition(row.t);
            const lineStart = Math.min(50, position);
            const lineWidth = Math.max(0.8, Math.abs(position - 50));
            return `
              <div class="facet-row" aria-label="${row.code} ${row.label}，T ${row.t}，${row.band}">
                <div class="facet-name"><strong>${row.code}</strong><span>${row.label}</span></div>
                <div class="facet-track">
                  <span class="facet-midline"></span>
                  <span class="facet-bar band-${row.bandKey}" style="left:${lineStart}%;width:${lineWidth}%"></span>
                  <span class="facet-marker band-${row.bandKey}" style="left:${position}%"></span>
                </div>
                <div class="facet-reading"><strong>T ${row.t}</strong><span class="band-text-${row.bandKey}">${row.band}</span></div>
              </div>`;
          }).join("")}
        </section>`;
    }).join("");
  }

  function results() {
    const result = calculateResults();

    layout(`
      <div class="topline"><span class="tag">Your profile</span></div>
      <h1 class="results-title">五大人格結果</h1>
      <div class="result-grid">${result.domains.map(domain => `
        <article class="score-card band-${domain.bandKey}">
          <div class="score-card-head"><strong>${domain.label}</strong><span>${domain.band}</span></div>
          <div class="domain-t">T ${domain.t}</div>
          <div class="domain-raw">Raw ${domain.raw} / 192</div>
          <div class="domain-track"><span class="domain-midline"></span><i style="left:${tPosition(domain.t)}%"></i></div>
        </article>`).join("")}</div>

      <div class="legend" aria-label="T-score 分級">
        <span><i class="band-very-low"></i>非常低 20–34</span>
        <span><i class="band-low"></i>低 35–44</span>
        <span><i class="band-average"></i>平均 45–55</span>
        <span><i class="band-high"></i>高 56–65</span>
        <span><i class="band-very-high"></i>非常高 66–80</span>
      </div>

      <section class="result-section" aria-labelledby="radar-heading">
        <div class="section-heading"><span>5 × 6</span><h2 id="radar-heading">六項特質輪廓</h2></div>
        <div class="radar-grid">${result.domains.map(domain => radarChart(domain, result.facets.filter(row => row.domain === domain.code))).join("")}</div>
      </section>

      <section class="result-section" aria-labelledby="overview-heading">
        <div class="section-heading"><span>30</span><h2 id="overview-heading">特質總覽</h2></div>
        <div class="facet-overview">${facetOverview(result.facets)}</div>
      </section>

      <div class="result-actions"><button class="primary" id="restart">清除答案並重新開始</button></div>
    `);

    updateRadarViewboxes();

    document.getElementById("restart").onclick = () => {
      if (confirm("確定清除這部瀏覽器內的全部答案？")) {
        localStorage.removeItem(storageKey);
        answers = {};
        page = 0;
        home();
        scrollTo(0, 0);
      }
    };
  }

  window.addEventListener("resize", updateRadarViewboxes);
  home();
})();
