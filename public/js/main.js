const habitList = document.querySelector('.todo-list');
const addHabitButton = document.querySelector('.todo__add');
addHabitButton.style.display = 'flex';
addHabitButton.style.alignItems = 'center';
addHabitButton.style.marginLeft = '15%';
addHabitButton.style.marginRight = '15%';
addHabitButton.style.marginTop = '0';
addHabitButton.style.paddingTop = '0';

// Array to store changes made to habit items
let habitChanges = [];

// Pop-up window for adding or deleting list-item
addHabitButton.addEventListener('click', () => {
  Swal.fire({
    title: 'Add a New Habit',
    text: `Please enter the name of the new habit ✍️`,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Add Habit',
    showLoaderOnConfirm: true,
    preConfirm: (habitName) => {
      if (habitName) {
        addHabitItem(habitName);
        habitChanges.push({ type: 'add', name: habitName });
        saveHabitsToFirestore();
        return habitName;
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Success!',
        text: `The habit '${result.value}' was added successfully.`,
        icon: 'success'
      });
    }
  });
});


function addHabitItem(name, id) {
  // Creates list items
  const habitItem = document.createElement('label');
  habitItem.classList.add('todo');
  habitItem.style.display = 'flex';
  habitItem.style.alignItems = 'center';
  habitItem.style.marginLeft = '15%';
  habitItem.style.marginRight = '15%';

  // Adds checkbox input
  const checkbox = document.createElement('input');
  checkbox.classList.add('todo__state');
  checkbox.type = 'checkbox';
  habitItem.appendChild(checkbox);

  // 'x' button to delete list items
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-link', 'text-decoration-none', 'btn-delete');
  deleteButton.textContent = '×';
  deleteButton.style.fontSize = '35pt'
  deleteButton.style.color = '#93BFCF';
  deleteButton.style.fontWeight = 'bold';
  deleteButton.style.position = 'absolute';
  deleteButton.style.right = '0';

  // Remove list item after 'x' is clicked
  deleteButton.addEventListener('click', () => {
    Swal.fire({
      title: 'Remove the Habit',
      text: `Are you sure to remove "${name}" from your habit list?`,
      showCancelButton: true,
      icon: 'warning',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        habitList.removeChild(habitItem);
        // Add habit removal to changes array
        habitChanges.push({ type: 'remove', name: name });
        saveHabitsToFirestore();
        Swal.fire({
          title: 'Success!',
          text: `The habit '${name}' was removed successfully.`,
          icon: 'success'
        });
      }
    });
  });

  // List items
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 200 25');
  svg.classList.add('todo__icon');
  habitItem.appendChild(svg);
  habitItem.insertBefore(deleteButton, svg.nextSibling); // insert delete button after checkbox

  // Strikeout line for checking box
  const lineUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  lineUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#todo__line');
  lineUse.classList.add('todo__line');
  svg.appendChild(lineUse);

  // Checkbox
  const boxUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  boxUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#todo__box');
  boxUse.classList.add('todo__box');
  svg.appendChild(boxUse);

  // Checkmark
  const checkUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  checkUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#todo__check');
  checkUse.classList.add('todo__check');
  svg.appendChild(checkUse);

  // Creating new list-item
  const textDiv = document.createElement('div'); // New div
  textDiv.classList.add('todo__text'); // Assign todo__text class
  textDiv.textContent = name;
  habitItem.appendChild(textDiv);
  habitItem.setAttribute('data-id', id);
  habitItem.appendChild(deleteButton);
  habitList.appendChild(habitItem); // Add created list-item to array "habitList"
}



// Load the user's habit list from firestore
function loadHabitsFromFirestore() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // Checks to see if user is logged in
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


// Save the user's habit to firestore
function saveHabitsToFirestore() {
  const userID = firebase.auth().currentUser.uid;

  habitChanges.forEach((change) => {
    const habitRef = db.collection('users').doc(userID).collection('habits').doc(); // get a new document ID
    if (change.type === 'add') {
      set(habitRef, {
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
}


