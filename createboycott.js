import { getFirestore, doc, getDoc, setDoc,} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { app } from "./firebaseconfig.js";

const db = getFirestore(app);

//add event listener to submit button
const form = document.querySelector("form");

const uID = getUserIDFromURL();


function getUserIDFromURL() {
  const res = new URLSearchParams(window.location.search);
  const resCheck = res.toString()
if (resCheck.includes("user")){
  
  const user = res.get("user");
  console.log("user", user);
  return user;
}

else{alert("Please log in to create boycott")}

}

function goToBoycottsView(){
  location.replace(`./viewboycotts.html?user=${uID}`)
  
}





const getUserData = async () => {
  try {
    const res = await getDoc(doc(db, "users", uID));
    const data = res.data();
    console.log(data);
    console.log(data.userID);
    return [data.authorName, data.authorPicture, data.userID];
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

  const [authorName, authorPicture, userID] = await getUserData();
  const id = getUniqueID();
  try {
    //using addDoc function to send JSON data to boycottTest collection
    await setDoc(doc(db, "boycotts", id), {
      authorName,
      authorPicture,
      companyName: company,
      userID,
      desc,
      title,
      date: new Date(),
      id,
      tagwords: tags,
      savedUsers: [],
    });

    alert("Boycott Created!");
    goToBoycottsView();

  } catch (err) {
    console.error(err);
  }
});

