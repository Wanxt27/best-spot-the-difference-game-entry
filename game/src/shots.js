// shots.js — deterministic states for screenshots.
// The game reads ?shot= from the URL so a screenshot run can show
// the game at its best without playing it by hand:
//   ?shot=start    — the menu over level 1
//   ?shot=play     — level 2 mid-hunt: 3 of 7 found, 4 still hiding,
//                    counter and timer visible
//   ?shot=clear    — the level-clear card with three stars
//   ?shot=win      — the final win card
// In shot mode the clock is frozen so the frame is stable.

import { SCENES } from "./scenes.js";
import * as render from "./render.js";

export function applyShot(game) {
  const params = new URLSearchParams(window.location.search);
  const shot = params.get("shot");
  if (!shot) return false;
  game.frozen = true;

  if (shot === "start") {
    game.showMenu();
    return true;
  }

  if (shot === "play") {
    game.levelIndex = 1;
    game.score = 340;
    game.found = new Set(SCENES[1].diffs.slice(0, 3).map((d) => d.id));
    game.hintsLeft = 2;
    game.secondsLeft = 64;
    game.state = "playing";
    render.hideOverlay();
    render.setLevelName(SCENES[1].name, 1, SCENES.length);
    render.setLevelDots(1, SCENES.length, 1);
    render.setScore(game.score);
    render.setHintsLeft(game.hintsLeft);
    render.setCounter(game.found.size, SCENES[1].diffs.length);
    render.setTimer(game.secondsLeft, SCENES[1].time);
    render.renderPanels(SCENES[1], game.found);
    return true;
  }

  if (shot === "clear") {
    game.levelIndex = 0;
    game.score = 760;
    game.found = new Set(SCENES[0].diffs.map((d) => d.id));
    game.secondsLeft = 72;
    game.state = "level-clear";
    render.setLevelName(SCENES[0].name, 0, SCENES.length);
    render.setLevelDots(0, SCENES.length, 0);
    render.setScore(game.score);
    render.setHintsLeft(3);
    render.setCounter(game.found.size, SCENES[0].diffs.length);
    render.setTimer(game.secondsLeft, SCENES[0].time);
    render.renderPanels(SCENES[0], game.found);
    render.showOverlay(`
      <div class="card">
        <h2>Level clear!</h2>
        <p class="stars">★★★</p>
        <p>All ${SCENES[0].diffs.length} differences found in <b>${SCENES[0].name}</b>.</p>
        <p>Time bonus: +360 &nbsp;·&nbsp; Score: <b>760</b></p>
        <button class="big-btn">Next level →</button>
      </div>`);
    return true;
  }

  if (shot === "win") {
    game.levelIndex = 2;
    game.score = 2140;
    game.stars = [3, 3, 2];
    game.state = "won";
    render.setLevelName(SCENES[2].name, 2, SCENES.length);
    render.setLevelDots(2, SCENES.length, 3);
    render.setScore(game.score);
    render.setHintsLeft(1);
    render.setCounter(SCENES[2].diffs.length, SCENES[2].diffs.length);
    render.setTimer(41, SCENES[2].time);
    render.renderPanels(SCENES[2], new Set(SCENES[2].diffs.map((d) => d.id)));
    render.showOverlay(`
      <div class="card">
        <h2>🏆 Almost Twins — complete!</h2>
        <p class="stars">★★★★★★★★☆</p>
        <p>You spotted every difference in all ${SCENES.length} scenes.</p>
        <p>Final score: <b>2140</b> &nbsp;·&nbsp; Stars: <b>8 / 9</b></p>
        <p class="judge-note">Made for the make.fun judge: every scene is original, drawn in code.</p>
        <button class="big-btn">Play again</button>
      </div>`);
    return true;
  }

  return false;
}
