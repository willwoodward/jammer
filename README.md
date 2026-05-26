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

## Getting started

**Prerequisites:** Node.js 18+, git

```bash
git clone https://github.com/willwoodward/jammer.git
cd jammer
npm install
```

Create a `.env` file in the root — ask Will to share this with you, then:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). That's it.

### Test multi-device sync locally

Open [http://localhost:5173/#/dev](http://localhost:5173/#/dev) to see a side-by-side leader + participant view syncing in real time.

### Deploy

Pushes to `main` auto-deploy to GitHub Pages via GitHub Actions. No manual steps needed.

## Dev notes

- `/dev` — side-by-side test view
- Firebase syncs jam state across devices; BroadcastChannel is used as a fallback when `.env` isn't configured
- Song lyrics are bundled in `src/data/songs.ts` — add new public domain songs there
- Pasted/custom songs are stored in the user's `localStorage` and synced ephemerally via Firebase for the duration of a jam
