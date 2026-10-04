/**
 * Splits "Legal Authorization – We are a licensed ..." into its title and its text. The
 * dash is "–" or "-" with spaces around it, depending on the language; a hyphen inside a
 * word ("Visa-Bearbeitung") doesn't count. Without such a dash there is no title.
 */
export function splitAtDash(text: string): [string | undefined, string] {
  const match = text.match(/^(.+?)\s+[–-]\s+(.+)$/);
  return match ? [match[1], match[2]] : [undefined, text];
}
