# abcjs: `lineBreaks` is typed as a flat list, but the parser reads one list per section

Minimal reproduction for the `lineBreaks` option's TypeScript type. `AbcVisualParams.lineBreaks` is declared as `Array<number>`, but the parser reads it as an array with one list of measure numbers per section of the tune. A flat list type-checks and is silently ignored; the nested list that works doesn't type-check. Related: #1139, where the nested shape was worked out for the runtime.

## Reproduction

```sh
npm install
npm run repro
```

`repro.mjs` parses a four-measure tune with `parseOnly` and counts its lines, first with `lineBreaks: [1]`, then with `lineBreaks: [[1]]`. Then `tsc` checks `types.ts`, which passes both forms:

```txt
abcjs-basic v6.7.2
lineBreaks: [1]      -> 1 line(s)
lineBreaks: [[1]]    -> 2 line(s)
types.ts(9,38): error TS2322: Type '[number]' is not assignable to type 'number'.
```

## Expected

The form the parser uses type-checks, and the one it ignores doesn't: `lineBreaks?: Array<Array<number>>`.

## Actual

`types/index.d.ts` declares `lineBreaks?: Array<number>` in `AbcVisualParams`. The parser passes `switches.lineBreaks` to `wrapLines` (`src/parse/abc_parse.js`), and `findLineBreaks` (`src/parse/wrap_lines.js`) reads `lineBreakArray[lbai]` as each section's list ("lineBreakArray is an array of all of the sections of the tune"), comparing `lineBreaks[lbi]` with each measure number. A flat list's entries are numbers, so `lineBreaks[lbi]` is `undefined` and no measure ever matches.

The same file also declares `TuneObject.lineBreaks?: Array<number>`, but after parsing it holds the break descriptions `wrapLines` writes (`{ ogLine, line, staff, voice, start, end }`).

## Environment

- abcjs: `6.7.2`
- TypeScript: `7.0.2`
- Node.js: `24.22.0`
- macOS: `27.2`
