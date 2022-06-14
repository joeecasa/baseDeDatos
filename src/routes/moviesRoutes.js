const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const { body } = require("express-validator")


const validacion = [
    body("title","Debe introducir un titulo mayor a 3 caracteres").isLength({min:3}),
    body("rating", "Debe introducir un ranking del 1 al 10").isInt({min:1 , max : 10}),
    body("awards", "Debe introducir una cantidad numerica").isNumeric(),
    body("length", "Debe introducir una cantidad numerica minimo de 15 minutos y maximo de 500").isInt({min : 15 ,  max : 500}),
    body("release_date", "Debe introducir una fecha").isDate()

]

router.get('/movies', moviesController.list);
router.get('/movies/new', moviesController.new);
router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/detail/:id', moviesController.detail);


// //Rutas exigidas para la creación del CRUD
router.get('/movies/add', moviesController.add)
router.post('/movies/create',validacion, moviesController.create);
router.get('/movies/edit/:id', moviesController.edit);
router.put('/movies/update/:id', moviesController.update);
router.get('/movies/delete/:id', moviesController.delete);
router.delete('/movies/delete/:id', moviesController.destroy);


module.exports = router;