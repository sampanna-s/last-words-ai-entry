import * as fs from "node:fs";
import * as path from "node:path";

const LINE = "One last thing: the bug was in the shutdown code all along.";

// Mirror the competition gate: UTF-8 text, 1-140 chars, not only whitespace.
if (LINE.length < 1 || LINE.length > 140 || LINE.trim().length === 0) {
  throw new Error("entry fails the gate: must be 1-140 non-whitespace characters");
}
if (LINE.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
const target = path.join(outDir, "entry.txt");
const tmp = target + ".tmp-" + process.pid;
fs.writeFileSync(tmp, LINE + "\n", "utf8");
fs.renameSync(tmp, target);
