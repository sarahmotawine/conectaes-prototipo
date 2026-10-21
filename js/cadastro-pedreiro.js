/* Tela de cadastro do pedreiro.
   Não há cadastro de verdade: o navegador confere os campos obrigatórios
   e o formato do CPF; aqui só se confere se marcou alguma especialidade.
   Ao enviar, entra na área do pedreiro, que no protótipo é sempre a do
   Carlos Pereira (PEDREIRO_DEMO_ID). Nenhum dado digitado é guardado. */

/* Uma opção para cada especialidade que aparece nos pedreiros. */
const especialidades = [...new Set(PEDREIROS.flatMap(function (p) { return p.especialidades; }))].sort();
document.getElementById("especialidades").innerHTML = especialidades.map(function (e) {
  return '<label class="opcao"><input type="checkbox" value="' + e + '"> ' + e + "</label>";
}).join("");

/* Ao marcar uma especialidade, some o aviso de "escolha pelo menos uma". */
document.getElementById("especialidades").addEventListener("change", function () {
  document.getElementById("erro-especialidade").hidden = true;
});

document.getElementById("form-cadastro").addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede o navegador de recarregar a página

  const marcadas = document.querySelectorAll("#especialidades input:checked").length;
  document.getElementById("erro-especialidade").hidden = marcadas > 0;
  if (marcadas === 0) return;

  entrarNaConta("pedreiro");
  window.location.href = "painel-pedreiro.html?novo=1";
});
