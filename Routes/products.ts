const express = require('express');
const router:any = express.Router();
import { CreateProducts, GetProducts, DeleteProducts, UpdateProduct, GetProductsById, GetProductCount, GetFeaturedProduct,uploadImage, uploadImageArray, UpdateProductImages } from '../Controller/products';

router.get(`/getProducts`, GetProducts);
router.get(`/getProductsById/:id`, GetProductsById);
router.get(`/getProductCount`, GetProductCount);
router.get(`/getFeaturedProduct/:count`, GetFeaturedProduct);


router.post(`/createProduct`, uploadImage, CreateProducts);

router.delete(`/deleteProducts/:id`, DeleteProducts);

router.put(`/updateProduct/:id`, uploadImage, UpdateProduct);
router.put(`/updateProductImages/:id`, uploadImageArray, UpdateProductImages);


module.exports = router;
