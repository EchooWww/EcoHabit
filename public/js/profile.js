
var ImageFile;      

function chooseFileListener(){
    const fileInput = document.getElementById("mypic-input");   
    const image = document.getElementById("mypic-goes-here");   


    fileInput.addEventListener('change', function(e){

	      ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);

        image.src = blob;    
    })
}
chooseFileListener();

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        var storageRef = storage.ref("images/" + user.uid + ".jpg");

         storageRef.put(ImageFile)
            .then(function () {
                console.log('Uploaded to Cloud Storage.');

                 storageRef.getDownloadURL()
                    .then(function (url) {  
                        console.log("Got the download URL.");

                        userName = document.getElementById('nameInput').value;
                        userCity = document.getElementById('cityInput').value;

                        db.collection("users").doc(user.uid).update({
                                name: userName,
                                city: userCity,
                                profilePic: url 
                            })
                            .then(function () {
                                console.log('Added Profile Pic URL to Firestore.');
                                console.log('Saved use profile info');
                                document.getElementById('personalInfoFields').disabled = true;
                            })
                    })
            })
    })
}


function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
            if (user) {

                currentUser = db.collection("users").doc(user.uid);

                currentUser.get()
                    .then(userDoc => {
                        let userName = userDoc.data().name;
                        let userCity = userDoc.data().city;
                        let picUrl = userDoc.data().profilePic; 

                        if (userName != null) {
                            document.getElementById("nameInput").value = userName;
                        }
                       if (userCity != null) {
                            console.log(userCity)
                            document.getElementById("cityInput").value = userCity;
                        }
                        if (picUrl != null){
                            console.log(picUrl);
								            // use this line if "mypicdiv" is a "div"
                            //$("#mypicdiv").append("<img src='" + picUrl + "'>")
                            $("#mypic-goes-here").attr("src", picUrl);
                        }
                        else
                        console.log("picURL is null");
                    })

            } else {
                console.log("no user is logged in")
            }
        }

    )

}
populateInfo();