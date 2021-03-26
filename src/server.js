const express = require("express")
const nunjucks = require("nunjucks")
const routes = require("./routes")
const methodOverride = require("method-override")

const server = express()

server.use(express.urlencoded({ extended: true })) //Config. express pro req.body funcionar
server.use(express.static("public")) // express vai ficar observando a pasta public pra servir os arquivos estáticos
server.use(methodOverride("_method")) // Precisa ser antes de criar a rota pra sobrescrever
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.listen(5000, () => {
  console.log("Server is runing!")
})