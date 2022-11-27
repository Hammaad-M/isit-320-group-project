import {
  getFirestore,
  collection,
  getDocs,
  query,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { app } from "./firebaseconfig.js";

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

const format = (date) => {
  // const date = new Timestamp(seconds);
  console.log(date);
  return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
};

function createBoycottCard({
  date,
  title,
  desc,
  companyName,
  authorName,
  authorPicture,
  tags,
}) {
  // console.log(date);
  const dateString = format(date.toDate());
  $(".card-container").append(
    `<article
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
              ${tags.map(
                (tag) =>
                  `<div class="badge badge-accent badge-outline">${tag}</div>`
              )}
            </div>
          </div>
        </article>`
  );
}

async function fetchData() {
  console.log("fetching data");
  const db = getFirestore(app);
  const boycottsRef = collection(db, "boycotts");
  const q = query(boycottsRef);
  const boycotts = await getDocs(q);

  boycotts.forEach((b) => console.log(b.data()));
  boycotts.forEach((b) => createBoycottCard(b.data()));
}

fetchData();
