const db = require("../database/models/index")
const { Op } =  require("sequelize");




const actorsController = {
    list: (req, res) => {
        db.Actor.findAll(
            {
                order : [
                    ["first_name","ASC"]
                ]
            }
        )
            .then(function (actors) {
                res.render("actorsList",{actors : actors})
            })
            .catch(function(err){
                console.log(err)
            })
    },
    detail: (req, res) =>{
        db.Actor.findByPk(req.params.id)
        .then(function(actor){
            res.render("actorsDetail",{actor:actor})

        })
    }
    // new : (req, res) =>{
    //     db.Movie.findAll({
    //         order : [
    //             ["release_date","DESC"]
    //         ]
    //     })
    //     .then(function (movies) {
    //         res.render("newestMovies",{movies : movies})
    //     })
    //     .catch(function(err){
    //         console.log(err)
    //     })
    // },
    // recomended : (req, res) =>{
    //     db.Movie.findAll({
    //         order : [
    //             ["rating","DESC"]
    //         ]
    //     })
    //     .then(function (movies) {
    //         res.render("recommendedMovies",{movies : movies})
    //     })
    //     .catch(function(err){
    //         console.log(err)
    //     })
    // }


}
module.exports = actorsController