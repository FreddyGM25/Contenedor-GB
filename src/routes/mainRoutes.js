const express = require("express")
const router = express.Router()
const { uploadFile } = require('../middleware/upload')
const multer = require("multer");
const upload = multer()

//metodos GET
router.get('/:username', require('./message/verm'))
router.get('/admin/seeu', require('./admin/veru'))
router.get('/admin/seer', require('./admin/verR'))
router.get('/admin/seepro', require('./admin/verPRO'))
router.get('/admin/seet', require('./admin/vert'))
router.get('/admin/oneUT/:email', upload.none(),require('./admin/oneUT'))
router.get('/user/valid', upload.none(), require('./user/activeUser'))
router.get('/user/data/:username', require('./user/dataUserP'))
router.get('/profile/data', require('./user/dataUserPr'))
router.get('/user/message/:id', require('./message/verOneM'))
router.get('/admin/message', require('./message/verOneM'))
router.get('/user/rewards', require('./user/verRewards'))
router.get('/home/recently', require('./home/homer'))
router.get('/admin/seem', require('./admin/verm'))
router.get('/admin/info', require('./admin/verinfo'))
router.get('/user/cancelsub', require('./transaction/getcancel'))
router.get('/admin/amountd', require('./admin/totaldonation'))


//metodos POST

//User
router.post('/user/register', uploadFile('imagesprofile').single('imgpro'), require('./user/register'))
router.post('/user/verify', upload.none(), require('./user/authUser'))
router.post('/user/login', upload.none(), require('./user/login'))
router.post('/user/versionPRO', upload.none(), require('./transaction/transactionSub'))
router.post('/user/reset', upload.none(), require('./user/sendreset'))
router.post('/message', uploadFile('img').single('img'), require('./message/CreateMessage'))
router.post('/withdraw', upload.none(), require('./transaction/transactionR'))


//Admin
router.post('/admin/register', upload.none(), require('./admin/register'))
router.post('/admin/convertPRO', upload.none(), require('./admin/convertPro'))
router.post('/admin/boletin', upload.none(), require('./admin/boletin'))

//Pagos PayPal
router.post("/orders", upload.none(), require('./transaction/OrderPaypalD'))
router.post("/orders/:orderID/capture", require('./transaction/OrderPaypalS'))
router.post('/susorders', upload.none(), require('./transaction/SubPaypalS'))

// Cancelar Suscripcion
router.post('/paysuspend', require('./transaction/SuspendSub'))


//Pagos Card
router.post("/payStripe", require('./transaction/OrderCardD'))
router.post("/success", upload.none(), require('./transaction/OrderCardS'))
router.post("/subStripe", require('./transaction/SubCardD'))
router.post("/subSuccess", upload.none(), require('./transaction/SubCardS'))

//Regalos User
router.post("/upload/rewards",  uploadFile('files').single('file'), require('./user/rewards'))


//metodo PUT
router.put('/user/reset', upload.none(), require('./user/resetchange'))
router.put('/user/passwordChange', upload.none(), require('./user/reset'))
router.put('/admin/passwordChange', upload.none(), require('./admin/reset'))
router.put('/user/editinfo', upload.none(), require('./user/editInfo'))
router.put('/user/editsn', upload.none(), require('./user/editSN'))
router.put('/user/editp', uploadFile('imagesprofile').single('imgpro'), require('./user/editIm'))
router.put('/admin/pay', upload.none(),require('./admin/pay'))
router.put('/admin/price', upload.none(),require('./admin/infoprice'))
router.put('/admin/info', upload.none(),require('./admin/info'))

//metodos DELETE
router.delete('/admin/deleteu/:email', upload.none(), require('./admin/deleteu'))

module.exports = router
