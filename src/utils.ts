export function truncateMid(
  str: string,
  threshold: number,
  preserve: number,
): string {
  if (str.length <= threshold) return str;

  const ellipsis = "…";
  const availableChars = threshold - ellipsis.length;
  const startChars = availableChars - preserve;

  if (startChars <= 0) {
    return str.slice(-threshold);
  }

  return str.slice(0, startChars) + ellipsis + str.slice(-preserve);
}

export function breadcrumbsFromPath(path: string) {
  return path.split("/").map((segment, i, a) => ({
    segment,
    path: a.slice(0, i + 1).join("/"),
  }));
}
