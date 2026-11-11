# 🏋️ GymBuddies

A web application for a group of friends who work out together. GymBuddies lets you sign up, view a weekly workout schedule, log completed workouts, and track your progress on a calendar.

## Challenge encountered
I wanted to have a page where users in the group gets notified when someone completes a workout. But that is not possible considering that I am not running this on a server.
Also, same reason I could not add forget password to the home page, atleast not the way real websites does it.


## Debugging Technique used
The most common debugging tool used was the browser **DevTool (Console and Network tabs)** to debug file loading and JavaScript errors during development


## How I implemented interactivity using JavaScript.
Requirement                                   -       Where it's demonstrated
From the validation + feedback.               -       Sign-up form on Home page
Interactive features with addEventListener.   -       Day expand, exercise tick, log workout, month navigation, theme toggle (5 total)
DOM manipulation                              -       Schedule cards, calendar grid, activity feed, streak counter -- all created/updated by JavaScript

## Live Site

[View GymBuddies on GitHub Pages](https://github.com/UCD-Professional-Academy-FS/JS-Project_GymBuddies)

## Project Overview

This project was built as a JavaScript assignment for the Professional Academy Diploma in Full Stack Software Development.

**Features:**
- Sign-up form with client-side validation (no page reload)
- Weekly workout schedule (Monday–Saturday) with expandable day cards
- Tick off individual exercises as you complete them
- Log today's workout and see it appear in the Squad Activity Feed
- Monthly calendar showing days you worked out
- Streak counter tracking consecutive workout days
- Light and dark mode toggle, saved across page visits

## Technologies Used

- HTML5
- CSS3 (CSS custom properties, Flexbox, CSS Grid, media queries)
- JavaScript (ES6, DOM manipulation, localStorage, event listeners)
- GitHub Pages (hosting)

## File Structure
gym-buddies/
├── index.html
├── schedule.html
├── calendar.html
├── css/
│   └── style.css
└── js/
    ├── app.js
    ├── data.js
    ├── schedule.js
    └── calendar.js


  ## How to use

1. Open `index.html` in a browser (or visit the GitHub Pages link above)
2. Fill in the sign-up form to join the squad
3. Go to **Schedule** to see the weekly workouts — click a day to expand it
4. Tick off exercises as you complete them, then click **Log Today's Workout**
5. Go to **Progress** to see your workout calendar and current streak
6. Use the 🌙 button in the navbar to switch between light and dark mode

## Sources and Acknowledgements

- Workout routines are original content created for this project
- AI assistance from [Kiro] was used as a coding assistant for guidance, debugging, and implementation help — not as the author of the work


## Author
Lilian Ataide