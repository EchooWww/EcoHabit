// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;                            // get the user object from the Firebase authentication database
      if (authResult.additionalUserInfo.isNewUser) {         //if new user
        const newUserRef = db.collection("users").doc(user.uid);

        const batch = db.batch();

        // Create the user document
        batch.set(newUserRef, {
          name: user.displayName,
          email: user.email
        });

        // Create the habits sub-collection
        const habitsRef = newUserRef.collection("habits");
        batch.set(habitsRef.doc(), {
          name: "Ride a bike🚴",
          count: 0,
          continuous_count: 0,
          last_checked: null
        });
        batch.set(habitsRef.doc(), {
          name: "Eat less meat🥩",
          count: 0,
          continuous_count: 0,
          last_checked: null
        });
        batch.set(habitsRef.doc(), {
          name: "Do recycling🚮",
          count: 0,
          continuous_count: 0,
          last_checked: null
        });
        batch.set(habitsRef.doc(), {
          name: "Use reusable bags🛍️",
          count: 0,
          continuous_count: 0,
          last_checked: null
        });
        batch.set(habitsRef.doc(), {
          name: "Save water💧",
          count: 0,
          continuous_count: 0,
          last_checked: null
        });

        // Commit the batch
        batch.commit().then(() => {
          console.log("New user added to firestore");
          window.location.assign("main.html");
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