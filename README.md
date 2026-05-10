# worship

A minimalist web app for spontaneous worship sessions. One person starts a jam, shares a code, and everyone sees the same lyrics on their phone.

## How it works

1. **Leader** taps "start a jam" and gets a 5-character code
2. **Participants** enter the code to join
3. Leader picks a song — lyrics appear on everyone's screen in real-time
4. Toggle between **lyrics** and **chords** view
5. Light/dark mode

### Assistant mode

The leader can share a separate code (e.g. `ABC42-A`) with a helper. The assistant can pick songs and paste lyrics while the leader keeps playing.

### Pasting lyrics

Leaders and assistants can paste lyrics for any song directly into the app. Pasted songs are:
- Saved locally in your browser for next time
- Synced to everyone in the jam via Firebase (temporarily, for the duration of the jam)
- No copyrighted content is stored on any server

### Pre-jam setup

Tap "my songs" on the home screen to paste and save songs before the jam starts. When you open the song picker during a jam, your saved songs are ready to go.

## Built-in songs

16 public domain hymns with guitar chords, including Amazing Grace, Holy Holy Holy, Be Thou My Vision, It Is Well, How Great Thou Art, Come Thou Fount, and more.

## Tech

- React + TypeScript + Vite
- Firebase Realtime Database for multi-device sync
- BroadcastChannel as local dev fallback
- No accounts, no app install — just a URL

## Setup

```bash
npm install
cp .env.example .env
# Fill in your Firebase config values in .env
npm run dev
```

### Firebase

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Add a web app and copy the config
3. Enable Realtime Database (start in test mode)
4. Fill in the values in `.env`

### Deploy to GitHub Pages

The app deploys automatically via GitHub Actions on push to `main`. Add your Firebase config values as repository secrets (same names as in `.env.example`). Enable GitHub Pages with source set to "GitHub Actions" in repo settings.

## Dev

`/dev` route shows leader and participant views side by side for testing.
