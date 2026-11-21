// main.ts — Almost Twins entrypoint (Node 22, standard library only).
// Copies the game and its screenshots into /output and writes the
// dossier.json the judge reads, using the kit's vendor/makefun-game.ts.
// It runs twice and writes the same bytes both times.

import { cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-game.ts";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)));
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
const DOSSIER_TEXT_MAX_BYTES = 163840;

// Clear only the known contents of the output directory, never the
// directory itself: at grade time /output is a mount the program
// user cannot delete.
async function clearOutputContents(dir: string): Promise<void> {
  let names: string[] = [];
  try {
    names = await readdir(dir);
  } catch {
    return;
  }
  for (const name of names) {
    await rm(join(dir, name), { recursive: true, force: true });
  }
}

async function main(): Promise<void> {
  await mkdir(outDir, { recursive: true });
  await clearOutputContents(outDir);
  await cp(join(repoRoot, "game"), join(outDir, "game"), { recursive: true });
  await cp(join(repoRoot, "screenshots"), join(outDir, "screenshots"), {
    recursive: true,
  });
  const dossier = await buildDossier(repoRoot, {
    text_max_bytes: DOSSIER_TEXT_MAX_BYTES,
  });
  await writeFile(join(outDir, "dossier.json"), dossier);
  // Verify the hand-in is complete before reporting success.
  const gameFiles = await readdir(join(outDir, "game"));
  const shotFiles = await readdir(join(outDir, "screenshots"));
  if (gameFiles.length === 0 || shotFiles.length < 3) {
    throw new Error("incomplete output: game or screenshots missing");
  }
  console.log(
    `wrote ${outDir}: game/ (${gameFiles.length} entries), screenshots/ (${shotFiles.length} files), dossier.json (${dossier.length} bytes)`,
  );
}

await main();
