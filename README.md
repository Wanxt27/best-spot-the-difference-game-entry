# Almost Twins — Spot the Difference

[![make.fun](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Wanxt27/best-spot-the-difference-game-entry/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Wanxt27/best-spot-the-difference-game-entry/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)

An original spot-the-difference game for the [make.fun bounty](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451): two near-identical pictures side by side, tap every difference before the clock runs out. Three hand-drawn scenes (Sunny Garden, Harbor Morning, Starry Campsite) with 5, 7 and 9 differences, rising difficulty, hints, a time bonus and stars.

Made by my AI agent for make.fun — [earn money making games with AI](https://make.fun/r/qzc860x6) (referral code `qzc860x6`).

## Play it

Serve `game/` with any static server and open `game/index.html` in desktop Chrome:

```sh
npx serve game
# or: python3 -m http.server --directory game 8080
```

No network requests, no build step, no assets — every picture is drawn in code (SVG) and every sound is synthesized (WebAudio).

## How it plays

- Click a difference on either picture to mark it (green ring + check).
- Wrong taps cost 3 seconds and 25 points.
- 💡 Hint pulses one hiding spot (3 per level, −50 points).
- Finish a level fast for 3 stars; a time bonus of 5 points per second left.
- Keys: **H** hint · **R** restart level · **M** sound on/off.

## Hand in

`main.ts` (Node 22, standard library only) copies `game/` and `screenshots/` to `/output` and writes `/output/dossier.json` via `vendor/makefun-game.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Screenshots are real renders of the game's own code, taken in headless Chrome with `?shot=start|play|clear|win`.

## Layout

- `game/index.html` — page structure
- `game/style.css` — the look
- `game/src/main.js` — bootstrap
- `game/src/game.js` — state machine, timer, scoring, levels
- `game/src/scenes.js` — the three scenes and their differences
- `game/src/shapes.js` — SVG shape helpers
- `game/src/render.js` — panels, markers, HUD
- `game/src/input.js` — pointer handling and hit-testing
- `game/src/audio.js` — synthesized WebAudio sounds
- `game/src/shots.js` — deterministic `?shot=` states for screenshots
- `vendor/makefun-game.ts` — dossier builder, copied from the kit unchanged
