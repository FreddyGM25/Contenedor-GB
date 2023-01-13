
const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')
const messageSchema = require('../../models/message')

module.exports = async function (req, res) {
    await transactionSchema.updateOne({ _id:  idt}, {
        $set: {
          statusTransaction: "Complete"
        }
      })
      const findUser = await transactionSchema.findOne({ _id: idt})
      const user = await userSchema.findOne({ username: findUser.emailUser})
      await userSchema.updateOne({ _id:  idt}, {
        $set: {
          monto: user.monto + findUser.monto
        }
      })
      await messageSchema.updateOne({ _id:  idt}, {
        $set: {
          monto: user.monto + findUser.monto
        }
      })
}