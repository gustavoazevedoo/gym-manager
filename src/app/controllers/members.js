const Member = require("../models/Member")
const { date } = require("../../lib/utils")

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = 2
    let offset = limit * (page - 1) // A partir de qual posição do array ele mostra

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(members) {
        // Para agrupar os dados que eu vou enviar
        const pagination = {
          page,
          total: Math.ceil(members[0].total / limit) // total (de paginação) é a quantidade total de instrutores dividido por quantos instrutores aparecem por pagina. Arredondado pra cima, para no caso de 3 instrutores, mostrando dois por pagina, tem que ter duas paginas
        }

        return res.render("members/index", { members, filter, pagination })
      }
    }

    Member.paginate(params)
  },
  create(req,res) {
    Member.instructorsSelectOptions((options) => {
      return res.render("members/create", { instructorOptions: options })
    })
  },
  post(req,res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }
  
    Member.create(req.body, (member) => {
      return res.redirect(`/members/${member.id}`)
    })
  },
  show(req,res) {
    Member.find(req.params.id, (member) => {
      member.birth = date(member.birth).birthDay

      return res.render("members/show", { member })
    })
  },
  edit(req,res) {
    Member.find(req.params.id, (member) => {
      member.birth = date(member.birth).iso

      Member.instructorsSelectOptions((options) => {
        return res.render("members/edit", { member, instructorOptions: options })
      })
      
    })
  },
  put(req,res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }

    Member.update(req.body, () => {
      return res.redirect(`/members/${req.body.id}`)
    })
  },
  delete(req,res) {
    Member.delete(req.body.id, () => {
      return res.redirect(`/members`)
    })
  },
}