// Server-only: AIROOM keeps everything as files under /data on the host laptop.
import { randomUUID } from "node:crypto";
import { cpSync, existsSync } from "node:fs";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { DEMO_MODE } from "@/lib/constants/features";

const BUNDLED_DATA_DIR = path.join(process.cwd(), "data");

// The hosted demo can't write to its own folder, so it works on a copy in the
// temp folder, seeded with the sample Rooms. That copy resets when the server does.
function demoDataDir(): string {
  const dir = path.join(os.tmpdir(), "airoom-demo-data");
  if (!existsSync(dir) && existsSync(BUNDLED_DATA_DIR)) cpSync(BUNDLED_DATA_DIR, dir, { recursive: true });
  return dir;
}

export const DATA_DIR = DEMO_MODE ? demoDataDir() : BUNDLED_DATA_DIR;

const ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const newId = () => randomUUID();

/** Ids come from the browser, so only server-made UUIDs may reach a file path. */
export function isSafeId(id: unknown): id is string {
  return typeof id === "string" && ID_PATTERN.test(id);
}

export function dataPath(...parts: string[]): string {
  return path.join(DATA_DIR, ...parts);
}

export async function readJson<T>(file: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as T;
  } catch {
    return null;
  }
}

// Writes to a temp file first so a crash never leaves half a JSON file.
export async function writeJson(file: string, value: unknown): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(value));
  await rename(tmp, file);
}
