const express = require("express")
const router = express.Router()
const {uploadFile} = require('../middleware/upload')
const multer = require("multer");
const upload = multer()

//metodos GET
router.get('/:username', require('./message/verm'))
router.get('/admin/seeu', require('./admin/veru'))

//metodos POST
router.post('/user/register', uploadFile('imagesProfile').single('imgpro'), require('./user/register'))
router.post('/user/login', upload.none(),require('./user/login'))
router.post('/admin/register', upload.none(), require('./admin/register'))
router.post('/admin/convertPRO', upload.none(), require('./admin/convertPro'))
router.post('/user/versionPRO', upload.none(), require('./transaction/transactionSub'))
router.post('/:username/pay', upload.none(), require('./message/transaction'))
router.post('/:username/message', uploadFile().single('img'), require('./message/CreateMessage'))

//metodo PUT
router.put('/user/logout', require('./user/logout'))

//metodos DELETE
router.delete('/admin/deleteu', upload.none(),require('./admin/deleteu'))

module.exports = router