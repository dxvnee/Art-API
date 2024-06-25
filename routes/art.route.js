const express = require("express");
const router = express.Router();
const {getArts, getArt, getArtImage, createArtWithImage, createArtWithImageHandler,
    updateArt, deleteArt} = require("../controllers/art.controller.js");


router.get('/', getArts);
router.get('/:id', getArt);
router.get('/:id/image', getArtImage);
router.post('/createArtWithImage', createArtWithImageHandler, createArtWithImage);
router.put('/:id', createArtWithImageHandler, updateArt);
router.delete('/:id', deleteArt);

// router.post('/', createArt);

module.exports = router;

