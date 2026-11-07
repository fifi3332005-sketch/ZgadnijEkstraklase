
// ==========================================
// 1. BAZA KLUBÓW
// ==========================================

const kluby = [
    { ID: 1, nazwa: "Lech Poznan", miasto: "Poznan", pojemnosc: 42837, wartosc_klubu: 57.40, lat: 52.39767, lon: 16.85818 },
    { ID: 2, nazwa: "Widzew Lodz", miasto: "Lodz", pojemnosc: 18018, wartosc_klubu: 40.15, lat: 51.76500, lon: 19.51169 },
    { ID: 3, nazwa: "Rakow Czestochowa", miasto: "Czestochowa", pojemnosc: 5500, wartosc_klubu: 39.20, lat: 50.77667, lon: 19.15917 },
    { ID: 4, nazwa: "Gornik Zabrze", miasto: "Zabrze", pojemnosc: 28236, wartosc_klubu: 29.05, lat: 50.29632, lon: 18.76856 },
    { ID: 5, nazwa: "Jagiellonia Bialystok", miasto: "Bialystok", pojemnosc: 22372, wartosc_klubu: 22.20, lat: 53.10603, lon: 23.14905 },
    { ID: 6, nazwa: "Cracovia", miasto: "Krakow", pojemnosc: 15016, wartosc_klubu: 22.03, lat: 50.05806, lon: 19.91972 },
    { ID: 7, nazwa: "Zaglebie Lubin", miasto: "Lubin", pojemnosc: 16086, wartosc_klubu: 18.65, lat: 51.41394, lon: 16.19821 },
    { ID: 8, nazwa: "Korona Kielce", miasto: "Kielce", pojemnosc: 15700, wartosc_klubu: 18.18, lat: 50.86149, lon: 20.62479 },
    { ID: 9, nazwa: "Legia Warszawa", miasto: "Warszawa", pojemnosc: 31103, wartosc_klubu: 16.90, lat: 52.22046, lon: 21.04076 },
    { ID: 10, nazwa: "Motor Lublin", miasto: "Lublin", pojemnosc: 15247, wartosc_klubu: 16.48, lat: 51.23241, lon: 22.55735 },
    { ID: 11, nazwa: "Pogon Szczecin", miasto: "Szczecin", pojemnosc: 21163, wartosc_klubu: 16.13, lat: 53.43647, lon: 14.51851 },
    { ID: 12, nazwa: "GKS Katowice", miasto: "Katowice", pojemnosc: 15048, wartosc_klubu: 13.48, lat: 50.25127, lon: 18.97456 },
    { ID: 13, nazwa: "Wisla Krakow", miasto: "Krakow", pojemnosc: 33130, wartosc_klubu: 12.20, lat: 50.06361, lon: 19.91194 },
    { ID: 14, nazwa: "Wisla Plock", miasto: "Plock", pojemnosc: 15004, wartosc_klubu: 10.40, lat: 52.56198, lon: 19.68424 },
    { ID: 15, nazwa: "Piast Gliwice", miasto: "Gliwice", pojemnosc: 9736, wartosc_klubu: 10.23, lat: 50.30668, lon: 18.69546 },
    { ID: 16, nazwa: "Radomiak Radom", miasto: "Radom", pojemnosc: 14440, wartosc_klubu: 10.00, lat: 51.40981, lon: 21.17242 },
    { ID: 17, nazwa: "Wieczysta Krakow", miasto: "Krakow", pojemnosc: 11600, wartosc_klubu: 9.50, lat: 50.28847, lon: 19.17036 },
    { ID: 18, nazwa: "Slask Wroclaw", miasto: "Wroclaw", pojemnosc: 42771, wartosc_klubu: 8.06, lat: 51.14114, lon: 16.94381 }
];


// ==========================================
// 2. STAN GRY
// ==========================================

const MAKS_PROB = 5;

const zagadka = kluby[Math.floor(Math.random() * kluby.length)];

let proba = 1;
let koniecGry = false;


// ==========================================
// 3. FUNKCJE POMOCNICZE
// ==========================================

