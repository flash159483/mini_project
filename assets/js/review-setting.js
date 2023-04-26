import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAiVOFKSUCQUBCe2ynqrcDdiP5rz2ULEjc",
    authDomain: "chatapp-d20dc.firebaseapp.com",
    projectId: "chatapp-d20dc",
    storageBucket: "chatapp-d20dc.appspot.com",
    messagingSenderId: "406808996835",
    appId: "1:406808996835:web:7968975ad6aa1764e68ed6",
    measurementId: "G-E56TL9L001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);
let uid;

onAuthStateChanged(auth, (user) => {
	if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			uid = user.uid;
			
			// ...
	} else {
			// User is signed out
			// ...
			
	}
});

jQuery(document).ready(function () {
	jQuery("#add-event").submit(function () {
		// alert("Submit Start");
		var values = {};
		$.each($('#add-event').serializeArray(), function (i, field) {
			values[field.name] = field.value;
		});
		values['uid'] = uid;

		const today = new Date();
		const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const str = `${month[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`;
		values['time'] = str;
		// console.log(values);
		// DB로 저장
		alert("Submitted");
	});
	if(localStorage.getItem('name')){
		const name = localStorage.getItem('name');
		console.log(name);
		searchTable(name);
	}
});


function searchTable(name) {
	document.getElementById('name').innerHTML = name;
	var table = document.getElementsByClassName("card");
	
	for (var i = 0; i < table.length; i++) {
		const tmp = table[i].getElementsByClassName('card-title')[0].innerHTML;

		if (name.includes(tmp)) {
			table[i].style.display ="";
		} else {
			table[i].style.display = "none";
		}
	}
}