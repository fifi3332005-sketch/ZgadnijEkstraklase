const kluby = [
    { ID: 1, nazwa: "Lech Poznan", miasto: "Poznan", pojemnosc: 42837, wartosc_klubu: 57.40, lat: 52.39767, lon: 16.85818,logo: "loga/Lech.png" },
    { ID: 2, nazwa: "Widzew Lodz", miasto: "Lodz", pojemnosc: 18018, wartosc_klubu: 40.15, lat: 51.76500, lon: 19.51169,logo: "loga/Widzew.png" },
    { ID: 3, nazwa: "Rakow Czestochowa", miasto: "Czestochowa", pojemnosc: 5500, wartosc_klubu: 39.20, lat: 50.77667, lon: 19.15917,logo: "loga/Rakow.png" },
    { ID: 4, nazwa: "Gornik Zabrze", miasto: "Zabrze", pojemnosc: 28236, wartosc_klubu: 29.05, lat: 50.29632, lon: 18.76856,logo: "loga/Gornik.png" },
    { ID: 5, nazwa: "Jagiellonia Bialystok", miasto: "Bialystok", pojemnosc: 22372, wartosc_klubu: 22.20, lat: 53.10603, lon: 23.14905,logo: "loga/Jagiellonia.png" },
    { ID: 6, nazwa: "Cracovia", miasto: "Krakow", pojemnosc: 15016, wartosc_klubu: 22.03, lat: 50.05806, lon: 19.91972,logo: "loga/Cracovia.png" },
    { ID: 7, nazwa: "Zaglebie Lubin", miasto: "Lubin", pojemnosc: 16086, wartosc_klubu: 18.65, lat: 51.41394, lon: 16.19821,logo: "loga/Zaglebie.png" },
    { ID: 8, nazwa: "Korona Kielce", miasto: "Kielce", pojemnosc: 15700, wartosc_klubu: 18.18, lat: 50.86149, lon: 20.62479,logo: "loga/Korona.png" },
    { ID: 9, nazwa: "Legia Warszawa", miasto: "Warszawa", pojemnosc: 31103, wartosc_klubu: 16.90, lat: 52.22046, lon: 21.04076,logo: "loga/Legia.png" },
    { ID: 10, nazwa: "Motor Lublin", miasto: "Lublin", pojemnosc: 15247, wartosc_klubu: 16.48, lat: 51.23241, lon: 22.55735,logo: "loga/Motor.png" },
    { ID: 11, nazwa: "Pogon Szczecin", miasto: "Szczecin", pojemnosc: 21163, wartosc_klubu: 16.13, lat: 53.43647, lon: 14.51851,logo: "loga/Pogon.png" },
    { ID: 12, nazwa: "GKS Katowice", miasto: "Katowice", pojemnosc: 15048, wartosc_klubu: 13.48, lat: 50.25127, lon: 18.97456,logo: "loga/GKS.png" },
    { ID: 13, nazwa: "Wisla Krakow", miasto: "Krakow", pojemnosc: 33130, wartosc_klubu: 12.20, lat: 50.06361, lon: 19.91194,logo: "loga/WislaK.png" },
    { ID: 14, nazwa: "Wisla Plock", miasto: "Plock", pojemnosc: 15004, wartosc_klubu: 10.40, lat: 52.56198, lon: 19.68424,logo: "loga/WislaP.png" },
    { ID: 15, nazwa: "Piast Gliwice", miasto: "Gliwice", pojemnosc: 9736, wartosc_klubu: 10.23, lat: 50.30668, lon: 18.69546,logo: "loga/Piast.png" },
    { ID: 16, nazwa: "Radomiak Radom", miasto: "Radom", pojemnosc: 14440, wartosc_klubu: 10.00, lat: 51.40981, lon: 21.17242,logo: "loga/Radomiak.png" },
    { ID: 17, nazwa: "Wieczysta Krakow", miasto: "Krakow", pojemnosc: 11600, wartosc_klubu: 9.50, lat: 50.28847, lon: 19.17036,logo: "loga/Wieczysta.png" },
    { ID: 18, nazwa: "Slask Wroclaw", miasto: "Wroclaw", pojemnosc: 42771, wartosc_klubu: 8.06, lat: 51.14114, lon: 16.94381,logo: "loga/Slask.png" }
];

