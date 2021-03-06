const bkfd2Password = require('pbkdf2-password')
const hasher = bkfd2Password();

function 암호화(parameters){
    return new Promise((resolve, reject) => {
        hasher({
            password : parameters.user_pw
        }, (err, pass, salt, hash) =>{
            const result = {
                salt, hash
            }
            resolve(result)
        })
    })
}
function 복호화(password, savedSalt, savedHash){
    return new Promise((resolve, reject) => {
        hasher({
            password : password,
            salt : savedSalt
        }, (err, pass, salt, hash) =>{
            if(savedHash === hash){
                resolve('로그인 성공')
            } else{
                reject('비밀번호 오류')
            }
        })
    })
}

module.exports = {
    암호화,
    복호화,
}