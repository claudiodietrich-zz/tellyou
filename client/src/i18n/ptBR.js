export default {
  error: {
    field: {
      is: {
        invalid: 'ops, este {field} não é válido | ops, está {field} não é válida',
        required: 'ops, você precisa preencher este campo!',
        not: {
        }
      }
    }
  },
  view: {
    singin: {
      hero: {
        title: 'Que bom que está aqui!',
        subTitle: 'Nos conte sobre você, queremos te conhecer...'
      },
      form: {
        name: 'nos diga seu nome',
        email: 'qual o seu e-mail?',
        password: 'agora, crie uma senha super secreta'
      }
    }
  },
  user: {
    email: 'e-mail',
    name: 'nome',
    password: 'senha',
    error: {
      password: {
        minLength: 'ops, sua senha precisa ter no mínimo {minLength} caracteres'
      }
    }
  }
}
