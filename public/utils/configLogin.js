// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1XXt-77I2oKlycOEwP_kOW2CTGidO03U",
  authDomain: "auth-project-00001.firebaseapp.com",
  projectId: "auth-project-00001",
  storageBucket: "auth-project-00001.appspot.com",
  messagingSenderId: "919497700785",
  appId: "1:919497700785:web:839b426384281f28093990"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


const login = async() => {
  
  const divMessage = document.getElementById('loginMessage')
  divMessage.textContent = ''
  try {
   console.log('Entrando al try');
   //Obten los valores de los inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value

    //Validacion entrada
    if (!email || !password ) {
      
      divMessage.textContent = 'must write email and password'
      return;
    }
   
    
    //Autentica usuario con firebase
    const userCredential = await signInWithEmailAndPassword(auth,email,password) //metodo de firebase para autenticar
    
    //obtiene el ID token del usuario autenticado
    const idToken = await userCredential.user.getIdToken()
    
   console.log(userCredential);
   
    
    const response = await fetch('/login',{
      method:'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({idToken})
    })
    const data = await response.json()
    console.log(data);
    
    if (data.success) {
      //esto es como un redirect
     window.location.href = "/dashboard"
     
    }else{
        divMessage.textContent = 'User not authorized'
    }

  } catch (error) {
    console.log(`User not authorized`);
    console.log(error.code);
    console.log(error.message);
    divMessage.textContent = `Error : ${error.message}`
    
  }

}

const loginButton = document.getElementById('loginButton')
loginButton.addEventListener('click',login)