const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", (event) => {
  const confirmation = confirm("Deseja deletar?")
  if (!confirmation) {
    event.preventDefault()
  }
})