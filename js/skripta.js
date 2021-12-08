var boje = {
	klinika: "Crimson",
	institut: "Teal"
};

function proveraForme(form) {
	let validation = true; 

	let naziv = form.naziv.value.trim();
	if (naziv == "" || naziv.charAt(0) !== naziv.charAt(0).toUpperCase()) {
		validation = false;
	}
	
	let grad = form.grad.value.trim();
	if (grad == "" || grad.charAt(0) !== grad.charAt(0).toUpperCase()) {
		validation = false;
	}

	let validacija = [{naziv: "KCV", grad: "NS"}, 
					  {naziv: "KCS", grad: "BG"}, 
					  {naziv: "KCN", grad: "NI"}];

	let ValidNazivGrad = false;
	for (let i = 0; i < validacija.length; i++) {
		if (naziv == validacija[i].naziv && grad == validacija[i].grad) {
			ValidNazivGrad = true;
		}
	}
	
	if (ValidNazivGrad == false) {
		validation = false;
	}

	return validation;
}

function enableSelect1() {
	let sel1 = document.getElementById("sel1");
	let checkbox = document.getElementById("checkbox").checked;
	sel1.disabled = !checkbox;

	if (!checkbox) {
		sel2.classList.add("sel2");
		sel2.disabled = true;
	}


}

function enableSelect2() {
	let sel1 = document.getElementById("sel1");
	let sel2 = document.getElementById("sel2");
	let checkbox = document.getElementById("checkbox");

	
	if (sel1.disabled == false) {
		if (sel1.value == 3) {
			sel2.classList.remove("sel2");
			sel2.disabled = false;
		}
		else {
			sel2.classList.add("sel2");
			sel2.disabled = true;
		}
	}
	
	fillMessage();
}

function fillMessage() {
	let sel2 = document.getElementById("sel2");
	let poruka = document.getElementById("poruka");
	let select_paragraf = document.getElementById("select_paragraf");
	let submitbtn = document.getElementById("submitbtn");

	if (sel2.value == "klinika") {
		poruka.innerHTML = sel2.value;
		select_paragraf.style.backgroundColor = boje.klinika;
		submitbtn.style.backgroundColor = boje.klinika;
	}
	else if (sel2.value == "institut") {
		poruka.innerHTML = sel2.value;
		select_paragraf.style.backgroundColor = boje.institut;
		submitbtn.style.backgroundColor = boje.institut;
	}
}