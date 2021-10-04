// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

/*Configuracion Multer*/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/img/products'));
    }, filename: (req, file, cb) => {
        const newFilename = 'img-' + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const upload = multer({storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*GET Mome Page Detail Product*/
router.get('/detalle/:productId/', productsController.detail)
/*GET Cart Page*/
router.get('/cart/:productId?/', productsController.cart);
/*GET Men Categorie*/
router.get('/hombres', productsController.hombres);
/*GET Women Categorie*/
router.get('/mujeres', productsController.mujeres);
/*GET Girls Categorie*/
router.get('/girls', productsController.girls);
/*GET Boys Categorie*/
router.get('/boys', productsController.boys);
/*GET Sales Categorie*/
router.get('/ofertas', productsController.ofertas);
/*GET All Categorie*/
router.get('/todos', productsController.todos);

/*GET Add Form or edit Page*/
/*POST Create Product Gregorio*/
router.get('/create/', productsController.create);
router.post('/', upload.single('img'), productsController.store);

/*PUT or Patch Update product Dario*/
router.get('/edit/:id', productsController.edit);
router.patch('/edit/:id', upload.single('img'), productsController.update);

/*Delete delete product Oscar */
router.delete('/delete/:id', productsController.destroy);

module.exports = router;