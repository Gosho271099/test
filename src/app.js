// ************ Require's ************
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');


// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(methodOverride('_method'));
app.use(express.static('public'));

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

// ************ Route System require and use() ************
const mainRouter = require('./routes/mainRouter');
const productsRouter = require('./routes/productsRouter');

let port = process.env.PORT || 3000;

app.use('/', mainRouter); //Rutas main
app.use('/products', productsRouter); //Rutas /products

app.listen(port, () => {
    console.log(`Server listening in port ${port} 🤓👌 `);
});

