//to insert username from database
function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid); 
      console.log(user.displayName); 
      user_Name = user.displayName;
      $("#name-goes-here").text(user_Name); 
      $("#name-goes-here1").text(user_Name); 

    } 
  });
}
insertName(); 