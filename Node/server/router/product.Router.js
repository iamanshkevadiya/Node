const { Router } = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/product.controller');
const decode = require('../middleware/decodeJwt');
const upload = require('../utils/imageUpload');

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:productId", getProductById);
productRouter.post("/", decode, upload.single("img"), createProduct);
productRouter.patch("/:productId", decode, updateProduct);
productRouter.delete("/:productId", decode, deleteProduct)


module.exports = productRouter;