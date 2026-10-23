/* Painel do pedreiro: os pedidos que chegaram para ele, separados
   pelo que ele precisa fazer, e os números do perfil.
   Na demonstração, o pedreiro é sempre o Carlos Pereira (PEDREIRO_DEMO_ID). */

exigirPedreiro(); // esta tela só abre para quem entrou como pedreiro

const eu = pedreiroPorId(PEDREIRO_DEMO_ID);
const painel = document.getElementById("painel");

/* Um cartão de pedido, que leva para a tela de atender. */
function cartaoPedido(pedido) {
  const status = descreverStatusPedreiro(pedido.status);
  return '<a class="cartao" href="atender.html?id=' + pedido.id + '">' +
           '<p class="nome">' + escaparHTML(pedido.cliente || "Cliente") +
             (pedido.bairro ? ' <span class="suave">· ' + escaparHTML(pedido.bairro) + "</span>" : "") + "</p>" +
           '<p class="suave" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis">' +
             escaparHTML(pedido.servico) + "</p>" +
           '<span class="status ' + status.classe + '">' + status.texto + "</span>" +
         "</a>";
}

/* Uma seção com título; some se não houver pedidos nela. */
function secao(titulo, pedidos) {
  if (pedidos.length === 0) return "";
  return "<h3>" + titulo + " (" + pedidos.length + ")</h3>" + pedidos.map(cartaoPedido).join("");
}

function mostrar() {
  const meus = carregarPedidos()
    .filter(function (p) { return p.pedreiroId === eu.id; })
    .sort(function (a, b) { return b.id - a.id; });

  const naSituacao = function (lista) {
    return meus.filter(function (p) { return lista.includes(p.status); });
  };
  const est = estatisticas(eu);

  painel.innerHTML =
    /* Acabou de se cadastrar (cadastro-pedreiro.html leva para ?novo=1). */
    (parametro("novo")
      ? '<div class="aviso">Conta criada! Complete o seu perfil com fotos das suas obras ' +
        "para receber mais pedidos.</div>"
      : "") +
    '<div class="cartao linha">' +
      '<div class="avatar">' + eu.iniciais + "</div>" +
      '<div><p class="nome">Olá, ' + eu.nome.split(" ")[0] + "!</p>" +
      '<a class="suave" href="perfil.html?id=' + eu.id + '">Ver meu perfil como o cliente vê →</a></div>' +
    "</div>" +

    '<div class="cartao numeros">' +
      '<div><strong class="nota">★ ' + formatarNota(est.nota) + "</strong>" +
        '<span class="suave">' + est.avaliacoes + " avaliações</span></div>" +
      '<div><strong class="confirmados">' + est.confirmados + "</strong>" +
        '<span class="suave">serviços registrados e confirmados</span></div>' +
    "</div>" +

    secaoObras() +

    (meus.length === 0 ? '<p class="vazio">Nenhum pedido recebido ainda.</p>' : "") +
    secao("Precisam de resposta", naSituacao(["aguardando"])) +
    secao("Em andamento", naSituacao(["orcamento", "aceito", "concluido_pelo_pedreiro"])) +
    secao("Concluídos", naSituacao(["confirmado", "avaliado", "recusado"]));
}

/* ---------- Minhas obras ----------
   O pedreiro adiciona fotos ao portfólio, que aparecem em "Obras
   anteriores" no perfil público. Todas podem ser apagadas (botão ×):
   as adicionadas aqui saem da lista; as de dados.js ficam escondidas. */

const MAX_OBRAS_EXTRAS = 12; // o espaço do navegador é limitado

