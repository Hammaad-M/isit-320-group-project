import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { app } from "./firebaseconfig.js";

async function fetchData() {
  console.log("fetching data");
  const db = getFirestore(app);
  const boycottsRef = collection(db, "users");
  const q = query(boycottsRef, orderBy("timestamp"), limit(25));
  const boycotts = await getDocs(q);
  console.log(boycotts);
  console.log(boycotts.docs);
  boycotts.forEach((b) => console.log(b.data()));
}

fetchData();
