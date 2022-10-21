import crypto from 'crypto-js'

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *   charactersLength));
  }
  return result;
}

export default function generateToken() {    
    var token = crypto.SHA256(makeid(10)).toString(crypto.enc.Base64url);     
    return token;
  }