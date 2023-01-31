const jwt = require('jsonwebtoken')
const fetch = require('isomorphic-fetch')
const { trusted } = require('mongoose')

//Generar token 
async function TokenAssign(user) {
    return jwt.sign({ _id: user._id }, 'GRATITUD', { expiresIn: '10h' })
}

// Verificar el token
async function TokenVerify(token) {
    try {
        return jwt.verify(token, 'GRATITUD')
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

async function TokenRemove(token) {
    const authHeader = token
    jwt.sign(authHeader, "", { expiresIn: '1s' }, (logout, err) => {
        if (logout) {
            return true
        } else {
            return false
        }
    })
}

async function captcha(req) {
    if (req.body.token === undefined || req.body.token === '' || req.body.token === null) {
        console.log("Entre aqui")
        return false
    }
    const secretKey = process.env.CAPTCHA;

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.token}`
    
    fetch(url, {
        method: 'post',
    })
        .then((response) => response.json())
        .then((google_response) => {
            if (google_response.success == true) {
                return true
            } else {
                return false
            }
        })
        .catch((error) => {
            return res.json({ error })
        })

}

module.exports = { TokenAssign, TokenVerify, AuthCheck, TokenRemove, captcha }