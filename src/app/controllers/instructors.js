const Instructor = require("../models/Instructor")
const { age, date } = require("../../lib/utils")

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
      callback(instructors) {
        // Para agrupar os dados que eu vou enviar
        const pagination = {
          page,
          total: Math.ceil(instructors[0].total / limit) // total (de paginação) é a quantidade total de instrutores dividido por quantos instrutores aparecem por pagina. Arredondado pra cima, para no caso de 3 instrutores, mostrando dois por pagina, tem que ter duas paginas
        }
        
        for (instructor of instructors) {
          instructor.services = instructor.services.split(",")
        }

        return res.render("instructors/index", { instructors, filter, pagination })
      }
    }

    Instructor.paginate(params)
  },
  create(req,res) {
    return res.render("instructors/create")
  },
  post(req,res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }
  
    Instructor.create(req.body, (instructor) => {
      return res.redirect(`/instructors/${instructor.id}`)
    })
  },
  show(req,res) {
    Instructor.find(req.params.id, (instructor) => {
      instructor.age = age(instructor.birth)
      instructor.services = instructor.services.split(",")
      instructor.created_at = date(instructor.created_at).format

      return res.render("instructors/show", { instructor })
    })
  },
  edit(req,res) {
    Instructor.find(req.params.id, (instructor) => {
      instructor.birth = date(instructor.birth).iso
      
      return res.render("instructors/edit", { instructor })
    })
  },
  put(req,res) {
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields")
      }
    }

    Instructor.update(req.body, () => {
      return res.redirect(`/instructors/${req.body.id}`)
    })
  },
  delete(req,res) {
    Instructor.delete(req.body.id, () => {
      return res.redirect(`/instructors`)
    })
  },
}