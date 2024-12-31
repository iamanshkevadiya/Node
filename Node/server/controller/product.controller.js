const Product = require("../models/product.model");


const getProducts = async (req, res) => {
    try {
        let product = await Product.find();
        console.log(product);
        
        res.send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const createProduct = async (req, res) => {
    if (req.file) {
        req.body.img = req.file.path;
    }
    req.body.user = req.user.id;
    try {
        let product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        let product = await Product.findById(productId);
        res.send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        let product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        let product = await Product.findByIdAndDelete(productId);
        res.send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};