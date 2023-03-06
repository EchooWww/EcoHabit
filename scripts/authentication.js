// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;                            // get the user object from the Firebase authentication database
      if (authResult.additionalUserInfo.isNewUser) {         //if new user
        db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
          name: user.displayName,                    //"users" collection
          email: user.email,                         //with authenticated user's ID (user.uid)
        }).then(function () {
          console.log("New user added to firestore");
          // add a subcollection of "habits" to the new user
          db.collection("users").doc(user.uid).collection("habits");
          // add default habits to the subcollection
          db.collection("users").doc(user.uid).collection("habits").add({
            name: "Ride a bike🚴",
            count: 0,
            continuous_count: 0,
            last_checked: null
          });
          db.collection("users").doc(user.uid).collection("habits").add({
            name: "Eat less meat🥩",
            count: 0,
            continuous_count: 0,
            last_checked: null
          });
          db.collection("users").doc(user.uid).collection("habits").add({
            name: "Do recycling🚮",
            count: 0,
            continuous_count: 0,
            last_checked: null
          });
          db.collection("users").doc(user.uid).collection("habits").add({
            name: "Use reusable bags🛍️",
            count: 0,
            continuous_count: 0,
            last_checked: null
          });
          db.collection("users").doc(user.uid).collection("habits").add({
            name: "Save water💧",
            count: 0,
            continuous_count: 0,
            last_checked: null
          });
          window.location.assign("main.html");       //re-direct to main.html after signup
        }).catch(function (error) {
          console.log("Error adding new user: " + error);
        });
      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "main.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

ui.start("#firebaseui-auth-container", uiConfig);