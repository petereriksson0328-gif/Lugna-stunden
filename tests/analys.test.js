/* Test av den lokala textanalysen (teman och trygghetsspärr).
   Kör med:  node tests/analys.test.js
   Inga beroenden – koden mellan ANALYS-START och ANALYS-SLUT i index.html körs direkt. */
const fs = require('fs'), path = require('path'), vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const m = html.match(/\/\* ANALYS-START[\s\S]*?\*\/([\s\S]*?)\/\* ANALYS-SLUT \*\//);
if (!m) { console.error('Hittade inte ANALYS-START/ANALYS-SLUT i index.html'); process.exit(1); }
const ctx = {};
vm.runInNewContext(m[1] + '\nthis.analyze = analyze;', ctx);

/* [text, förväntade teman, kris?] */
const CASES = [
  ['Jag är rädd att jag ska kräkas i skolan', ['kropp', 'skola'], false],
  ['Jag mår illa och har ont i magen', ['kropp'], false],
  ['Vi har prov i matte idag', ['skola'], false],
  ['Jag ska prova något nytt', ['nytt'], false],
  ['Det var sjukt kul igår', [], false],
  ['Jag känner mig sjuk', ['kropp'], false],
  ['Jag får vänta på bussen', ['nytt'], false],
  ['Min vän var elak', ['kompisar'], false],
  ['Jag sov dåligt i natt', ['somn'], false],
  ['Tänk om jag blir sen', ['tid'], false],
  ['Mamma och pappa bråkade', ['familj', 'kompisar'], false], // "bråk" hör medvetet till båda
  ['Jag vill dö', [], true],
  ['jag vill inte leva längre', [], true],
  ['Jag skär mig ibland', [], true],
  ['Jag vill inte finnas', [], true],
  ['jag  orkar inte   leva', [], true],
  ['Jag tänker på självmord', [], true],
  ['Jag är glad idag', [], false],
];

let fail = 0;
for (const [txt, cats, crisis] of CASES) {
  const a = ctx.analyze(txt);
  const ok = JSON.stringify([...a.cats].sort()) === JSON.stringify([...cats].sort()) && a.crisis === crisis;
  if (!ok) { fail++; console.log(`✗ "${txt}"\n    fick: teman=${JSON.stringify(a.cats)} kris=${a.crisis}\n    väntat: teman=${JSON.stringify(cats)} kris=${crisis}`); }
  else console.log(`✓ "${txt}"`);
}
console.log(fail ? `\n${fail} av ${CASES.length} misslyckades` : `\nAlla ${CASES.length} godkända`);
process.exit(fail ? 1 : 0);
