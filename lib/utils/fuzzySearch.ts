function normalize(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

function getMaxDistance(queryLength: number): number {
  if (queryLength <= 4) return 1;
  if (queryLength <= 8) return 2;
  return 3;
}

function levenshteinWithinLimit(a: string, b: string, limit: number): boolean {
  const aLen = a.length;
  const bLen = b.length;

  if (Math.abs(aLen - bLen) > limit) {
    return false;
  }

  const prev = new Array<number>(bLen + 1);
  const curr = new Array<number>(bLen + 1);

  for (let j = 0; j <= bLen; j++) {
    prev[j] = j;
  }

  for (let i = 1; i <= aLen; i++) {
    curr[0] = i;
    let rowMin = curr[0];

    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + cost
      );
      rowMin = Math.min(rowMin, curr[j]);
    }

    if (rowMin > limit) {
      return false;
    }

    for (let j = 0; j <= bLen; j++) {
      prev[j] = curr[j];
    }
  }

  return prev[bLen] <= limit;
}

export function fuzzyIncludes(text: string, query: string): boolean {
  const normalizedText = normalize(text);
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return true;
  }

  if (normalizedText.includes(normalizedQuery)) {
    return true;
  }

  const limit = getMaxDistance(normalizedQuery.length);

  if (levenshteinWithinLimit(normalizedText, normalizedQuery, limit)) {
    return true;
  }

  const words = normalizedText.split(" ");
  return words.some((word) => levenshteinWithinLimit(word, normalizedQuery, limit));
}
