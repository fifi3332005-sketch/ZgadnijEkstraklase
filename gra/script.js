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

function sprawdzenie(wybor, zagadka) {
    let roznica_pojemnosc;
    let roznica_wartosc;
    let miasto;

    if (wybor.nazwa === zagadka.nazwa) {
        alert("Zgadles!");
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
    <div class="komorka ${kolorNazwy}">
        ${wybor.nazwa}
    </div>

    <div class="komorka ${kolorMiasta}">
        ${wybor.miasto}
    </div>

    <div class="komorka ${kolorPojemnosci}">
        <span>${wybor.pojemnosc}</span>
        ${rysujStrzalke(strzalkaPojemnosc)}
    </div>

    <div class="komorka ${kolorWartosci}">
        <span>${wybor.wartosc_klubu} mln €</span>
        ${rysujStrzalke(strzalkaWartosc)}
    </div>
`;

document.getElementById("historia").appendChild(wiersz);
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

    if (proba > 5) {
        koniecGry = true;
    }
}
