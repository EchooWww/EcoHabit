

//   .collection("learnmore")


// function writelearnmore() {
//     // populate data
//     var learnmoreRef = db.collection("learnmore");

//     learnmoreRef.add({
//         code: "name of image",
//         name: "",
//         info: " ",
//         last_updated: firebase.firestore.FieldValue.serverTimestamp()
//     });

function displayLearnmoreInformation(){
    //retreive the document id from the url
    let params = new URL(window.location.href) //get the url from the searbar
    let ID = params.searchParams.get("docID");
    console.log(ID);

    db.collection("learnmore").doc(ID).get().then( thisLearnmore =>{
        learmoreInfo = thisLearnmore.data();
        learnmoreCode = learnmoreInfo.code;
        learnmoreName = learnmoreInfo.name;

        document.getElementById("learnmoreName").innerHTML=hikeName;
        let imgEvent = document.querySelector( ".learnmore-img" );
        imgEvent.src = "../images/" + learnmoreCode + ".jpg";
    }

    )

}
displayLearnmoreInformation();

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
                newcard.querySelector('a').href = "learnmore.html?docID="+docID;
                
                //attach to gallery: "learnmore-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("learnmore");  //input param is the name of the collection