// Usuwa polskie znaki i ignoruje wielkość liter.
function normalizuj(tekst) {
    return tekst.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

// Znajduje klub w bazie.
function przystosowanie(nazwa) {
    const klub = kluby.find(k => k.nazwa === nazwa);

    if (!klub) {
        alert("Please select a club from the list.");
    }

    return klub || null;
}

// Skraca pojemność stadionu, np. 21163 -> 21.2 k.
function formatujPojemnosc(liczba) {
    return (liczba / 1000).toFixed(1) + " k";
}

// Skraca wartość klubu, np. 16.13 -> 16.1 mln.
function formatujWartosc(liczba) {
    return liczba.toFixed(1) + " mln";
}

// Rysuje grubą strzałkę SVG.
function rysujStrzalke(kierunek) {
    if (kierunek === "rowne") {
        return "✓";
    }

    return `
        <svg class="strzalka ${kierunek}" viewBox="0 0 48 48">
            <path d="M24 5 L42 23 H32 V43 H16 V23 H6 Z"
                  fill="white"/>
        </svg>
    `;
}

// Określa, czy tajny klub ma większą czy mniejszą wartość.
function kierunekWartosci(wybrana, szukana) {
    return wybrana < szukana ? "gora" :
           wybrana > szukana ? "dol" : "rowne";
}


// ==========================================
// 4. ODLEGŁOŚĆ I KIERUNEK STADIONÓW
// ==========================================

// Odległość w kilometrach (wzór Haversine).
function obliczOdleglosc(wybor, zagadka) {
    const R = 6371;
    const rad = Math.PI / 180;

    const lat1 = wybor.lat * rad;
    const lat2 = zagadka.lat * rad;

    const dLat = lat2 - lat1;
    const dLon = (zagadka.lon - wybor.lon) * rad;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;

    const odleglosc =
        2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(odleglosc);
}

// Kierunek od wybranego stadionu do szukanego.
// 0 stopni oznacza północ.
function obliczKierunek(wybor, zagadka) {
    const rad = Math.PI / 180;

    const lat1 = wybor.lat * rad;
    const lat2 = zagadka.lat * rad;
    const dLon = (zagadka.lon - wybor.lon) * rad;

    const x = Math.sin(dLon) * Math.cos(lat2);

    const y =
        Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    return (Math.atan2(x, y) * 180 / Math.PI + 360) % 360;
}


// ==========================================
// 5. SPRAWDZANIE KLUBU
// ==========================================

function sprawdzenie(wybor, zagadka) {

    const trafienie = wybor.nazwa === zagadka.nazwa;

    const wiersz = document.createElement("div");
    wiersz.className = "wiersz";

    // Poprawnie odgadnięty klub.
    if (trafienie) {

        wiersz.innerHTML = `
            <div class="nazwa-klubu">${wybor.nazwa}</div>
            <div class="komorka zielony">${wybor.miasto}</div>
            <div class="komorka zielony">${formatujPojemnosc(wybor.pojemnosc)}</div>
            <div class="komorka zielony">${formatujWartosc(wybor.wartosc_klubu)}</div>
            <div class="komorka zielony">0 km</div>
        `;

    } else {

        // Kolory kafelków.
        const kolorMiasta =
            wybor.miasto === zagadka.miasto ? "zielony" : "czerwony";

        const kolorPojemnosci =
            wybor.pojemnosc === zagadka.pojemnosc ? "zielony" : "czerwony";

        const kolorWartosci =
            wybor.wartosc_klubu === zagadka.wartosc_klubu ? "zielony" : "czerwony";

        // Kierunki strzałek.
        const strzalkaPojemnosc =
            kierunekWartosci(wybor.pojemnosc, zagadka.pojemnosc);

        const strzalkaWartosc =
            kierunekWartosci(wybor.wartosc_klubu, zagadka.wartosc_klubu);

        // Odległość i kierunek geograficzny.
        const odleglosc = obliczOdleglosc(wybor, zagadka);
        const kierunek = obliczKierunek(wybor, zagadka);

        // Wyświetlenie wiersza wyników.
        wiersz.innerHTML = `
            <div class="nazwa-klubu">
                ${wybor.nazwa}
            </div>

            <div class="komorka ${kolorMiasta}">
                ${wybor.miasto}
            </div>

            <div class="komorka ${kolorPojemnosci}">
                <span>${formatujPojemnosc(wybor.pojemnosc)}</span>
                ${rysujStrzalke(strzalkaPojemnosc)}
            </div>

            <div class="komorka ${kolorWartosci}">
                <span>${formatujWartosc(wybor.wartosc_klubu)}</span>
                ${rysujStrzalke(strzalkaWartosc)}
            </div>

            <div class="komorka odleglosc">
                <span>${odleglosc} km</span>

                <svg class="strzalka"
                     viewBox="0 0 48 48"
                     style="transform: rotate(${kierunek}deg)">
                    <path d="M24 5 L42 23 H32 V43 H16 V23 H6 Z"
                          fill="white"/>
                </svg>
            </div>
        `;
    }

    // Najnowsza próba pojawia się na samej górze.
    document.getElementById("historia").prepend(wiersz);

    if (trafienie) {
        setTimeout(pokazWygrana, 1000);
    }

    return trafienie;
}


// ==========================================
// 6. OBSŁUGA PIĘCIU PRÓB
// ==========================================

function sprawdzKlub() {

    if (koniecGry || proba > MAKS_PROB) {
        return;
    }

    const pole = document.getElementById("nazwaKlubu");
    const wybor = przystosowanie(pole.value);

    if (!wybor) {
        return;
    }

    if (sprawdzenie(wybor, zagadka)) {
        koniecGry = true;
        return;
    }

    proba++;
    pole.value = "";

    // Aktualizacja licznika.
    const pozostalo = MAKS_PROB - proba + 1;

    document.getElementById("licznik").textContent =
        pozostalo === 1
            ? "1 Guess left"
            : `${pozostalo} Guesses left`;

    // Koniec po pięciu nieudanych próbach.
    if (proba > MAKS_PROB) {
        koniecGry = true;
        setTimeout(pokazPrzegrana, 1000);
    }
}


// ==========================================
// 7. EKRAN ZWYCIĘSTWA
// ==========================================

function pokazWygrana() {

    const ekran = document.createElement("div");
    ekran.className = "ekran-wygranej";

    ekran.innerHTML = `
        <div class="okno-wygranej">
            <h1>🏆 VICTORY! 🏆</h1>
            <p>Congratulations! You've guessed the right club!</p>

            <button onclick="location.reload()">
                PLAY AGAIN
            </button>
        </div>
    `;

    document.body.appendChild(ekran);
}


// ==========================================
// 8. EKRAN PRZEGRANEJ
// ==========================================

function pokazPrzegrana() {

    const ekran = document.createElement("div");
    ekran.className = "ekran-przegranej";

    ekran.innerHTML = `
        <div class="okno-przegranej">
            <h1>GAME OVER!</h1>
            <p>You didn't guess the club.</p>
            <p>The correct answer was:</p>
            <h2>${zagadka.nazwa}</h2>

            <button onclick="location.reload()">
                PLAY AGAIN
            </button>
        </div>
    `;

    document.body.appendChild(ekran);
}


// ==========================================
// 9. AUTOMATYCZNE PODPOWIEDZI KLUBÓW
// ==========================================

function pokazPodpowiedzi() {

    const pole = document.getElementById("nazwaKlubu");
    const lista = document.getElementById("podpowiedzi");

    lista.innerHTML = "";

    if (koniecGry) {
        return;
    }

    const tekst = normalizuj(pole.value);

    // Podpowiedzi po wpisaniu co najmniej 3 znaków.
    if (tekst.length < 3) {
        return;
    }

    const pasujace = kluby.filter(klub =>
        normalizuj(klub.nazwa).includes(tekst)
    );

    pasujace.forEach(klub => {

        const opcja = document.createElement("div");
        opcja.className = "podpowiedz";
        opcja.textContent = klub.nazwa;

        // Kliknięcie nazwy automatycznie zatwierdza próbę.
        opcja.addEventListener("click", function () {
            pole.value = klub.nazwa;
            lista.innerHTML = "";
            sprawdzKlub();
        });

        lista.appendChild(opcja);
    });
}


// ==========================================
// 10. URUCHOMIENIE PODPOWIEDZI
// ==========================================

document.getElementById("nazwaKlubu")
    .addEventListener("input", pokazPodpowiedzi);
