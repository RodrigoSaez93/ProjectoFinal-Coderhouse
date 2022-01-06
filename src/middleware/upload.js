const multer = require("multer");
const getExtension = file => {
    return file.originalname.substr(file.originalname.lastIndexOf('.'), 
        file.originalname.length- file.originalname.lastIndexOf('.'))
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/')
    },
    filename: function (req, file, cb) {
      cb(null, req.body.idProducto + getExtension(file))
    }
  })
module.exports = multer({ storage });