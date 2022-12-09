//importing modules from firestore

import { app, auth, provider } from "./firebaseconfig.js";
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const db = getFirestore(app);


document.getElementById("si-btn").addEventListener("click", signIn);

document.querySelector("#shareBtn").addEventListener("click", (event) => {
  // Fallback, Tries to use API only
  // if navigator.share function is
  // available
  if (navigator.share) {
    navigator
      .share({
        // Title that occurs over
        // web share dialog
        title: "Align",

        // URL to share
        url: "https://Align.com",
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch((err) => {
        // Handle errors, if occured
        console.log("Error while using Web share API:");
        console.log(err);
      });
  } else {
    // Alerts user if API not available
    alert("Browser doesn't support this API !");
  }
});

function signIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(result.user);
      console.log(result.user.uid);
      const aName = result.user.displayName;
      const aPicture = result.user.photoURL;
      const uid = result.user.uid;
      //sets our firestore users db
      setDoc(
        doc(db, "users", uid),
        {
          authorName: aName,
          authorPicture: aPicture,
          userID: uid,
          savedBoycotts: [],
        },
        { merge: true },
      );
      //opens homepage with userid in url 
      window.open(`./homepage.html?user=${uid}`)
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    });
}
