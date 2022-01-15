var Product = require('../schema/product');

exports.addProduct = (request, response) => {
    if(!request.body) {
        response.status(400).send({message: "Content body cannot be empty"});
        return;
    }

    const product = new Product({
        name: request.body.name,
        price: request.body.price,
        units: request.body.units,
        category: request.body.category
    });

    product
        .save(product)
        .then(data => {
            response.redirect('/');
        })
        .catch(error => {
            response.status(500).send({
                message: error.message || "An error has occurred"
            });
        });
}

exports.getProduct = (request, response) => {

    if(request.query.id) {
        const id = request.query.id;
        Product.findById(id)
        .then(product => {
            if(!product) {
                response.status(404).send({message: `Cannot update product ${_id}`});
            } else {
                response.send(product);
            }
        })
        .catch(error => {
            response.status(500).send({message: error.message});
        });
    } else {
        Product.find()
        .then(product => {
            response.send(product);
        })
        .catch(error => {
            response.status(500).send({message: error.message});
        });
    }
}

exports.updateProduct = (request, response) => {
    if(!request.body) {
        response.status(400).send({message: "Content body cannot be empty"});
        return;
    }

    const _id = request.params.id;
    console.log(_id);
    Product.findByIdAndUpdate(_id, request.body, {useFindAndModify: false})
        .then(data => {
            if(!data) {
                response.status(404).send({message: `Cannot update product ${_id}`});
            } else {
                response.send(data);
            }
        })
        .catch(error => {
            response.status(500).send({message: "Error in update"});
        })
}

exports.deleteProduct = (request, response) => {
    const _id = request.params.id;

    Product.findByIdAndDelete(_id)
    .then(data => {
        if(!data) {
            response.status(404).send({message: `Cannot update product ${_id}`});
        } else {
            response.send({message: "Product deleted"});
        }
    })
    .catch(error => {
        response.status(500).send({message: "Error in update"});
    })
}