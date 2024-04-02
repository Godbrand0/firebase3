// import { initializeApp } from 'firebase/app';
// import{
//     getFirestore,
// }from 'firebase/firestore'

// import{
//     getAuth,
// } from 'firebase/auth'
// const firebaseConfig = {
//     apiKey: "AIzaSyAgYOjcbeDR27n9VwOkWZHk_ogplXjoeLk",
//     authDomain: "signup-auth-df618.firebaseapp.com",
//     projectId: "signup-auth-df618",
//     storageBucket: "signup-auth-df618.appspot.com",
//     messagingSenderId: "237101242701",
//     appId: "1:237101242701:web:0f18464355fa43fe1e7f04"
// };


// //init firebase app
// initializeApp(firebaseConfig);

// //init services

import { initializeApp } from 'firebase/app';
import{
   getFirestore, collection, getDocs,
   addDoc,onSnapshot,
}from 'firebase/firestore'
    
import{
    getAuth,
    createUserWithEmailAndPassword,
    signOut,signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAgYOjcbeDR27n9VwOkWZHk_ogplXjoeLk",
    authDomain: "signup-auth-df618.firebaseapp.com",
    projectId: "signup-auth-df618",
    storageBucket: "signup-auth-df618.appspot.com",
    messagingSenderId: "237101242701",
    appId: "1:237101242701:web:0f18464355fa43fe1e7f04"
};

initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore()




onAuthStateChanged(auth, (user)=>{
   if (user) {
    const colRef = collection(db, 'guides')
    onSnapshot((colRef),snapshot=>{    
      setupGuides(snapshot.docs)
      setupUI(user)
    }, err => {
        console.log(err.message)
    }) 
    } else {
        setupUI()
        setupGuides([])
   }
})


// create new guide

const createForm = document.querySelector('#Create-form');                                      
createForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const titleInput = document.querySelector('#title');
    const contentInput = document.querySelector('#content');                                           

    const colRef = collection(db, 'guides');
    addDoc(colRef, {
        title: titleInput.value,
        content: contentInput.value
        
    })
    .then(() =>{
        createForm.reset()
    })
    .catch((error) => {
        console.error('Error adding document: ', error);
    });
 
})

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
     
     
     signupForm.reset();
    })
})   

const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth)
   

})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        
        loginForm.reset()
    })

  

})