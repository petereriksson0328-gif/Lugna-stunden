# Projekt: Lugna Stunden

## Bakgrund och syfte
Lugna Stunden är en webbapp (PWA) som jag bygger åt min dotter (10–14 år). Hon har ångest och en specifik rädsla för att kräkas (emetofobi). Hon ska kunna öppna appen på morgonen, eller inför något som känns pirrigt, och få:
- positiva och lugnande meddelanden
- korta, lugnande övningar och spel som hjälper henne att varva ner innan skolan eller en aktivitet
- en plats att berätta hur hon känner, där appen svarar med passande stöd och lär sig vad som hjälper just henne

Appen ska göra vardagen lite lättare. Den ersätter inte vård (BUP eller terapeut) men ska fungera bra tillsammans med den.

## Viktiga principer för innehåll (följ alltid)
- **Språk:** svenska, varmt och enkelt, anpassat för 10–14 år. Inget barnsligt och inget kliniskt.
- **Lova aldrig att hon inte kommer att må illa eller kräkas.** Vid emetofobi håller sådana försäkringar oron vid liv. Meddelanden ska i stället bygga förmågan att klara känslan: "pirr i magen är oro och inte farligt", "känslan går över som en våg", "även om du skulle må dåligt så klarar du det" och "ha en plan, säg till en vuxen".
- Uppmuntra modiga små steg (exponering), till exempel med modiga stjärnor.
- Ingen tidspress, inga poäng att förlora och inga stressande ljud eller animationer. Respektera `prefers-reduced-motion`.
- **Skriv aldrig ut självskada eller självmord i texter som hon ser** (meddelanden, välkomst, Om mig, förklaringar). All oro hänger inte ihop med sådana tankar, och att nämna dem i förväg kan skrämma eller plantera tankar. Krisrutan visas bara när hon själv har skrivit något allvarligt, och även den säger bara att det "låter väldigt tungt".
- **Säkerhet:** om text som hon skriver (i Berätta eller Oromolnet) uttrycker vilja eller avsikt, till exempel "vill dö", "vill inte leva", "vill skada mig" eller "jag skär mig", ska appen direkt visa en varm uppmaning att gå till en vuxen, BRIS 116 111 och 112 vid akut fara. Händelsen loggas så att föräldravyn kan visa en varning. **Vanlig oro och vardagsuttryck får inte ge en varning** ("jag trodde jag skulle dö", "mamma kommer döda mig", "provet tar livet av mig", "jag skadade mig på gympan"). Testa med `node tests/analys.test.js`.

## Teknik (krav)
- Ren HTML, CSS och JavaScript. **Inget ramverk, inget byggsteg.** All appkod ligger i `index.html`.
- Hostas på **GitHub Pages**. Använd bara relativa sökvägar (`./`), eftersom appen ligger under `/<repo>/`.
- **Ingen backend och ingen extern AI-tjänst.** All analys sker lokalt. Data lämnar bara telefonen när hon själv skickar en krypterad rapport till förälderns telefon (se Två telefoner).
- Data sparas i `localStorage` via ett `store`-objekt med try/catch. Alla nycklar har prefixet `ls_`.
- PWA:
  - `manifest.json` med `start_url` och `scope` satta till `./`
  - `sw.js` som service worker med stale-while-revalidate och en `VERSION`-konstant som ska höjas vid varje ändring
  - ikoner i `icons/` (192, 512, maskable 512, apple-touch 180)

## Filstruktur
```
index.html        hela appen (HTML + CSS + JS)
manifest.json
sw.js
icons/            icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png
README.md
tests/analys.test.js   test av textanalysen (node tests/analys.test.js)
```

## Funktioner som ska finnas

### Första starten
- Först väljer man **Jag är barnet** eller **Jag är förälder**.
- Förälder: skapa PIN, skriv barnets namn (valfritt), få veta hur man loggar in igen, lämna över telefonen. Därefter barnets välkomst.
- Barn: välkomst i tre steg (namn, hur appen fungerar, "Det här är ditt"). Klar → `setup` = 1.
- Installationsfrågan visas först när välkomsten är klar. Befintliga användare (namn, humör eller dagbok finns) hoppar över välkomsten.

### För dottern
1. **Hem**
   - hälsning efter tid på dygnet, med hennes namn
   - "Dagens tanke", där samma tanke visas hela dagen; 40 meddelanden i listan `MESSAGES`, plus knappen "En tanke till"
   - humörkoll med 5 emojis, med ett vänligt svar; vid 😐, 😟 eller 😣 erbjuds "Vill du berätta mer?"
2. **Andas med bollen:** en boll som växer och krymper, 4 s in, 2 s håll, 6 s ut.
3. **Lugna bubblor:** bubblor som flyter sakta och kan poppas. Ljudet är valfritt och använder en pentatonisk skala via Web Audio.
4. **5-4-3-2-1:** grounding med sinnena.
5. **Oromolnet:** hon skriver en oro och den flyger iväg. **Texten sparas aldrig**, bara tema och eventuell varning.
6. **Modiga stjärnor:** hon loggar saker hon vågat göra, och de visas som en stjärnhimmel.
7. **Berätta hur du känner**
   - hon kan prata (Web Speech API, `sv-SE`) eller skriva; om taligenkänning saknas visas en hänvisning till tangentbordets mikrofon
   - lokal nyckelordsanalys (`CATS`) i 7 teman: kropp/mage, skola, tid/stress, kompisar, sömn, nytt, familj
   - appen svarar med en bekräftelse ("Det låter som att du känner oro för …"), meddelanden för temat och 3 föreslagna övningar
   - en valfri dagbok som hon kan rensa själv. Dagboken är **privat som standard**: hon väljer per inlägg om föräldern får läsa (🔒/👪) och kan ändra sig när hon vill
