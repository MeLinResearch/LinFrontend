// GENERATED FILE - do not edit by hand.
//
// Rendered by reports/generate_sample_report.py in the LinForensics engine
// repository, from real engine output. To change the report, regenerate it
// there; edits made here are overwritten on the next build.
//
// The markup is trusted, generated content: it is safe to inject, and it
// contains no taxonomy codes, scoring versions or model names (enforced by
// tests/test_sample_report_redaction.py in that repository).

export const REPORT_CSS = `
:root {
    color-scheme: light;
    --lf-indigo: #4F46E5;
    --lf-indigo-strong: #4338CA;
    --lf-indigo-deep: #3730A3;
    --lf-indigo-soft: #EEF2FF;
    --lf-indigo-tint: #F5F6FF;
    --lf-indigo-line: #DDE1FB;
    --lf-ink: #0B1220;
    --lf-ink-2: #1E293B;
    --lf-body: #475569;
    --lf-muted: #64748B;
    --lf-faint: #94A3B8;
    --lf-line: #E2E8F0;
    --lf-line-soft: #EFF2F7;
    --lf-surface: #FFFFFF;
    --lf-canvas: #F8FAFC;
    --lf-pass: #0E9F6E;
    --lf-pass-soft: #E7F7F1;
    --lf-warn: #B45309;
    --lf-warn-soft: #FDF3E3;
    --lf-warn-line: #F3DFBC;
    --lf-fail: #DC2626;
    --lf-fail-soft: #FEECEC;
    --lf-fail-line: #F8D4D4;
    --lf-font: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    --lf-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --lf-radius: 14px;
    --lf-shadow: 0 1px 2px rgba(15, 23, 42, .04), 0 12px 32px -18px rgba(15, 23, 42, .28);
    --lf-doc-shadow: 0 1px 3px rgba(15, 23, 42, .05), 0 28px 60px -28px rgba(15, 23, 42, .34);
}


.lf-embed, .lf-embed * { box-sizing: border-box; }
.lf-embed {
    /* inherit, so the report always tracks the host page's typography */
    font-family: inherit; font-size: 16px; line-height: 1.6; color: var(--lf-body);
    -webkit-font-smoothing: antialiased;
}


.lf-doc {
    background: var(--lf-surface); border: 1px solid var(--lf-line);
    border-radius: 18px; box-shadow: var(--lf-doc-shadow); overflow: hidden;
}
.lf-doc-head {
    display: flex; align-items: flex-start; justify-content: space-between; gap: 20px;
    padding: 26px 32px; border-bottom: 1px solid var(--lf-line); background: var(--lf-surface);
}
.lf-doc-title { font-size: 19px; font-weight: 800; letter-spacing: -.02em; color: var(--lf-ink); }
.lf-doc-sub { margin-top: 4px; font-size: 13px; color: var(--lf-muted); }
.lf-doc-ref {
    text-align: right; font-family: var(--lf-mono); font-size: 12px;
    color: var(--lf-muted); line-height: 1.7; white-space: nowrap;
}
.lf-doc-body { padding: 30px 32px 34px; }
.lf-doc h3 {
    margin: 0 0 4px; font-size: 11.5px; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; color: var(--lf-indigo-strong);
}
.lf-block + .lf-block { margin-top: 30px; padding-top: 30px; border-top: 1px solid var(--lf-line-soft); }

.lf-level {
    display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
    padding: 20px 22px; border-radius: var(--lf-radius);
    background: var(--lf-warn-soft); border: 1px solid var(--lf-warn-line);
}
.lf-level.tone-fail { background: var(--lf-fail-soft); border-color: var(--lf-fail-line); }
.lf-level.tone-pass { background: var(--lf-pass-soft); border-color: #CDEBE0; }
.lf-level.tone-muted { background: var(--lf-canvas); border-color: var(--lf-line); }
.lf-level-dot { width: 11px; height: 11px; border-radius: 50%; background: var(--lf-warn); flex: none; }
.lf-level.tone-fail .lf-level-dot { background: var(--lf-fail); }
.lf-level.tone-pass .lf-level-dot { background: var(--lf-pass); }
.lf-level.tone-muted .lf-level-dot { background: var(--lf-faint); }
.lf-level-name {
    font-size: 23px; font-weight: 800; letter-spacing: -.022em; color: var(--lf-ink); line-height: 1.2;
}
.lf-level-tag {
    margin-left: auto; padding: 5px 12px; border-radius: 999px; background: rgba(255,255,255,.75);
    font-size: 12px; font-weight: 700; color: var(--lf-ink-2); white-space: nowrap;
}
.lf-summary { margin: 16px 0 0; font-size: 16px; color: var(--lf-ink-2); max-width: 62ch; }

.lf-prov {
    display: grid; gap: 14px 26px; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    padding: 18px 20px; border: 1px dashed var(--lf-line); border-radius: var(--lf-radius);
    background: var(--lf-canvas); margin: 0;
}
.lf-prov dt {
    font-size: 10.5px; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: var(--lf-muted);
}
.lf-prov dd {
    margin: 5px 0 0; font-family: var(--lf-mono); font-size: 12.5px;
    color: var(--lf-ink-2); word-break: break-word;
}

.lf-group + .lf-group { margin-top: 22px; }
.lf-group-name { font-size: 17px; font-weight: 700; letter-spacing: -.015em; color: var(--lf-ink); }
.lf-group-desc { margin: 5px 0 0; font-size: 14.5px; color: var(--lf-muted); max-width: 64ch; }
.lf-group-count {
    display: inline-block; margin-left: 9px; padding: 2px 9px; border-radius: 999px;
    background: var(--lf-indigo-soft); color: var(--lf-indigo-strong);
    font-size: 11.5px; font-weight: 700; vertical-align: 2px;
}
.lf-quotes { margin: 15px 0 0; padding: 0; list-style: none; }
.lf-quotes li {
    padding: 13px 16px; border-left: 3px solid var(--lf-indigo);
    background: var(--lf-indigo-tint); border-radius: 0 10px 10px 0;
}
.lf-quotes li + li { margin-top: 9px; }
.lf-quote { font-size: 15px; color: var(--lf-ink); }
.lf-quote-meta {
    margin-top: 7px; font-size: 12px; color: var(--lf-muted);
    display: flex; flex-wrap: wrap; gap: 4px 14px;
}
.lf-quote-meta code { font-family: var(--lf-mono); font-size: 11.5px; }

.lf-steps { margin: 14px 0 0; padding: 0; list-style: none; counter-reset: step; }
.lf-steps li {
    position: relative; padding-left: 34px; font-size: 15.5px; color: var(--lf-ink-2);
    counter-increment: step;
}
.lf-steps li + li { margin-top: 11px; }
.lf-steps li::before {
    content: counter(step); position: absolute; left: 0; top: 1px;
    width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center;
    background: var(--lf-indigo-soft); color: var(--lf-indigo-strong);
    font-size: 12px; font-weight: 700;
}
.lf-limits { margin: 14px 0 0; padding-left: 20px; font-size: 14.5px; }
.lf-limits li + li { margin-top: 7px; }
.lf-disclaimer {
    margin: 18px 0 0; padding: 16px 18px; border-radius: var(--lf-radius);
    background: var(--lf-canvas); border: 1px solid var(--lf-line);
    font-size: 13.5px; color: var(--lf-muted);
}
@media (max-width: 720px) {
    .lf-doc-head, .lf-doc-body { padding-left: 20px; padding-right: 20px; }
    .lf-doc-head { flex-direction: column; }
    .lf-doc-ref { text-align: left; }
}
@media print { .lf-doc { box-shadow: none; } }


.lf-stage { position: relative; margin-top: 46px; }
.lf-stage-doc { max-width: 620px; margin: 0 auto; }
.lf-wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1; }
.lf-callout {
    background: var(--lf-surface); border: 1px solid var(--lf-indigo-line);
    border-radius: var(--lf-radius); padding: 16px 18px; box-shadow: var(--lf-shadow);
    z-index: 2;
}
.lf-callout .n {
    display: inline-grid; place-items: center; width: 22px; height: 22px; border-radius: 50%;
    background: var(--lf-indigo); color: #fff; font-size: 12px; font-weight: 700;
    margin-bottom: 9px;
}
.lf-callout h4 {
    margin: 0 0 6px; font-size: 15px; font-weight: 700; letter-spacing: -.012em; color: var(--lf-ink);
}
.lf-callout p { margin: 0; font-size: 13.5px; line-height: 1.55; color: var(--lf-body); }

.lf-pin {
    display: inline-grid; place-items: center; width: 20px; height: 20px; border-radius: 50%;
    background: var(--lf-indigo); color: #fff; font-size: 11px; font-weight: 700;
    letter-spacing: 0; vertical-align: -5px; margin-right: 8px; flex: none;
}
.lf-quote-meta .lf-pin { vertical-align: -6px; }

/* wide: absolute columns either side, arrows drawn between */
@media (min-width: 1080px) {
    .lf-callout { position: absolute; width: 268px; }
    .lf-callout[data-side="left"]  { left: 0; }
    .lf-callout[data-side="right"] { right: 0; }
    .lf-notes { display: contents; }
}
/* narrow: stack the explanations under the document, no arrows */
@media (max-width: 1079px) {
    .lf-wires { display: none; }
    .lf-notes { display: grid; gap: 14px; margin-top: 30px;
                grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
    .lf-callout { position: static !important; width: auto !important; }
}
@media print { .lf-wires, .lf-callout { display: none; } }
`;

