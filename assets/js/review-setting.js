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
	var search = new URLSearchParams(window.location.search);
	var clickedName = search.get("mentor");
	jQuery("#add-event").submit(function (event) {
		// alert("Submit Start");
		var formData = new FormData();
		$.each($('#add-event').serializeArray(), function (i, field) {
			formData.append(field.name, field.value);
			console.log(field.name);
		});

		const today = new Date();
		const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const str = `${month[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`;
		formData.append("time", str);
		formData.append("name", clickedName);
		// DB로 저장
		fetch('http://13.209.83.66/api/comment', {
			method: 'POST',
			body: formData
		})
			.catch(error => alert(error));
		alert("Submitted");
		event.preventDefault();
		location.reload();
	});
	console.log(clickedName);
	document.getElementById("name").innerHTML = clickedName + " 멘토님";
	console.log(clickedName)
	fetch("http://13.209.83.66/api/comment-by-name?name=" + clickedName)
		.then(response => response.json())
		.then(value => {
			const container = document.getElementById("card-container");

			for (var i = 0; i < value.length; i++) {
				const card = document.createElement("div");
				card.classList.add("card", "col-md-12", "mb-3");

				const cardBody = document.createElement("div");
				card.classList.add("card-body", "shadow");
				console.log(value[i]);
				const cardTitle = document.createElement("h5");
				cardTitle.classList.add("card-title");
				cardTitle.textContent = value[i]["title"];

				const cardText = document.createElement("p");
				cardText.classList.add("card-text");
				cardText.textContent = value[i]["comment"];

				const cardFooter = document.createElement("div");
				cardFooter.classList.add("card-footer");
				cardFooter.textContent = value[i]["time"];

				cardBody.appendChild(cardTitle);
				cardBody.appendChild(cardText);
				cardBody.appendChild(cardFooter);
				card.appendChild(cardBody);
				container.appendChild(card);
			}
		})

});

