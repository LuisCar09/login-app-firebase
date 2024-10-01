const admin = require('firebase-admin')
const auth = admin.auth()

const checkOutAuth = (req,res,next) => {
    
    const idCookie = req.cookies.token
    
    if (!idCookie) {
        return res.redirect('/login')
    }
    auth.verifyIdToken(idCookie)
    .then(decodeToken => {
        req.user = decodeToken
        next()
    })
    .catch(err => err.message)
}

module.exports = checkOutAuth