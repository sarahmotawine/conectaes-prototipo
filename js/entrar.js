/* Tela de entrar.
   Não há login de verdade: ao enviar o formulário, o app guarda o sinal
   de "entrou" (ver estado.js) e volta para onde a pessoa estava. */

/* Veio de uma ação que exige login: mostra o aviso e repassa o
   destino para o cadastro, caso a pessoa prefira criar conta. */
if (parametro("voltar")) {
  document.getElementById("aviso-login").hidden = false;
  document.getElementById("link-cadastro").href =
    "cadastro.html?voltar=" + encodeURIComponent(parametro("voltar"));
}

/* Área do pedreiro: entra como o Carlos Pereira (PEDREIRO_DEMO_ID). */
document.getElementById("sou-pedreiro").addEventListener("click", function () {
  entrarNaConta("pedreiro");
  window.location.href = "painel-pedreiro.html";
});

document.getElementById("form-entrar").addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede o navegador de recarregar a página
  entrarNaConta();
  window.location.href = destinoDepoisDoLogin();
});
