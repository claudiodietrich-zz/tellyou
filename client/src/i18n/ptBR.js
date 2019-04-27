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
  view: {
    singin: {
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
          singin: 'pronto, enviar minhas informações'
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
