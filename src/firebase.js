import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const config = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: ""
};


// Initialize Firebase
firebase.initializeApp(config); 

export default firebase
