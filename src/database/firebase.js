const firebase = require('firebase');
const Rebase = require('re-base');
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBlJft0bAo4hIqpy2nqf52PIAaDxyC2lZI",
  authDomain: "react-music-app-fb81f.firebaseapp.com",
  databaseURL: "https://react-music-app-fb81f.firebaseio.com",
  projectId: "react-music-app-fb81f",
  storageBucket: "react-music-app-fb81f.appspot.com",
  messagingSenderId: "661281054534"
})
const base = Rebase.createClass(firebaseApp.database());
export { firebaseApp };
export default base;