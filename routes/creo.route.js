const express = require("express");
const router = express.Router();
const {getCreos, getCreo, getCreoImage, createCreoWithImage, createCreoWithImageHandler,
    updateCreo, deleteCreo} = require("../controllers/creo.controller.js");


router.get('/', getCreos);
router.get('/:id', getCreo);
router.get('/:id/image', getCreoImage);
router.post('/createCreoWithImage', createCreoWithImageHandler, createCreoWithImage);
router.put('/:id', createCreoWithImageHandler, updateCreo);
router.delete('/:id', deleteCreo);

// router.post('/', createCreo);

module.exports = router;

