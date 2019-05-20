const archetypesSeed = [
  {
    name: 'Herói',
    description: 'Protagonista, personagem central da história. É aquele que se sacrifica por um bem coletivo. É com ele que o espectador se idenfitica. Ex:  Luke Skywalker (Start Wars)',
    required: true,
    character: ''
  },
  {
    name: 'Mentor',
    description: 'Aquele que ajuda o herói a alcançar seu objetivo. Geralmente, é uma pessoa mais experiente, que orienta o herói em sua jornada. Ex: Obi-Wan (Start Wars)',
    required: false,
    character: ''
  },
  {
    name: 'Guardião do Limiar',
    description: 'Personagem ou situações que impedem a entrada do herói na jornada. Ex: Guarda-costas que protege o vilão e não deixa o herói se aproximar',
    require: false,
    character: ''
  },
  {
    name: 'Arauto',
    description: 'Personagem que anuncia o desafio para o herói. Ex: Obi-Wan pede a Luke para se unir à missão (Star Wars)',
    require: false,
    character: ''
  },
  {
    name: 'Camaleão',
    description: 'Personagem com personalidade duvidosa, nunca se sabe de qual lado ele está. Ex: O aliado que revela ser inimigo no final da história, ou o inimigo que salva o herói',
    require: false,
    character: ''
  },
  {
    name: 'Sombra',
    description: 'Vilão da história que deseja a destruição do herói. O herói também pode manifestar o lado sombra. Quando está cheio de dúvidas ou culpa, ele age de forma autodestrutiva, expessa desejo de morte. Ex Capitão Gancho (Peter Pan), Malévola (A Bela Adormecida)',
    require: false,
    character: ''
  },
  {
    name: 'Aliado',
    description: 'Parceiro, companheiro, comparsa. Ex: Robin, o parceido do Batman',
    require: false,
    character: ''
  },
  {
    name: 'Pícaro',
    description: 'Personagem cômico, para equilibrar a seriedade da história. Ex: Pernalonga, Pica-Pau',
    require: false,
    character: ''
  }
]

module.exports = {
  archetypesSeed
}
