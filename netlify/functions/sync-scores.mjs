// Sync live PGA Tour scores from ESPN to Netlify Blobs
// Called every 5 minutes by scheduled function
import { getStore } from '@netlify/blobs'

async function fetchESPNLeaderboard() {
  try {
    // ESPN PGA Tour leaderboard endpoint
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard')
    const data = await response.json()
    
    if (!data.events || data.events.length === 0) {
      console.log('No tournament data from ESPN')
      return null
    }

    const tournament = data.events[0]
    const competitors = tournament.competitors || []
    
    const scores = {}
    competitors.forEach((comp) => {
      const player = comp.athlete
      if (player && player.displayName) {
        const lastName = player.displayName.split(' ').pop().toLowerCase()
        scores[lastName] = {
          playerName: player.displayName.split(' ').pop(),
          fullName: player.displayName,
          totalStrokes: comp.stats?.find(s => s.name === 'strokes')?.value || 0,
          toPar: comp.stats?.find(s => s.name === 'strokesUnderPar')?.value || 0,
          thru: comp.stats?.find(s => s.name === 'holesCompleted')?.value || 'F',
          status: comp.status?.type === 'completed' ? 'completed' : 'active',
          position: comp.position || null
        }
      }
    })

    return {
      scores,
      tournament: {
        name: tournament.name,
        round: tournament.status?.period || 1,
        status: tournament.status?.type || 'in-progress'
      }
    }
  } catch (error) {
    console.error('ESPN fetch failed:', error.message)
    return null
  }
}

export default async (req, context) => {
  try {
    const store = getStore({ name: 'tournament-scores', consistency: 'strong' })
    
    // Fetch live data from ESPN
    const liveData = await fetchESPNLeaderboard()
    
    if (!liveData) {
      return new Response(JSON.stringify({
        error: 'Failed to fetch ESPN data',
        timestamp: new Date().toISOString()
      }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }

    const scoresWithTimestamp = {
      ...liveData.scores,
      _lastUpdated: new Date().toISOString(),
      _source: 'espn_live'
    }

    const status = {
      status: liveData.tournament.status,
      round: `Round ${liveData.tournament.round}`,
      tournament: liveData.tournament.name,
      coursePar: 72,
      lastUpdated: new Date().toISOString(),
      syncedAt: new Date().toISOString()
    }

    // Store in Netlify Blobs
    await store.setJSON('player-scores', scoresWithTimestamp)
    await store.setJSON('tournament-status', status)

    return new Response(JSON.stringify({
      success: true,
      playersUpdated: Object.keys(liveData.scores).length,
      tournament: liveData.tournament.name,
      round: status.round,
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
    })
  } catch (error) {
    console.error('Sync error:', error)
    return new Response(JSON.stringify({
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const config = { path: '/api/sync-scores' }