function secaoObras() {
  const extras = carregarObrasExtras();
  const ocultas = carregarObrasOcultas();
  const fixas = eu.obras.filter(function (o) { return !ocultas.includes(o.foto); });
  const miniatura = function (obra, i, tipo) {
    return '<figure class="minha-obra">' +
             '<img src="' + fotoDaObra(obra) + '" alt="">' +
             "<figcaption>" + escaparHTML(obra.titulo) + "</figcaption>" +
             '<button type="button" class="remover-obra" data-tipo="' + tipo + '" data-ref="' +
               (tipo === "extra" ? i : obra.foto) + '" aria-label="Remover foto: ' +
               escaparHTML(obra.titulo) + '">' + icone("fechar") + "</button>" +
           "</figure>";
  };
  return "<h3>Minhas obras (" + (extras.length + fixas.length) + ")</h3>" +
         '<div class="minhas-obras">' +
           (extras.length < MAX_OBRAS_EXTRAS
             ? '<button type="button" class="adicionar-obra" id="adicionar-obra">' + icone("foto") +
               "<span>Adicionar foto</span></button>"
             : "") +
           extras.map(function (o, i) { return miniatura(o, i, "extra"); }).join("") +
           fixas.map(function (o, i) { return miniatura(o, i, "fixa"); }).join("") +
         "</div>" +
         '<form class="cartao form-obra" id="form-obra" hidden>' +
           '<p class="nome">Nova foto de obra</p>' +
           '<label class="escolher-foto" for="arquivo-obra">' +
             '<img id="previa-obra" alt="" hidden>' +
             '<span id="texto-escolher">' + icone("foto") + "Tirar ou escolher foto</span>" +
           "</label>" +
           '<input id="arquivo-obra" type="file" accept="image/*" hidden>' +
           '<label for="titulo-obra">Título</label>' +
           '<input id="titulo-obra" maxlength="40" placeholder="Ex.: Piso da cozinha em Serra">' +
           '<p class="suave erro" id="erro-obra" hidden></p>' +
           '<div class="botoes-lado">' +
             '<button type="button" class="botao secundario" id="cancelar-obra">Cancelar</button>' +
             '<button type="submit" class="botao">Salvar foto</button>' +
           "</div>" +
         "</form>";
}

/* Reduz a foto para no máximo 1000 pixels de largura e a converte em
   texto (JPEG), para caber no armazenamento do navegador. */
function reduzirFoto(arquivo) {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.onload = function () {
      const escala = Math.min(1, 1000 / img.width);
      const tela = document.createElement("canvas");
      tela.width = Math.round(img.width * escala);
      tela.height = Math.round(img.height * escala);
      tela.getContext("2d").drawImage(img, 0, 0, tela.width, tela.height);
      URL.revokeObjectURL(img.src);
      resolve(tela.toDataURL("image/jpeg", 0.75));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(arquivo);
  });
}

let fotoEscolhida = null;

function mostrarErroObra(texto) {
  const erro = document.getElementById("erro-obra");
  erro.textContent = texto;
  erro.hidden = !texto;
}

/* Um ouvinte para todos os cliques do painel: abrir, cancelar e remover. */
painel.addEventListener("click", function (evento) {
  const alvo = evento.target.closest("button");
  if (!alvo) return;
  const form = document.getElementById("form-obra");

  if (alvo.id === "adicionar-obra") {
    form.hidden = false;
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  if (alvo.id === "cancelar-obra") {
    mostrar();
  }
  if (alvo.classList.contains("remover-obra")) {
    if (!confirm("Remover esta foto do seu perfil?")) return;
    if (alvo.dataset.tipo === "extra") {
      const extras = carregarObrasExtras();
      extras.splice(Number(alvo.dataset.ref), 1);
      salvarObrasExtras(extras);
    } else {
      ocultarObra(alvo.dataset.ref);
    }
    mostrar();
    avisar("Foto removida");
  }
});

/* Escolheu a foto: reduz e mostra a prévia. */
painel.addEventListener("change", function (evento) {
  if (evento.target.id !== "arquivo-obra" || !evento.target.files[0]) return;
  reduzirFoto(evento.target.files[0]).then(function (texto) {
    fotoEscolhida = texto;
    const previa = document.getElementById("previa-obra");
    previa.src = texto;
    previa.hidden = false;
    document.getElementById("texto-escolher").innerHTML = icone("foto") + "Trocar foto";
    mostrarErroObra("");
  }).catch(function () {
    mostrarErroObra("Não foi possível abrir essa imagem. Tente outra foto.");
  });
});

painel.addEventListener("submit", function (evento) {
  if (evento.target.id !== "form-obra") return;
  evento.preventDefault();
  const titulo = document.getElementById("titulo-obra").value.trim();
  if (!fotoEscolhida) return mostrarErroObra("Escolha uma foto.");
  if (!titulo) return mostrarErroObra("Dê um título à foto.");

  const extras = carregarObrasExtras();
  extras.unshift({ titulo: titulo, src: fotoEscolhida });
  if (!salvarObrasExtras(extras)) {
    return mostrarErroObra("Não há mais espaço no navegador. Remova uma foto e tente de novo.");
  }
  fotoEscolhida = null;
  mostrar();
  avisar("Foto adicionada ao seu perfil");
});

mostrar();
montarNavegacao("painel");

/* Pedido novo feito pelo cliente em outra aba aparece na hora. */
aoMudarPedidos(mostrar);
