import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  arrayUnion,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdwtAPwaM9mqHMXSrobtiWRGjLUidz6as",
  authDomain: "align-d4038.firebaseapp.com",
  projectId: "align-d4038",
  storageBucket: "align-d4038.appspot.com",
  messagingSenderId: "540706810436",
  appId: "1:540706810436:web:b05f6cdd7736a5405b2a11",
  measurementId: "G-NS4V9CKKD3",
};

//global variables
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const bID = getBoycottIDFromURL();
const uID = getUserIDFromURL()





//boycott view fields
var viewBoycottTitle = document.getElementById("boycott-title");
var viewBoycottCompany = document.getElementById("company-name");
var viewAuthorName = document.getElementById("author-name");
var viewCreateDate = document.getElementById("create-date");
var viewDescription = document.getElementById("boycott-description");

//popup view fields
var popBoycottTitle = document.getElementById("pu-boycott-title");
var popCompanyName = document.getElementById("pu-company");
var popDescription = document.getElementById("pu-description");



//event listeners
document.getElementById("edit-boycott").addEventListener("click", editPopup);
document.getElementById("save-editted-boycott").addEventListener("click", saveEdittedBoycott);
document.getElementById("save-boycott").addEventListener("click", saveBoycottToUser);
document.getElementById("delete-boycott").addEventListener("click", deleteBoycott);
document.querySelector(".close").addEventListener("click", closePopup);

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

//Populate Boycott View and Popup Views




getBoycott();


//functions

function getBoycottIDFromURL() {
  const res = new URLSearchParams(window.location.search);
  const category = res.get("id");
  console.log("id", category);
  return category;
} 

function getUserIDFromURL() {
  const res = new URLSearchParams(window.location.search);
  const user = res.get("user");
  console.log("user", user);
  return user;
}



async function getBoycott() {

const docRef = doc(db, "boycotts", bID);
const docSnap = await getDoc(docRef);
const data = docSnap.data();

console.log(data);

let boycottTitle = data.title;
let boycottCompany = data.companyName;
let authorName = data.authorName;
let date = data.date;
let description = data.desc;

viewBoycottTitle.innerHTML = boycottTitle;
viewBoycottCompany.innerHTML = boycottCompany;
viewAuthorName.innerHTML = authorName;
viewCreateDate.innerHTML = date;
viewDescription.innerHTML = description;





popBoycottTitle.value = boycottTitle;
popCompanyName.value = boycottCompany;
popDescription.value = description;
    
  }

async function deleteBoycott(){
  //include confirmation messaging to delete the boycott
  
  const docRef = doc(db, "boycotts", bID);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  let userId = data.userID;

  if (uID==userId){

  await deleteDoc(doc(db, "boycotts", bID ));
  alert(viewBoycottTitle.innerHTML + " has been deleted");
  goToBoycottsView()
  } else {alert("Can only be deleted by author")}

  closePopup();

}


function goToSavedBoycottsView(){
  location.replace(`./savedboycotts.html?user=${uID}`)
}

function goToBoycottsView(){
  location.replace(`./viewboycotts.html?user=${uID}`)

}


function editPopup(){
  document.querySelector(".popup").style.display = "flex";
}

function closePopup(){
  document.querySelector(".popup").style.display = "none";
}


async function saveBoycottToUser(){

  alert("Boycott Saved");
  
  const docRef = doc(db, "boycotts", bID);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  let saveUserId = uID;
//
// Atomically add a new region to the "regions" array field.
await updateDoc(docRef, {
    savedUsers: arrayUnion(saveUserId)
});

goToSavedBoycottsView();


  }


async function saveEdittedBoycott(){
  
  const docRef = doc(db, "boycotts", bID);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  let userId = data.userID;
  let boycottID = data.id


  

 // if category != 
if (uID==userId){
    await setDoc(doc(db, "boycotts", boycottID), {
      //include if else for user editting = author


      
      title: popBoycottTitle.value,
      companyName: popCompanyName.value,
      desc: popDescription.value,
  

    //close popup window
    //run getboycott() to update values
    
},
{merge:true}
)} 

else{
  alert("Editting only available to creator")
}

closePopup();
getBoycott();

  }