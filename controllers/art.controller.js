const Art = require("../models/art.model.js");
const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {

        cb(null, `${file.originalname}`)
    }
});

const upload = multer({ storage: storage });

const getArts = async (req,res) => {
    try {
        const auth = String(req.header('auth'));
        console.log(auth)

        const art = await Art.find(
            {
                auth: auth
            }
        );
        res.status(200).json(art) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getArtImage = async (req, res) => {
    try {
        const { id } = req.params;
        const art = await Art.findOne({
            id: parseInt(id)
        });
        const gambarPath = path.join(__dirname, '../Images', `${art.gambar}`);
        res.sendFile(gambarPath);

    } catch (error) {
        res.status(500).json({message: error.message})
    } 
}

const getArt = async (req,res) => {
    try {
        const { id } = req.params;
        
        const auth = String(req.header('auth'))
        const art = await Art.findOne({
            auth: auth,
            id: parseInt(id)
        });
        res.status(200).json(art)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// const createArt = async (req, res) => {
//     try{
//         const user = req.header('Authorization')
//         const art = await Art.create(req.body);
//         res.status(200).json(art)
//     } catch (error){
//         res.status(500).json({message: error.message})
//     }
// }

const createArtWithImageHandler = (upload.single('gambar'));

const createArtWithImage = async (req, res) => {
    try{
        const { auth } = req.body
        const { deskripsi, alamat, harga } = req.body;
        console.log(deskripsi)
        console.log(alamat)
        console.log(harga)
        const gambar = req.file; 

        if (!deskripsi || !alamat || !harga) {
            res.status(400).json({ message: 'All fields are required' });    
        }

        if (!gambar) {
            res.status(400).json({ message: 'Image is are required' });
        }
        
        const gambarId = gambar.originalname;


        const art = await Art.create({
            deskripsi,
            alamat,
            harga,
            gambar: gambarId,
            auth
        })

        res.status(200).json({
            status: "success",
            message: "Art created successfully",
            art
        })

    } catch (error){
        res.status(500).json({message: error.message})
        console.log(error.message)
    }

    
}


const updateArt = async (req,res) => {
    try {
        const auth = String(req.header('auth'))
        const { id } = req.params;
        const { deskripsi, alamat, harga } = req.body;
        const gambar = req.file;
        const gambarId = gambar.filename;

        const art = await Art.findOneAndUpdate(
            {
                id: parseInt(id),
                auth: auth
            },
            {
                auth,
                deskripsi,
                alamat, 
                harga,
                gambar: gambarId,
            }
        );
        
        if (!art){
            return res.status(500).json({message: "Art not found"});
        }

        res.status(200).json({
            status: "success",
            message: "Art created successfully",
        })

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteArt = async (req, res) => {
    try {
        const auth = String(req.header('auth'))
        const { id } = req.params
        const art = await Art.findOneAndDelete({
            auth: auth,
            id: parseInt(id)
        });

        if(!art){
            return res.status(404).json({message: "Art not found"});
        }

        res.status(200).json({
            status: "success",
            message: "Art created successfully",
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getArts,
    getArt,
    getArtImage,
    createArtWithImage,
    createArtWithImageHandler,
    updateArt,
    deleteArt
}