let zagadka = kluby[Math.floor(Math.random() * 18)];
let proba = 1;
let koniecGry = false;

function przystosowanie(nazwa) {
    for (let i = 0; i < kluby.length; i++) {
        if (nazwa === kluby[i].nazwa) {
            return kluby[i];
        }
    }

    alert("Podaj klub z ekstraklasy");
    return null;
}
function rysujStrzalke(kierunek) {
    if (kierunek === "rowne") return "✓";

    return `
        <svg class="strzalka ${kierunek}" viewBox="0 0 48 48">
            <path d="M24 5 L42 23 H32 V43 H16 V23 H6 Z"
                  fill="white"/>
        </svg>
    `;
}
function obliczOdleglosc(wybor, zagadka) {

    const R = 6371; // Promień Ziemi w kilometrach
    const naRadiany = Math.PI / 180;

    let lat1 = wybor.lat * naRadiany;
    let lon1 = wybor.lon * naRadiany;

    let lat2 = zagadka.lat * naRadiany;
    let lon2 = zagadka.lon * naRadiany;

    let dLat = lat2 - lat1;
    let dLon = lon2 - lon1;

    let a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;

    let odleglosc =
        2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(odleglosc);
}
function obliczKierunek(wybor, zagadka) {
    const rad = Math.PI / 180;

    let lat1 = wybor.lat * rad;
    let lat2 = zagadka.lat * rad;
    let dLon = (zagadka.lon - wybor.lon) * rad;

    let x = Math.sin(dLon) * Math.cos(lat2);

    let y = Math.cos(lat1) * Math.sin(lat2) -
        Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    let kat = Math.atan2(x, y) * 180 / Math.PI;

    return (kat + 360) % 360;
}
function formatujPojemnosc(liczba) {
    return (liczba / 1000).toFixed(1) + " k";
}

