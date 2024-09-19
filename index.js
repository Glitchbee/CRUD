const express = require('express');
const app = express()
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/gadgets');
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1:27017/strom')
    .then(() => {
        console.log('Connection established...');
    })
    .catch((err) => {
        console.log('Connection failed!!!');
        console.log(err);
    })


app.use(express.static('design'));
app.use(express.static(path.join(__dirname, '/design')));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))



const categories = ['Hardware', 'Software', 'Electronics'];

//  ⁡⁢⁣⁡⁢⁣⁣Display all items⁡
app.get('/product', async (req, res) => {
    const component = await Product.find({})
    res.render('products/index', { component })
})


// ⁡⁢⁣⁣ ⁡⁢⁣⁣Adding new item⁡
app.get('/product/new', (req, res) => {
    res.render('products/newItem', { categories })
})

app.post('/product', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.redirect(`/product/${newProduct._id}`)
})


//   ⁡⁢⁣⁣Details of an item⁡
app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const component = await Product.findById(id);
    // console.log(component);
    res.render('products/detail', { component })
})


// ⁡⁢⁣⁣Updating an item⁡

app.get('/product/:id/edit', async (req, res) => {
    const { id } = req.params;
    const component = await Product.findById(id)
    res.render('products/editItem', { component, categories })

})

app.put('/product/:id', async (req, res) => {
    const { id } = req.params;
    const updatedItem = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/product/${updatedItem._id}`);

})


// ⁡⁢⁣⁣ Delete an item⁡

app.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    const deleteItem = await Product.findByIdAndDelete(id)
    res.redirect('/product')
})


app.listen(port, () => {
    console.log('Server is listening on port 3000')
})