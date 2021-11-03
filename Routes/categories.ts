import { Category } from '../Model/category';
const express = require('express');
const router = express.Router();
import { CreateCategory, GetCategory, DeleteCategory, UpdatCategory } from '../Controller/category';


router.get(`/getCategory`, GetCategory);
router.post(`/creatCategory`, CreateCategory);
router.delete(`/deleteCategory/:id`, DeleteCategory);
router.put(`/updatCategory/:id`, UpdatCategory);

module.exports = router;
