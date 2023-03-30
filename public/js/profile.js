var ImageFile;

//let user choose the pic file and upload
function uploadFile() {
    const image = document.getElementById("mypic-goes-here");
    const fileInput = document.getElementById("img-upload");

    fileInput.addEventListener("change", function (e) {
        ImageFile = e.target.files[0];
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob;
    });

    const addPhotoButton = document.getElementById("add-photo-button");
    addPhotoButton.addEventListener("click", function () {
        fileInput.click();
    });
}

uploadFile();


//Populate user info stored in Firebase
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                .then(userDoc => {
                    let userName = userDoc.data().name;
                    let userCity = userDoc.data().city;
                    let userEmail = userDoc.data().email;

                    let picUrl = userDoc.data().profilePic;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userCity != null) {
                        console.log(userCity)
                        document.getElementById("cityInput").value = userCity;
                    }
                    if (userEmail != null) {
                        console.log(userEmail)
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (picUrl != null) {
                        console.log(picUrl);
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

function updateUserInfo() {
    firebase.auth().onAuthStateChanged(function (user) {
        const userName = document.getElementById('nameInput').value;
        const userCity = document.getElementById('cityInput').value;

        if (ImageFile) { // if new image is selected
            const storageRef = storage.ref().child(`images/${user.uid}.${ImageFile.name.split('.').pop()}`);
            const uploadTask = storageRef.put(ImageFile);

            uploadTask.on('state_changed', null, function (error) {
                console.error('Error uploading profile image:', error);
            }, function () {
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    db.collection("users").doc(user.uid).update({
                        name: userName,
                        city: userCity,
                        profilePic: downloadURL
                    }).then(function () {
                        console.log('Saved user profile info with new image');
                        document.getElementById('personalInfoFields').disabled = true;
                        Swal.fire({
                            title: 'Success!',
                            text: `Profile updated successfully`,
                            icon: 'success'
                        });
                    });
                });
            });
        } else { // if no new image is selected
            db.collection("users").doc(user.uid).update({
                name: userName,
                city: userCity
            }).then(function () {
                console.log('Saved user profile info without new image');
                document.getElementById('personalInfoFields').disabled = true;
                Swal.fire({
                    title: 'Success!',
                    text: `Profile updated successfully`,
                    icon: 'success'
                });
            });
        }
    });
}

document.getElementById('saveButton').addEventListener('click', updateUserInfo);




// Function to read the quote of the day from Firestore "quotes" collection
// Input param is the String representing the day of the week, aka, the document name
const weekday = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const d = new Date();
let day = weekday[d.getDay()];
function readQuote(day) {
    db.collection("quotes").doc(day)

        .onSnapshot(weekdayDoc => {
            document.getElementById("quote-goes-here").innerHTML = weekdayDoc.data().quote;
        })
}
readQuote(day);       