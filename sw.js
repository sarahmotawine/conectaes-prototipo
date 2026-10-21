/* =========================================================
   Service worker: roda em segundo plano no navegador.

   Na primeira visita, guarda uma cópia de todos os arquivos do
   app (o "cache"). Nas visitas seguintes, entrega os arquivos
   dessa cópia, por isso o app abre mesmo sem internet.

   IMPORTANTE: ao alterar qualquer arquivo e publicar de novo,
   aumente a VERSAO abaixo (v1 para v2, e assim por diante).
   Sem isso, quem já abriu o app continua vendo a versão antiga.
   ========================================================= */

const VERSAO = "conectaes-v7";

const ARQUIVOS = [
  "./",
  "index.html",
  "entrar.html",
  "cadastro.html",
  "busca.html",
  "perfil.html",
  "orcamento.html",
  "pedidos.html",
  "pedido.html",
  "avaliar.html",
  "css/estilo.css",
  "js/dados.js",
  "js/estado.js",
  "js/app.js",
  "js/inicio.js",
  "js/entrar.js",
  "js/cadastro.js",
  "js/busca.js",
  "js/perfil.js",
  "js/orcamento.js",
  "js/pedidos.js",
  "js/pedido.js",
  "js/avaliar.js",
  "manifest.json",
  "icones/icone-192.png",
  "icones/icone-512.png",
  "img/obras/acabamento-quarto.jpg",
  "img/obras/ampliacao-quarto.jpg",
  "img/obras/bancada-cozinha.jpg",
  "img/obras/backsplash.jpg",
  "img/obras/banheiro-azulejo.jpg",
  "img/obras/banheiro-social.jpg",
  "img/obras/banheiro.jpg",
  "img/obras/calha.jpg",
  "img/obras/cozinha.jpg",
  "img/obras/escada.jpg",
  "img/obras/forro.jpg",
  "img/obras/laje.jpg",
  "img/obras/lavabo.jpg",
  "img/obras/casa-terrea.jpg",
  "img/obras/parede-drywall.jpg",
  "img/obras/piso-cozinha.jpg",
  "img/obras/porcelanato-sala.jpg",
  "img/obras/reboco-fachada.jpg",
  "img/obras/reboco-muro.jpg",
  "img/obras/reforma-cozinha.jpg",
  "img/obras/rodape.jpg",
  "img/obras/telhado-novo.jpg",
  "img/obras/troca-telhas.jpg",
  "img/obras/varanda.jpg"
];

/* Instalação: guarda todos os arquivos no cache. */
self.addEventListener("install", function (evento) {
  evento.waitUntil(
    caches.open(VERSAO).then(function (cache) { return cache.addAll(ARQUIVOS); })
  );
  self.skipWaiting();
});

/* Ativação: apaga caches de versões antigas. */
self.addEventListener("activate", function (evento) {
  evento.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(
        nomes.filter(function (nome) { return nome !== VERSAO; })
             .map(function (nome) { return caches.delete(nome); })
      );
    })
  );
  self.clients.claim();
});

/* Cada pedido de arquivo: tenta o cache primeiro, depois a internet.
   "ignoreSearch" faz perfil.html?id=3 usar a cópia de perfil.html. */
self.addEventListener("fetch", function (evento) {
  evento.respondWith(
    caches.match(evento.request, { ignoreSearch: true }).then(function (resposta) {
      return resposta || fetch(evento.request);
    })
  );
});
