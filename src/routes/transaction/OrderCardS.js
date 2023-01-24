
const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')
const messageSchema = require('../../models/message')

module.exports = async function (req, res) {
  const idt = req.body.idt
  const findUser = await transactionSchema.findOne({ _id: idt })
  if(findUser.statusTransaction == "Complete") return res.status(200).send({ response: "Error", message: "Donacion ya realizada" })
  await transactionSchema.updateOne({ _id: idt }, {
    $set: {
      statusTransaction: "Complete"
    }
  })
  const user = await userSchema.findOne({ email: findUser.emailUser })
  await userSchema.updateOne({ _id: user._id }, {
    $set: {
      money: user.money + findUser.monto
    }
  })
  return res.status(200).send({ response: "Success", message: "Donacion realizada" })
}