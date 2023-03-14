const habitList = document.querySelector('.todo-list');
function addHabitItem(name, id) {
  const habitItem = document.createElement('label');
  habitItem.classList.add('todo');

  const checkbox = document.createElement('input');
  checkbox.classList.add('todo__state');
  checkbox.type = 'checkbox';
  habitItem.appendChild(checkbox);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 200 25');
  svg.classList.add('todo__icon');
  habitItem.appendChild(svg);

  const lineUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  lineUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#todo__line');
  lineUse.classList.add('todo__line');
  svg.appendChild(lineUse);

  const boxUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  boxUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#todo__box');
  boxUse.classList.add('todo__box');
  svg.appendChild(boxUse);

  const checkUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  checkUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#todo__check');
  checkUse.classList.add('todo__check');
  svg.appendChild(checkUse);

  const circleUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  circleUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#todo__circle');
  circleUse.classList.add('todo__circle');
  svg.appendChild(circleUse);

  const textDiv = document.createElement('div');
  textDiv.classList.add('todo__text');
  textDiv.textContent = name;
  habitItem.appendChild(textDiv);

  habitItem.setAttribute('data-id', id);
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
