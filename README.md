# Lugna Stunden 💙

En lugn liten webbapp för barn (ca 10–14 år) som kämpar med oro. Den är gjord för att öppnas på morgonen eller inför något som känns pirrigt.

## Första starten
Första gången appen öppnas får man välja **🙂 Jag är barnet** eller **👪 Jag är förälder**.
- **Förälder:** välj en PIN-kod (4–6 siffror) och skriv gärna barnets namn. Lämna sedan över telefonen.
- **Barn:** en kort välkomst i tre steg: namn, hur appen fungerar och *Det här är ditt* (vad föräldern kan se).

Installationsfrågan visas först när välkomsten är klar. Den som redan har använt appen slipper välkomsten.

## Två telefoner (barnets och förälderns)
Appen kan användas på två telefoner utan server och utan konto.

1. **På din telefon:** öppna appen, välj **Jag är förälder**, välj PIN-kod och sedan **Min egen telefon**. Appen visar en kopplingskod, till exempel `MHXS-WABG-ZYQC-YCLM`.
2. **På hennes telefon:** under **🙂 Jag → Dela med min förälder** skriver hon in koden. (Du kan också skriva in den i föräldravyn på hennes telefon.)
3. **När hon vill** trycker hon **📤 Skicka till min förälder**. Appen öppnar telefonens dela-meny, och hon skickar rapporten via Meddelanden, WhatsApp eller liknande. Om det har gått en vecka får hon en vänlig påminnelse, som hon kan svara "Inte nu" på. I krisrutan finns också knappen "Skicka till min förälder nu".
4. **På din telefon:** kopiera hela meddelandet, öppna föräldravyn och tryck **📥 Läs in rapport**.

Rapporten är krypterad (AES-GCM med en nyckel som görs av kopplingskoden), så den kan bara läsas av en app som har samma kod. Den innehåller samma saker som föräldravyn visar: humör, teman, vad som hjälper, stjärnor, varningar och de dagboksinlägg hon har delat. Privata dagboksinlägg skickas bara som datum, aldrig text. Ingenting skickas utan att hon själv trycker.

> Varningar kommer bara fram när hon skickar en rapport. Appen ersätter inte att hon går till en vuxen. Därför visar krisrutan alltid BRIS och 112.

Din telefon frågar efter PIN varje gång appen öppnas. Har du redan använt appen på din telefon som "barn" kan du byta: öppna föräldravyn och tryck **Gör den här till föräldratelefon**.

## Innehåll
- **Dagens tanke** – ett positivt, lugnande meddelande (samma hela dagen, med en knapp för fler)
- **Hur känns det idag?** – en enkel incheckning med ett vänligt svar
- **Andas med bollen** – andning 4 s in, 2 s håll, 6 s ut
- **Lugna bubblor** – bubblor som flyter sakta och går att poppa, utan poäng eller tidspress (mjukt ljud om man vill)
- **5-4-3-2-1** – en sinnesövning för att landa i nuet
- **Oromolnet** – skriv en orolig tanke och låt den flyga iväg (sparas inte)
- **Modiga stjärnor** – samla stjärnor för saker man vågat göra

- **Berätta hur du känner** – prata in eller skriv hur det känns och varför. Appen känner igen teman (magen/kroppen, skolan, tid/stress, kompisar, sömn, nya saker, hemma), svarar med passande meddelanden och föreslår övningar.
- **Lär sig vad som hjälper** – efter en övning frågar appen "Kändes det lite bättre?". Svaren påverkar vilka övningar som föreslås nästa gång, för just det temat.
- **Dagbok** – det hon berättar kan sparas (valfritt) och rensas när hon vill. Dagboken är **privat som standard**. Hon väljer själv, per inlägg, om du som förälder får läsa (🔒 Bara min / 👪 Delad), och kan ändra sig när hon vill.
- **Vad ser min förälder?** – under *Om mig* står det öppet vad föräldravyn visar, så att ingenting sker i smyg.
- **Trygghetsspärr** – om texten låter som allvarlig nöd uppmanas hon att gå till en vuxen direkt, och BRIS och 112 visas.

### Om röstinmatning
Appen använder webbläsarens inbyggda taligenkänning. I Chrome skickas ljudet till Google för att göras om till text. På iPhone används Apples taligenkänning. Om funktionen saknas visas ett tips om att använda mikrofonen på tangentbordet i stället. All analys och inlärning sker lokalt i appen, och ingen AI-tjänst används.

