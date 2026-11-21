// shapes.js — tiny SVG shape helpers for the Almost Twins scenes.
// Every helper returns an SVG fragment string. Nothing here knows
// about game state; scenes.js composes these into full pictures.

export function bird(x, y, scale = 1) {
  const w = 14 * scale;
  const h = 7 * scale;
  return `<path d="M ${x - w} ${y} Q ${x - w / 2} ${y - h} ${x} ${y} Q ${x + w / 2} ${y - h} ${x + w} ${y}" fill="none" stroke="#2b3a55" stroke-width="${2 * scale}" stroke-linecap="round"/>`;
}

export function star4(x, y, r, color = "#ffe9a8") {
  return `<path d="M ${x} ${y - r} L ${x + r * 0.28} ${y - r * 0.28} L ${x + r} ${y} L ${x + r * 0.28} ${y + r * 0.28} L ${x} ${y + r} L ${x - r * 0.28} ${y + r * 0.28} L ${x - r} ${y} L ${x - r * 0.28} ${y - r * 0.28} Z" fill="${color}"/>`;
}

export function dotStar(x, y, r = 2, color = "#fff7d6") {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
}

export function pine(x, y, s = 1, color = "#1e5c3a") {
  const w = 26 * s;
  const h = 64 * s;
  return `<g>
    <rect x="${x - 3 * s}" y="${y}" width="${6 * s}" height="${10 * s}" fill="#6b4226"/>
    <polygon points="${x},${y - h} ${x - w},${y} ${x + w},${y}" fill="${color}"/>
    <polygon points="${x},${y - h * 0.72} ${x - w * 0.8},${y - h * 0.18} ${x + w * 0.8},${y - h * 0.18}" fill="${color}"/>
  </g>`;
}

export function cloud(x, y, s = 1, color = "#ffffff") {
  return `<g fill="${color}" opacity="0.95">
    <ellipse cx="${x}" cy="${y}" rx="${34 * s}" ry="${15 * s}"/>
    <ellipse cx="${x - 22 * s}" cy="${y + 5 * s}" rx="${20 * s}" ry="${11 * s}"/>
    <ellipse cx="${x + 24 * s}" cy="${y + 5 * s}" rx="${22 * s}" ry="${12 * s}"/>
  </g>`;
}

export function flower(x, y, petal, center = "#ffcf3f") {
  const p = (dx, dy) => `<circle cx="${x + dx}" cy="${y + dy}" r="6" fill="${petal}"/>`;
  return `<g>
    <line x1="${x}" y1="${y}" x2="${x}" y2="${y + 16}" stroke="#2f7d32" stroke-width="3"/>
    ${p(0, -8)}${p(7, -3)}${p(5, 6)}${p(-5, 6)}${p(-7, -3)}
    <circle cx="${x}" cy="${y}" r="5" fill="${center}"/>
  </g>`;
}

export function gull(x, y, scale = 1) {
  return bird(x, y, scale);
}

export function wave(y, color, amp = 5) {
  let d = `M 0 ${y} `;
  for (let x = 0; x <= 480; x += 40) {
    d += `Q ${x + 20} ${y - amp} ${x + 40} ${y} `;
  }
  d += `L 480 360 L 0 360 Z`;
  return `<path d="${d}" fill="${color}"/>`;
}
