// input.js — pointer handling for the two panels.
// Converts a click on either panel into 480x360 scene coordinates
// and asks the game whether that point hits an unfound difference.

const VIEW_W = 480;
const VIEW_H = 360;

export function toSceneCoords(panelEl, clientX, clientY) {
  const svg = panelEl.querySelector("svg");
  if (!svg) return null;
  const rect = svg.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * VIEW_W;
  const y = ((clientY - rect.top) / rect.height) * VIEW_H;
  return { x, y };
}

export function hitTest(scene, foundIds, x, y) {
  for (const d of scene.diffs) {
    if (foundIds.has(d.id)) continue;
    const dx = x - d.x;
    const dy = y - d.y;
    if (dx * dx + dy * dy <= d.r * d.r) return d;
  }
  return null;
}

export function wirePanels(onTap) {
  for (const side of ["left", "right"]) {
    const panel = document.getElementById(`panel-${side}`);
    panel.addEventListener("pointerdown", (ev) => {
      ev.preventDefault();
      const pt = toSceneCoords(panel, ev.clientX, ev.clientY);
      if (!pt) return;
      onTap(side, pt.x, pt.y);
    });
  }
}
