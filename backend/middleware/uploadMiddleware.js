const multer = require('multer')

//create a storage machine in the frontend folder for the user icons
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './frontend/public/userIcons');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname.replaceAll("\\W+",""));
    }
})

const upload = multer({
    storage: storage,
    limits:{
        fieldSize: 1024 * 1024 * 3
    }
})

module.exports = {
    upload
}