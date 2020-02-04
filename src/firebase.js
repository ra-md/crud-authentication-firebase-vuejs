import firebase from 'firebase/app';
import 'firebase/firestore'

// Your web app's Firebase configuration
const config = {
	apiKey: "API_KEY",
	authDomain: "AUTH_DOMAIN",
	databaseURL: "DATABASE_URL",
	projectId: "PROJECT_ID",
	storageBucket: "STORAGE_BUCKET_ID",
	messagingSenderId: "MESSAGING_SENDER_ID",
	appId: "APP_ID"
};


// Initialize Firebase
firebase.initializeApp(config); 

export const todoCollection = firebase.firestore().collection('todos');
// export default firebase