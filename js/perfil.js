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
  const obras = pedreiro.obras.map(function (obra) {
    return '<figure class="obra">' +
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

  /* Pedreiro vendo o próprio perfil: não faz sentido pedir orçamento. */
  if (souPedreiro()) document.getElementById("pedir").style.display = "none";
}

montarNavegacao("buscar");
