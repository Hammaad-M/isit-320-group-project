import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//doc elements
var grabButton = document.getElementById("grab-boycott")
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
document.querySelector(".close").addEventListener("click", closePopup);

//Populate Boycott View and Popup Views
getBoycott();


//functions


async function getBoycott() {

const docRef = doc(db, "boycottTest", "v0ekywdRHoTDOmNb40tb");
const docSnap = await getDoc(docRef);
const data = docSnap.data();

let boycottTitle = data.title;
let boycottCompany = data.companyName;
let authorName = data.authorName;
let date = data.date;
let description = data.desc

viewBoycottTitle.innerHTML = boycottTitle;
viewBoycottCompany.innerHTML = boycottCompany;
viewAuthorName.innerHTML = authorName;
viewCreateDate.innerHTML = date;
viewDescription.innerHTML = description;





popBoycottTitle.value = boycottTitle;
popCompanyName.value = boycottCompany;
popDescription.value = description;
    
  }

function editPopup(){
  document.querySelector(".popup").style.display = "flex";
}

function closePopup(){
  document.querySelector(".popup").style.display = "none";
}


async function saveEdittedBoycott(){
    await setDoc(doc(db, "boycottTest", "v0ekywdRHoTDOmNb40tb"), {
      //include if else for user editting = author


      
      title: popBoycottTitle.value,
      companyName: popCompanyName.value,
      desc: popDescription.value,
  

    //close popup window
    //run getboycott() to update values
    
},
{merge:true}
);

closePopup();
getBoycott();

  }