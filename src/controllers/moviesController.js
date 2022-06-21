const db = require("../database/models/index")
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
const { promiseImpl } = require("ejs");




const moviesController = {
    list: (req, res) => {
        db.Movie.findAll({
            include : [{association: "genero"},{association : "actores"}]
        },
            {
                order: [
                    ["title", "ASC"]
                ]
            }
        )
            .then(function (movies) {
                res.render("moviesList", { movies: movies })
            })
            .catch(function (err) {
                console.log(err)
            })
    },
    detail: (req, res) => {

        db.Movie.findByPk(req.params.id,{
            include : [{association: "genero"},{association : "actores"}]
        })
            .then(function (movie) {
                let fechaCorta = movie.release_date.getFullYear() + "-" + (movie.release_date.getMonth() + 1) + "-" + movie.release_date.getDate()
                console.log(fechaCorta)
                res.render("moviesDetail", { movie: movie, fechaCorta: fechaCorta })

            })
    },
    new: (req, res) => {
        db.Movie.findAll({
            order: [
                ["release_date", "DESC"]
            ]
        })
            .then(function (movies) {
                res.render("newestMovies", { movies: movies })
            })
            .catch(function (err) {
                console.log(err)
            })
    },
    recomended: (req, res) => {
        db.Movie.findAll({
            order: [
                ["rating", "DESC"]
            ]
        })
            .then(function (movies) {
                res.render("recommendedMovies", { movies: movies })
            })
            .catch(function (err) {
                console.log(err)
            })
    },
    add: (req, res) => {
        db.Genre.findAll()
            .then(function (generos) {

                res.render("moviesAdd", { generos: generos })
            })
    },
    create: (req, res) => {
        const errors = validationResult(req)
   
        db.Genre.findAll()
        .then(function (generos) {

            if (errors.errors.length > 0) {
                return (res.render("moviesAdd", {
                    errors: errors.mapped(),
                    old: req.body,
                    generos : generos
                }))
            }
        })
        console.log(req.body)
        db.Movie.create(

            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id : req.body.genre
                
                

            }
            )
            .then(() => {

                res.redirect("/movies")

            }).catch(function (err) {
                console.log(err)
            })

    },
    edit: (req, res) => {
        let pedidoPelicula = db.Movie.findByPk(req.params.id)

        let pedidoGeneros = db.Genre.findAll()

        Promise.all([pedidoPelicula,pedidoGeneros])
            .then(function([Movie,Genre]) {
                let dia = Movie.release_date.getDate()
                let mes = (Movie.release_date.getMonth() + 1)
                let año = Movie.release_date.getFullYear()

                if (Movie.release_date.getDate() < 10) {
                    dia = "0" + dia
                }
                if (Movie.release_date.getMonth() < 10) {
                    mes = "0" + mes
                }
                let fechaCorta = año + "-" + mes + "-" + dia

                res.render("moviesEdit", { Movie: Movie, Genre:Genre, fechaCorta: 20/04/1993 })
                
            })

    },
    update: (req, res) => {
        
        db.Movie.update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id : req.body.genre

            },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect("/movies/detail/" + req.params.id)

            }).catch(function (err) {
                console.log(err)
            })

    },
    delete: (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(Movie => {
                res.render("moviesDelete", { Movie: Movie })

            })

    },
    destroy: (req, res) => {
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                res.redirect("/movies")
            }).catch(function (err) {
                console.log(err)
            })
    }



}
module.exports = moviesController