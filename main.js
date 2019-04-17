function enviar_formulario(tipo) {
	if (validaCampos(tipo)) {
		salvarLocalStorage(tipo);
	}
}

function validaCampos(tipo) {
	let formulario = document.querySelectorAll(`#formulario_${tipo}`);
	formulario = formulario[0].children;

	for (let index = 1; index < formulario.length - 1; index++) {
		if (formulario[index].tagName == 'INPUT' && formulario[index].value == '') {
			return false;
		}
		if (formulario[index].tagName == 'SELECT' && formulario[index].selectedIndex == 0) {
			return false;
		}
	}
	return true;
}

function salvarLocalStorage(tipo) {
	let formulario = document.querySelectorAll(`#formulario_${tipo}`);
	formulario = formulario[0].children;

	let dadoDigitado,
		dadoArmazenado = '';

	if (localStorage.getItem(tipo)) {
		dadoArmazenado = localStorage.getItem(tipo) + ';';
	}

	for (let index = 1; index < formulario.length - 1; index++) {
		if (formulario[index].tagName == 'INPUT') {
			dadoDigitado = formulario[index].value;
			dadoArmazenado += `${dadoDigitado},`;
		}
		if (formulario[index].tagName == 'SELECT') {
			let indexSelecionado = formulario[index].selectedIndex;
			dadoDigitado = formulario[index].options[indexSelecionado].text;
			dadoArmazenado += `${dadoDigitado},`;
		}
		localStorage.setItem(tipo, dadoArmazenado);
	}
}

function listarCadastro(tipo) {
	if (localStorage.getItem(tipo)) {
		let table = document.getElementById(`lista_${tipo}`);
		let td, tr, dados, dado;

		dados = localStorage.getItem(tipo);
		dados = dados.split(';');

		for (let index = 0; index < dados.length; index++) {
			tr = document.createElement('tr');
			dado = dados[index].split(',');
			for (let index2 = 0; index2 < dado.length - 1; index2++) {
				td = document.createElement('td');
				td.innerText = `${dado[index2]}`;
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
	}
}

function carregaDados() {
	carregaOptions('motorista');
	carregaOptions('veiculo');
}

function carregaOptions(tipo) {
	let option;
	let select = document.getElementById(`agendamento_${tipo}`);
	let dados = localStorage.getItem(tipo);
	dados = dados.split(';');

	for (let index = 0; index < dados.length; index++) {
		option = document.createElement('option');
		option.value = `${index + 1}`;
		let dado = dados[index].split(',');

		if (tipo == 'motorista') {
			option.innerHTML = `${dado[0]} ${dado[1]}`;
		} else {
			option.innerHTML = dado[0];
		}

		select.appendChild(option);
	}
}
