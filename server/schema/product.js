const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    units: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;