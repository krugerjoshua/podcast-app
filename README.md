# CueThePod

CueThePod is a podcast browser. Find shows by title or genre, play episodes, save favourites and keep track of what you have listened to. Built as a portfolio project with React.

**Live site:** https://cuethepod.vercel.app/

## Features

- Browse all shows with image, season count, genres and last-updated date
- Sort by title (A-Z, Z-A) or by last updated (newest, oldest)
- Filter by genre and search by title; filters are kept in the URL
- View a show's seasons, then the episodes of one season, with a season switcher
- Persistent audio player with a seek bar that stays visible while you browse
- Warning before closing the tab while audio is playing
- Favourite episodes, grouped by show and season, with the date and time added and four sort options
- Listening history that marks finished episodes, with a full reset
- Light and dark themes, remembered between visits
- Responsive layout for phones, tablets and desktops

## Tech stack

React, Vite, React Router, Tailwind CSS. Data comes from the public podcast API at podcast-api.netlify.app. Favourites, history and theme are stored in localStorage.

## Getting started

Requires Node.js 18 or later.

    git clone https://github.com/krugerjoshua/podcast-app.git
    cd podcast-app
    npm install
    npm run dev

Open the address Vite prints (usually http://localhost:5173).

To create a production build: `npm run build`, then `npm run preview`.

## Usage

1. **Browse:** the home page lists every show. Use the search box, genre menu and sort menu to narrow it down.
2. **Open a show:** select a card to see its seasons, then select a season to see its episodes.
3. **Listen:** choose Play on any episode. The player at the bottom stays on screen as you navigate. Drag the seek bar to jump around.
4. **Favourite:** choose Favourite on an episode. Open Favourites in the header to see them grouped by show and season, sort them or remove them.
5. **History:** an episode is marked Listened once it plays to the end. Open History to review them or reset everything.
6. **Theme:** use the toggle in the header to switch between light and dark mode.

## Known limitations

- Favourites and history are stored per browser, and changes in one open tab appear in another only after a reload.
- An episode counts as listened when playback reaches the end, including if you drag the seek bar there.

## Contact

- Joshua Kruger
- jooshuakruger66@live.com