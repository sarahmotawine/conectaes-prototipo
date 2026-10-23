/* Tela de pedido de orçamento. O pedreiro vem do endereço: orcamento.html?id=1 */

exigirLogin(); // esta tela só abre com login (ver app.js)

const pedreiro = pedreiroPorId(parametro("id"));

if (pedreiro) {
  document.getElementById("voltar").href = "perfil.html?id=" + pedreiro.id;
  document.getElementById("para-quem").innerHTML =
    '<div class="avatar">' + pedreiro.iniciais + "</div>" +
    '<div><p class="nome">' + pedreiro.nome + "</p>" +
    '<p class="suave">' + pedreiro.especialidades.join(" · ") + "</p></div>";
}

/* "Para quando?": a pessoa digita ou toca numa sugestão, que preenche o
   campo e fica destacada. Digitar outra coisa tira o destaque. */
const campoQuando = document.getElementById("quando");
const sugestoes = document.getElementById("sugestoes-quando");

function marcarSugestao() {
  sugestoes.querySelectorAll(".chip").forEach(function (chip) {
    chip.classList.toggle("ativo", chip.textContent === campoQuando.value.trim());
  });
}
sugestoes.addEventListener("click", function (evento) {
  const chip = evento.target.closest(".chip");
  if (!chip) return;
  campoQuando.value = chip.textContent;
  marcarSugestao();
});
campoQuando.addEventListener("input", marcarSugestao);

document.getElementById("form-orcamento").addEventListener("submit", function (evento) {
  evento.preventDefault();

  const novo = criarPedido(
    pedreiro.id,
    document.getElementById("servico").value.trim(),
    document.getElementById("bairro").value.trim(),
    campoQuando.value.trim() || "Sem data definida"
  );

  /* Vai direto para o pedido recém-criado. */
  avisarNaProximaTela("Pedido de orçamento enviado");
  window.location.href = "pedido.html?id=" + novo.id;
});

montarNavegacao("buscar");