8. **Inlärning**
   - efter en övning frågar appen "Kändes det lite bättre?" 👍/🤏/👎
   - poängen sparas per (tema, övning) och påverkar vilka övningar som föreslås nästa gång; märkningen "brukar hjälpa dig" visas
   - "En tanke till" väljer oftare meddelanden för de teman hon berättat om de senaste 18 timmarna
9. **Installera som app**
   - en egen Ja/Nej-ruta
   - Android: `beforeinstallprompt`
   - iPhone: steg-för-steg-instruktioner (Dela → Lägg till på hemskärmen)
   - efter "Nej" frågar appen igen om 3 dagar
10. **Om mig:** namn, kort info om oro och BRIS, och rutan "Vad ser min förälder?" som öppet beskriver vad föräldravyn visar, och knappen "Visa välkomsten igen".
11. **Lugna spel** (ingen tid, inga poäng, inga ljudeffekter som stressar): Kalejdoskop (8-delad spegling), Lugn memory (6 eller 8 par, ingen klocka eller räknare), Sandträdgård (kratta, stenar, spåren tonas ut). Efter en stund eller när spelet är klart: "Kändes det lite bättre?".
12. **Lugn musik:** mjuka toner, regn och vågor via Web Audio (offline), volym, "stäng av efter" och en knapp "Stoppa musiken" på andra skärmar. Spotify-länkar (sökningar) och egna Spotify-listor i `music` (bara länkar som börjar med `https://open.spotify.com/`).

### Två telefoner (utan server)
- Förälderns telefon: välkomst → Jag är förälder → PIN → **Min egen telefon** (`role` = `parent`). Appen visar en kopplingskod (16 tecken, 2 sista är kontrollsumma) och frågar efter PIN vid varje start.
- Barnets telefon: koden skrivs in under Om mig → Dela med min förälder (eller i föräldravyn på barnets telefon).
- "Skicka till min förälder" skapar en rapport (`LS1.` + base64url av IV + AES-GCM, nyckel via PBKDF2 av koden) och öppnar dela-menyn. Påminnelse på startsidan efter 7 dagar ("Inte nu" skjuter upp 2 dagar). Krisrutan har knappen "Skicka till min förälder nu".
- Rapporten innehåller senaste 60 dagarna: moods, themelog, fblog, stars, delade dagboksinlägg med text, privata bara som datum.
- Förälderns telefon läser in rapporten (urklipp eller inklistring). Föräldravyn visar då data från `remote`.

### Dold föräldravy
- Öppnas med **5 snabba tryck på hälsningen**, eller knappen "För föräldrar" under Om mig, och PIN-kod (4–6 siffror, SHA-256 med slumpat salt per enhet i `pinsalt`).
- Låses automatiskt vid `visibilitychange`. `#nollstall-pin` i adressen nollställer PIN-koden.
- Visar för 7 eller 30 dagar:
  - nyckeltal
  - humör per dag (stapeldiagram)
  - humör per veckodag (tyngsta dagen markeras)
  - teman
  - vad som hjälper (👍/🤏/👎 per övning)
  - modiga stjärnor
  - dagboken: antal inlägg, och bara de inlägg hon själv har delat (dolda tills föräldern trycker "Visa", och dolda igen varje gång vyn öppnas)
  - en varningsruta vid allvarliga formuleringar (datum, aldrig själva texten)
- "Kopiera sammanfattning": en text **utan dagbokstexter** som kan delas med BUP eller en terapeut.

### localStorage-nycklar (prefix `ls_`)
`name`, `moods` [{d,m}], `diary` [{d,t,c,m,s}] (s=1 om delad med föräldern), `themelog` [{d,c,x}], `fblog` [{d,e,v}], `w` (inlärningspoäng {tema:{övning:poäng}}, inkl. `allt`), `ctx` (senaste teman), `stars` [{t,d}], `pin` (hash), `pinsalt`, `installNo`, `setup` (1 när välkomsten är klar), `role` (`parent` på förälderns telefon), `paircode`, `pairedat`, `lastsent`, `nudgeNo`, `remote` (senast inlästa rapporten), `music` [{n,u}] (egna Spotify-listor)

## Uppgift nu
1. Läs igenom mitt repository och jämför det med specifikationen ovan.
2. Lista vad som finns, vad som saknas och vad som avviker eller är trasigt.
3. Testa appen lokalt, till exempel med `python -m http.server` och en headless webbläsare om det finns:
   - konsolfel
   - att service workern registreras
   - att manifestet är giltigt
   - att föräldravyn bara öppnas med PIN
4. Föreslå en plan **innan** du ändrar något större. Fråga mig innan du committar eller pushar.
5. Höj `VERSION` i `sw.js` när appfilerna ändras.
