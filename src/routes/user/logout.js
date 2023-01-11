const express = require("express")
const { TokenRemove } = require('../../middleware/autentication')
const router = express.Router()

module.exports = async function (req, res) {
    return TokenRemove()
}
