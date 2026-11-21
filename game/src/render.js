// render.js — paints the two panels and the HUD.
// The left panel is the scene with no differences applied, the right
// one with all of them. Found differences get a green ring on both
// panels; a wrong tap flashes a red X where the player clicked.

export function svgOpen() {
  return `<svg viewBox="0 0 480 360" width="480" height="360" xmlns="http://www.w3.org/2000/svg" role="img">`;
}

export function renderPanels(scene, foundIds) {
  const left = document.getElementById("panel-left");
  const right = document.getElementById("panel-right");
  const found = new Set(foundIds);
  const all = new Set(scene.diffs.map((d) => d.id));
  left.innerHTML = svgOpen() + scene.draw(new Set()) + markers(scene, found) + "</svg>";
  right.innerHTML = svgOpen() + scene.draw(all) + markers(scene, found) + "</svg>";
}

function markers(scene, found) {
  let out = "";
  for (const d of scene.diffs) {
    if (!found.has(d.id)) continue;
    out += `<g class="found-mark">
      <circle cx="${d.x}" cy="${d.y}" r="${d.r + 4}" fill="none" stroke="#2fbf5a" stroke-width="4"/>
      <circle cx="${d.x}" cy="${d.y}" r="${d.r + 4}" fill="rgba(47,191,90,0.12)"/>
      <path d="M ${d.x - 8} ${d.y} L ${d.x - 2} ${d.y + 7} L ${d.x + 9} ${d.y - 7}" fill="none" stroke="#2fbf5a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
  }
  return out;
}

export function flashWrong(panelEl, x, y) {
  const svg = panelEl.querySelector("svg");
  if (!svg) return;
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("class", "wrong-mark");
  g.innerHTML = `<circle cx="${x}" cy="${y}" r="14" fill="none" stroke="#e23b3b" stroke-width="4"/>
    <path d="M ${x - 7} ${y - 7} L ${x + 7} ${y + 7} M ${x + 7} ${y - 7} L ${x - 7} ${y + 7}" stroke="#e23b3b" stroke-width="4" stroke-linecap="round"/>`;
  svg.appendChild(g);
  setTimeout(() => g.remove(), 700);
}

export function pulseHint(panelEl, x, y) {
  const svg = panelEl.querySelector("svg");
  if (!svg) return;
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("class", "hint-pulse");
  g.innerHTML = `<circle cx="${x}" cy="${y}" r="20" fill="none" stroke="#ffb300" stroke-width="4">
      <animate attributeName="r" values="14;26;14" dur="0.9s" repeatCount="2"/>
      <animate attributeName="opacity" values="1;0.3;1" dur="0.9s" repeatCount="2"/>
    </circle>`;
  svg.appendChild(g);
  setTimeout(() => g.remove(), 1900);
}

export function setCounter(found, total) {
  const el = document.getElementById("counter");
  el.textContent = `Found ${found} / ${total}`;
  el.classList.toggle("done", found === total);
}

export function setLevelName(name, index, total) {
  document.getElementById("level-name").textContent = `Level ${index + 1} of ${total} — ${name}`;
}

export function setScore(score) {
  document.getElementById("score").textContent = `Score ${score}`;
}

export function setHintsLeft(n) {
  const btn = document.getElementById("hint-btn");
  btn.textContent = `💡 Hint (${n})`;
  btn.disabled = n <= 0;
}

export function setTimer(secondsLeft, total) {
  const bar = document.getElementById("time-bar");
  const label = document.getElementById("time-label");
  const pct = Math.max(0, (secondsLeft / total) * 100);
  bar.style.width = `${pct}%`;
  bar.classList.toggle("low", secondsLeft <= 15);
  label.textContent = `${secondsLeft}s`;
}

export function setLevelDots(index, total, cleared) {
  const dots = document.getElementById("level-dots");
  dots.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const s = document.createElement("span");
    s.className = "dot" + (i < cleared ? " cleared" : "") + (i === index ? " current" : "");
    s.textContent = i + 1;
    dots.appendChild(s);
  }
}

export function showOverlay(html) {
  const ov = document.getElementById("overlay");
  ov.innerHTML = html;
  ov.classList.remove("hidden");
}

export function hideOverlay() {
  const ov = document.getElementById("overlay");
  ov.classList.add("hidden");
  ov.innerHTML = "";
}