export const REPORT_HTML = `<div class="lf-stage"><svg class="lf-wires" aria-hidden="true" preserveAspectRatio="none"></svg><div class="lf-stage-doc">
<article class="lf-doc">
  <div class="lf-doc-head">
    <div>
      <div class="lf-brand" style="margin-bottom:12px">
        <span class="lf-mark"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v5.2c0 4.4-2.9 8.2-7 9.4-4.1-1.2-7-5-7-9.4V6l7-3z" fill="rgba(255,255,255,.16)" stroke="#fff" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.8 12.1l2.2 2.2 4.2-4.4" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <span class="lf-wordmark">LinForensics</span>
      </div>
      <div class="lf-doc-title">Communication pattern review</div>
      <div class="lf-doc-sub">Structured report prepared for independent human review</div>
    </div>
    <div class="lf-doc-ref">
      Case&nbsp;LF-2026-0184<br>
      17 Feb 2026, 08:57<br>
      public-report-v1
    </div>
  </div>

  <div class="lf-doc-body">
    <div class="lf-block">
      <h3>Overall assessment</h3>
      <div class="lf-level tone-warn" data-anchor-id="a-level">
        <span class="lf-pin">1</span><span class="lf-level-dot"></span>
        <span class="lf-level-name">Moderate concern</span>
        <span class="lf-level-tag">Human review required</span>
      </div>
      <p class="lf-summary">Overall pattern review indicates moderate concern. Human review is recommended for context-aware interpretation.</p>
    </div>

    <div class="lf-block">
      <h3><span class="lf-pin">5</span>Provenance</h3>
      <dl class="lf-prov" data-anchor-id="a-prov"><div><dt>Source file</dt><dd>messages-export-2026-02-17.txt</dd></div><div><dt>Received</dt><dd>17 Feb 2026, 08:57</dd></div><div><dt>Analysis run</dt><dd>run-9f2c41d8</dd></div><div><dt>Report format</dt><dd>public-report-v1</dd></div></dl>
    </div>

    <div class="lf-block">
      <h3>Patterns identified &middot; 7 cited excerpts</h3>
      <div class="lf-group"><div class="lf-group-name" data-anchor-id="a-group"><span class="lf-pin">2</span>Consequence-oriented language<span class="lf-group-count">2</span></div><p class="lf-group-desc">Language that frames compliance around consequences, retaliation, punishment, or ultimatums.</p><ul class="lf-quotes"><li><div class="lf-quote" data-anchor-id="a-quote"><span class="lf-pin">3</span>&ldquo;Sign the agreement the way it is or I stop the Tuesday handovers&rdquo;</div><div class="lf-quote-meta"><span>Other party</span><span>21 Jan 2026, 07:48</span><span>message <code>m03</code></span></div></li><li><div class="lf-quote">&ldquo;I will make sure the court hears about every mistake you have ever made&rdquo;</div><div class="lf-quote-meta" data-anchor-id="a-meta"><span class="lf-pin">4</span><span>Other party</span><span>16 Feb 2026, 06:52</span><span>message <code>m10</code></span></div></li></ul></div><div class="lf-group"><div class="lf-group-name">Pressure or obligation language<span class="lf-group-count">3</span></div><p class="lf-group-desc">Language that may apply guilt, obligation, shame, or responsibility pressure.</p><ul class="lf-quotes"><li><div class="lf-quote">&ldquo;You are the one tearing this family apart and the children know exactly who did it&rdquo;</div><div class="lf-quote-meta"><span>Other party</span><span>28 Jan 2026, 23:14</span><span>message <code>m04</code></span></div></li><li><div class="lf-quote">&ldquo;If you actually cared about them you would drop the solicitor&rdquo;</div><div class="lf-quote-meta"><span>Other party</span><span>02 Feb 2026, 20:31</span><span>message <code>m05</code></span></div></li><li><div class="lf-quote">&ldquo;I have moved the joint account into my name&rdquo;</div><div class="lf-quote-meta"><span>Other party</span><span>12 Feb 2026, 19:03</span><span>message <code>m08</code></span></div></li></ul></div><div class="lf-group"><div class="lf-group-name">Restriction or separation language<span class="lf-group-count">2</span></div><p class="lf-group-desc">Language suggesting isolation, separation, access limits, or control-like restriction.</p><ul class="lf-quotes"><li><div class="lf-quote">&ldquo;Don&#x27;t discuss any of this with your sister&rdquo;</div><div class="lf-quote-meta"><span>Other party</span><span>09 Feb 2026, 22:57</span><span>message <code>m07</code></span></div></li><li><div class="lf-quote">&ldquo;I know you had someone at the house on Thursday night&rdquo;</div><div class="lf-quote-meta"><span>Other party</span><span>14 Feb 2026, 22:19</span><span>message <code>m09</code></span></div></li></ul></div>
    </div>

    <div class="lf-block">
      <h3><span class="lf-pin">6</span>Suggested next steps</h3>
      <ol class="lf-steps" data-anchor-id="a-steps"><li>Pause escalation and use calm, non-confrontational communication.</li><li>Move sensitive decisions to a supervised or documented channel.</li></ol>
    </div>

    <div class="lf-block" data-anchor-id="a-limits">
      <h3><span class="lf-pin">7</span>Limitations &amp; disclaimer</h3>
      <ul class="lf-limits"><li>This summary is generated from submitted content and may miss context outside the provided material.</li><li>Detected patterns are communication indicators, not factual findings or intent determinations.</li></ul>
      <p class="lf-disclaimer">Lin is decision-support software. It does not provide legal advice, medical advice, mental health advice, diagnoses, predictions, emergency support, or automated determinations.</p>
    </div>
  </div>
</article>
</div><div class="lf-notes"><aside class="lf-callout" data-anchor="a-level" data-side="left"><span class="n">1</span><h4>One plain-English level</h4><p>No score, no verdict, no diagnosis. Just where this conversation sits on a four-level scale, in words anyone can act on.</p></aside><aside class="lf-callout" data-anchor="a-group" data-side="right"><span class="n">2</span><h4>Candidate communication pattern labels</h4><p>Patterns are grouped into plain categories you can read out loud — pressure, restriction, compliance — for structured interpretation and independent review.</p></aside><aside class="lf-callout" data-anchor="a-quote" data-side="left"><span class="n">3</span><h4>Cited evidence snippets</h4><p>Every finding quotes the submitted text directly, preserved in context. Nothing is paraphrased, summarised or invented.</p></aside><aside class="lf-callout" data-anchor="a-meta" data-side="right"><span class="n">4</span><h4>Traceable to your original</h4><p>Who said it and when travels with every excerpt, so you can find the same line in your own export in seconds.</p></aside><aside class="lf-callout" data-anchor="a-prov" data-side="left"><span class="n">5</span><h4>Audit-friendly structure</h4><p>Each report is stamped with the file it came from, when it arrived and which report format produced it, so it can be checked later by a reviewer.</p></aside><aside class="lf-callout" data-anchor="a-steps" data-side="right"><span class="n">6</span><h4>Practical next steps</h4><p>Concrete, non-alarming actions matched to the level found — what to do next, not what to conclude.</p></aside><aside class="lf-callout" data-anchor="a-limits" data-side="left"><span class="n">7</span><h4>Human-review disclaimer</h4><p>Stated limits and a clear notice on every report that outputs require independent review by you or a qualified professional.</p></aside></div></div>`;

