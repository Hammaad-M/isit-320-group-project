import { auth, provider } from "./firebaseconfig.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
  })
  .catch((error) => {
    // Handle Errors here.
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
