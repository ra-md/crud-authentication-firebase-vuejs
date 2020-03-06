import firebase from '@/firebase.js'

const db = firebase.firestore()
const auth = firebase.auth()

function signUp(email, password, callback) {
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function() {
			createDocument()
			callback()
		})
		.catch(err => {
			console.log(err)
		})

}

function createDocument() {
	db.collection('userCollection').doc(auth.currentUser.uid).set({})
}

export default signUp