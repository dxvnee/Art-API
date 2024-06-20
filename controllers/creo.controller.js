const Creo = require("../models/creo.model.js");
const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, `${req.body.name}.jpg`)
    }
});

const upload = multer({ storage: storage });

const getCreos = async (req,res) => {
    try {
        const user = String(req.header('Authorization'))


        const creo = await Creo.find(
            {
                userId: user
            }
        );
        res.status(200).json(creo) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getCreoImage = async (req, res) => {
    try {
        const { id } = req.params;
        const creo = await Creo.findOne({
            id: parseInt(id)
        });
        const imagePath = path.join(__dirname, '../Images', `${creo.name}.jpg`);
        res.sendFile(imagePath);

    } catch (error) {
        
    } 
}

const getCreo = async (req,res) => {
    try {
        const { id } = req.params;
        const user = String(req.header('Authorization'))
        const creo = await Creo.findOne({
            userId: user,
            id: parseInt(id)
        });
        res.status(200).json(creo)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// const createCreo = async (req, res) => {
//     try{
//         const user = req.header('Authorization')
//         const creo = await Creo.create(req.body);
//         res.status(200).json(creo)
//     } catch (error){
//         res.status(500).json({message: error.message})
//     }
// }

const createCreoWithImageHandler = (upload.single('image'));

const createCreoWithImage = async (req, res) => {
    try{
        const userId = String(req.header('Authorization'))
        const { name, element, size } = req.body;
        console.log(name)
        console.log(element)
        console.log(size)
        const image = req.file; 

        if (!name || !element || !size) {
            res.status(400).json({ message: 'All fields are required' });    
        }

        if (!image) {
            res.status(400).json({ message: 'Image is are required' });
        }
        
        const imageId = image.filename;

        console.log(imageId);
        console.log(userId);
        
        const creo = await Creo.create({
            userId,
            name,
            element,
            size,
            imageId,
        })

        res.status(200).json({
            status: "success",
            message: "Creo created successfully",
            creo
        })

    } catch (error){
        res.status(500).json({message: error.message})
        console.log(error.message)
    }

    
}


const updateCreo = async (req,res) => {
    try {
        const userId = String(req.header('Authorization'))
        const { id } = req.params;
        const { name, element, size } = req.body;
        const image = req.file;
        const imageId = image.filename;

        const creo = await Creo.findOneAndUpdate(
            {
                id: parseInt(id),
                userId: userId
            },
            {
                userId,
                name,
                element, 
                size,
                imageId,
            }
        );
        
        if (!creo){
            return res.status(500).json({message: "Creo not found"});
        }

        res.status(200).json({
            status: "success",
            message: "Creo created successfully",
        })

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteCreo = async (req, res) => {
    try {
        const user = String(req.header('Authorization'))
        const { id } = req.params
        const creo = await Creo.findOneAndDelete({
            userId: user,
            id: parseInt(id)
        });

        if(!creo){
            return res.status(404).json({message: "Creo not found"});
        }

        res.status(200).json({
            status: "success",
            message: "Creo created successfully",
        })
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getCreos,
    getCreo,
    getCreoImage,
    createCreoWithImage,
    createCreoWithImageHandler,
    updateCreo,
    deleteCreo
}





