const express = require("express")
const router = express.Router()
const {uploadFile} = require('../middleware/upload')
const multer = require("multer");
const upload = multer()

//metodos GET
router.get('/:username', require('./message/verm'))
router.get('/admin/seeu', require('./admin/veru'))
router.get('/user/valid', upload.none(), require('./user/activeUser'))


//metodos POST

  //User
router.post('/user/register', uploadFile('imagesProfile').single('imgpro'), require('./user/register'))
router.post('/user/verify', upload.none(), require('./user/authUser'))
router.post('/user/login', upload.none(),require('./user/login'))
router.post('/user/versionPRO', upload.none(), require('./transaction/transactionSub'))
router.post('/user/reset', upload.none(), require('./user/sendreset'))
router.post('/user/reset/:token', upload.none(),require('./user/resetchange'))
router.post('/message', uploadFile('images').single('img'), require('./message/CreateMessage'))

  //Admin
router.post('/admin/register', upload.none(), require('./admin/register'))
router.post('/admin/convertPRO', upload.none(), require('./admin/convertPro'))

  //Pagos PayPal
router.post("/:username/orders",upload.none(), require('./transaction/OrderPaypalD'))
router.post("/:username/orders/:orderID/:idt",upload.none(), require('./transaction/OrderPaypalS'))

  //Pagos Card
router.post("/:username/pay",upload.none(), require('./transaction/OrderCardD'))
router.post("/:username/success",upload.none(), require('./transaction/OrderCardS'))



//metodo PUT
router.put('/user/logout', require('./user/logout'))

//metodos DELETE
router.delete('/admin/deleteu/:email', upload.none(),require('./admin/deleteu'))

module.exports = router
