const mongoose = require('mongoose');
const Product = require('./models/gadgets');


mongoose.connect('mongodb://127.0.0.1:27017/strom')
    .then(() => {
        console.log('Connection established...');
    })
    .catch((err) => {
        console.log('Connection failed!!!');
        console.log(err);
    })



    const components = [ {
        item: 'ATX Cabinet',
        price: 70,
        category: 'Electronics'
    },

    {
        item: 'MotherBoard',
        price: 250,
        category: 'Hardware'
    },

    {
        item: 'CPU',
        price: 300,
        category: 'Hardware'
    },

    {
        item: 'RAM',
        price: 60,
        category: 'Hardware'
    },

    {
        item: 'GPU',
        price: 600,
        category: 'Hardware'
    },

    {
        item: 'Power Supply',
        price: 100,
        category: 'Electronics'
    },
]


Product.insertMany(components)
    .then(d => { console.log(d) })
    .catch(e => { console.log(e) })

