// Token contrast computation (Task 5.2). Prints WCAG ratios for the token pairs
// in docs/contrast-matrix.md so the matrix can be re-verified after any token
// change. Not part of the app.
function lin(c) {
  c = c / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function L(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) hex = [...hex].map((x) => x + x).join("");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function ratio(a, b) {
  const la = L(a), lb = L(b);
  const hi = Math.max(la, lb), lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}
const T = {
  ink: "#0b0d0f", ivory: "#f4f0e8", stone: "#b8b2a7",
  stone600: "#6b665c", crimson: "#a51c30", white: "#ffffff",
};
const pairs = [
  ["ink/ivory", T.ink, T.ivory],
  ["ivory/ink", T.ivory, T.ink],
  ["stone600/ivory", T.stone600, T.ivory],
  ["stone/ink", T.stone, T.ink],
  ["stone/ivory", T.stone, T.ivory],
  ["crimson/ivory", T.crimson, T.ivory],
  ["crimson/ink", T.crimson, T.ink],
  ["ivory/crimson", T.ivory, T.crimson],
  ["white/ink", T.white, T.ink],
];
let bodyFailForInfo = [];
for (const [name, a, b] of pairs) {
  const r = ratio(a, b);
  const aaBody = r >= 4.5 ? "AA-body" : r >= 3 ? "AA-large/UI" : "FAIL";
  console.log(`${name.padEnd(16)} ${r.toFixed(2)}:1  ${aaBody}`);
}
