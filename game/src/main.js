// main.js — bootstrap for Almost Twins.
// Wires the game to the page, then either applies a screenshot
// state (?shot=...) or shows the menu.

import { Game } from "./game.js";
import { applyShot } from "./shots.js";

const game = new Game();
game.bindControls();

if (!applyShot(game)) {
  game.showMenu();
}
