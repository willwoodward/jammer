# jammer

[![Deploy](https://github.com/willwoodward/jammer/actions/workflows/deploy.yml/badge.svg)](https://github.com/willwoodward/jammer/actions/workflows/deploy.yml)
[![Sweep old jams](https://github.com/willwoodward/jammer/actions/workflows/sweep-jams.yml/badge.svg)](https://github.com/willwoodward/jammer/actions/workflows/sweep-jams.yml)
[![Live](https://img.shields.io/badge/live-willwoodward.github.io%2Fjammer-111111)](https://willwoodward.github.io/jammer/)

[![Stars](https://img.shields.io/github/stars/willwoodward/jammer?style=social)](https://github.com/willwoodward/jammer/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-111111)](LICENSE)

A minimalist web app for spontaneous worship sessions. One person starts a jam, shares a code, and everyone sees the same lyrics on their own phone. No accounts, no install, just a URL.

## How it works

1. **Leader** taps "start a jam" and gets a 5-character code
2. **Everyone else** types the code, or scans a QR code
3. Leader picks a song — lyrics appear on every screen at once
4. Toggle **lyrics** / **chords**, and light / dark

### Sharing a jam

Anyone already in a jam can tap the QR button to fill their screen with a scannable join code — so joins spread sideways through a room without the code ever being read aloud over music.

The leader can also hand a helper the **assistant code** (`ABC42-A`). An assistant picks songs and pastes lyrics while the leader keeps playing.

## Songs

**19 public domain hymns** with guitar chords ship with the app — Amazing Grace, Be Thou My Vision, It Is Well, How Great Thou Art, Come Thou Fount and more — so it's useful the first time you open it, with nothing to set up.

Everything else you bring yourself, via "my songs":

| | |
|---|---|
| **Paste** | Type a title, paste lyrics. Saved for next time. |
| **SongSelect** | Download a song as `.txt` or `.usr`/`.bin` and import it — sections, authors and the CCLI song number are read automatically. |
| **ProPresenter** | Import `.pro` (ProPresenter 7) or `.pro4`–`.pro6`. Slide groups become sections, following the selected arrangement. **import folder** brings in a whole library at once. |

Imported songs display with proper verse and chorus structure, exactly like the built-in hymns. Non-song files are ignored, and songs you already have are skipped rather than duplicated.

Everything is parsed **in your browser**. No file and no lyric is uploaded anywhere, and no CCLI or ProPresenter account is involved — you import songs you are already licensed to use. Songs shared into a jam live in Firebase only for that jam's lifetime and are deleted with it.

### Moving songs between devices

Saved songs live in one browser on one device, so a library imported on the church computer isn't on the phone you lead from. **export** saves the lot as a single `.json` file — move it by AirDrop, OneDrive, a USB stick or email, then import it on the other device. Works the same on Windows, macOS, Android and iOS.

## Multiple languages

A song can carry translations, and **each person picks their own language on their own phone**. The leader chooses the song; one person reads it in English while the person beside them reads the same song in Polish. A projector can only ever show one language — this is the thing jammer does that an AV system can't.

Add one with **+ language** on a saved song, then paste the translated lyrics (a SongSelect export in that language parses into proper verses). Tap **both** to show the original in smaller type beneath each line.

Translations are supplied by you, never machine-translated: a literal translation doesn't fit the tune, and jammer doesn't send lyrics anywhere. If a song has no translation in someone's language, they see the original.

> Amazing Grace ships with a Spanish translation as a worked example. **It has not been checked by a Spanish speaker** — verify it before a congregation sings from it.

## Install it

jammer runs in any browser with nothing to install, but leaders should install it anyway:

- **iPhone / iPad** — Share → Add to Home Screen
- **Android / desktop Chrome** — an "install jammer" button appears in "my songs"

Browsers clear site storage — Safari after about a week without opening the site — which would take your saved songs with it. Installed web apps sit outside that timer, and jammer also asks for persistent storage.

Nothing breaks if you don't install: songs still save to normal browser storage, and "my songs" tells you when they aren't protected. Either way, **export** gives you a copy you keep.

## Getting started

**Prerequisites:** Node.js 20+, git

```bash
git clone https://github.com/willwoodward/jammer.git
cd jammer
npm install
npm run dev
```

Open [localhost:5173](http://localhost:5173).

For multi-device sync you need a `.env` in the root (ask Will) — copy `.env.example` and fill it in, then **restart the dev server**, since Vite only reads it at startup. Without it, jammer falls back to `BroadcastChannel`, which syncs between tabs in the same browser but not across devices or into a private window.

`#/dev` opens a side-by-side leader and participant view.

## How it's built

- **React + TypeScript + Vite**, deployed to GitHub Pages on every push to `main`
- **Firebase Realtime Database** for sync; `BroadcastChannel` as a local fallback
- **Installable PWA** — `vite-plugin-pwa` generates the manifest and service worker; icons in `public/` are placeholders worth replacing
- Jam state lives in one context, `src/context/JamContext.tsx`
- Built-in lyrics are in `src/data/songs.ts`, each with optional `translations`
- Importers are in `src/lib/parsers/` — `songselect.ts` is hand-written; `propresenter.ts` wraps `propresenter-parser` and is loaded on demand, so participants never download it
- Saved songs are per-browser in `localStorage`; songs shared into a jam sync through Firebase and are removed with the jam

## Operating it

### Database rules

The database has no user accounts, so `database.rules.json` is the only thing between the public and every jam. It stops anyone listing jams (you can only read one whose code you know), makes a jam unreadable 24 hours after creation, requires a server-set `createdAt` that can't be backdated or extended, and caps what can be written so the database can't be used as free storage.

```bash
npm run test:rules     # 23 assertions against the emulator (needs Java)
npm run deploy:rules   # firebase deploy --only database
```

> **Deploy the app before the rules.** The rules require a server-set timestamp that older builds don't send.

### Sweeping old jams

A jam is deleted when the leader taps back, but most sessions end another way — a closed tab, a flat battery, lost signal — leaving the jam and its lyrics behind. [`sweep-jams.yml`](.github/workflows/sweep-jams.yml) removes anything over 24 hours old, daily.

It needs two repository secrets: `FIREBASE_SERVICE_ACCOUNT` (a service-account JSON key) and `FIREBASE_DATABASE_URL`. Run it manually with **dry_run** first to see what it would delete.

Deletion is by age alone, never by inactivity — an inactivity heuristic would eventually delete a jam that is quietly in use, and that failure would happen live, in front of a congregation.

## Licence

[MIT](LICENSE) — use it, fork it, run it in your church. The built-in hymns are public domain; anything you import or paste stays yours and is never uploaded anywhere.
