/** Normaliza texto para comparar respuestas (minúsculas, sin tildes, sin espacios extra) */
export function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/\s+/g, "");
}

export function matchesKeyword(input: string, expected: string): boolean {
  return normalize(input) === normalize(expected);
}

export function matchesDate(
  input: string,
  day: number,
  month: number,
  year: number,
): boolean {
  const n = normalize(input).replace(/[/.-]/g, "");
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  const yyyy = String(year);
  const yy = yyyy.slice(2);

  const accepted = [
    `${dd}${mm}${yyyy}`,
    `${dd}${mm}${yy}`,
    `${day}${month}${year}`,
  ];

  return accepted.includes(n);
}
