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

export function generateToken() {    
    var token = crypto.SHA256(makeid(10)).toString(crypto.enc.Base64url);     
    return token;
  }


export function getValidToken(map)
{
    var hash = generateToken();
    while(!(typeof(map.get(hash)) =="undefined"))
    {
        hash = generateToken();
    }
    return hash;
}

export function isValidHash(hash)
{
    if(typeof(hash) == "undefined" || hash.length != 43)
    {
        return false;
    }
    return true;
}
export class Response
{
    error
    data
    status
}
