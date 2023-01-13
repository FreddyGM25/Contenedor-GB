const express = require("express")
const router = express.Router()
const {uploadFile} = require('../middleware/upload')
const multer = require("multer");
const upload = multer()

//metodos GET
router.get('/:username', require('./message/verm'))
router.get('/admin/seeu', require('./admin/veru'))
router.get('/user/valid', upload.none(), require('./user/activeUser'))
router.get('/user/data/:username', require('./user/dataUserP'))
router.get('/profile/data', require('./user/dataUserPr'))
router.get('/user/message/:id', require('./message/verOneM'))
router.get('/admin/message', require('./message/verOneM'))


//metodos POST

  //User
router.post('/user/register', uploadFile('imagesprofile').single('imgpro'), require('./user/register'))
router.post('/user/verify', upload.none(), require('./user/authUser'))
router.post('/user/login', upload.none(),require('./user/login'))
router.post('/user/versionPRO', upload.none(), require('./transaction/transactionSub'))
router.post('/user/reset', upload.none(), require('./user/sendreset'))
router.post('/message', uploadFile('img').single('img'), require('./message/CreateMessage'))
router.post('/withdraw', upload.none(), require('./transaction/transactionR'))


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
router.put('/user/reset', upload.none(),require('./user/resetchange'))
router.put('/user/passwordChange', upload.none(),require('./user/reset'))
router.put('/user/editinfo', upload.none(),require('./user/editInfo'))
router.put('/user/editsn', upload.none(),require('./user/editSN'))
router.put('/user/editp', uploadFile('imagesprofile').single('imgpro'),require('./user/editIm'))

//metodos DELETE
router.delete('/admin/deleteu/:email', upload.none(),require('./admin/deleteu'))

module.exports = router
