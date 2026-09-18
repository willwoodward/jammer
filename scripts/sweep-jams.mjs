/**
 * Deletes jams that were never cleaned up.
 *
 * A jam is removed from the database when the leader taps back, but that is the
 * minority of endings — closing the tab, a dead battery or lost signal all leave
 * the jam behind, and with it the pasted lyrics in its customSongs node. This
 * sweeps those up.
 *
 * Deletion is by AGE ALONE, never by inactivity. An inactivity heuristic would
 * eventually delete a jam that is quietly in use, and that failure would happen
 * live, in front of a congregation. No real jam lasts 24 hours.
 *
 * Environment:
 *   FIREBASE_DATABASE_URL   https://<project>-default-rtdb.<region>.firebasedatabase.app
 *   FIREBASE_ACCESS_TOKEN   OAuth2 token for a service account
 *   MAX_AGE_HOURS           default 24
 *   DRY_RUN                 "true" to report without deleting
 */

const databaseUrl = requireEnv('FIREBASE_DATABASE_URL').replace(/\/$/, '')
const token = requireEnv('FIREBASE_ACCESS_TOKEN')
const maxAgeHours = Number(process.env.MAX_AGE_HOURS || 24)
const dryRun = process.env.DRY_RUN === 'true'

function requireEnv(name) {
  const value = process.env[name]
  if (!value) {
    console.error(`Missing required environment variable: ${name}`)
    process.exit(1)
  }
  return value
}

if (!Number.isFinite(maxAgeHours) || maxAgeHours <= 0) {
  console.error(`MAX_AGE_HOURS must be a positive number, got: ${process.env.MAX_AGE_HOURS}`)
  process.exit(1)
}

const headers = { Authorization: `Bearer ${token}` }
const cutoff = Date.now() - maxAgeHours * 60 * 60 * 1000

async function main() {
  console.log(`Sweeping jams created before ${new Date(cutoff).toISOString()} (${maxAgeHours}h old)`)
  if (dryRun) console.log('DRY RUN — nothing will be deleted')

  // Children missing createdAt sort before numbers, so this query returns them
  // too. That is intended: a jam with no createdAt is unusable legacy data.
  const query = `orderBy=${encodeURIComponent('"createdAt"')}&endAt=${cutoff}`
  const response = await fetch(`${databaseUrl}/jams.json?${query}`, { headers })

  if (!response.ok) {
    console.error(`Query failed: ${response.status} ${response.statusText}`)
    console.error(await response.text())
    process.exit(1)
  }

  const jams = await response.json()
  const codes = jams ? Object.keys(jams) : []

  if (codes.length === 0) {
    console.log('Nothing to sweep.')
    return
  }

  console.log(`Found ${codes.length} jam${codes.length === 1 ? '' : 's'} to remove:`)

  let deleted = 0
  let failed = 0

  for (const code of codes) {
    const createdAt = jams[code]?.createdAt
    const age = typeof createdAt === 'number'
      ? `${((Date.now() - createdAt) / 3600000).toFixed(1)}h old`
      : 'no createdAt'
    const songs = Object.keys(jams[code]?.customSongs ?? {}).length

    console.log(`  ${code}  ${age}${songs ? `, ${songs} pasted song${songs === 1 ? '' : 's'}` : ''}`)
    if (dryRun) continue

    const result = await fetch(`${databaseUrl}/jams/${encodeURIComponent(code)}.json`, {
      method: 'DELETE',
      headers,
    })
    if (result.ok) {
      deleted++
    } else {
      failed++
      console.error(`    failed to delete ${code}: ${result.status} ${await result.text()}`)
    }
  }

  if (!dryRun) console.log(`Deleted ${deleted}, failed ${failed}.`)
  // A failed delete means stale lyrics are still sitting there — don't pass quietly
  if (failed > 0) process.exit(1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
