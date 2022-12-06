// import relevant modules from firebase cdn and local config
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
  import { app } from "./firebaseconfig.js";
  
  // array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const uID = getUserIDFromURL();
  
  // formats date object
  // @param Date
  // @returns string (Month Day Year)
  const format = (date) => {
    // const date = new Timestamp(seconds);
    console.log(date);
    return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
  };
  
  function getUserIDFromURL() {
    const res = new URLSearchParams(window.location.search);
    const user = res.get("user");
    console.log("user", user);
    return user;
  }
  
  function openBoycott(id) {
    // opening boycott in current tab
    window.open(`./boycott.html?id=${id}&user=${uID}`);
  }
  
  // creates boycott element using boycott object from database
  function createBoycottCard({
    date,
    title,
    desc,
    companyName,
    authorName,
    authorPicture,
    tags,
    id,
  }) {
    // console.log(date);
    const dateString = format(date.toDate());
    // jQuery script to write html cleanly
    $(".card-container").append(
      `<article
            id="${id}"
            class="card w-full bg-base-300 shadow-xl transition ease-in duration-200 hover:shadow-2xl hover:lg:scale-[105%] hover:shadow-secondary"
          >
            <div class="card-body">
              <p class="tracking-wider pb-0 font-light text-neutral-content">
                ${dateString}
              </p>
              <h2 class="card-title pb-2">${title}</h2>
              <div class="flex gap-4 h-max place-items-center mb-2">
                <div class="avatar bg-secondary text-neutral-content rounded-full w-8">
                  <img class="rounded-full" src="${authorPicture}" />
                </div>
                <span class="text-secondary">${authorName}</span>
              </div>
              <p>${desc}</p>
              <div class="card-actions justify-end mt-2">
                ${
                  tags == undefined
                    ? ""
                    : tags.map(
                        (tag) =>
                          `<div class="badge badge-accent badge-outline">${tag}</div>`
                      )
                }
              </div>
            </div>
          </article>`
    );
  }
  
  // fetches boycotts from the 'boycotts' collection in the firestore database
  async function fetchData() {

    console.log("fetching data");
    // fetch data
    const db = getFirestore(app);
    const savedRef = collection(db, "boycotts");
    const q = query(savedRef, where("savedUsers", "array-contains", uID));
    const boycotts = await getDocs(q);
  
    // create boycott cards
    boycotts.forEach((b) => createBoycottCard(b.data()));
  
    // listen for clicks on all article elements
    document.querySelectorAll("article").forEach((elem) => {
      // handle click event
      elem.addEventListener("click", () => openBoycott(elem.id));
    });
  }
  
  fetchData();
  