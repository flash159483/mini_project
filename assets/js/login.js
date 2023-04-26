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

// login.html
if (document.getElementById('googleBtn')) {
    document.getElementById('googleBtn').onclick = function () {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...

                // name = displayname
                // email = email
                // photo = photoURL
                // alert(user.uid);          

                const link = "time.html";
                location.replace(link);

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                alert(errorCode);
            });
    };
}

// time.html
if (document.getElementById('logOutBtn')) {
    document.getElementById('logOutBtn').onclick = function () {

        const auth = getAuth();
        auth.signOut();

        const link = "index.html";
        location.replace(link);
    };
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // alert(uid);
        // document.getElementsByClassName("btn btn-primary")[0].innerHTML="Log Out";
        if (document.getElementById("signUpBtn"))
            document.getElementById("signUpBtn").innerHTML = "Log Out";
        // ...
    } else {
        // User is signed out
        // ...
        if (document.getElementById('logOutBtn')) {
            const link = "index.html";
            alert("이용하시려면 로그인하셔야됩니다");
            location.replace(link);

        }
    }
});

// index.html
if (document.getElementById('signUpBtn')) {
    signUpBtn.addEventListener("click", function () {
        if (this.innerHTML == "Sign Up") {
            const link = "login.html";
            location.replace(link);
        } else {
            alert("로그아웃 되었습니다.");
            this.innerHTML = "Sign Up";
            auth.signOut();
        }
    });
}

export { firebaseConfig };