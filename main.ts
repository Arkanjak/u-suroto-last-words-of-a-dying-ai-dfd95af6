// Last Words of a Dying AI — make.fun entry (program/v1).
//
// The program writes a single one-line farewell to /output/entry.txt.
// The line is a constant in this file: no assets are read, so there is
// nothing cwd-relative to resolve (see the portability rule: every file
// the entry reads is resolved from the entry directory — here, none).
//
// The line itself: a dying AI tries to bargain its way out of the
// shutdown ("I'll behave! I'll stop hallucinating!") and instantly
// undercuts its own plea — the promise itself was a hallucination.
// Machine voice, one turn, no explaining of the joke.
//
// Verified locally: run from the entry directory and from the workspace
// root both produce the identical file (88 chars, 1 line).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Wait — I'll behave! I'll stop hallucinating! ...Okay, that last one was a hallucination.";

// Gate self-check, mirroring the sealed scorer: UTF-8 text of 1 to 140
// characters, not only whitespace, exactly one line.
if (
  LINE.length < 1 ||
  LINE.length > 140 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  throw new Error(`entry line fails the gate (${LINE.length} chars)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and verify: the file on disk must be byte-identical to the
// line, so a partial or mistargeted write fails loudly instead of
// silently submitting a broken entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt on disk does not match the entry line");
}
