/* Tela de entrar, do cliente ou do pedreiro (entrar.html?tipo=pedreiro).
   Não há login de verdade: ao enviar o formulário, o app guarda quem
   entrou (ver estado.js) e segue para a tela certa. */

const modoPedreiro = parametro("tipo") === "pedreiro";

/* No modo pedreiro, troca os textos. No protótipo, o pedreiro que
   entra é sempre o Carlos Pereira (PEDREIRO_DEMO_ID). */
if (modoPedreiro) {
  document.title = "Entrar como pedreiro · ConectaES";
  document.getElementById("slogan").textContent = "Receba pedidos, envie orçamentos e acompanhe seus serviços.";
  document.getElementById("titulo-entrar").textContent = "Entrar como pedreiro";
  document.getElementById("link-cadastro").href = "cadastro-pedreiro.html";
  document.getElementById("troca-texto").textContent = "Procura um pedreiro?";
  document.getElementById("troca-link").textContent = "Entrar como cliente";
  document.getElementById("troca-link").href = "entrar.html";
}

/* Veio de uma ação que exige login: mostra o aviso e repassa o
   destino para o cadastro, caso a pessoa prefira criar conta. */
if (parametro("voltar")) {
  document.getElementById("aviso-login").hidden = false;
  document.getElementById("link-cadastro").href =
    "cadastro.html?voltar=" + encodeURIComponent(parametro("voltar"));
}

document.getElementById("form-entrar").addEventListener("submit", function (evento) {
  evento.preventDefault(); // impede o navegador de recarregar a página
  if (modoPedreiro) {
    entrarNaConta("pedreiro");
    window.location.href = "painel-pedreiro.html";
  } else {
    entrarNaConta("cliente");
    window.location.href = destinoDepoisDoLogin();
  }
});
