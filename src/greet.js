/** Sample module for PRs — critics have something real to review. */
export function greet(name) {
  const trimmed = String(name ?? "").trim();
  if (!trimmed) {
    throw new Error("name is required");
  }
  return `Hello, ${trimmed}!`;
}
