// // =====================
// A web page for a group of friends that loves to workout
// 1. A signup page
// 2. Different workout for each day
// 3. Weekly workout schedule
// 4. A calendar to show your progress
// 5. Dark and light mode of viewing the page
// 6. A message for when someone completes a daily activity
// 7. A forget password feature

// // =====================


// ---- DARK MODE TOGGLE ----

const themeToggle = document.getElementById('themeToggle');

// When the page loads, check if dark mode was previously saved
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

// Listen for a click on the toggle button
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

// ---- SIGN-UP FORM ----

const signupForm = document.getElementById('signupForm');

if (signupForm) {

  signupForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    // Validate name
    if (name === '') {
      document.getElementById('nameError').textContent = 'Please enter your name.';
      isValid = false;
    } else {
      document.getElementById('nameError').textContent = '';
    }

    // Validate email
    if (email === '') {
      document.getElementById('emailError').textContent = 'Please enter your email.';
      isValid = false;
    } else if (!email.includes('@')) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address.';
      isValid = false;
    } else {
      document.getElementById('emailError').textContent = '';
    }

    // Validate password
    if (password.length < 6) {
      document.getElementById('passwordError').textContent = 'Password must be at least 6 characters.';
      isValid = false;
    } else {
      document.getElementById('passwordError').textContent = '';
    }

    // If all fields are valid, save the user and show success
    if (isValid) {
      localStorage.setItem('gymBuddyUser', name);
      document.getElementById('successMsg').textContent = '🎉 Welcome to GymBuddies, ' + name + '!';
      signupForm.reset();
      loadActivityFeed();
    }
  });
}

// ---- SQUAD ACTIVITY FEED ----

function loadActivityFeed() {
  const feed = document.getElementById('activityFeed');
  const emptyMsg = document.getElementById('emptyFeed');

  if (!feed) return;

  // Get saved activity from localStorage (or empty array if nothing saved yet)
  const activities = JSON.parse(localStorage.getItem('gymActivities')) || [];

  if (activities.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }

  emptyMsg.style.display = 'none';
  feed.innerHTML = '';

  // Loop through activities and create a list item for each one
  activities.forEach(function (activity) {
    const li = document.createElement('li');
    li.textContent = activity;
    feed.appendChild(li);
  });
}

// Load the feed when the page first opens
loadActivityFeed();