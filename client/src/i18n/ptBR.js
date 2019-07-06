export default {
  default: {
    error: {
      field: {
        is: {
          invalid: {
            female: 'ops, esta {field} não é válida | ops, estas {field} não são válidas',
            male: 'ops, este {field} não é válido | ops, estes {field} não são válidos'
          },
          required: 'ops, você precisa preencher este campo!'
        }
      },
      message: 'ops, ocorreu um erro inesperado',
      validation: 'ops, verifique as informações que você inseriu'
    },
    label: {
      add: 'adicionar {arg}',
      all: {
        female: 'todas as {arg}',
        male: 'todos os {arg}'
      },
      backward: 'voltar',
      create: 'criar {arg}',
      delete: 'excluir',
      edit: 'editar',
      exit: 'sair',
      forward: 'avançar',
      list: 'listar {arg}',
      my: {
        female: 'minha {arg} | minhas {arg}',
        male: 'meu {arg} | meus {arg}'
      },
      new: {
        female: 'nova {arg}',
        male: 'novo {arg}'
      },
      pageNotFound: 'oops... esta página não foi encontrada',
      register: 'cadastrar',
      singIn: 'entrar',
      singUp: 'cadastrar-se',
      view: 'visualizar'
    }
  },
  story: {
    archetype: 'arquétipo',
    character: 'personagem',
    label: 'história | histórias',
    objective: 'objetivo',
    revisor: 'revisor',
    stages: 'estágios',
    status: {
      created: 'em desenvolvimento',
      inReview: 'em revisão',
      revised: 'revisada',
      finished: 'finalizada'
    },
    storyteller: 'contador'
  },
  stage: {
    contex: 'contexto',
    description: 'descrição',
    event: 'evento | eventos',
    keyPhrase: 'palaras-chave',
    label: 'estágio',
    number: 'nº'
  },
  user: {
    email: 'e-mail',
    name: 'nome',
    password: 'senha',
    error: {
      email: {
        isUnique: 'ops, parece que esse e-mail já foi cadastrado'
      },
      password: {
        minLength: 'ops, sua senha precisa ter no mínimo {minLength} caracteres'
      }
    }
  },
  view: {
    home: {
      button: {
        letsStart: 'vamos começar?'
      },
      description: {
        betterResults: {
          title: 'Melhores resultados em sua organização!',
          text: 'Através do compartilhamento de ideias e lições aprendidas, é possível estabelecer pontos de melhorias em processos de trabalho e buscar métodos que otimizem e aumentem a produtividade em sua organização.'
        },
        inviteOthers: {
          title: 'Convide outras pessoas para colaborarem!',
          text: 'Convide seus colegas para participarem da construção da sua narrativa.'
        },
        shareKnowledge: {
          title: 'Compartilhe conhecimento!',
          text: 'Conte para seus colegas, de forma criativa, sobre os projetos e outras atividades em grupo, das quais você tenha participado em sua organização.'
        },
        tellStory: {
          title: 'Conte-nos uma história!',
          text: 'Através de um método dinâmico e colaborativo, você pode criar uma história, com seus personagens, que conte sobre experiências vivenciadas, pontos positivos e negativos e outros aspectos importantes.'
        }
      },
      hero: {
        title: 'Esta é uma nova forma de compartilhar experiências!',
        subTitle: 'TellYou é uma ferramenta que permite o compartilhamento de lições aprendidas, sobre atividades em grupo, de forma dinâmica e colaborativa.'
      }
    },
    pageNotFound: {
      button: {
        go: {
          home: 'ir para a página inicial',
          storyList: 'ir para a lista de histórias'
        }
      }
    },
    singIn: {
      hero: {
        title: 'que bom que está de volta!'
      },
      form: {
        label: {
          email: 'use seu e-mail para entrar',
          password: 'e a sua senha super secreta'
        }
      },
      button: {
        singIn: 'entrar'
      }
    },
    singUp: {
      hero: {
        title: 'que bom que está aqui!',
        subTitle: 'conte pra gente sobre você, queremos te conhecer...'
      },
      form: {
        label: {
          name: 'diga o seu nome',
          email: 'qual o seu e-mail?',
          password: 'agora, crie uma senha super secreta'
        },
        button: {
          singUp: 'pronto! envie minhas informações'
        }
      }
    },
    story: {
      create: {
        form: {
          label: {
            leader: 'o líder irá conduzir o desenvolvimento da narrativa, organizar a história e estimular a participação do grupo.',
            objective: 'qual o objetivo da história?',
            revisors: 'os revisores irão editar a história, formatando e aprimorando o texto, até a sua finalização.',
            storytellers: 'os contadores irão narrar cada evento que irá compor a história.',
            title: 'qual o título da história?',
            keywords: 'palavras-chaves ajudam outras pessoas a encontrarem sua história'
          },
          message: {
            keywords: 'a cada palavra-chave digitada, pressione enter',
            revisors: 'a cada nome digitado, pressione enter',
            storytellers: 'a cada nome digitado, pressione enter'
          },
          title: {
            archetypes: 'quais arquétipos serão utilizados?',
            author: 'quem serão os autores dessa narrativa?',
            stage: 'quais estágios serão utilizados?',
            story: 'vamos precisar de algumas insformações...'
          },
          description: {
            archetypes: 'arquétipo é um padrão de personalidade de cada personagem. Deve estar relacionado à sua função/papel dentro da história, visando determinado resultado ou efeito. <br> <small class="has-text-grey">*arquétipos obrigatórios já vêm selecionados</small>',
            stage: 'escolha os estágios que melhor se adaptem ao contexto e ao propósito da história, lembrando que, manter jornadas emocionantes, ajuda a prender a atenção do público. Reordene os estágios conforme a necessidade.'
          }
        }
      },
      list: {
        empty: {
          user: {
            stories: 'oops... parece que você ainda não tem nenhuma história!'
          },
          stories: 'oops... parace que ainda não temos nenhuma história cadastrada'
        }
      }
    }
  }
}
