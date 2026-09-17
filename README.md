# worship

A minimalist web app for spontaneous worship sessions. One person starts a jam, shares a code, and everyone sees the same lyrics on their phone.

## How it works

1. **Leader** taps "start a jam" and gets a 5-character code
2. **Participants** enter the code to join — or scan the QR code any member can put on screen
3. Leader picks a song — lyrics appear on everyone's screen in real-time
4. Toggle between **lyrics** and **chords** view
5. Light/dark mode

### Sharing the jam

Anyone in a jam can tap the QR button in the header to fill their screen with a scannable join code. Hold up the phone, everyone else scans it, and they land straight in the jam — so joins spread without the code ever being read aloud.

### Assistant mode

The leader can share a separate code (e.g. `ABC42-A`) with a helper. The assistant can pick songs and paste lyrics while the leader keeps playing.

### Importing songs

Tap "my songs" → "import files" to bring in songs you already own:

- **SongSelect** — download a song from SongSelect as `.txt` or `.usr`/`.bin` and import it. Sections, authors and the CCLI song number are read automatically.
- **ProPresenter** — import `.pro` (ProPresenter 7), or `.pro4`/`.pro5`/`.pro6`. Slide groups become sections, and where the file has a selected arrangement, that order is used.

Imported songs display with proper verse/chorus structure, exactly like the built-in hymns.

Use **import folder** to bring in a whole ProPresenter library at once. Files that aren't songs are ignored, and songs you already have are skipped rather than duplicated.

Tap "where do I find these files?" in the app for step-by-step help.

Everything is parsed in your browser. No file and no lyric is uploaded anywhere — jammer has no server, and there is no CCLI or ProPresenter account involved. You import songs you are already licensed to use.

### Moving your songs between devices

Saved songs live in one browser on one device, so songs imported on the church computer aren't on the phone you lead from.

**export** in "my songs" saves your whole library as a single `.json` file. Move it across however suits — AirDrop, OneDrive, Google Drive, a USB stick, or email it to yourself — then import that file on the other device. Works the same on Windows, macOS, Android and iOS.

### Pasting lyrics

Leaders and assistants can paste lyrics for any song directly into the app. Pasted songs are:
- Saved locally in your browser for next time
- Synced to everyone in the jam via Firebase (temporarily, for the duration of the jam)
- No copyrighted content is stored on any server

### Pre-jam setup

Tap "my songs" on the home screen to paste and save songs before the jam starts. When you open the song picker during a jam, your saved songs are ready to go.

## Install it

jammer runs in the browser with nothing to install. Leaders should install it anyway:

- **iPhone/iPad** — Share → Add to Home Screen
- **Android/desktop Chrome** — an "install jammer" button appears in "my songs"

This matters because browsers clear site storage: Safari wipes it after about a week without opening the site, which would take your saved songs with it. Installed web apps are outside that timer, and jammer also asks the browser for persistent storage.

If you don't install, nothing breaks — songs still save to normal browser storage exactly as before, and "my songs" tells you they aren't protected. Use **export** for a copy you keep yourself either way.

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
- Song importers live in `src/lib/parsers/` — `songselect.ts` is hand-written, `propresenter.ts` wraps the `propresenter-parser` package and is loaded on demand so participants never download it
