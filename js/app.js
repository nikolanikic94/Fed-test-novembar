var Simptom = /** @class */ (function () {
    function Simptom(naziv) {
        this.naziv = naziv;
    }
    return Simptom;
}());
/// <reference path="Simptom.ts" />
var Pacijent = /** @class */ (function () {
    function Pacijent(id, ime, prezime, telesnaTemperatura, pcrTest) {
        this._id = id;
        this._ime = ime;
        this._prezime = prezime;
        this._telesnaTemperatura = telesnaTemperatura;
        this._pcrTest = pcrTest;
        this._ostaliSimptomi = [];
    }
    Pacijent.prototype.dodajSimptom = function (value) {
        this._ostaliSimptomi.push(value);
    };
    Object.defineProperty(Pacijent.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ime", {
        get: function () {
            return this._ime;
        },
        set: function (value) {
            this._ime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "prezime", {
        get: function () {
            return this._prezime;
        },
        set: function (value) {
            this._prezime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "telesnaTemperatura", {
        get: function () {
            return this._telesnaTemperatura;
        },
        set: function (value) {
            this._telesnaTemperatura = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "pcrTest", {
        get: function () {
            return this._pcrTest;
        },
        set: function (value) {
            this._pcrTest = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pacijent.prototype, "ostaliSimptomi", {
        get: function () {
            return this._ostaliSimptomi;
        },
        set: function (value) {
            this._ostaliSimptomi = value;
        },
        enumerable: false,
        configurable: true
    });
    return Pacijent;
}());
/// <reference path="Pacijent.ts" />
var Bolnica = /** @class */ (function () {
    function Bolnica(naziv, grad) {
        this._naziv = naziv;
        this._grad = grad;
        this._pacijenti = [];
    }
    Bolnica.prototype.dodajPacijenta = function (value) {
        this._pacijenti.push(value);
        this.refreshHTML();
    };
    Bolnica.prototype.refreshHTML = function () {
        var tbody = document.getElementById("tbody");
        var output = "";
        for (var i = 0; i < this._pacijenti.length; i++) {
            var listaSimptoma = "<ul>";
            for (var i_1 = 0; i_1 < this._pacijenti[i_1].ostaliSimptomi.length; i_1++) {
                listaSimptoma += "<li>" + this._pacijenti[i_1].ostaliSimptomi[i_1].naziv + "</li>";
            }
            listaSimptoma += "</ul>";
            output += "<tr><td>" + this._pacijenti[i].id + "</td><td>" + this._pacijenti[i].ime + "</td><td>" + this._pacijenti[i].prezime + "</td><td>" + this._pacijenti[i].telesnaTemperatura + " \u00B0C</td><td>" + this._pacijenti[i].pcrTest + "</td><td>" + listaSimptoma + "</td></tr>";
        }
        tbody.innerHTML = output;
    };
    Bolnica.prototype.procentualnoObolelih = function () {
        var broj_obolelih = this._pacijenti.filter(function (elem) { return elem.pcrTest == "Pozitivan"; });
        return (broj_obolelih.length / this._pacijenti.length) * 100;
    };
    Object.defineProperty(Bolnica.prototype, "naziv", {
        get: function () {
            return this._naziv;
        },
        set: function (value) {
            this._naziv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "grad", {
        get: function () {
            return this._grad;
        },
        set: function (value) {
            this._grad = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Bolnica.prototype, "pacijenti", {
        get: function () {
            return this._pacijenti;
        },
        set: function (value) {
            this._pacijenti = value;
        },
        enumerable: false,
        configurable: true
    });
    return Bolnica;
}());
/// <reference path="Bolnica.ts" />
var bolnice = [];
var aktivnaBolnica = null;
function promeniAktivnu(selekt) {
    aktivnaBolnica = bolnice.filter(function (el) { return el.naziv == selekt.value; })[0];
    aktivnaBolnica.refreshHTML();
}
function wireEvents() {
    document.getElementById("dodajSimptom").addEventListener("click", function () {
        var id = Number(document.getElementById("ids").value);
        var simptom = document.getElementById("simptom").value;
        var s = new Simptom(simptom);
        aktivnaBolnica.pacijenti.filter(function (el) { return el.id == id; })[0].dodajSimptom(s);
        aktivnaBolnica.refreshHTML();
    });
    //TODO "Dodaj pacijenta"
    document.getElementById("dodajPacijenta").addEventListener("click", function () {
        var ime = document.getElementById("ime").value;
        var prezime = document.getElementById("prezime").value;
        var temperatura = Number(document.getElementById("temperatura").value);
        var test = document.getElementById("test").value;
        var pacijent = new Pacijent((aktivnaBolnica.pacijenti.length + 1), ime, prezime, temperatura, test);
        aktivnaBolnica.dodajPacijenta(pacijent);
    });
    //TODO "Procentualno obolelih"
    document.getElementById("procenat").addEventListener("click", function () {
        var podaci = document.getElementById("podaci");
        podaci.innerHTML = "<h2>Procenutalan broj obolelih u bolnici " + aktivnaBolnica.naziv + " je " + aktivnaBolnica.procentualnoObolelih().toFixed(2) + "%<h2>";
    });
    //TODO "Procentualno obolelih koji nemaju simptome"
    document.getElementById("bezSimptoma").addEventListener("click", function () {
        var podaci = document.getElementById("podaci");
        var nizPozitivnih = [];
        var nizPozitivnihBezSimptoma = [];
        bolnice.map(function (elem, index) { return elem.pacijenti.map(function (elem) {
            if (elem.pcrTest == "Pozitivan") {
                nizPozitivnih.push(elem);
            }
        }); });
        bolnice.map(function (elem, index) { return elem.pacijenti.map(function (elem) {
            if (elem.pcrTest == "Pozitivan" && elem.ostaliSimptomi.length == 0) {
                nizPozitivnihBezSimptoma.push(elem);
            }
        }); });
        podaci.innerHTML = "<h2>Procenutalan broj obolelih koji nemaju simptome je: " + ((nizPozitivnihBezSimptoma.length / nizPozitivnih.length) * 100).toFixed(2) + " %</h2>";
    });
    //TODO "Grad sa najvise pozitivnih"
    var gradPozitivni = document.getElementById("gradPozitivni").addEventListener("click", function () {
        var podaci = document.getElementById("podaci");
        var beogradPacijenti = bolnice.map(function (elem) { return elem.grad == "Beograd"; });
        console.log(beogradPacijenti);
    });
}
window.onload = function () {
    //KOD TESTIRATI OVDE
    //^^^^^^^^^^^^^^^^^^
    //Po potrebi zakomentarisati initializeData();
    initializeData();
    wireEvents();
};
function initializeData() {
    var bol = window.bol;
    var selekt = document.getElementById("bolnica");
    for (var i = 0; i < bol.length; i++) {
        var naziv = bol[i].naziv;
        var grad = bol[i].grad;
        var pacijenti = [];
        for (var j = 0; j < bol[i].pacijenti.length; j++) {
            var id = Number(bol[i].pacijenti[j].id);
            var ime = bol[i].pacijenti[j].ime;
            var prezime = bol[i].pacijenti[j].prezime;
            var temperatura = Number(bol[i].pacijenti[j].telesnaTemperatura);
            var pcrTest = bol[i].pacijenti[j].pcrTest;
            var simptomi = [];
            for (var k = 0; k < bol[i].pacijenti[j].ostaliSimptomi.length; k++) {
                var s = new Simptom(bol[i].pacijenti[j].ostaliSimptomi[k]);
                simptomi.push(s);
            }
            var p = new Pacijent(id, ime, prezime, temperatura, pcrTest);
            p.ostaliSimptomi = simptomi;
            pacijenti.push(p);
        }
        var b = new Bolnica(naziv, grad);
        b.pacijenti = pacijenti;
        if (aktivnaBolnica == null) {
            aktivnaBolnica = b;
            b.refreshHTML();
        }
        bolnice.push(b);
        var option = document.createElement("option");
        option.text = b.naziv;
        selekt.add(option);
    }
}
//# sourceMappingURL=app.js.map