
const transactionSchema = require('../../models/transaction')
const userSchema = require('../../models/user')

module.exports = async function (req, res) {
    await transactionSchema.updateOne({ _id:  idt}, {
        $set: {
          statusTransaction: "Complete"
        }
      })
      const findUser = await transactionSchema.findOne({ _id: idt})
      const user = await userSchema.findOne({ username: findUser.nameUser})
      await userSchema.updateOne({ _id:  idt}, {
        $set: {
          monto: user.monto + findUser.monto
        }
      })
}