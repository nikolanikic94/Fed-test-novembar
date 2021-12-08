/// <reference path="Bolnica.ts" />

let bolnice: Bolnica[] = [];
let aktivnaBolnica: Bolnica = null;

function promeniAktivnu(selekt: HTMLSelectElement): void {
    aktivnaBolnica = bolnice.filter(el => el.naziv == selekt.value)[0];
    aktivnaBolnica.refreshHTML();
}

function wireEvents(): void {

    document.getElementById("dodajSimptom").addEventListener("click", () => {
        let id = Number((document.getElementById("ids") as HTMLInputElement).value);
        let simptom = (document.getElementById("simptom") as HTMLSelectElement).value;
        let s = new Simptom(simptom);
        aktivnaBolnica.pacijenti.filter(el => el.id == id)[0].dodajSimptom(s);
        aktivnaBolnica.refreshHTML();
    });


    //TODO "Dodaj pacijenta"
    document.getElementById("dodajPacijenta").addEventListener("click", () => {

        let ime = (document.getElementById("ime") as HTMLInputElement).value;
        let prezime = (document.getElementById("prezime") as HTMLInputElement).value;
        let temperatura = Number((document.getElementById("temperatura") as HTMLInputElement).value);
        let test = (document.getElementById("test") as HTMLSelectElement).value;


        let pacijent = new Pacijent((aktivnaBolnica.pacijenti.length + 1), ime, prezime, temperatura, test);

        aktivnaBolnica.dodajPacijenta(pacijent);
    });

    //TODO "Procentualno obolelih"

    document.getElementById("procenat").addEventListener("click", () => {
        let podaci = document.getElementById("podaci");

        podaci.innerHTML = `<h2>Procenutalan broj obolelih u bolnici ${aktivnaBolnica.naziv} je ${aktivnaBolnica.procentualnoObolelih().toFixed(2)}%<h2>`;
    });

    //TODO "Procentualno obolelih koji nemaju simptome"

    document.getElementById("bezSimptoma").addEventListener("click", () => {
        let podaci = document.getElementById("podaci");

        let nizPozitivnih = [];
        let nizPozitivnihBezSimptoma = [];

        bolnice.map((elem, index) => elem.pacijenti.map(elem => {
            if (elem.pcrTest == "Pozitivan") {
                nizPozitivnih.push(elem);
            }
        }));

        bolnice.map((elem, index) => elem.pacijenti.map(elem => {
            if (elem.pcrTest == "Pozitivan" && elem.ostaliSimptomi.length == 0) {
                nizPozitivnihBezSimptoma.push(elem);
            }
        }));
        
        

        podaci.innerHTML = `<h2>Procenutalan broj obolelih koji nemaju simptome je: ${((nizPozitivnihBezSimptoma.length / nizPozitivnih.length) * 100).toFixed(2)} %</h2>`

        
        
    });

    //TODO "Grad sa najvise pozitivnih"
    let gradPozitivni = document.getElementById("gradPozitivni").addEventListener("click", () => {
        let podaci = document.getElementById("podaci");

        let beogradPacijenti = bolnice.map(elem => elem.grad == "Beograd")
                                      
                                      
        

        console.log(beogradPacijenti);
        
    });

}


window.onload = () => {
    //KOD TESTIRATI OVDE




    //^^^^^^^^^^^^^^^^^^
    //Po potrebi zakomentarisati initializeData();
    initializeData();
    wireEvents();
}

function initializeData() {
    let bol = (window as any).bol;
    let selekt = document.getElementById("bolnica") as HTMLSelectElement;
    for (let i = 0; i < bol.length; i++) {
        let naziv = bol[i].naziv;
        let grad = bol[i].grad;
        let pacijenti: Pacijent[] = [];
        for (let j = 0; j < bol[i].pacijenti.length; j++) {
            let id = Number(bol[i].pacijenti[j].id);
            let ime = bol[i].pacijenti[j].ime;
            let prezime = bol[i].pacijenti[j].prezime;
            let temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
            let pcrTest = bol[i].pacijenti[j].pcrTest;
            let simptomi: Simptom[] = [];

            for (let k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
                let s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
                simptomi.push(s);
            }

            let p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
            p.ostaliSimptomi = simptomi;
            pacijenti.push(p);
        }
        let b = new Bolnica(naziv, grad);
        b.pacijenti = pacijenti;
        if (aktivnaBolnica == null) {
            aktivnaBolnica = b;
            b.refreshHTML();
        }
        bolnice.push(b);
        let option = document.createElement("option");
        option.text = b.naziv;
        selekt.add(option);
    }
}