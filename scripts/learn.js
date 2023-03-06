//   .collection("learnmore")


// function writelearnmore() {
//     // populate data
//     var learnmoreRef = db.collection("learnmore");

//     learnmoreRef.add({
//         code: "",
//         name: "",
//         info: " ",
//         last_updated: firebase.firestore.FieldValue.serverTimestamp()
//     });

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("learnmoreCardTemplate");

    db.collection(collection).get()   //the collection called "learnmore"
        .then(allLearnmore=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allLearnmore.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
				var learnmoreCode = doc.data().code;    //get unique ID for fetching right image
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${learnmoreCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "eachLearnmore.html?docID="+docID;
                
                //attach to gallery: "learnmore-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("learnmore");  //input param is the name of the collection
