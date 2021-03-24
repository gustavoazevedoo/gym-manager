module.exports = {
  age(timestamp) {
    const today = new Date();
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
      age = age - 1
    }
    return age
  },
  date(timestamp) {
    const birth = new Date(timestamp)

    const year = birth.getUTCFullYear()
    const month = `0${birth.getUTCMonth() + 1}`.slice(-2)
    const day = `0${birth.getUTCDate()}`.slice(-2)

    return {
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  }
}