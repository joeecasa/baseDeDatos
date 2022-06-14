const db = require("../database/models/index")
const { Op } =  require("sequelize");
const { validationResult } = require("express-validator");




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
            let fechaCorta = movie.release_date.getFullYear() + "-" + (movie.release_date.getMonth() + 1 ) + "-" + movie.release_date.getDate()
            console.log(fechaCorta)
            res.render("moviesDetail",{movie:movie,fechaCorta:fechaCorta})

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
        console.log(req.body.release_date)
        const errors = validationResult(req)
        if(errors.errors.length > 0){
            return(res.render("moviesAdd",{
                errors : errors.mapped(),
                old : req.body
            }))
        }
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

    }).catch(function(err){
        console.log(err)
    })

    },
    edit:(req,res) =>{
db.Movie.findByPk(req.params.id)
.then(Movie=>{
    let dia = Movie.release_date.getDate()
    let mes = (Movie.release_date.getMonth() + 1 )
    let año = Movie.release_date.getFullYear()
    
    if(Movie.release_date.getDate() < 10 ){
    dia = "0" + dia
    }
    if(Movie.release_date.getMonth() < 10 ){
        mes = "0" + mes
        }
     let fechaCorta = año + "-" + mes + "-" + dia
    
    res.render("moviesEdit",{Movie:Movie,fechaCorta:fechaCorta})

})

    },
    update : (req,res) =>{
       console.log(req.body.release_date) 
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
            .then(() =>{
                res.redirect("/movies")
        
            }).catch(function(err){
                console.log(err)
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
                        }).catch(function(err){
                            console.log(err)
                        })
                    }




}
module.exports = moviesController