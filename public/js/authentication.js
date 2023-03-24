// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // get the user object from the Firebase authentication database
      var user = authResult.user;
      //if the user is new                 
      if (authResult.additionalUserInfo.isNewUser) {
        const newUserRef = db.collection("users").doc(user.uid);
        const batch = db.batch();
        // Create the user document
        batch.set(newUserRef, {
          name: user.displayName,
          email: user.email
        });
        // Create the habits sub-collection, with default habits
        const habitsRef = newUserRef.collection("habits");
        batch.set(habitsRef.doc(), {
          name: "Ride a bike🚴",
          count: 0,
          continuous_count: 0,
          last_checked: null,
          checked: false,
          checked_dates: []
        });
        batch.set(habitsRef.doc(), {
          name: "Eat less meat🥩",
          count: 0,
          continuous_count: 0,
          last_checked: null,
          checked: false,
          checked_dates: []
        });
        batch.set(habitsRef.doc(), {
          name: "Do recycling🚮",
          count: 0,
          continuous_count: 0,
          last_checked: null,
          checked: false,
          checked_dates: []
        });
        batch.set(habitsRef.doc(), {
          name: "Use reusable bags🛍️",
          count: 0,
          continuous_count: 0,
          last_checked: null,
          checked: false,
          checked_dates: []
        });
        batch.set(habitsRef.doc(), {
          name: "Save water💧",
          count: 0,
          continuous_count: 0,
          last_checked: null,
          checked: false,
          checked_dates: []
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
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

ui.start("#firebaseui-auth-container", uiConfig);