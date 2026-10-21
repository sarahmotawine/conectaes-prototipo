/* Tela de perfil do pedreiro. O pedreiro vem do endereço: perfil.html?id=1 */

const pedreiro = pedreiroPorId(parametro("id"));
const area = document.getElementById("perfil");

if (!pedreiro) {
  area.innerHTML = '<p class="vazio">Pedreiro não encontrado.</p>';
  document.getElementById("pedir").style.display = "none";
} else {
  const est = estatisticas(pedreiro);
  document.title = pedreiro.nome + " · ConectaES";

  const etiquetas = pedreiro.especialidades.map(function (e) {
    return '<span class="etiqueta">' + e + "</span>";
  }).join("");

  /* Fotos das obras, com a legenda por cima. As fotos são ilustrativas,
     tiradas do Wikimedia Commons; os créditos estão em CREDITOS.md. */
  const obras = pedreiro.obras.map(function (obra, i) {
    return '<figure class="obra" data-indice="' + i + '" role="button" tabindex="0" aria-label="Ampliar foto: ' + obra.titulo + '">' +
             '<img src="img/obras/' + obra.foto + '.jpg" alt="' + obra.titulo + '" loading="lazy">' +
             "<figcaption>" + obra.titulo + "</figcaption>" +
           "</figure>";
  }).join("");

  const comentarios = pedreiro.comentarios.map(function (c) {
    return '<div class="cartao">' +
             '<p class="nota">' + estrelas(c.nota) + "</p>" +
             '<p style="margin:4px 0">' + c.texto + "</p>" +
             '<p class="suave">' + c.autor + "</p>" +
           "</div>";
  }).join("");

  area.innerHTML =
    /* Capa com a foto de uma obra; a bolinha do pedreiro fica por cima. */
    '<div class="perfil-capa" style="background-image:url(img/obras/' + pedreiro.obras[0].foto + '.jpg)"></div>' +
    '<div class="perfil-topo">' +
      '<div class="avatar grande">' + pedreiro.iniciais + "</div>" +
      "<h2>" + pedreiro.nome + "</h2>" +
      '<p class="suave">' + pedreiro.cidade + " · " + pedreiro.anos + " anos de profissão</p>" +
      '<div class="etiquetas">' + etiquetas + "</div>" +
    "</div>" +

    /* O número de serviços confirmados é o diferencial da proposta:
       só conta o que foi combinado e confirmado pelas duas partes. */
    '<div class="cartao numeros">' +
      '<div><strong class="nota">★ ' + formatarNota(est.nota) + "</strong>" +
        '<span class="suave">' + est.avaliacoes + " avaliações</span></div>" +
      '<div><strong class="confirmados">' + est.confirmados + "</strong>" +
        '<span class="suave">serviços registrados e confirmados</span></div>' +
    "</div>" +

    "<h3>Sobre</h3>" +
    "<p>" + pedreiro.sobre + "</p>" +

    "<h3>Obras anteriores</h3>" +
    '<div class="obras">' + obras + "</div>" +

    "<h3>Avaliações recentes</h3>" +
    comentarios +

    '<div style="height:90px"></div>'; /* espaço para o botão fixo não cobrir o fim */

  document.getElementById("pedir").href = "orcamento.html?id=" + pedreiro.id;

  ativarAmpliacao(pedreiro.obras);

  /* Pedreiro vendo o próprio perfil: não faz sentido pedir orçamento. */
  if (souPedreiro()) document.getElementById("pedir").style.display = "none";
}

/* Tocar numa foto de obra abre ela grande, em tela cheia, com setas
   para passar para as outras e um X para fechar (ou a tecla Esc). */
function ativarAmpliacao(obras) {
  const tela = document.createElement("div");
  tela.className = "ampliacao";
  tela.hidden = true;
  tela.innerHTML =
    '<button class="ampliacao-fechar" type="button" aria-label="Fechar">' + icone("fechar") + "</button>" +
    '<button class="ampliacao-seta esquerda" type="button" aria-label="Foto anterior">' + icone("anterior") + "</button>" +
    "<figure><img alt=''><figcaption></figcaption></figure>" +
    '<button class="ampliacao-seta direita" type="button" aria-label="Próxima foto">' + icone("proximo") + "</button>";
  document.body.appendChild(tela);

  let atual = 0;
  function mostrarFoto(i) {
    atual = (i + obras.length) % obras.length;
    tela.querySelector("img").src = "img/obras/" + obras[atual].foto + ".jpg";
    tela.querySelector("img").alt = obras[atual].titulo;
    tela.querySelector("figcaption").textContent =
      obras[atual].titulo + " · " + (atual + 1) + " de " + obras.length;
  }
  function abrir(i) { mostrarFoto(i); tela.hidden = false; }
  function fechar() { tela.hidden = true; }

  document.querySelectorAll(".obra").forEach(function (fig) {
    fig.addEventListener("click", function () { abrir(Number(fig.dataset.indice)); });
    fig.addEventListener("keydown", function (e) { if (e.key === "Enter") abrir(Number(fig.dataset.indice)); });
  });
  tela.querySelector(".ampliacao-fechar").addEventListener("click", fechar);
  tela.querySelector(".esquerda").addEventListener("click", function () { mostrarFoto(atual - 1); });
  tela.querySelector(".direita").addEventListener("click", function () { mostrarFoto(atual + 1); });
  tela.addEventListener("click", function (e) { if (e.target === tela) fechar(); }); // tocar fora fecha
  document.addEventListener("keydown", function (e) {
    if (tela.hidden) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowLeft") mostrarFoto(atual - 1);
    if (e.key === "ArrowRight") mostrarFoto(atual + 1);
  });
}

montarNavegacao("buscar");
