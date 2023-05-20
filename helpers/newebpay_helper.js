const crypto = require('crypto')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const URL = 'https://bc0f-36-237-188-203.ngrok-free.app' //ngrok
const MerchantID = process.env.MerchantID
const HashKey = process.env.HashKey
const HashIV = process.env.HashPassword
const PayGateWay = "https://ccore.newebpay.com/MPG/mpg_gateway"
const ReturnURL = URL + "/orders/newebpay/callback/ReturnURL"
const NotifyURL = URL + "/orders/newebpay/callback/NotifyURL"
const ClientBackURL = URL + "/orders"

const newebpayHelper = {
  generateDataChain: function (data) {
    const arr = []
    for (const key in data) {
      arr.push(`${key}=${data[key]}`)
    }
    return arr.join('&')
  },

  mpg_aes_encrypt: function (data) {
    const dataString = this.generateDataChain(data)
    const Cipheriv = crypto.createCipheriv('aes256', HashKey, HashIV)
    const AES_Encrypt = Cipheriv.update(dataString, 'utf8', 'hex') + Cipheriv.final('hex')
    return AES_Encrypt
  },

  mpg_sha_encrypt: function (AES_EncryptCode) {
    const hash = crypto.createHash('sha256')
    const str = `HashKey=${HashKey}&${AES_EncryptCode}&HashIV=${HashIV}`
    const SHA_Code = hash.update(str).digest('hex').toUpperCase()
    return SHA_Code
  },

  mpg_aes_decrypt: function (AES_EncryptCode) {
    const Decipheriv = crypto.createDecipheriv("aes256", HashKey, HashIV)
    const AES_DecryptCode = Decipheriv.update(AES_EncryptCode, "hex", "utf8") + Decipheriv.final("utf8")
    return AES_DecryptCode
  },

  getNewebpayInfo: function (amount, description, email) {

    const data = {
      MerchantID: MerchantID, // 商店代號
      RespondType: 'JSON', // 回傳格式
      TimeStamp: Date.now(), // 時間戳記
      Version: '2.0', // 串接程式版本
      MerchantOrderNo: Date.now(), // 商店訂單編號
      LoginType: 0, // 登入智付通會員 0 = false
      OrderComment: '商店備註', // 商店備註
      Amt: amount, // 訂單金額
      ItemDesc: description, // 商品資訊
      Email: email, // 付款人電子信箱
      ReturnURL: ReturnURL, // 支付完成返回商店網址
      NotifyURL: NotifyURL, // 支付通知網址/每期授權結果通知
      ClientBackURL: ClientBackURL, // 支付取消返回商店網址
    }
    
    const AES_EncryptCode = this.mpg_aes_encrypt(data)
    const SHA_Code = this.mpg_sha_encrypt(AES_EncryptCode)
    return {
      MerchantID: MerchantID, // 商店代號
      TradeInfo: AES_EncryptCode, // 加密後參數
      TradeSha: SHA_Code,
      Version: data.Version, // 串接程式版本
      PayGateWay: PayGateWay,
      MerchantOrderNo: data.MerchantOrderNo
    }
  }
}

module.exports = newebpayHelper