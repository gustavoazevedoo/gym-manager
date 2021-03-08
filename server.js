const express = require("express")
const nunjucks = require("nunjucks")
const routes = require("./routes")

const server = express()

server.use(express.urlencoded({ extended: true })) //Config. express pro req.body funcionar
server.use(express.static("public")) // express vai ficar observando a pasta public pra servir os arquivos estáticos
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.listen(3000, () => {
  console.log("Server is runing!")
})