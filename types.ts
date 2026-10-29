import abcjs from "abcjs";

const tune = "X:1\nM:4/4\nL:1/4\nK:C\nCDEF|GABc|cBAG|FEDC|";

// Type-checks, but abcjs ignores it: the tune stays on one line.
abcjs.parseOnly(tune, { lineBreaks: [1] });

// Breaks after the second measure at runtime, but doesn't type-check.
abcjs.parseOnly(tune, { lineBreaks: [[1]] });
