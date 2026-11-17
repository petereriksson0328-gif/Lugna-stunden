# Lugna Stunden 💙

En lugn liten webbapp för barn (ca 10–14 år) som kämpar med oro. Den är gjord för att öppnas på morgonen eller inför något som känns pirrigt.

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
- **Dagbok** – det hon berättar kan sparas (valfritt) och rensas när hon vill.
- **Trygghetsspärr** – om texten låter som allvarlig nöd uppmanas hon att gå till en vuxen direkt, och BRIS och 112 visas.

### Om röstinmatning
Appen använder webbläsarens inbyggda taligenkänning. I Chrome skickas ljudet till Google för att göras om till text. På iPhone används Apples taligenkänning. Om funktionen saknas visas ett tips om att använda mikrofonen på tangentbordet i stället. All analys och inlärning sker lokalt i appen, och ingen AI-tjänst används.

Namn, stjärnor och humör sparas bara lokalt i webbläsaren (localStorage). Inget skickas någonstans.

## Föräldravy (dold)
**Öppna:** tryck snabbt **5 gånger på hälsningen** ("God morgon, …!") högst upp på startsidan. Första gången väljer du en PIN-kod (4–6 siffror).

Visar för 7 eller 30 dagar:
- humör per dag och per veckodag (tyngsta dagen markeras)
- vad oron handlar om (teman)
- vilka övningar som hjälper enligt hennes egna svar
- modiga stjärnor
- dagbokstexter (dolda tills du trycker "Visa")
- **varning** om hon har skrivit något som låter som allvarlig nöd
- "Kopiera sammanfattning", en text utan dagbokstexter att dela med BUP eller en terapeut

Vyn låses automatiskt när appen stängs eller läggs i bakgrunden.
**Glömt PIN?** Öppna appen med `#nollstall-pin` sist i adressen. Då nollställs bara PIN-koden.

> PIN-koden skyddar mot att man råkar hitta vyn, men den är inte riktig säkerhet. Koden ligger i ett publikt repo, och all data finns i hennes telefon.

## Filer
```
index.html          appen
manifest.json       gör att den kan installeras som app
sw.js               service worker – offline + installation
icons/              appikoner
```

## Installera som app
När hon öppnar länken första gången kommer frågan **"Vill du spara appen på hemskärmen?"** med Ja/Nej.
- **Android (Chrome/Edge/Samsung):** "Ja" startar installationen direkt.
- **iPhone/iPad:** Apple tillåter inte att en webbsida installerar sig själv. "Ja" visar därför tre enkla steg via Dela-knappen → *Lägg till på hemskärmen*.
- Svarar hon "Nej" frågar appen igen om 3 dagar. När appen väl är installerad visas frågan aldrig mer.

Efter installationen fungerar appen även utan internet. **Om du ändrar i appen** behöver du höja `VERSION` i `sw.js` (t.ex. `lugna-v2`). Då hämtar telefonen den nya versionen. Den syns när appen öppnas nästa gång.

## Publicera på GitHub Pages
1. Lägg alla filer ovan (även mappen `icons`) i ett repository.
2. Gå till **Settings → Pages**.
3. Välj **Deploy from a branch**, branch `main` och mapp `/ (root)`, och spara.
4. Efter någon minut ligger appen på `https://<användarnamn>.github.io/<repo>/`.

**Tips:** Öppna länken i Safari/Chrome på mobilen och välj **Lägg till på hemskärmen**, så känns den som en riktig app.

## Anpassa
Meddelandena ligger i listan `MESSAGES` i `index.html`. Där kan du lägga till egna, till exempel insidesskämt eller saker hon tycker om.
