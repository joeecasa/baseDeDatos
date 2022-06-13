const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');
const methodOverride =  require('method-override'); 
const actorRoutes = require('./routes/actorRoutes');
const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));


//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));// Pasar poder usar los métodos PUT y DELETE
app.use('/', indexRouter);
app.use(actorRoutes);
app.use(moviesRoutes);
app.use(genresRoutes);

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
