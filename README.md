# Super Patriotas

Jogo de plataforma para navegador, em português, com Patriota 1 e Patriota 2. Os rostos são das imagens fornecidas. Lula e as bandeiras do PT são obstáculos fictícios; Bolsonaro recebe o jogador com uma bandeira do Brasil na chegada.

## Jogar

Abra `index.html` no navegador. O jogo funciona sem instalação, servidor, dependências ou conexão com a internet depois de baixar os arquivos. Mantenha a pasta `assets` junto dos arquivos HTML, CSS e JavaScript.

- Andar: setas esquerda/direita ou A/D.
- Pular: espaço, seta para cima ou W. Solte e pressione novamente no ar para o salto duplo.
- Pausar: P, Esc ou o botão na barra superior.
- Celular: botões de direção e PULAR abaixo da tela.
- Há três vidas, estrelas para coletar, cinco joias e dois pontos de retorno. Uma joia aumenta o personagem em 50%. Grande, o primeiro contato com Lula ou PT faz encolher sem perder vida e concede dois segundos de proteção. Pequeno, esse contato perde uma vida. Cair em um buraco sempre perde uma vida, mesmo grande. Depois de perder uma vida, as joias a partir do ponto de retorno reaparecem. Joias extras não acumulam tamanhos nem proteções. Pular sobre a cabeça do Lula supera o obstáculo. As bandeiras devem ser evitadas.
- O som é opcional e começa desligado. O melhor tempo de uma vitória é guardado apenas no navegador.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Extraia o ZIP e envie **o conteúdo da pasta `super-patriotas`** à raiz do repositório: `index.html`, `style.css`, `game.js`, `world.js`, `assets` e este README. Não envie só o ZIP.
3. Em **Settings → Pages**, selecione **Deploy from a branch**, branch **main**, pasta **/ (root)**, e salve.
4. Quando o GitHub terminar a publicação, abra o endereço mostrado em Pages.

Os caminhos são relativos e funcionam também em `usuario.github.io/nome-do-repositorio/`. Não há build, backend, cadastro, rastreamento ou coleta de dados. As imagens estão incluídas no projeto e não dependem de sites externos.

## Arquivos

- `index.html`: tela inicial, HUD e controles.
- `style.css`: apresentação responsiva.
- `world.js`: fase, física, colisões, vidas e vitória.
- `game.js`: desenho em Canvas, recortes dos rostos, teclado, toque e áudio sintetizado.
- `assets/`: fotos e bandeira fornecidas para o jogo.

Os rostos são recortados diretamente no Canvas; as imagens originais permanecem intactas. O cenário e o código são originais. Esta é uma sátira política fictícia; não representa falas ou endossos reais dos retratados. Não utiliza personagens, sprites, músicas ou logotipos de Mario/Nintendo.

## Verificação

Sintaxe JavaScript e simulação da lógica de salto, colisão, estrelas, vidas, retorno, derrota e conclusão verificadas em Node. A revisão visual e a jogabilidade em navegadores/dispositivos reais ainda devem ser feitas após abrir o jogo.
