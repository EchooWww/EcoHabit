const habitList = document.querySelector('#habit-list');
const addHabitButton = document.querySelector('#add-habit');

// Array to store changes made to habit items
let habitChanges = [];

// Add event listener for the Add Habit button
addHabitButton.addEventListener('click', () => {
  const habitName = prompt("Enter a name for the new habit:");
  if (habitName) {
    addHabitItem(habitName);
    // Add new habit to changes array
    habitChanges.push({ type: 'add', name: habitName });
  }
});

// Add or delete a habit item from the list
function addHabitItem(name, id) {
  const habitItem = document.createElement('li');
  habitItem.classList.add('habit-text');
  habitItem.textContent = name;

  // Add a unique identifier attribute to the HTML element
  habitItem.setAttribute('data-id', id);

  // Add event listener for the Delete Habit button, show a confirmation popup and only proceed with deletion if the user confirms.
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-link', 'text-decoration-none');
  deleteButton.textContent = '×';
  deleteButton.style.fontSize = '25pt'
  deleteButton.style.color = 'red';
  deleteButton.style.fontWeight = 'bold';



  deleteButton.addEventListener('click', () => {
    const confirmDelete = confirm(`Are you sure to remove ${name} from your habit list?`);
    if (confirmDelete) {
      const habitId = habitItem.getAttribute('data-id');
      habitList.removeChild(habitItem);      // Add habit removal to changes array
      habitChanges.push({ type: 'remove', name: name });
      saveHabitsToFirestore();
    }
  });
  habitItem.appendChild(deleteButton);

  habitList.appendChild(habitItem);
}


// Load the user's habit list from firestore
function loadHabitsFromFirestore() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      db.collection('users').doc(user.uid).collection('habits').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          addHabitItem(doc.data().name);
        });
      }).catch((error) => {
        console.error("Error loading habits from Firestore: ", error);
      });
    }
  });
}
loadHabitsFromFirestore();

function saveHabitsToFirestore() {
  const userID = firebase.auth().currentUser.uid;
  const batch = db.batch();

  habitChanges.forEach((change) => {
    const habitRef = db.collection('users').doc(userID).collection('habits').doc(); // get a new document ID
    if (change.type === 'add') {
      batch.set(habitRef, {
        name: change.name,
        count: 0,
        continious_count: 0,
        last_checked: null
      });
    } else if (change.type === 'remove') {
      const habitDocRef = db.collection('users').doc(userID).collection('habits');
      habitDocRef.where("name", "==", change.name).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
    }
  });

  batch.commit().then(() => {
    console.log('Batch write to Firestore successful');
  }).catch((error) => {
    console.error('Error writing batch to Firestore: ', error);
  });
}
