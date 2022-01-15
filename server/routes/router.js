const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const axios = require('axios');

router.get('/', (request, response) => (
    axios.get('http://localhost:3000/api/products')
    .then(function(resp) {
        console.log(resp.data);
        response.render('index', {products: resp.data})
    })
    .catch(error => {
        response.send(error);
    })
));

router.get('/addProduct', (request, response) => (
    response.render("addProduct")
));

router.get('/updateProduct', (request, response) => (
    axios.get('http://localhost:3000/api/products', {params: {id: request.query.id}})
    .then(function(data) {
        console.log(data.data);
        response.render("updateProduct", {product: data.data});
    })
));

router.post('/api/products', controller.addProduct);
router.get('/api/products', controller.getProduct);
router.put('/api/products/:id', controller.updateProduct);
router.delete('/api/products/:id', controller.deleteProduct);


module.exports = router;
