const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        enum: ['Hardware', 'Software', 'Electronics']
    }
})


const Product = mongoose.model('Product', itemSchema);

module.exports = Product;


