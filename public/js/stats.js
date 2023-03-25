// Get a reference to the habit document in Firestore
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    const habitDocRef = db.collection('users').doc(user.uid).collection('habits').doc(habitId);

    // Listen for changes to the checked_dates field
    habitDocRef.onSnapshot((doc) => {
      const habit = doc.data();
      const checkedDates = habit.checked_dates || [];

      // Render the events on the calendar
      $('#calendar').fullCalendar('removeEvents');
      const events = checkedDates.map((date) => ({
        title: habit.name,
        start: date.toDate(),
        allDay: true
      }));
      $('#calendar').fullCalendar('renderEvents', events);
    });
  }
});
