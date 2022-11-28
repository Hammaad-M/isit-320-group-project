// import {
//   getFirestore,
//   collection,
//   doc,
//   addDoc,
//   getDoc,
//   updateDoc,
//   deleteDoc,
// } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// const dbRef = ref(getDatabase());
// getDoc((dbRef, `boycottTest/3x7I2Oph4Oz9GFPUCBU4`))
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const db = getDatabase();
const starCountRef = ref(db, "posts/" + postId + "/starCount");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  updateStarCount(postElement, data);
});
