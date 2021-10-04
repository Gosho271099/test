const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
    index: (req, res) => {
        let clase = listaProductos.filter((playera) => playera.status == "nuevo");
        res.render ('./products/home', {clase:clase}) 
    },
    login: (req, res) => {
        res.render('./users/login')
    },
    search: (req, res) => {
		let search = req.query.keywords;
		let productsToSearch = listaProductos.filter(product => product.titulo.toLowerCase().includes(search));	
		res.render('./products/results', { 
			listaProductos: productsToSearch, 
			search,
			toThousand,
		});
	}
}



module.exports = mainController;