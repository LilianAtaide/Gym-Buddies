// =====================
// Handles: workout data, building the day cards,
// exercise toggle (tick off), log workout button
// =====================

// ---- WORKOUT DATA ----
//Here, each key is a day and the value holds the workout details


// ---- DARK MODE (shared) ----
const themeToggle = document.getElementById('themeToggle');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});


// ---- BUILD THE SCHEDULE CARDS ----

const scheduleGrid = document.getElementById('scheduleGrid');

// Loop through each day in the workouts object
Object.keys(workouts).forEach(function (day) {
  const workout = workouts[day];

  // Create the card container
  const card = document.createElement('div');
  card.classList.add('day-card');

  // Create the clickable header
  const header = document.createElement('div');
  header.classList.add('day-card-header');
  header.innerHTML = `
    <h3>${day}</h3>
    <span class="day-tag">${workout.type}</span>
  `;

  // Create the exercise list (hidden by default)
  const exerciseList = document.createElement('ul');
  exerciseList.classList.add('exercise-list');

  // Add each exercise as a list item
  workout.exercises.forEach(function (exercise) {
    const li = document.createElement('li');
    li.classList.add('exercise-item');
    li.textContent = exercise;

    // Clicking an exercise ticks it off
    li.addEventListener('click', function () {
      li.classList.toggle('done');
    });

    exerciseList.appendChild(li);
  });

  // Clicking the header shows/hides the exercise list
  header.addEventListener('click', function () {
    exerciseList.classList.toggle('open');
  });

  // Assemble the card and add it to the page
  card.appendChild(header);
  card.appendChild(exerciseList);
  scheduleGrid.appendChild(card);
});

// ---- LOG WORKOUT BUTTON ----

const logWorkoutBtn = document.getElementById('logWorkoutBtn');
const logMsg = document.getElementById('logMsg');

logWorkoutBtn.addEventListener('click', function () {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  // Get the user's name from localStorage (saved during sign-up)
  const userName = localStorage.getItem('gymBuddyUser') || 'Someone';

  // Create the activity message
  const message = '💪 ' + userName + ' completed their workout on ' + dateStr + '!';

  // Save to the activities list in localStorage
  const activities = JSON.parse(localStorage.getItem('gymActivities')) || [];
  activities.unshift(message); // add to the front of the list

  // Keep only the last 10 entries so the feed doesn't grow forever
  if (activities.length > 10) {
    activities.pop();
  }

  localStorage.setItem('gymActivities', JSON.stringify(activities));

  // Show a confirmation message on the schedule page
  logMsg.textContent = '✅ Workout logged! Check the Home page to see your squad feed.';

  // Update the calendar if the logged dates array exists
  const loggedDates = JSON.parse(localStorage.getItem('loggedDates')) || [];
  const todayISO = today.toISOString().split('T')[0];
  if (!loggedDates.includes(todayISO)) {
    loggedDates.push(todayISO);
    localStorage.setItem('loggedDates', JSON.stringify(loggedDates));
  }
});
