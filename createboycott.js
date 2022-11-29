import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { app } from "./firebaseconfig.js";

const db = getFirestore(app);

//add event listener to submit button
const form = document.querySelector("form");

const getUserData = async () => {
  try {
    const res = await getDoc(doc(db, "users", "roy6M81BV1JVxaOu7GcW"));
    const data = res.data();
    return [data.name, data.picture];
  } catch (err) {
    console.error(err);
  }
};
getUserData();

const getUniqueID = () => {
  return `${Date.now()}`;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //letiables to fetch values for boycott
  const fields = ["company", "tags", "desc", "title"];
  let [company, tags, desc, title] = fields.map(
    (field) => document.getElementById(field).value
  );

  tags = tags.split(",");
  for (let i = 1; i < tags.length; i++) {
    if (tags[i].substr(0, 1) === " ") {
      tags[i] = tags[i].substr(1);
    }
  }

  const [authorName, authorPicture] = await getUserData();
  const id = getUniqueID();
  try {
    //using addDoc function to send JSON data to boycottTest collection
    await setDoc(doc(db, "boycotts", id), {
      authorName,
      authorPicture,
      companyName: company,
      desc,
      title,
      date: new Date(),
      id,
    });

    console.log("Document has been added successfully");
  } catch (err) {
    console.error(err);
  }
});

//-----------------CODE TO BE USED WHEN WE HAVE LIST, EDIT AND DELETE PAGE   -------------------------------------------------------------------------

//   //READING
//   document
//     .querySelector("#buttonlistingboycott")
//     .addEventListener("click", () => {
//       //add id selecters for populated fields, fetch the values which should probably be set as place holders and then set letiables
//       getDoc(
//         collection(
//           db,
//           "boycottTest",
//           "input boycott id here fetched from listed boycott"
//         ),
//         {}
//       )
//         .then((docRef) => {
//           console.log("Document has been added successfully");
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     });

//   //UPDATING
//   document
//     .querySelector("#buttonforediting")
//     .addEventListener("click", () => {
//       //add id selecters for populated fields, fetch the values which should probably be set as place holders and then set letiables
//       updateDoc(
//         collection(
//           db,
//           "boycottTest",
//           "input boycott id here fetched from listed boycott"
//         ),
//         {
//           firstName: fname,
//           lastName: lname,
//           bctSummary: bInfo,
//           bctCompany: company,
//           bctName: name,
//         }
//       )
//         .then((docRef) => {
//           console.log("Document has been added successfully");
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     });

//   //DELETING
//   document
//     .querySelector("#buttonfordeleting")
//     .addEventListener("click", () => {
//       deleteDoc(
//         collection(
//           db,
//           "boycottTest",
//           "input boycott id here fetched from listed boycott"
//         )
//       );
//     });
