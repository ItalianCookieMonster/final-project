export default class Validations {
  static checkEmail(email) {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    } else {
      return false
    }
  }

  static minLength(name, min) {
    if (name.length < min) {
      return false
    } else {
      return true
    }
  }

  static checkPassword(password) {
    if (/^[a-zA-Z0-9_]{0,9}$/.test(password)) {
      return true
    } else {
      return false
    }
  }
}
