/**
 * Tests database.rules.json against the Realtime Database emulator.
 *
 * Run with:
 *   npx firebase-tools emulators:exec --only database --project demo-jammer \
 *     "node scripts/test-rules.mjs"
 *
 * These rules protect a database with no authentication at all, so they are the
 * only thing standing between the public and every jam. They also gate the app
 * itself — a mistake here locks leaders out mid-service — which is why they are
 * tested rather than reasoned about.
 */
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing'
import { readFileSync } from 'node:fs'
import { ref, set, get, push, remove, update, serverTimestamp } from 'firebase/database'

const DAY = 24 * 60 * 60 * 1000

let pass = 0
let fail = 0

async function check(name, fn) {
  try {
    await fn()
    pass++
    console.log(`  ok   ${name}`)
  } catch (error) {
    fail++
    console.log(`  FAIL ${name}\n       ${error.message.split('\n')[0]}`)
  }
}

const testEnv = await initializeTestEnvironment({
  projectId: 'demo-jammer',
  database: {
    rules: readFileSync('database.rules.json', 'utf8'),
    host: '127.0.0.1',
    port: 9000,
  },
})

/** Writes data bypassing rules, to set up a scenario. */
async function seed(path, value) {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await set(ref(context.database(), path), value)
  })
}

const db = testEnv.unauthenticatedContext().database()

await testEnv.clearDatabase()

console.log('Creating a jam')
await check('a leader can create one', () =>
  assertSucceeds(set(ref(db, 'jams/ABC12'), { currentSongId: null, createdAt: serverTimestamp() }))
)
await check('but not with a backdated timestamp', () =>
  assertFails(set(ref(db, 'jams/OLD01'), { currentSongId: null, createdAt: Date.now() - 2 * DAY }))
)
await check('nor one dated far in the future, which would never expire', () =>
  assertFails(set(ref(db, 'jams/FUT01'), { currentSongId: null, createdAt: Date.now() + 10 * DAY }))
)
await check('nor one with no timestamp at all', () =>
  assertFails(set(ref(db, 'jams/NOTS1'), { currentSongId: null }))
)

console.log('Reading')
await check('anyone with the code can read a live jam', () =>
  assertSucceeds(get(ref(db, 'jams/ABC12')))
)
await check('a code that does not exist reads as empty, so joining fails cleanly', () =>
  assertSucceeds(get(ref(db, 'jams/NOPE1')))
)
await check('nobody can list every jam', () => assertFails(get(ref(db, 'jams'))))
await check('nor read the database root', () => assertFails(get(ref(db, '/'))))

console.log('Using a live jam')
await check('the leader can pick a song', () =>
  assertSucceeds(set(ref(db, 'jams/ABC12/currentSongId'), 'amazing-grace'))
)
await check('a participant can add themselves', () =>
  assertSucceeds(set(push(ref(db, 'jams/ABC12/members')), true))
)
await check('members must be a boolean, not arbitrary data', () =>
  assertFails(set(push(ref(db, 'jams/ABC12/members')), { evil: 'payload' }))
)
await check('a pasted song can be added', () =>
  assertSucceeds(
    set(push(ref(db, 'jams/ABC12/customSongs')), {
      title: 'Above All',
      lyrics: 'Above all powers',
      artist: 'Lenny LeBlanc',
      ccliNumber: '2672885',
      source: 'songselect',
      sections: [{ type: 'verse', label: 'Verse 1', lines: [{ text: 'Above all powers' }] }],
      translations: [
        { language: 'es', name: 'Español', sections: [{ type: 'verse', label: 'Estrofa 1', lines: [{ text: 'Sobre todo poder' }] }] },
      ],
    })
  )
)
await check('a song needs a title', () =>
  assertFails(set(push(ref(db, 'jams/ABC12/customSongs')), { lyrics: 'words' }))
)
await check('lyrics cannot be used as bulk storage', () =>
  assertFails(set(push(ref(db, 'jams/ABC12/customSongs')), { title: 'x', lyrics: 'a'.repeat(50001) }))
)
await check('unknown fields on a song are rejected', () =>
  assertFails(set(push(ref(db, 'jams/ABC12/customSongs')), { title: 'x', lyrics: 'y', payload: 'junk' }))
)
await check('unknown fields on a jam are rejected', () =>
  assertFails(set(ref(db, 'jams/ABC12/somethingElse'), 'junk'))
)
await check('the timestamp cannot be altered to extend a jam', () =>
  assertFails(update(ref(db, 'jams/ABC12'), { createdAt: Date.now() + DAY }))
)
await check('the leader can delete their own jam', () => assertSucceeds(remove(ref(db, 'jams/ABC12'))))

console.log('An expired jam')
await seed('jams/EXP01', { currentSongId: 'it-is-well', createdAt: Date.now() - 2 * DAY })
await check('cannot be read', () => assertFails(get(ref(db, 'jams/EXP01'))))
await check('cannot be written to', () =>
  assertFails(set(ref(db, 'jams/EXP01/currentSongId'), 'amazing-grace'))
)
await check('cannot be joined as a member', () =>
  assertFails(set(push(ref(db, 'jams/EXP01/members')), true))
)
await check('its lyrics cannot be read', () => assertFails(get(ref(db, 'jams/EXP01/customSongs'))))

console.log('A jam just inside the window')
await seed('jams/EDGE1', { currentSongId: null, createdAt: Date.now() - (DAY - 60 * 60 * 1000) })
await check('still works with an hour to go', () =>
  assertSucceeds(set(ref(db, 'jams/EDGE1/currentSongId'), 'doxology'))
)

await testEnv.cleanup()
console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
