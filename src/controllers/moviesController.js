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
    },
    add : (req,res) =>{
        res.render("moviesAdd")
    },
    create : (req,res) =>{
db.Movie.create(
    {
        title : req.body.title,
        rating : req.body.rating,
        awards : req.body.awards,
        release_date : req.body.release_date,
        length : req.body.length

    })
    .then(movie =>{
        res.redirect("/movies")

    })

    },
    edit:(req,res) =>{
db.Movie.findByPk(req.params.id)
.then(Movie=>{
    res.render("moviesEdit",{Movie:Movie})

})

    },
    update : (req,res) =>{
        db.Movie.update(
            {
                title : req.body.title,
                rating : req.body.rating,
                awards : req.body.awards,
                release_date : req.body.release_date,
                length : req.body.length
        
            },
            {
                where : {
                    id : req.params.id
                }
            })
            .then(movie =>{
                res.redirect("/movies")
        
            })
        
            },
            delete : (req,res) =>{
                db.Movie.findByPk(req.params.id)
                .then(Movie=>{
                    res.render("moviesDelete",{Movie:Movie})
                
                })
                
                    },
                    destroy : (req,res) => {
                        db.Movie.destroy({
                            where : {
                                id : req.params.id
                            }
                        })
                        .then(() => {
                            res.redirect("/movies")
                        })
                    }




}
module.exports = moviesController