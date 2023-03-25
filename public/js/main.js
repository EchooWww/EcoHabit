const habitList = document.querySelector('.todo-list');

//---------Front-end related functions--------//

//show polar bear gifs randomly
let randomIndex;
function randomImage() {
  // array of image file names
  const images = ["/img/sleep.gif", "/img/sit.gif"];
  // generate a random index
  randomIndex = Math.floor(Math.random() * images.length);
  // get the image element
  const myImage = document.getElementById("polarbear");
  // set the source of the image element to the randomly selected image 
  myImage.src = images[randomIndex];
}

//The add habit button
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

//add habit items to the front-end habit list dynamically
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

  // Responsive animation when checkbox is checked
   checkbox.addEventListener('change', function () {
    const myImage = document.getElementById("polarbear");
    if (this.checked) {
      // Checks to see if polarbear is sitting or sleeping
      if (randomIndex === 0) {
        //Checkbox is checked, so change to interaction GIF
        myImage.src = '/img/sleep-interaction.gif';
        //Delays by set milliseconds before switching back to original GIF
        setTimeout(function () {
          myImage.src = '/img/sleep.gif';
        }, 800);
      } else if (randomIndex === 1) {
        //Checkbox is checked, so change to interaction GIF
        myImage.src = '/img/sit-interact.gif';
        //Delays by set milliseconds before switching back to original GIF
        setTimeout(function () {
          myImage.src = '/img/sit.gif';
        }, 1300);
      }
    }  
  });

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

//--------------Front-end ends----------------//


//---------Firestore related functions--------//
// Load the user's habit list from firestore and call it immediately
function loadHabitsFromFirestore() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // Checks to see if user is logged in
      db.collection('users').doc(user.uid).collection('habits').get().then((querySnapshot) => {
        //call the addHabitItem() function to add habits to the front-end
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
  const dbRef = db.collection('users').doc(userID).collection('habits');
  habitChanges.forEach((change) => {
    if (change.type === 'add') {
      dbRef.add({
        name: change.name,
        count: 0,
        continious_count: 0,
        last_checked: null,
        checked: false,
        checked_dates: []
      }).then(() => {
        console.log('Habit added to Firestore');
      }).catch((error) => {
        console.error('Error adding habit to Firestore: ', error);
      });
    } else if (change.type === 'remove') {
      dbRef.where("name", "==", change.name).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            console.log('Habit removed from Firestore');
          }).catch((error) => {
            console.error('Error removing habit from Firestore: ', error);
          });
        });
      });
    }
  });
}

//The function to load and update habit status
function syncCheckedWithFirestore() {
  const user = firebase.auth().currentUser;
  const dbRef = db.collection('users').doc(user.uid).collection('habits');
  // Attach a "change" event listener to the parent element of all .todo__state checkboxes
  document.addEventListener('change', (event) => {
    const target = event.target;
    if (target.matches('.todo__state')) {
      const name = target.closest('.todo').querySelector('.todo__text').textContent;
      const checked = target.checked;
      const habitRef = dbRef.where('name', '==', name).limit(1);

      // Update the checked status of the habit in Firestore
      habitRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const habit = doc.data();
          const checked_dates = habit.checked_dates || [];

          // Add or remove current date from checked_dates array based on checked status
          if (checked) {
            checked_dates.push(firebase.firestore.Timestamp.now());
          } else {
            const index = checked_dates.indexOf(habit.last_checked);
            if (index > -1) {
              checked_dates.splice(index, 1);
            }
          }
          doc.ref.update({
            checked: checked,
            count: firebase.firestore.FieldValue.increment(checked ? 1 : -1),
            checked_dates: checked_dates
          });
        });
      });
    }
  });
  // Load the checked status of all habits from Firestore
  dbRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const name = doc.data().name;
      const checked = doc.data().checked;
      const todoTextElements = document.querySelectorAll('.todo__text');
      const todoTextElement = Array.from(todoTextElements).find(element => element.textContent.includes(`${name}`));
      const parentElement = todoTextElement.closest('.todo');
      // Set the checked status of the corresponding checkbox
      const checkbox = parentElement.querySelector('.todo__state');
      checkbox.checked = checked;
    });
  });
}

//reset the checked status to false if user opens EcoHabit a day after the last habit is checked
function resetCheckedStatus() {
  const user = firebase.auth().currentUser;
  const dbRef = db.collection('users').doc(user.uid).collection('habits');

  // Get the latest checked habit
  dbRef.where('checked', '==', true)
    .orderBy('last_checked', 'desc')
    .limit(1)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const lastCheckedDate = doc.data().last_checked.toDate();
        const now = new Date();
        // Check if the current date is greater than the date of the latest checked habit
        if (now.getFullYear() > lastCheckedDate.getFullYear() ||
          (now.getFullYear() == lastCheckedDate.getFullYear() && now.getMonth() > lastCheckedDate.getMonth()) ||
          (now.getFullYear() == lastCheckedDate.getFullYear() && now.getMonth() == lastCheckedDate.getMonth() && now.getDate() > lastCheckedDate.getDate())) {
          // Reset all checked habits to unchecked
          dbRef.where('checked', '==', true)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                doc.ref.update({
                  checked: false,
                  last_checked: checked_dates.slice(-1)[0]
                });
              });
            });
        }
      });
    });
}

//-----------------Firestore ends----------------//


//call some functions immediately after the page is loaded
window.onload = function () {
  randomImage();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      syncCheckedWithFirestore();
      resetCheckedStatus();
    }
  });
};



