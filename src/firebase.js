import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const config = {
	apiKey: "AIzaSyD9Ee_jrXJCqaENmR7IRd3_u_wcaTPUAg8",
	authDomain: "crud-auth-d925b.firebaseapp.com",
	databaseURL: "https://crud-auth-d925b.firebaseio.com",
	projectId: "crud-auth-d925b",
	storageBucket: "crud-auth-d925b.appspot.com",
	messagingSenderId: "61529289410",
	appId: "1:61529289410:web:e6a43fdff2f11ecede015b"
};


// Initialize Firebase
firebase.initializeApp(config); 

export default firebase