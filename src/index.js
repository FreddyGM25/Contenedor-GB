// importar librerias
const express = require('express')
const { default: mongoose } = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const path = require('path')
const multer = require('multer')
const upload = multer()
require("dotenv").config()
const mainRoutes = require("./routes/mainRoutes")

const app = express()
app.use(cors({
  origin: '*',
}));
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/serverimg', express.static('src/images/serverimg'));
app.use('/images', express.static('src/images/img'));
app.use('/imagesprofile', express.static('src/images/imagesprofile'));
app.use('/file', express.static('src/images/files'));
app.use('/homeimg', express.static('src/images/home'));

const port = process.env.PORT || 9001

//middlewares
app.use(express.json())
app.use('/api', mainRoutes)


//Routes
app.get('/', (req, res) => {
  res.send("Welcome to my API bet")
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDBAtlas"))
  .catch((error) => console.error(error))

//mongodb connection
app.listen(port, () => console.log("Servidor funcionando en el puerto", port))

