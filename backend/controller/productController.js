const Product = require('../model/Product')
const cloudniary = require('../config/cloudinary')

// find all products
// GET --> /api/products/
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)   
    } catch (error) {
        res.status(500).json({
            message: 'Server erro'
        }) 
    }
}


// find product by there id
// GET --> /api/products/:id
const getProductById = async (req, res) => {
    // localhost:3000/:id
    // id --> params
    try {
        const product = await Product.findById(req.params.id)
        if(product){
            res.json(product)
        }else{
            res.status(404).json({
                message: 'Product not found'
            })
        }   
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
        
    }
}



// create product --> only admin
// POST --> api/products/
const createProduct = async (req, res) => {
    try {

        const { name, description, price, category, stock } = req.body
        let imageUrl = '' 
        if(req.file){
            const result = await cloudniary.uploader.upload(req.file.path)
            // console.log(result)
            imageUrl = result.secure_url
        }

        const product = new Product({
            name, 
            description,
            price,
            category,
            stock,
            imageUrl
        })

        const createProduct = await product.save()
        res.status(201).json(createProduct) 
    } catch (error) {

        res.status(500).json({
            message: error.message
        })

    }
} 


// update product detail --> only admin
// PUT --> api/products/:id
const updateProduct = async (req, res) => {

     
/**
"If name is provided in request body, update the product name. Otherwise keep the old product name."

Let's understand with examples.

Case 1: User sends name

Request body:

{
  "name": "iPhone 15",
  "price": 80000
}

Here:

name = "iPhone 15"

So:

product.name = name || product.name

becomes:

product.name = "iPhone 15" || "Old Product Name"

"iPhone 15" is truthy, so:

product.name = "iPhone 15"

Product name gets updated.

Case 2: User does not send name

Request body:

{
  "price": 80000
}

Now:

name = undefined

So:

product.name = undefined || product.name

undefined is falsy, so JavaScript uses the second value:

product.name = product.name

Old name remains unchanged.

Why use || here?

Because in update APIs, user may update only some fields.

Example existing product:

{
  "name": "Laptop",
  "description": "Gaming Laptop",
  "price": 50000,
  "stock": 10
}

User wants only price update:

{
  "price": 45000
}

If you write:

product.name = name;

then:

product.name = undefined

Your name will become empty/undefined.

So we write:

product.name = name || product.name

Meaning:

new value available ? use new value : keep old value


 */        

        try{
        const { name, description, price, category, stock } = req.body
        const product = await Product.findById(req.params.id)
        
        if(product){
            // if product name change save in --> product.name = name 
            // otherwise by default product old name keep it --> product.name = product.name
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.category = category || product.category
            product.stock = stock || product.stock

            if(req.file){
                const result = await cloudniary.uploader.upload(req.file.path)
                product.imageUrl = result.secure_url
            }

            const updateProduct = await product.save()

            res.json(updateProduct)

        }else{
            res.status(404).json({
                message: "Product not found", 
            })
        }
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}


// delete product --> only admin
// DELETE --> api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(product){
            await product.deleteOne()
            res.json({
                message: 'Product removed'
            })
        }else{
            res.status(404).json({
                message: "Product not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}


module.exports = {
    getProducts,
    getProductById, 
    createProduct,
    updateProduct,
    deleteProduct 
}