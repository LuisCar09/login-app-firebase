const express = require('express')
const router = express.Router()
const checkOutMiddleware = require('../middleware/checkOut')
const LoginAppControllers = require('../controllers/loginApp.controllers')

router.get('/register',LoginAppControllers.registerGet)
router.post('/register',LoginAppControllers.registerPost)

router.get('/dashboard',checkOutMiddleware,LoginAppControllers.dashboard)

router.get('/login',LoginAppControllers.login)

router.post('/login',LoginAppControllers.postLogin)

router.post('/logout',LoginAppControllers.logoutPost)

router.get('/datos',checkOutMiddleware,LoginAppControllers.datos)


router.use((req,res)=>{
    res.send('<h1>Page not found 404</h1>')
})

module.exports = router