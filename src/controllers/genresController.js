const db = require("../database/models/index")
const { Op } =  require("sequelize");




const genresController = {
    list: (req, res) => {
        db.Genre.findAll(
            {
                order : [
                    ["name","ASC"]
                ]
            }
        )
            .then(function (genres) {
                res.render("genresList",{genres : genres})
            })
            .catch(function(err){
                console.log(err)
            })
    },
    detail: (req, res) =>{
        db.Genre.findByPk(req.params.id)
        .then(function(genre){
            res.render("genresDetail",{genre:genre})

        })
    }

}
module.exports = genresController