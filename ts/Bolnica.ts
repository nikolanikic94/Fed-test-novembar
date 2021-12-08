/// <reference path="Pacijent.ts" />

class Bolnica {
    private _naziv: string;
    private _grad: string;
    private _pacijenti: Pacijent[];


	constructor(naziv: string, grad: string) {
		this._naziv = naziv;
		this._grad = grad;
		this._pacijenti = [];
    }
    
    public dodajPacijenta(value: Pacijent): void {
        this._pacijenti.push(value);
        this.refreshHTML();
    }

    public refreshHTML(): void {
        let tbody = document.getElementById("tbody");
        let output = ""


        for (let i = 0; i < this._pacijenti.length; i++) {

            let listaSimptoma = "<ul>"

            for (let i = 0; i < this._pacijenti[i].ostaliSimptomi.length; i++) {
                listaSimptoma += `<li>${this._pacijenti[i].ostaliSimptomi[i].naziv}</li>`;
            }

            listaSimptoma += "</ul>";

            output += `<tr><td>${this._pacijenti[i].id}</td><td>${this._pacijenti[i].ime}</td><td>${this._pacijenti[i].prezime}</td><td>${this._pacijenti[i].telesnaTemperatura} °C</td><td>${this._pacijenti[i].pcrTest}</td><td>${listaSimptoma}</td></tr>`;
        }

        tbody.innerHTML = output;
    }

    public procentualnoObolelih(): number {
        let broj_obolelih: Pacijent[] = this._pacijenti.filter(elem => elem.pcrTest == "Pozitivan");
        return (broj_obolelih.length / this._pacijenti.length) * 100;

    }

	public get naziv(): string {
		return this._naziv;
	}
	public get grad(): string {
		return this._grad;
	}
	public get pacijenti(): Pacijent[] {
		return this._pacijenti;
    }
    

	public set naziv(value: string) {
		this._naziv = value;
	}
	public set grad(value: string) {
		this._grad = value;
	}
	public set pacijenti(value: Pacijent[]) {
		this._pacijenti = value;
	}


}