function formatujWartosc(liczba) {
    return liczba.toFixed(1) + " mln";
}
function sprawdzenie(wybor, zagadka) {
    let roznica_pojemnosc;
    let roznica_wartosc;
    let miasto;
    let odleglosc = obliczOdleglosc(wybor, zagadka);
    let kierunek = obliczKierunek(wybor, zagadka);

    if (wybor.nazwa === zagadka.nazwa) {

    let wiersz = document.createElement("div");
    wiersz.className = "wiersz";

    wiersz.innerHTML = `
        <div class="nazwa-klubu">${wybor.nazwa}</div>
        <div class="komorka zielony">${wybor.miasto}</div>
        <div class="komorka zielony">${formatujPojemnosc(wybor.pojemnosc)}</div>
        <div class="komorka zielony">${formatujWartosc(wybor.wartosc_klubu)}</div>
        <div class="komorka zielony">0 km</div>
    `;

    document.getElementById("historia").prepend(wiersz);

    setTimeout(pokazWygrana, 1000);

    return true;
    }
    else {
        if (wybor.miasto === zagadka.miasto) {
            miasto = wybor.miasto;
        }
        else {
            miasto = wybor.miasto;
        }

        if (wybor.pojemnosc > zagadka.pojemnosc) {
            roznica_pojemnosc = wybor.pojemnosc + " ↓";
        }
        else if (wybor.pojemnosc < zagadka.pojemnosc) {
            roznica_pojemnosc = wybor.pojemnosc + " ↑";
        }
        else {
            roznica_pojemnosc = wybor.pojemnosc + " ✓";
        }

        // Wartość klubu
        if (wybor.wartosc_klubu > zagadka.wartosc_klubu) {
            roznica_wartosc = wybor.wartosc_klubu + " mln € ↓";
        }
        else if (wybor.wartosc_klubu < zagadka.wartosc_klubu) {
            roznica_wartosc = wybor.wartosc_klubu + " mln € ↑";
        }
        else {
            roznica_wartosc = wybor.wartosc_klubu + " mln € ✓";
        }

       let wiersz = document.createElement("div");
wiersz.className = "wiersz";

let kolorNazwy = "czerwony";

let kolorMiasta =
    wybor.miasto === zagadka.miasto ? "zielony" : "czerwony";

let kolorPojemnosci =
    wybor.pojemnosc === zagadka.pojemnosc ? "zielony" : "czerwony";

let kolorWartosci =
    wybor.wartosc_klubu === zagadka.wartosc_klubu ? "zielony" : "czerwony";

let strzalkaPojemnosc =
    wybor.pojemnosc < zagadka.pojemnosc ? "gora" :
    wybor.pojemnosc > zagadka.pojemnosc ? "dol" : "rowne";

let strzalkaWartosc =
    wybor.wartosc_klubu < zagadka.wartosc_klubu ? "gora" :
    wybor.wartosc_klubu > zagadka.wartosc_klubu ? "dol" : "rowne";

wiersz.innerHTML = `
    <div class="nazwa-klubu">${wybor.nazwa}</div>

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

document.getElementById("historia").prepend(wiersz);
    }

    return false;
}

function sprawdzKlub() {
    if (koniecGry || proba > 5) {
        return;
    }

    let pole = document.getElementById("nazwaKlubu");
    let nazwa_klubu = pole.value;

    let wybor = przystosowanie(nazwa_klubu);

    if (wybor === null) {
        return;
    }

    if (sprawdzenie(wybor, zagadka)) {
        koniecGry = true;
        return;
    }

    proba++;
    pole.value = "";

    let pozostalo = 6 - proba;
    document.getElementById("licznik").textContent =
    pozostalo + " Guesses left";

document.getElementById("licznik").textContent =
    pozostalo === 1
        ? "1 Guess left"
        : pozostalo + " Guesses left";

    if (proba > 5) {
    koniecGry = true;
    setTimeout(pokazPrzegrana, 1000);
    }
}
function pokazWygrana() {

    let ekran = document.createElement("div");
    ekran.className = "ekran-wygranej";

    ekran.innerHTML = `
        <div class="okno-wygranej">
            <h1>🏆 ZWYCIĘSTWO! 🏆</h1>
            <p>Gratulacje! Odgadłeś klub!</p>
            <button onclick="location.reload()">
                ZAGRAJ PONOWNIE
            </button>
        </div>
    `;

    document.body.appendChild(ekran);
}
function pokazPrzegrana() {

    let ekran = document.createElement("div");
    ekran.className = "ekran-przegranej";

    ekran.innerHTML = `
        <div class="okno-przegranej">
            <h1>PRZEGRANA!</h1>
            <p>Nie udało Ci się odgadnąć klubu.</p>
            <p>Poprawna odpowiedź:</p>
            <h2>${zagadka.nazwa}</h2>
            <button onclick="location.reload()">
                ZAGRAJ PONOWNIE
            </button>
        </div>
    `;

    document.body.appendChild(ekran);
}
function normalizuj(tekst) {
    return tekst
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function pokazPodpowiedzi() {
    const pole = document.getElementById("nazwaKlubu");
    const lista = document.getElementById("podpowiedzi");

    lista.innerHTML = "";

    if (koniecGry) return;

    const tekst = normalizuj(pole.value);

    // Podpowiedzi dopiero od 3 znaków
    if (tekst.length < 3) return;

    const pasujace = kluby.filter(klub =>
        normalizuj(klub.nazwa).includes(tekst)
    );

    pasujace.forEach(klub => {
        const opcja = document.createElement("div");
        opcja.className = "podpowiedz";
        opcja.textContent = klub.nazwa;

        opcja.addEventListener("click", function () {
            pole.value = klub.nazwa;
            lista.innerHTML = "";

            // Automatycznie zatwierdza zgadywany klub
            sprawdzKlub();
        });

        lista.appendChild(opcja);
    });
}

// Reaguje na wpisywanie tekstu
document.getElementById("nazwaKlubu")
    .addEventListener("input", pokazPodpowiedzi);