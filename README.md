# ConectaES — protótipo navegável

Protótipo do Trabalho de Conclusão de Curso *Da indicação ao aplicativo:
uma proposta de plataforma digital para contratação de pedreiros
autônomos*, de Sarah Coelho Mota (Sistemas de Informação, Unisales).

É uma aplicação web progressiva feita só com HTML, CSS e JavaScript, sem
framework e sem etapa de compilação. Cobre o fluxo do **cliente**: buscar
um pedreiro, ver o perfil, pedir orçamento, aceitar, confirmar a
conclusão e avaliar. Tem também uma **área do pedreiro** de demonstração,
para mostrar o outro lado: receber o pedido, enviar o orçamento e marcar
o serviço como concluído.

## O que é de verdade e o que é simulado

Importante para descrever o protótipo no texto do TCC sem afirmar mais do
que ele faz.

| Funciona de verdade | É simulado |
|---|---|
| Navegação entre todas as telas | O login: qualquer e-mail e senha entram |
| Os cadastros conferem se os campos foram preenchidos (e o formato do CPF, no do pedreiro) | Os cadastros não guardam nada: só entram na conta. O do pedreiro entra sempre como o Carlos |
| Busca e filtros por especialidade e cidade | Os pedreiros, que são fictícios |
| O pedido avança de situação a cada ação do cliente e do pedreiro | O orçamento dos pedreiros, menos o Carlos, que chega sozinho 4 segundos depois do pedido |
| A avaliação só libera depois da conclusão confirmada | A conclusão do pedido nº 8, já marcada pelo pedreiro |
| Área do pedreiro: o Carlos Pereira envia orçamento e marca a conclusão | A área do pedreiro entra sempre como o Carlos |
| O contador de serviços confirmados sobe ao confirmar | As fotos das obras: ilustrativas, do Wikimedia Commons (ver `CREDITOS.md`) |
| Instalação na tela inicial e abertura sem internet | — |

**Não há banco de dados.** O andamento dos pedidos fica guardado no
próprio navegador (localStorage). Cada celular tem a sua cópia, e nada é
enviado a lugar nenhum. Por isso, cliente e pedreiro só se "falam" quando
estão no **mesmo navegador**, em abas diferentes (ver abaixo).

## Telas e requisitos

| Tela | Arquivo | Requisito |
|---|---|---|
| Página inicial (vitrine) | `index.html` | RF04 |
| Entrar | `entrar.html` | RF01 (simulado) |
| Cadastro do cliente | `cadastro.html` | RF01 (simulado) |
| Cadastro do pedreiro | `cadastro-pedreiro.html` | RF01 (simulado) |
| Busca | `busca.html` | RF04 |
| Perfil do pedreiro | `perfil.html` | RF03 |
| Pedir orçamento | `orcamento.html` | RF05 |
| Meus pedidos | `pedidos.html` | — |
| Pedido: conversa, orçamento e conclusão | `pedido.html` | RF06 e RF07 |
| Avaliar | `avaliar.html` | RF08 |
| Painel do pedreiro | `painel-pedreiro.html` | — |
| Atender pedido (lado do pedreiro) | `atender.html` | RF06 e RF07 |

O RF02, validação de identidade, não está no protótipo, por ser proposta.

**Login só na hora de agir.** Como em sites de classificados, a página
inicial, a busca e os perfis abrem sem login. Pedir orçamento, ver os
pedidos e avaliar exigem login: o app leva para `entrar.html` e, depois
de entrar ou se cadastrar, volta para a tela onde a pessoa estava
(função `exigirLogin`, em `js/app.js`).

## Demonstração dos dois lados

A área do pedreiro serve para mostrar o ciclo completo na apresentação.
O teste com os participantes continua só com o lado do cliente.

1. Abra o app em **duas abas** (ou duas janelas) do mesmo navegador.
2. Na aba 2, toque em **Entrar → "Entrar como pedreiro"** e entre
   com qualquer e-mail e senha. Ela entra como o Carlos Pereira e mostra
   o painel dele.
