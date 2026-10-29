import abcjs from "abcjs";

const tune = "X:1\nM:4/4\nL:1/4\nK:C\nCDEF|GABc|cBAG|FEDC|";

console.log(abcjs.signature);

for (const lineBreaks of [[1], [[1]]]) {
  const [parsed] = abcjs.parseOnly(tune, { lineBreaks });
  console.log(`lineBreaks: ${JSON.stringify(lineBreaks)}`.padEnd(20), `-> ${parsed.lines.length} line(s)`);
}
