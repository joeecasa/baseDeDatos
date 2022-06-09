const db = require("../database/models/index")
const { Op } =  require("sequelize");




const moviesController = {
    list: (req, res) => {
        db.Movie.findAll(
            {
                order : [
                    ["title","ASC"]
                ]
            }
        )
            .then(function (movies) {
                res.render("moviesList",{movies : movies})
            })
            .catch(function(err){
                console.log(err)
            })
    },
    detail: (req, res) =>{
        db.Movie.findByPk(req.params.id)
        .then(function(movie){
            res.render("moviesDetail",{movie:movie})

        })
    },
    new : (req, res) =>{
        db.Movie.findAll({
            order : [
                ["release_date","DESC"]
            ]
        })
        .then(function (movies) {
            res.render("newestMovies",{movies : movies})
        })
        .catch(function(err){
            console.log(err)
        })
    },
    recomended : (req, res) =>{
        db.Movie.findAll({
            order : [
                ["rating","DESC"]
            ]
        })
        .then(function (movies) {
            res.render("recommendedMovies",{movies : movies})
        })
        .catch(function(err){
            console.log(err)
        })
    }


}
module.exports = moviesController