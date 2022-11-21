import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
        import { getFirestore, collection, doc,  addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
        
        
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


        //add event listener to submit button
        document.querySelector('#create-bct-btn').addEventListener('click', ()=>{

            //variables to fetch values for boycott
            var company = document.getElementById("boycott-company").value;
            var name = document.getElementById("boycott-name").value;
            var fname = document.getElementById("first-name").value;
            var lname = document.getElementById("last-name").value;
            var bInfo = document.getElementById("description").value;




           //using addDoc function to send JSON data to boycottTest collection
           addDoc(collection(db, "boycottTest"), {
            firstName: fname,
            lastName: lname,
            bctSummary: bInfo, 
            bctCompany: company,
            bctName: name
            })
            
            .then(docRef => {
                console.log("Document has been added successfully");
            })
                .catch(error => {
                     console.log(error);
                });

           
             alert("button is working");  
 
           
           });
           
//-----------------CODE TO BE USED WHEN WE HAVE LIST, EDIT AND DELETE PAGE   -------------------------------------------------------------------------

        //READING
        document.querySelector('#buttonlistingboycott').addEventListener('click', ()=>{      
        //add id selecters for populated fields, fetch the values which should probably be set as place holders and then set variables       
        getDoc(collection(db, "boycottTest", "input boycott id here fetched from listed boycott"), {

        })
        
        .then(docRef => {
            console.log("Document has been added successfully");
        })
            .catch(error => {
                 console.log(error);
            });       
       });

           
        //UPDATING
           document.querySelector('#buttonforediting').addEventListener('click', ()=>{      
        //add id selecters for populated fields, fetch the values which should probably be set as place holders and then set variables       
        updateDoc(collection(db, "boycottTest", "input boycott id here fetched from listed boycott"), {
        firstName: fname,
        lastName: lname,
        bctSummary: bInfo, 
        bctCompany: company,
        bctName: name
        })
        
        .then(docRef => {
            console.log("Document has been added successfully");
        })
            .catch(error => {
                 console.log(error);
            });       
       });

       //DELETING
       document.querySelector('#buttonfordeleting').addEventListener('click', ()=>{ 
       deleteDoc(collection(db, "boycottTest", "input boycott id here fetched from listed boycott"));
    });