// =====================
// Handles: monthly calendar display, workout day highlighting,
//          streak calculation, month navigation
// =====================

// ---- DARK MODE (shared) ----
// Run the same dark mode check as app.js — needed on every page

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

// ---- CALENDAR STATE ----

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth(); // 0 = January, 11 = December

const monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ---- BUILD THE CALENDAR ----

function buildCalendar(year, month) {
  const grid = document.getElementById('calendarGrid');
  const title = document.getElementById('monthTitle');

  grid.innerHTML = '';
  title.textContent = monthNames[month] + ' ' + year;

  // Add day labels (Mon, Tue, Wed...)
  dayLabels.forEach(function (label) {
    const dayLabel = document.createElement('div');
    dayLabel.classList.add('calendar-day-label');
    dayLabel.textContent = label;
    grid.appendChild(dayLabel);
  });

  // Find out what day of the week the 1st falls on
  // JavaScript getDay() returns 0=Sun, 1=Mon ... 6=Sat
  // We want Monday first, so we adjust
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  // Add empty cells before the 1st
  for (let i = 0; i < offset; i++) {
    const empty = document.createElement('div');
    empty.classList.add('calendar-day', 'empty');
    grid.appendChild(empty);
  }

  // How many days in this month?
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get saved workout dates from localStorage
  const loggedDates = JSON.parse(localStorage.getItem('loggedDates')) || [];

  // Today's date as YYYY-MM-DD
  const todayISO = new Date().toISOString().split('T')[0];

  // Build each day cell
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.classList.add('calendar-day');
    cell.textContent = day;

    // Format this cell's date as YYYY-MM-DD to match stored dates
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const dateStr = year + '-' + mm + '-' + dd;

    if (dateStr === todayISO) {
      cell.classList.add('today');
    }

    if (loggedDates.includes(dateStr)) {
      cell.classList.add('worked-out');
    }

    grid.appendChild(cell);
  }

  updateStats(loggedDates);
}

// ---- UPDATE STREAK AND TOTAL ----

function updateStats(loggedDates) {
  document.getElementById('totalWorkouts').textContent = loggedDates.length;

  // Calculate streak: count consecutive days ending today
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - i);

    const mm = String(checkDate.getMonth() + 1).padStart(2, '0');
    const dd = String(checkDate.getDate()).padStart(2, '0');
    const dateStr = checkDate.getFullYear() + '-' + mm + '-' + dd;

    if (loggedDates.includes(dateStr)) {
      streak++;
    } else {
      break; // streak broken — stop counting
    }
  }

  document.getElementById('streakCount').textContent = streak;
}

// ---- MONTH NAVIGATION ----

document.getElementById('prevMonth').addEventListener('click', function () {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  buildCalendar(currentYear, currentMonth);
});

document.getElementById('nextMonth').addEventListener('click', function () {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  buildCalendar(currentYear, currentMonth);
});

// ---- START: BUILD TODAY'S CALENDAR ----

buildCalendar(currentYear, currentMonth);