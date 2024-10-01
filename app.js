const express = require('express')

const dotenv = require('dotenv') 
const path = require('path')
const serviceAccount = require('./config/serviceAccount')
const admin = require('firebase-admin'); //para que inicialice firebase
dotenv.config()
const PORT = process.env.PORT ?? 4500
const cookieParser = require('cookie-parser');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const app = express()
const router = require('./routes/viewRoutes')

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser()); //aqui decimos que todas las rutas va a tener el cookier parser

app.use(express.static(path.join(__dirname,"public"))); //path une de una manera segura todos los archivos staticos.
//__dirname lo que hace es leer la pwd de la carpeta y luego unir segun el directorio que deseemos en este caso public

app.use('/',router);

app.listen(PORT,()=>{
    console.log(`Server listening on port http://localhost:${PORT}`);
    
})