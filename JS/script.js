// Elementos do formulário
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const dataEmprestimo = document.getElementById("dataEmprestimo");
const botaoCadastro = document.getElementById("botaoCadastro");
const listaCaloteiros = document.getElementById("listaCaloteiros");

let indiceEdicao = null; // Índice do caloteiro em edição

// Classe que representa um caloteiro
class Caloteiro {
  constructor(nome, descricao, valor, dataEmprestimo) {
    this.nome = nome || "Desconhecido";
    this.descricao = descricao || "Motivo misterioso";
    this.valor = parseFloat(valor) || 0;
    this.dataEmprestimo = dataEmprestimo ? new Date(dataEmprestimo) : new Date();
  }

  // Calcula o valor atualizado com juros
  calcularValorAtualizado() {
    const agora = new Date();
    const minutosPassados = Math.floor((agora - this.dataEmprestimo) / 60000);
    const jurosPorMinuto = 0.05;
    return (this.valor + minutosPassados * jurosPorMinuto).toFixed(2);
  }

  // Retorna os detalhes do caloteiro formatados
  getDetalhes() {
    const dataFormatada = this.dataEmprestimo.toLocaleDateString("pt-BR");
    return `${this.nome} - ${this.descricao} - R$${this.valor.toFixed(2)} - Data: ${dataFormatada}`;
  }
}

// Array para armazenar os caloteiros cadastrados
const caloteiros = [];

// Renderiza a lista de caloteiros
function renderizarLista() {
  listaCaloteiros.innerHTML = "";
  caloteiros.forEach((caloteiro, indice) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="info">${caloteiro.getDetalhes()} - Com Juros: R$${caloteiro.calcularValorAtualizado()}</span>
      <button onclick="editarCaloteiro(${indice})">Editar</button>
      <button onclick="excluirCaloteiro(${indice})">Excluir</button>
    `;
    listaCaloteiros.appendChild(li);
  });
}

// Cadastra ou edita o caloteiro
function cadastrarCaloteiro() {
  if (!nome.value || !descricao.value || !valor.value || !dataEmprestimo.value) {
    alert("Preencha todos os campos para registrar o calote!");
    return;
  }

  const novoCaloteiro = new Caloteiro(
    nome.value,
    descricao.value,
    valor.value,
    dataEmprestimo.value
  );

  if (indiceEdicao !== null) {
    caloteiros[indiceEdicao] = novoCaloteiro;
    indiceEdicao = null;
    botaoCadastro.textContent = "Cadastrar Caloteiro";
  } else {
    caloteiros.push(novoCaloteiro);
  }

  renderizarLista();
  limparFormulario();
}

// Evento para cadastrar ou editar um caloteiro
botaoCadastro.addEventListener("click", cadastrarCaloteiro);

// Função para editar um caloteiro
function editarCaloteiro(indice) {
  const caloteiro = caloteiros[indice];
  nome.value = caloteiro.nome;
  descricao.value = caloteiro.descricao;
  valor.value = caloteiro.valor;
  dataEmprestimo.value = caloteiro.dataEmprestimo.toISOString().split("T")[0];

  indiceEdicao = indice;
  botaoCadastro.textContent = "Salvar Alteração";
}

// Exclui um caloteiro
function excluirCaloteiro(indice) {
  caloteiros.splice(indice, 1);
  renderizarLista();
}

// Limpa o formulário
function limparFormulario() {
  nome.value = "";
  descricao.value = "";
  valor.value = "";
  dataEmprestimo.value = "";
  botaoCadastro.textContent = "Cadastrar Caloteiro";
  indiceEdicao = null;
}