3. Na aba 1, como cliente, busque o Carlos (Piso ou Azulejo, Serra) e
   peça um orçamento.
4. Na aba 2, o pedido aparece em "Precisam de resposta". Abra e envie o
   orçamento com valor e prazo.
5. Na aba 1, o orçamento aparece sozinho. Aceite.
6. Na aba 2, toque em **"Marcar como concluído"**.
7. Na aba 1, confirme a conclusão e avalie. No painel do Carlos, o número
   de serviços confirmados sobe.

O login vale só para a aba (sessionStorage), por isso uma aba pode ser
cliente e a outra pedreiro. Os pedidos são os mesmos nas duas, e cada
tela se atualiza sozinha quando a outra muda algo (`aoMudarPedidos`, em
`js/app.js`).

## Arquivos

```
index.html … avaliar.html   uma página por tela
css/estilo.css              todo o visual; as cores ficam no topo
js/dados.js                 os pedreiros fictícios e os pedidos de exemplo
js/estado.js                guarda e lê o andamento dos pedidos
js/app.js                   funções usadas por várias telas
js/<tela>.js                o comportamento de cada tela
manifest.json               nome, ícone e cores para instalar o app
sw.js                       service worker: guarda os arquivos para uso offline
icones/                     ícones do app
fontes/inter.woff2          a fonte do app, guardada para funcionar sem internet
img/obras/                  fotos ilustrativas das obras
CREDITOS.md                 autor e licença de cada foto
```

Cada página carrega, nesta ordem: `dados.js`, `estado.js`, `app.js` e o
arquivo da própria tela.

## Abrir no computador

O service worker não funciona abrindo o arquivo direto com dois cliques.
É preciso um servidor local. Na pasta do projeto:

```bash
python3 -m http.server 8000
```

E abrir `http://localhost:8000` no navegador. `Ctrl+C` no terminal para
parar.

## Publicar

O protótipo é publicado pelo GitHub Pages. Depois de alterar algo:

1. **Aumente a `VERSAO` no topo do `sw.js`** (de `conectaes-v1` para
   `conectaes-v2`, e assim por diante). Sem isso, quem já abriu o app
   continua vendo a versão antiga, guardada no cache.
2. `git add -A`, `git commit -m "..."` e `git push`.
3. A versão nova aparece em um ou dois minutos.

## No dia do teste

- **Antes de cada participante, toque em "Reiniciar demonstração"**, no pé
  da página inicial. Isso apaga os pedidos do participante anterior e
  sai da conta.
- As tarefas pensadas para o teste:
  1. Encontre um pedreiro que faça azulejo em Vila Velha.
  2. Descubra quantos serviços confirmados ele tem.
  3. Peça um orçamento para assentar azulejo no banheiro. (Aqui o app
     pede login; qualquer e-mail e senha servem.)
  4. Aceite o orçamento que ele mandar.
  5. Confirme e avalie o serviço de reboco do muro, que já foi concluído.

## Para aprender mexendo

Pequenas alterações para conhecer a estrutura. Teste cada uma com o
servidor local antes de publicar.

1. **Mude uma cor.** No topo do `css/estilo.css`, troque o valor de
   `--laranja` e veja todos os botões mudarem juntos.
2. **Mude um texto.** No `index.html`, altere o título "Precisa de um
   pedreiro?".
3. **Crie um pedreiro.** No `js/dados.js`, copie o bloco de um pedreiro,
   cole no fim da lista e troque o `id` e os dados. Ele aparece na busca
   sem mexer em mais nada.
4. **Dê um ícone a uma categoria.** No começo do `js/inicio.js`, troque
   o emoji de uma especialidade em `ICONES`.
5. **Mude o tempo do orçamento simulado.** No começo do `js/pedido.js`,
   altere `SEGUNDOS_PARA_ORCAMENTO`.
