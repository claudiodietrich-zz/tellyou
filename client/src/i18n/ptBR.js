export default {
  default: {
    error: {
      field: {
        is: {
          invalid: 'ops, este {field} não é válido | ops, está {field} não é válida',
          required: 'ops, você precisa preencher este campo!'
        }
      },
      message: 'ops, ocorreu um erro inesperado',
      validation: 'ops, verifique as informações que você inseriu'
    }
  },
  component: {
    navbar: {
      button: {
        singIn: 'entrar',
        singUp: 'cadastrar-se'
      }
    }
  },
  view: {
    home: {
      button: {
        letsStart: 'Vamos começar?'
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
        subTitle: 'TellYou é uma ferramenta que permite o compartilhamento de lições aprendidas, através de suas atividades em grupo, de forma dinâmica e colaborativa.'
      }
    },
    singIn: {
      hero: {
        title: 'Que bom que está de volta!'
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
        title: 'Que bom que está aqui!',
        subTitle: 'Nos conte sobre você, queremos te conhecer...'
      },
      form: {
        label: {
          name: 'nos diga seu nome',
          email: 'qual o seu e-mail?',
          password: 'agora, crie uma senha super secreta'
        },
        button: {
          singUp: 'pronto, enviar minhas informações'
        }
      }
    }
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
  }
}