Namn, stjärnor och humör sparas bara lokalt i webbläsaren (localStorage). Inget skickas någonstans, förutom den krypterade rapport som hon själv kan välja att skicka till din telefon.

## Föräldravy (dold)
**Öppna:** tryck snabbt **5 gånger på hälsningen** ("God morgon, …!") högst upp på startsidan, eller gå till **🙂 Jag → För föräldrar**. Skriv sedan din PIN-kod. Om ingen PIN-kod finns än väljer du en där.

Visar för 7 eller 30 dagar:
- humör per dag och per veckodag (tyngsta dagen markeras)
- vad oron handlar om (teman)
- vilka övningar som hjälper enligt hennes egna svar
- modiga stjärnor
- dagboken: hur många inlägg hon har skrivit, och **bara de inlägg hon själv har delat** med dig (dolda tills du trycker "Visa")
- **varning** om hon har skrivit något som låter som allvarlig nöd. Du får veta vilken dag, men inte vad hon skrev. Det står också öppet för henne i appen.
- "Kopiera sammanfattning", en text utan dagbokstexter att dela med BUP eller en terapeut

Vyn låses automatiskt när appen stängs eller läggs i bakgrunden.
**Glömt PIN?** Öppna appen med `#nollstall-pin` sist i adressen. Då nollställs bara PIN-koden.

> PIN-koden hashas med SHA-256 och ett slumpat salt. Den skyddar mot att man råkar hitta vyn, men den är inte riktig säkerhet. Koden ligger i ett publikt repo, och all data finns i hennes telefon.

## Filer
```
index.html          appen
manifest.json       gör att den kan installeras som app
sw.js               service worker – offline + installation
icons/              appikoner (192, 512, maskable 512, apple-touch 180)
tests/              test av textanalysen: node tests/analys.test.js
```

## Installera som app
När hon öppnar länken första gången kommer frågan **"Vill du spara appen på hemskärmen?"** med Ja/Nej.
- **Android (Chrome/Edge/Samsung):** "Ja" startar installationen direkt.
- **iPhone/iPad:** Apple tillåter inte att en webbsida installerar sig själv. "Ja" visar därför tre enkla steg via Dela-knappen → *Lägg till på hemskärmen*.
- Svarar hon "Nej" frågar appen igen om 3 dagar. När appen väl är installerad visas frågan aldrig mer.

Efter installationen fungerar appen även utan internet. **Om du ändrar i appen** behöver du höja `VERSION` i `sw.js` (t.ex. från `lugna-v3` till `lugna-v4`). Då hämtar telefonen den nya versionen. Den syns när appen öppnas nästa gång.

## Publicera på GitHub Pages
1. Lägg alla filer ovan (även mappen `icons`) i ett repository.
2. Gå till **Settings → Pages**.
3. Välj **Deploy from a branch**, branch `main` och mapp `/ (root)`, och spara.
4. Efter någon minut ligger appen på `https://<användarnamn>.github.io/<repo>/`.

**Tips:** Öppna länken i Safari/Chrome på mobilen och välj **Lägg till på hemskärmen**, så känns den som en riktig app.

## Varför dagboken är privat
Det hon skriver är hennes. Om hon tror att allt läses, slutar hon troligen skriva ärligt, och då hjälper dagboken varken henne eller er. Därför ser du mönster (humör, teman och vad som hjälper), men inte hennes ord, om hon inte själv väljer att dela dem. Ett tips är att berätta det för henne och visa rutan *Vad ser min förälder?* tillsammans. Undantaget är säkerheten: om något låter allvarligt får du veta att det har hänt.

## Test
```
node tests/analys.test.js
```
Testar att temana känns igen rätt (till exempel att "prova" inte räknas som prov), att trygghetsspärren reagerar på allvarliga formuleringar och att vanlig oro och vardagsuttryck ("jag trodde jag skulle dö", "mamma kommer döda mig") **inte** ger en varning. Lägg gärna till egna meningar i testet.

## Anpassa
Meddelandena ligger i listan `MESSAGES` i `index.html`. Där kan du lägga till egna, till exempel insidesskämt eller saker hon tycker om.
