const path = require('path');
const admin = require('firebase-admin');
const auth = admin.auth();

const LoginAppControllers = {
    registerGet : async (req,res) => {
        res.sendFile(path.join(__dirname,'../public/views',"register.html"))
    },
    registerPost : async (req,res) => {
        const {email,password } = req.body;
        try {
            const data = await auth.createUser({
                email,
                password
            })
            
            res.redirect('/login')
        } catch (error) {
            console.error(`Error from server: ${error.message}`)
            res.redirect('/register')
        }
    }
    ,
    login: async(req,res)=>{
        res.sendFile(path.join(__dirname,'../public/views',"login.html"))
    },
    postLogin: async(req,res) => {
        const {idToken} = req.body;
        try {
            
            await auth.verifyIdToken(idToken)
            res.cookie('token',idToken,{httpOnly:true,secure:false})
            res.json({success:true})
        } catch (error) {
            console.error('Error auth');
            res.status(401).json({error:'Invalid token'})
        }

    },

    dashboard: async(req,res)=>{
        res.sendFile(path.join(__dirname,'../public/views',"dashboard.html"))
    },
    datos: async(req,res) => {
        res.send('<h1>Datos</h1>')
    }
    ,
    logoutPost : async (req,res) => {
        res.clearCookie('token')
        res.redirect('/login')
    }
}

module.exports = LoginAppControllers