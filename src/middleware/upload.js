const multer = require('multer')
const path = require('path')

function uploadFile(ruta) {
    var storage = multer.diskStorage({
        destination: `src/${ruta}`,
        filename: function (req, file, cb) {
            const extension = path.extname(file.originalname)
            cb(null, Date.now() + extension)
        }
    })

    const upload = multer({ storage: storage })
    return upload
}

module.exports = {uploadFile}