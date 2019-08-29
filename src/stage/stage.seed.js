const stageSeed = [
  {
    number: 1,
    name: 'Ambientação',
    description: 'Momento de atrair a atenção do espectador para a história. Apresentar a rotina do protagonista no trabalho.',
    context: ['Onde o protagosnista trabalha?', 'Qual a sua rotina no trabalho?'],
    keyPhrases: ['Era uma vez...', 'Na empresa', 'Ele era assim...', 'Todos os dias...', 'Ele fazia...', 'Gostava de...', 'Sonhava em...'],
    required: false
  },
  {
    number: 2,
    name: 'Desafio',
    description: 'Protagosnista se depara com um desafio ou problema anunciado por alguém.',
    context: ['Quem levou esse este problema ao protagonista?', 'Qual foi o problema ou desafio apresentado a ele?', 'Como ele se sentiu a receber esse desafio?'],
    keyPhrases: ['Até que um dia...', 'Foi quando...', 'De repente...', 'Com isso...'],
    required: false
  },
  {
    number: 3,
    name: 'Dilema',
    description: 'Momento de tensão da história, o protagonista deverá fazer uma escolha a partir do desafio apresentado a ele.',
    context: ['Qual doi a decisão do protagonista?', 'Como ele se sentiu ao fazer a escolha?'],
    keyPhrases: ['Eis que OU isso Ou aquilo...'],
    required: false
  },
  {
    number: 12,
    name: 'Lição Aprendida',
    description: 'O protagonista revela a lição aprendida. Essa será a mensagem pricipal que ficará para a audiência.',
    context: ['Qual foi a lição aprendida pelo protagonista?'],
    keyPhrases: [],
    required: true
  }
]

module.exports = stageSeed