export { initReportWires };


function initReportWires(stage) {
  if (!stage) return function () {};
  var svg = stage.querySelector('.lf-wires');
  if (!svg) return function () {};
  var wide = window.matchMedia('(min-width: 1080px)');
  var callouts = Array.prototype.slice.call(stage.querySelectorAll('.lf-callout'));

  function layout() {
    svg.innerHTML = '';
    callouts.forEach(function (c) { c.style.top = ''; });
    if (!wide.matches) { stage.style.height = ''; return; }

    var stageBox = stage.getBoundingClientRect();
    var doc = stage.querySelector('.lf-stage-doc');
    if (!doc) return;
    var docBox = doc.getBoundingClientRect();

    // 1. desired vertical position: centre each callout on its anchor
    var placed = { left: [], right: [] };
    callouts.forEach(function (c) {
      var anchor = stage.querySelector('[data-anchor-id="' + c.dataset.anchor + '"]');
      if (!anchor) return;
      var box = anchor.getBoundingClientRect();
      var want = box.top + box.height / 2 - stageBox.top - c.offsetHeight / 2;
      placed[c.dataset.side].push({ el: c, anchor: anchor, top: Math.max(0, want) });
    });

    // 2. push overlapping callouts down within their column
    var GAP = 18;
    Object.keys(placed).forEach(function (side) {
      var col = placed[side].sort(function (a, b) { return a.top - b.top; });
      for (var i = 1; i < col.length; i++) {
        var min = col[i - 1].top + col[i - 1].el.offsetHeight + GAP;
        if (col[i].top < min) col[i].top = min;
      }
      col.forEach(function (item) { item.el.style.top = item.top + 'px'; });
    });

    // 3. size the stage to whichever column runs longest
    var lowest = docBox.height;
    callouts.forEach(function (c) {
      lowest = Math.max(lowest, (parseFloat(c.style.top) || 0) + c.offsetHeight);
    });
    stage.style.height = lowest + 'px';
    svg.setAttribute('viewBox', '0 0 ' + stageBox.width + ' ' + lowest);

    // 4. draw one curved connector per callout
    var ns = 'http://www.w3.org/2000/svg';
    var defs = document.createElementNS(ns, 'defs');
    defs.innerHTML =
      '<marker id="lf-arrow" markerWidth="7" markerHeight="7" refX="5.4" refY="3" orient="auto">' +
      '<path d="M0.4 0.5 L5.8 3 L0.4 5.5 z" fill="var(--lf-indigo)"/></marker>';
    svg.appendChild(defs);

    ['left', 'right'].forEach(function (side) {
      placed[side].forEach(function (item) {
        var c = item.el.getBoundingClientRect();
        var a = item.anchor.getBoundingClientRect();
        var fromX = (side === 'left' ? c.right : c.left) - stageBox.left;
        var fromY = c.top + c.height / 2 - stageBox.top;
        var toX = (side === 'left' ? a.left - 9 : a.right + 9) - stageBox.left;
        var toY = a.top + Math.min(a.height / 2, 22) - stageBox.top;
        var mid = (fromX + toX) / 2;

        var path = document.createElementNS(ns, 'path');
        path.setAttribute('d', 'M ' + fromX + ' ' + fromY +
                               ' C ' + mid + ' ' + fromY + ', ' + mid + ' ' + toY +
                               ', ' + toX + ' ' + toY);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'var(--lf-indigo)');
        path.setAttribute('stroke-width', '1.6');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('opacity', '.6');
        path.setAttribute('marker-end', 'url(#lf-arrow)');
        svg.appendChild(path);

        var dot = document.createElementNS(ns, 'circle');
        dot.setAttribute('cx', fromX); dot.setAttribute('cy', fromY); dot.setAttribute('r', '3');
        dot.setAttribute('fill', 'var(--lf-indigo)');
        svg.appendChild(dot);
      });
    });
  }

  var ro = window.ResizeObserver ? new window.ResizeObserver(layout) : null;
  if (ro) ro.observe(stage);
  window.addEventListener('resize', layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  layout();

  return function teardown() {
    window.removeEventListener('resize', layout);
    if (ro) ro.disconnect();
  };
}

