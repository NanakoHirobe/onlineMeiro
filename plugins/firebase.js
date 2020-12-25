import firebase from 'firebase'

if(!firebase.apps.length) {

    firebase.initializeApp(
	{
	    apiKey: "AIzaSyBI8uVPDR5N8nL4D7RSDYHcs9JiZzCChWc",
	    authDomain: "onlinemeiro-27659.firebaseapp.com",
	    databaseURL: "https://onlinemeiro-27659.firebaseio.com",
	    projectId: "onlinemeiro-27659",
	    storageBucket: "onlinemeiro-27659.appspot.com",
	    messagingSenderId: "779885789958",
	    appId: "1:779885789958:web:6c7da89a6887215788d487"
	}
    )
}
export default firebase
