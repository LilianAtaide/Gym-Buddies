// =====================
// Handles: workout data, building the day cards,
//          exercise toggle (tick off), log workout button
// =====================

// ---- WORKOUT DATA ----
//Here, each key is a day and the value holds the workout details

const workouts = {
  Monday: {
    type: 'Leg Day 🦵',
    exercises: [
      'Sumo Squat — 3 sets x 12 reps',
      'Goblet Squat — 3 sets x 10 reps',
      'Romanian Deadlift — 3 sets x 10 reps',
      'Leg Press — 3 sets x 15 reps',
      'Calf Raises — 4 sets x 20 reps',
      'Abductor — 3 sets x 12 reps',
      'Adductor — 3 sets x 12 reps',
      'Leg Curl — 3 sets x 12 reps',
      'Treadmil Walk — 45 minutes'

    ]

},
  Tuesday: {
    type: 'Upper Body 💪',
    exercises: [
      'Push-ups — 3 sets x 15 reps',
      'Dumbbell Shoulder Press — 3 sets x 12 reps',
      'Lateral Raises — 3 sets x 12 reps',
      'Tricep Dips — 3 sets x 10 reps',
      'Bicep Curls — 3 sets x 12 reps',
      'Chest Press — 3 sets x 12 reps',
      'Latm Pull down — 3 sets x 12 reps',
      'Stepper on machine — 30 minutes'



    ]
  },
  Wednesday: {
    type: 'Abs & Core 🔥',
    exercises: [
      'Plank — 3 x 45 seconds',
      'Crunches — 3 sets x 20 reps',
      'Leg Raises — 3 sets x 15 reps',
      'Russian Twists — 3 sets x 20 reps',
      'Mountain Climbers — 3 x 30 seconds',
      'Dumbbell Overhead March - 3 sets x 20 reps',
      'Dumbbell  Situp - 3 sets x 12 reps',
      'Toe taps - 3 sets x 12 reps',
      'Crunch Hold Bicycle - 3 sets x 20 reps',
      'Treadmil Walk — 45 minutes'
      
    ]
  },
  Thursday: {
    type: 'Glutes & Hips 🍑',
    exercises: [
      'Hip Thrust — 4 sets x 12 reps',
      'Glute Bridge — 3 sets x 15 reps',
      'Donkey Kicks — 3 sets x 15 each side',
      'Side-Lying Clams — 3 sets x 20 each side',
      'Resistance Band Walk — 3 x 20 steps',
      'Stepper on machine — 30 minutes',
      'Outdoor walk - 1 hour'
      

    ]
  },
  Friday: {
    type: 'Back & Pull 🏋️',
    exercises: [
      'Bent-Over Row — 3 sets x 12 reps',
      'Lat Pulldown — 3 sets x 12 reps',
      'Seated Cable Row — 3 sets x 12 reps',
      'Face Pulls — 3 sets x 15 reps',
      'Deadlift — 3 sets x 8 reps',
      'Stepper on machine — 30 minutes'

    ]
  },
  Saturday: {
    type: 'Full Body Burn 🔥',
    exercises: [
      'Burpees — 3 sets x 10 reps',
      'Jump Squats — 3 sets x 15 reps',
      'Push-up to Row — 3 sets x 10 reps',
      'Kettlebell Swing — 3 sets x 15 reps',
      'Box Jumps — 3 sets x 10 reps',
      'Outdoor walk - 1 hour'
    ]
  }
};

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
