const jwt = require('jsonwebtoken')

//Generar token 
async function TokenAssign(user) {
    return jwt.sign({ _id: user._id }, 'only4bet', { expiresIn: '10h' })
}

// Verificar el token
async function TokenVerify(token) {
    try {
        return jwt.verify(token, 'only4bet')
    } catch (e) {
        return null
    }
}

// Autenticar si token existe
async function AuthCheck(req, res, next) {
    const token = req.headers.authorization.split(' ').pop()
    const tokenver = await TokenVerify(token)
    if (!tokenver) {
        res.status(409).json("Invalid Token")
    } else {
        if (tokenver._id) {
            next()
        } else {
            res.status(409).json("Invalid Token")
        }
    }
}

async function TokenRemove(req, res, next) {
    const authHeader = req.headers.authorization.split(' ').pop()
    jwt.sign(authHeader, "", { expiresIn: '1s' }, (logout, err) => {
        if (logout) {
            res.status(200).send({ message: "Has sido desconectado" })
        } else {
            res.status(500).send({ message: 'Error' })
        }
    })
}

module.exports = { TokenAssign, TokenVerify, AuthCheck, TokenRemove }