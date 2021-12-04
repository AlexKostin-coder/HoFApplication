export const validPassword = (password: string = '') => {

  if (!password) {
    return {
      status: false,
      errorText: 'Пароль не може бути порожнім!',
    }
  }

  if (password.length < 8) {
    return {
      status: false,
      errorText: 'Пароль має містити не менше 8 символів!',
    }
  }

  return {
    status: true,
    errorText: '',
  }
}

export const validEmail = (email: string = '') => {

  const reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const checkValidEmail = reEmail.test(email);

  if(!email) {
    return {
      status: false,
      errorText: 'E-mail не може бути порожнім!',
    }
  }

  if(!checkValidEmail) {
    return {
      status: false,
      errorText: 'Не коректний e-mail!',
    }
  }

  return {
    status: true,
    errorText: '',
  }
}