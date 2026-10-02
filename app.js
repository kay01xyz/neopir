(function () {
  "use strict";

  const questions = window.ASSESSMENT_QUESTIONS || [];
  const norms = window.NEO_NORMS;
  const options = ["十分不同意", "不同意", "無意見", "同意", "十分同意"];
  const domainOrder = ["N", "E", "O", "A", "C"];
  const domainNames = { N:"情緒敏感度", E:"外向性", O:"開放性", A:"親和性", C:"盡責性" };
  const domainIcons = { N:"◌", E:"◎", O:"✦", A:"♡", C:"◉" };
  const storageKey = document.documentElement.dataset.private === "true" ? "neo-private-responses-custom-2026-10-02" : "big-five-classroom-responses-custom-2026-10-02";
  const normSexKey = `${storageKey}-norm-sex`;
  const app = document.getElementById("app");
  const perPage = 20;
  let page = 0;
  function readSaved(key) { try { return localStorage.getItem(key); } catch { return null; } }
  let storageAvailable = true;
  function saveValue(key, value) { try { localStorage.setItem(key, value); } catch { storageAvailable = false; } }
  function validAnswer(value) { return Number.isInteger(value) && value >= 0 && value <= 4; }
  let answers = {};
  try {
    const saved = JSON.parse(readSaved(storageKey) || "{}");
    if (saved && typeof saved === "object" && !Array.isArray(saved)) {
      questions.forEach(q => { if (validAnswer(saved[q.id])) answers[q.id] = saved[q.id]; });
    }
  } catch { answers = {}; }
  let normSex = readSaved(normSexKey) || "";
  if (!["male", "female"].includes(normSex)) normSex = "";

  function layout(content) {
    app.innerHTML = `<div class="shell"><section class="card">${content}</section></div>`;
  }

  // Category positions, not continuous standardized scores.
  function tPosition(level) { return 10 + (level - 1) * 20; }

  function home() {
    const title = document.documentElement.dataset.private === "true" ? "NEO-PI-R Personality Assessment" : "評估五大性格維度";
    const intro = document.documentElement.dataset.private === "true" ? "評估五大性格維度" : "透過 240 條自我描述，探索五個主要人格向度。";
    const isComplete = questions.length > 0 && questions.every(q => validAnswer(answers[q.id]));
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
      saveValue(normSexKey, normSex);
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
    const i = questions.findIndex(q => !validAnswer(answers[q.id]));
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
        <fieldset class="question ${showMissing && !validAnswer(answers[q.id]) ? "missing" : ""}" data-id="${q.id}">
          <legend class="q-title"><span class="q-num">${q.id}.</span><span>${q.text}</span></legend>
          <div class="options">${options.map((label,value)=>`<label class="option"><input type="radio" name="q${q.id}" value="${value}" ${answers[q.id] === value ? "checked" : ""}><span>${label}</span></label>`).join("")}</div>
        </fieldset>`).join("")}</div>
      <div class="actions"><button class="secondary" id="prev" ${page === 0 ? "disabled" : ""}>上一節</button><button class="primary" id="next">${start + perPage >= questions.length ? "完成並計分" : "下一節"}</button></div>
      <div class="save">每次選擇後自動儲存於此瀏覽器</div>
    `);

    app.querySelectorAll("input[type=radio]").forEach(el => el.onchange = e => {
      answers[e.target.name.slice(1)] = Number(e.target.value);
      saveValue(storageKey, JSON.stringify(answers));
      app.querySelector(".save").textContent = storageAvailable ? "每次選擇後自動儲存於此瀏覽器" : "此瀏覽器無法儲存答案，請保持頁面開啟並完成作答。";
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
      const missing = slice.some(q => !validAnswer(answers[q.id]));
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
      const allMissing = questions.find(q => !validAnswer(answers[q.id]));
      if (allMissing) {
        page = Math.floor((allMissing.id - 1) / perPage);
        renderPage(true);
        return;
      }
      results();
    };
  }

  function calculateResults() {
    if (!["male", "female"].includes(normSex)) throw new Error("請選擇有效的常模。");
    if (questions.length !== 240 || questions.some(q => !validAnswer(answers[q.id]))) throw new Error("請完成所有題目。");
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
      const classification = norms.classify(normSex, code, raw);
      if (!classification) throw new Error("常模分類失敗。");
      return {code, label:domainNames[code], raw, ...classification};
    });

    const facets = domainOrder.flatMap(domain => Array.from({length:6}, (_, index) => `${domain}${index + 1}`)).map(code => {
      const item = facetRaw[code];
      const classification = norms.classify(normSex, code, item.raw);
      if (!classification) throw new Error("常模分類失敗。");
      return {...item, ...classification};
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
    const radiusForT = t => Math.max(0, Math.min(maxRadius, (t / 5) * maxRadius));
    const gridScores = [1, 2, 3, 4, 5];
    const averageOuter = polygonPoints(cx, cy, radiusForT(3.5));
    const averageInner = polygonPoints(cx, cy, radiusForT(2.5));
    const dataPoints = rows.map((row, index) => {
      const point = polarPoint(cx, cy, radiusForT(row.level), index);
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
          <tspan class="radar-label-value band-text-${row.bandKey}" x="${label.x.toFixed(1)}" dy="19">${row.band}</tspan>
        </text>`;
    }).join("");

    return `
      <article class="radar-card">
        <div class="chart-heading"><div><span>${domain.code}</span><h3>${domain.label}</h3></div><strong class="band-text-${domain.bandKey}">${domain.band}</strong></div>
        <svg class="radar-chart" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="radar-${domain.code}-title radar-${domain.code}-desc">
          <title id="radar-${domain.code}-title">${domain.label}六項特質輪廓</title>
          <desc id="radar-${domain.code}-desc">由內至外依次為非常低、低、平均、高、非常高。</desc>
          <polygon class="radar-average-outer" points="${averageOuter}"></polygon>
          <polygon class="radar-average-inner" points="${averageInner}"></polygon>
          ${gridScores.map(score => `<polygon class="radar-grid-line ${score === 3 ? "radar-midline" : ""}" points="${polygonPoints(cx, cy, radiusForT(score))}"></polygon>`).join("")}
          ${axes}
          <polygon class="radar-shape" points="${dataPoints}"></polygon>
          ${rows.map((row, index) => {
            const point = polarPoint(cx, cy, radiusForT(row.level), index);
            return `<circle class="radar-point band-${row.bandKey}" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="6"><title>${row.code} ${row.label}：${row.band}</title></circle>`;
          }).join("")}
        </svg>
        <div class="radar-mobile-list">${rows.map(row => `<div><span><strong>${row.code}</strong> ${row.label}</span><span class="band-text-${row.bandKey}">${row.band}</span></div>`).join("")}</div>
      </article>`;
  }

  function updateRadarViewboxes() {
    const compact = window.matchMedia("(max-width:520px)").matches;
    app.querySelectorAll(".radar-chart").forEach(chart => {
      chart.setAttribute("viewBox", compact ? "104 50 312 310" : "0 0 520 430");
    });
  }

  function facetAxis() {
    const labels = ["非常低", "低", "平均", "高", "非常高"];
    return `<div class="facet-axis" aria-hidden="true">${labels.map((label,i) => `<span style="left:${tPosition(i+1)}%">${label}</span>`).join("")}</div>`;
  }

  function facetOverview(facets) {
    return domainOrder.map(domainCode => {
      const rows = facets.filter(row => row.domain === domainCode);
      return `
        <section class="facet-group" aria-labelledby="facet-group-${domainCode}">
          <div class="facet-group-title"><span>${domainCode}</span><h3 id="facet-group-${domainCode}">${domainNames[domainCode]}</h3></div>
          <div class="facet-axis-row"><span></span>${facetAxis()}<span></span></div>
          ${rows.map(row => {
            const position = tPosition(row.level);
            const lineStart = Math.min(50, position);
            const lineWidth = Math.max(0.8, Math.abs(position - 50));
            return `
              <div class="facet-row" aria-label="${row.code} ${row.label}，${row.band}">
                <div class="facet-name"><strong>${row.code}</strong><span>${row.label}</span></div>
                <div class="facet-track">
                  <span class="facet-midline"></span>
                  <span class="facet-bar band-${row.bandKey}" style="left:${lineStart}%;width:${lineWidth}%"></span>
                  <span class="facet-marker band-${row.bandKey}" style="left:${position}%"></span>
                </div>
                <div class="facet-reading"><strong>${row.raw} / 32</strong><span class="band-text-${row.bandKey}">${row.band}</span></div>
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
      <p class="note">使用${normSex === "male" ? "男性" : "女性"}參考區間。圖中位置表示五級分類，N及N5高分分別代表較高情緒敏感度及衝動性。</p>
      <div class="result-grid">${result.domains.map(domain => `
        <article class="score-card band-${domain.bandKey}">
          <div class="score-card-head"><strong>${domain.label}</strong><span>${domain.band}</span></div>
          <div class="domain-t">${domain.band}</div>
          <div class="domain-raw">Raw ${domain.raw} / 192</div>
          <div class="domain-track"><span class="domain-midline"></span><i style="left:${tPosition(domain.level)}%"></i></div>
        </article>`).join("")}</div>

      <div class="legend" aria-label="五級分類">
        <span><i class="band-very-low"></i>非常低</span>
        <span><i class="band-low"></i>低</span>
        <span><i class="band-average"></i>平均</span>
        <span><i class="band-high"></i>高</span>
        <span><i class="band-very-high"></i>非常高</span>
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
        try { localStorage.removeItem(storageKey); } catch { /* In-memory answers are still cleared. */ }
        answers = {};
        page = 0;
        home();
        scrollTo(0, 0);
      }
    };
  }

  window.addEventListener("resize", updateRadarViewboxes);
  if (!norms || questions.length !== 240) {
    layout('<p class="form-error">題目或常模檔案未正確載入，請確認 questions.js、norms.js 及 app.js 齊備。</p>');
    return;
  }
  home();
})();
