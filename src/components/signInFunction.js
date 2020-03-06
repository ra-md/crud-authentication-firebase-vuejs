import firebase from '@/firebase.js'

function signIn(email, password, callback) {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => {
			callback()
		})
		.catch(err => {
			console.log(err)
		})
}

export default signIn