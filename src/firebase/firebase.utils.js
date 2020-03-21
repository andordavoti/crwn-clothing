import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBIu-ulhFZ5hO4zVEm5rbLweWvS_896kw0",
    authDomain: "crwn-clothing-983fb.firebaseapp.com",
    databaseURL: "https://crwn-clothing-983fb.firebaseio.com",
    projectId: "crwn-clothing-983fb",
    storageBucket: "crwn-clothing-983fb.appspot.com",
    messagingSenderId: "223900266260",
    appId: "1:223900266260:web:3bfb7c9b2f1f4c352c9c01",
    measurementId: "G-8HW5F66HGE"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()

provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase