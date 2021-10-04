const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    // Pages & Categories
    detail: (req, res) => {
        let id = req.params.productId;
        let playera = listaProductos.find((playera) => playera.id == id);
        res.render('./products/detail_product', {playera: playera});
    },
    cart: (req, res) => {
        let playeraC = listaProductos.find((playera) => playera.id == req.params.productId);
        res.render('./products/cart', {playeraC: playeraC});
    },
    hombres: (req, res) => {
        let clase = listaProductos.filter((playera) => playera.categoria == "hombres");
        res.render('./products/hombres', {clase: clase})
    },
    mujeres: (req, res) => {
        let clase = listaProductos.filter((playera) => playera.categoria == "mujeres");
        res.render('./products/mujeres', {clase: clase})
    },
    girls: (req, res) => {
        let clase = listaProductos.filter((playera) => playera.categoria == "girls");
        res.render('./products/girls', {clase: clase})
    },
    boys: (req, res) => {
        let clase = listaProductos.filter((playera) => playera.categoria == "boys");
        res.render('./products/boys', {clase: clase})
    },
    ofertas: (req, res) => {
        let clase = listaProductos.filter((playera) => playera.status == "en oferta");
        res.render('./products/ofertas', {clase: clase})
    },
    todos: (req, res) => {
        res.render('./products/todos', {clase: listaProductos})
    },

    //Methods Created Read Updated Delete

    create: (req, res) => {
        res.render('./users/add_product');
    },
    store: (req, res) => {
        let newProduct = {
            id: listaProductos[listaProductos.length - 1].id + 1,
            det01: "/img/products/default-image.jpg",
            det02: "/img/products/default-image.jpg",
            det03: "/img/products/default-image.jpg",
            det04: "/img/products/default-image.jpg",
            ...req.body,
        }
        if (req.file) {
            newProduct.img = '/img/products/' + req.file.filename;
        } else {
            newProduct.img = '/img/products/default-image.jpg';
        }

        listaProductos.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(listaProductos, null, ' '));
        res.redirect('/products/todos');


    },
    edit: (req, res) => {
        let id = req.params.id;
        let editProduct = listaProductos.find((product) => product.id == id);
        res.render('./users/edit_product', {editProduct});
    },
    update: (req, res) => {
        let id = req.params.id;
        let editProduct = listaProductos.find((product) => product.id == id)

        editProduct = {
            id: editProduct.id,
            img: editProduct.img,
            det01: "/img/products/default-image.jpg",
            det02: "/img/products/default-image.jpg",
            det03: "/img/products/default-image.jpg",
            det04: "/img/products/default-image.jpg",
            ...req.body
        };
        //update and remove old file from the server :)
        const productsImagePath = path.join(__dirname, '../../public/', editProduct.img);

        if (req.file) {
            fs.unlinkSync(productsImagePath);
            editProduct.img = '/img/products/' + req.file.filename;
        } else {
            editProduct.img = editProduct.img;
        }

        let newProducts = listaProductos.map(product => {
            if (product.id == editProduct.id) {
                return product = {...editProduct}
            }
            return product
        });

        fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
        res.redirect('/');

    },
    //Delete One product from file productsDataBase.json
    destroy: (req, res) => {
        let id = req.params.id;
        const productoAEliminar = listaProductos.findIndex(producto => id == producto.id);
        // Delete image from server
        let deleteProduct = listaProductos.find((product) => product.id == id);
        const productsImagePath = path.join(__dirname, '../../public/', deleteProduct.img);

        if (productoAEliminar >= 0) {
            listaProductos.splice(productoAEliminar, 1)
            fs.unlinkSync(productsImagePath);
            fs.writeFileSync(productsFilePath, JSON.stringify(listaProductos, null, 2), 'utf-8')
            res.redirect('/products/todos');
        } else {
            res.redirect('/');
        }


    }
};

module.exports = mainController;