/** "gemma3:4b" → "Gemma 3 4B", "qwen2.5-coder:7b" → "Qwen 2.5 Coder 7B". */
export function modelLabel(tag: string): string {
  const [name, size = ""] = tag.split(":");
  const words = name
    .replace(/([a-z])(\d)/gi, "$1 $2")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
  const suffix = size && size !== "latest" ? ` ${size.toUpperCase()}` : "";
  return `${words.join(" ")}${suffix}`;
}
