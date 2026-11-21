// scenes.js — the three hand-drawn scenes of Almost Twins.
// Each scene is a level: a draw(applied) function that paints one
// 480x360 panel, and a list of differences. The left panel is drawn
// with no differences applied; the right panel with all of them.
// Coordinates are in the 480x360 viewBox space, and every difference
// carries the point a player must tap (x, y) plus a hit radius r.

import { bird, star4, dotStar, pine, cloud, flower, wave } from "./shapes.js";

function sky(from, to) {
  return `<defs><linearGradient id="sk${from.slice(1)}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
  </linearGradient></defs>
  <rect x="0" y="0" width="480" height="360" fill="url(#sk${from.slice(1)})"/>`;
}

export const SCENES = [
  {
    id: "garden",
    name: "Sunny Garden",
    tagline: "Five little changes are hiding in the garden.",
    time: 120,
    diffs: [
      { id: "rays", x: 72, y: 56, r: 30, label: "the sun lost its rays" },
      { id: "apples", x: 118, y: 176, r: 26, label: "apples on the tree" },
      { id: "bloom", x: 402, y: 318, r: 14, label: "one flower changed colour" },
      { id: "birds", x: 302, y: 66, r: 22, label: "a bird flew away" },
      { id: "cat", x: 330, y: 268, r: 24, label: "the cat on the porch" },
    ],
    draw(applied) {
      const rays = applied.has("rays");
      const apples = applied.has("apples");
      const bloomRed = applied.has("bloom");
      const twoBirds = applied.has("birds");
      const noCat = applied.has("cat");
      return `
      ${sky("#8ec9ee", "#dff3d8")}
      <circle cx="72" cy="56" r="28" fill="#ffd94d" stroke="#f2b705" stroke-width="3"/>
      ${rays ? "" : `<g stroke="#f2b705" stroke-width="4" stroke-linecap="round">
        <line x1="72" y1="14" x2="72" y2="4"/><line x1="72" y1="98" x2="72" y2="108"/>
        <line x1="30" y1="56" x2="20" y2="56"/><line x1="114" y1="56" x2="124" y2="56"/>
        <line x1="42" y1="26" x2="35" y2="19"/><line x1="102" y1="26" x2="109" y2="19"/>
        <line x1="42" y1="86" x2="35" y2="93"/><line x1="102" y1="86" x2="109" y2="93"/>
      </g>`}
      ${cloud(210, 48, 0.9)}
      ${cloud(380, 84, 0.7)}
      ${bird(290, 66)}${bird(318, 58)}${twoBirds ? "" : bird(346, 70, 0.9)}
      <rect x="0" y="252" width="480" height="108" fill="#7ec850"/>
      <rect x="0" y="252" width="480" height="10" fill="#6db344"/>
      <g>
        <rect x="86" y="150" width="16" height="106" fill="#6b4226"/>
        <circle cx="94" cy="128" r="42" fill="#3f9e4d"/>
        <circle cx="66" cy="152" r="28" fill="#4cb25a"/>
        <circle cx="124" cy="150" r="30" fill="#35873f"/>
        ${apples ? "" : `<g fill="#e23b3b"><circle cx="80" cy="140" r="6"/><circle cx="108" cy="122" r="6"/><circle cx="126" cy="158" r="6"/></g>`}
      </g>
      <g>
        <rect x="252" y="176" width="130" height="82" fill="#f7e3b0" stroke="#c89b5a" stroke-width="3"/>
        <polygon points="244,178 317,128 390,178" fill="#d96a4f" stroke="#b34a35" stroke-width="3"/>
        <rect x="300" y="210" width="26" height="48" fill="#8a5a2b"/>
        <rect x="264" y="192" width="26" height="24" fill="#bfe3f2" stroke="#8a5a2b" stroke-width="2"/>
        <rect x="352" y="192" width="26" height="24" fill="#bfe3f2" stroke="#8a5a2b" stroke-width="2"/>
        <rect x="252" y="258" width="130" height="10" fill="#e8c88f"/>
      </g>
      ${noCat ? "" : `<g>
        <ellipse cx="330" cy="272" rx="16" ry="10" fill="#f2a541"/>
        <circle cx="342" cy="260" r="9" fill="#f2a541"/>
        <polygon points="336,253 339,244 343,252" fill="#f2a541"/>
        <polygon points="345,252 349,244 351,253" fill="#f2a541"/>
        <path d="M 316 272 Q 306 266 308 256" fill="none" stroke="#f2a541" stroke-width="4" stroke-linecap="round"/>
      </g>`}
      <g fill="#fff">
        ${[20, 52, 84, 116, 148, 180, 212, 244, 276, 308, 340, 372, 404, 436, 468].map((x) => `<rect x="${x}" y="300" width="8" height="34" rx="2"/>`).join("")}
        <rect x="0" y="308" width="480" height="6"/>
      </g>
      <path d="M 313 330 L 300 360 L 340 360 L 330 330 Z" fill="#e8c88f"/>
      ${flower(40, 322, "#e2574c")}${flower(90, 326, "#e2574c")}${flower(180, 320, "#e2574c")}
      ${flower(402, 318, bloomRed ? "#f5c542" : "#e2574c")}
      ${flower(452, 324, "#e2574c")}
      `;
    },
  },
  {
    id: "harbor",
    name: "Harbor Morning",
    tagline: "Seven changes are drifting on the harbor.",
    time: 100,
    diffs: [
      { id: "stripe", x: 92, y: 148, r: 24, label: "a stripe on the lighthouse" },
      { id: "sail", x: 306, y: 176, r: 26, label: "the colour of a sail" },
      { id: "buoy", x: 424, y: 296, r: 18, label: "a buoy in the water" },
      { id: "gulls", x: 208, y: 62, r: 22, label: "a gull over the bay" },
      { id: "flag", x: 92, y: 34, r: 18, label: "the lighthouse flag" },
      { id: "crates", x: 388, y: 316, r: 22, label: "a crate on the dock" },
      { id: "cloud", x: 356, y: 52, r: 24, label: "a cloud in the sky" },
    ],
    draw(applied) {
      const stripeBlue = applied.has("stripe");
      const sailYellow = applied.has("sail");
      const noBuoy = applied.has("buoy");
      const twoGulls = applied.has("gulls");
      const flagGreen = applied.has("flag");
      const twoCrates = applied.has("crates");
      const noCloud = applied.has("cloud");
      return `
      ${sky("#9fd3f2", "#e8f6ff")}
      ${cloud(120, 46, 0.9)}
      ${noCloud ? "" : cloud(356, 52, 0.8)}
      ${bird(196, 62)}${bird(222, 54)}${twoGulls ? "" : bird(248, 64, 0.9)}
      <rect x="0" y="196" width="480" height="164" fill="#2e7fa8"/>
      ${wave(206, "#3b92bd", 4)}
      ${wave(238, "#2a7396", 5)}
      <g>
        <rect x="70" y="96" width="44" height="150" fill="#f4efe4" stroke="#cbb98f" stroke-width="2"/>
        <rect x="70" y="120" width="44" height="22" fill="${stripeBlue ? "#2b4d8f" : "#d94f3d"}"/>
        <rect x="70" y="172" width="44" height="22" fill="#d94f3d"/>
        <rect x="64" y="72" width="56" height="26" fill="#333a45"/>
        <rect x="76" y="78" width="32" height="14" fill="#ffe9a8"/>
        <rect x="88" y="58" width="8" height="16" fill="#333a45"/>
        <polygon points="96,58 96,34 ${flagGreen ? "118,40" : "74,40"}" fill="${flagGreen ? "#3f9e4d" : "#d94f3d"}"/>
        <rect x="58" y="246" width="68" height="12" fill="#8a7a5f"/>
      </g>
      <g>
        <polygon points="306,120 306,196 352,196" fill="${sailYellow ? "#f5c542" : "#ffffff"}" stroke="#cbb98f" stroke-width="2"/>
        <polygon points="300,128 300,196 262,196" fill="#ffffff" stroke="#cbb98f" stroke-width="2"/>
        <line x1="303" y1="116" x2="303" y2="198" stroke="#6b4226" stroke-width="4"/>
        <path d="M 252 198 L 362 198 L 348 214 L 266 214 Z" fill="#8a5a2b"/>
      </g>
      <g>
        <polygon points="150,168 150,214 182,214" fill="#ffffff" stroke="#cbb98f" stroke-width="2"/>
        <line x1="153" y1="164" x2="153" y2="216" stroke="#6b4226" stroke-width="3"/>
        <path d="M 138 214 L 194 214 L 186 226 L 146 226 Z" fill="#6b4226"/>
      </g>
      ${noBuoy ? "" : `<g>
        <circle cx="424" cy="296" r="12" fill="#e2574c" stroke="#b03328" stroke-width="2"/>
        <rect x="420" y="278" width="8" height="8" fill="#333a45"/>
      </g>`}
      <g>
        <rect x="330" y="300" width="120" height="14" fill="#a08055"/>
        <rect x="336" y="314" width="108" height="10" fill="#8a6c44"/>
        <rect x="356" y="276" width="24" height="24" fill="#c89b5a" stroke="#8a5a2b" stroke-width="2"/>
        <rect x="384" y="276" width="24" height="24" fill="#c89b5a" stroke="#8a5a2b" stroke-width="2"/>
        ${twoCrates ? "" : `<rect x="370" y="252" width="24" height="24" fill="#c89b5a" stroke="#8a5a2b" stroke-width="2"/>`}
      </g>
      `;
    },
  },
  {
    id: "camp",
    name: "Starry Campsite",
    tagline: "Nine changes are hiding under the stars.",
    time: 90,
    diffs: [
      { id: "moon", x: 402, y: 58, r: 26, label: "the shape of the moon" },
      { id: "stars", x: 150, y: 78, r: 24, label: "a little cluster of stars" },
      { id: "flame", x: 240, y: 272, r: 22, label: "how high the fire burns" },
      { id: "door", x: 240, y: 238, r: 22, label: "the tent door" },
      { id: "owl", x: 82, y: 118, r: 20, label: "the owl on the branch" },
      { id: "pack", x: 362, y: 298, r: 20, label: "the colour of the backpack" },
      { id: "pine", x: 424, y: 178, r: 26, label: "a pine at the edge" },
      { id: "mallow", x: 302, y: 296, r: 18, label: "the marshmallow on the stick" },
      { id: "logs", x: 240, y: 302, r: 22, label: "a log in the fire" },
    ],
    draw(applied) {
      const crescent = applied.has("moon");
      const noStars = applied.has("stars");
      const lowFlame = applied.has("flame");
      const doorOpen = applied.has("door");
      const noOwl = applied.has("owl");
      const packGreen = applied.has("pack");
      const twoPines = applied.has("pine");
      const bareStick = applied.has("mallow");
      const twoLogs = applied.has("logs");
      return `
      ${sky("#0d1b3e", "#274b7a")}
      ${dotStar(40, 40)}${dotStar(90, 26, 2.5)}${dotStar(140, 52)}${dotStar(200, 30, 2.5)}
      ${dotStar(260, 44)}${dotStar(320, 28)}${dotStar(440, 110)}${dotStar(60, 130, 2.5)}
      ${noStars ? "" : `${star4(138, 72, 7)}${star4(158, 86, 5)}${star4(122, 90, 5)}`}
      ${star4(210, 90, 6)}${star4(360, 130, 6)}
      <circle cx="402" cy="58" r="24" fill="#f7efc8"/>
      ${crescent ? `<circle cx="412" cy="52" r="20" fill="#0d1b3e"/>` : ""}
      <rect x="0" y="250" width="480" height="110" fill="#16351f"/>
      <rect x="0" y="250" width="480" height="8" fill="#1e4a2a"/>
      ${pine(40, 250, 1.1)}
      ${pine(452, 252, 0.9)}
      ${twoPines ? "" : pine(424, 250, 0.75, "#256b45")}
      <g>
        <line x1="60" y1="150" x2="120" y2="132" stroke="#4a3220" stroke-width="5" stroke-linecap="round"/>
        ${noOwl ? "" : `<g>
          <ellipse cx="88" cy="122" rx="11" ry="14" fill="#8a7a5f"/>
          <circle cx="84" cy="118" r="3.5" fill="#fff"/><circle cx="92" cy="118" r="3.5" fill="#fff"/>
          <circle cx="84" cy="118" r="1.6" fill="#222"/><circle cx="92" cy="118" r="1.6" fill="#222"/>
          <polygon points="88,126 92,130 84,130" fill="#f5c542"/>
        </g>`}
      </g>
      <g>
        <polygon points="240,168 168,268 312,268" fill="#e2574c" stroke="#b03328" stroke-width="3"/>
        <polygon points="240,168 210,268 270,268" fill="${doorOpen ? "#1d1420" : "#c94a3c"}"/>
        <line x1="240" y1="168" x2="240" y2="268" stroke="#b03328" stroke-width="2"/>
      </g>
      <g>
        <line x1="222" y1="306" x2="258" y2="296" stroke="#6b4226" stroke-width="6" stroke-linecap="round"/>
        ${twoLogs ? "" : `<line x1="222" y1="296" x2="258" y2="306" stroke="#7a4e2d" stroke-width="6" stroke-linecap="round"/>`}
        <ellipse cx="240" cy="306" rx="16" ry="5" fill="#5a3a22"/>
        ${lowFlame
          ? `<path d="M 240 276 Q 230 292 240 300 Q 250 292 240 276 Z" fill="#ff9d2e"/>`
          : `<path d="M 240 258 Q 224 282 232 300 Q 240 292 248 300 Q 256 282 240 258 Z" fill="#ff9d2e"/>
             <path d="M 240 276 Q 232 290 240 300 Q 248 290 240 276 Z" fill="#ffe066"/>`}
      </g>
      <g>
        <rect x="348" y="282" width="28" height="32" rx="6" fill="${packGreen ? "#3f9e4d" : "#d94f3d"}" stroke="#7a2d20" stroke-width="2"/>
        <rect x="356" y="274" width="12" height="10" rx="4" fill="${packGreen ? "#3f9e4d" : "#d94f3d"}" stroke="#7a2d20" stroke-width="2"/>
      </g>
      <g>
        <line x1="290" y1="312" x2="316" y2="288" stroke="#8a5a2b" stroke-width="4" stroke-linecap="round"/>
        ${bareStick ? "" : `<circle cx="314" cy="288" r="7" fill="#fff7ea" stroke="#e8d9b0" stroke-width="2"/>`}
      </g>
      `;
    },
  },
];
