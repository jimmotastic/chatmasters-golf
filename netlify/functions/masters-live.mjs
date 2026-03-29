// Texas Children's Houston Open - Live Leaderboard
// Reads from Netlify Blobs (populated by sync-scores.mjs every 5 min)
import { getStore } from '@netlify/blobs'

export default async (request) => {
  try {
    const store = getStore({ name: 'tournament-scores', consistency: 'strong' })
    
    // Read live scores from Blobs
    const leaderboard = await store.get('player-scores', { type: 'json' }) || {}
    const status = await store.get('tournament-status', { type: 'json' }) || {}

    // Build leaderboard array sorted by to-par score
    const players = Object.entries(leaderboard)
      .filter(([key]) => !key.startsWith('_'))
      .map(([, player]) => ({
        position: player.position || 0,
        name: player.playerName,
        fullName: player.fullName,
        score: player.toPar < 0 ? `${player.toPar}` : `+${player.toPar}`,
        scoreNum: player.toPar,
        totalStrokes: player.totalStrokes,
        thru: player.thru,
        currentHole: parseInt(player.thru) || 18,
        today: player.toPar < 0 ? `${player.toPar}` : `+${player.toPar}`,
        status: player.status
      }))
      .sort((a, b) => a.scoreNum - b.scoreNum)

    const url = new URL(request.url)
    const playersParam = url.searchParams.get('foursome')

    const response = {
      tournament: status.tournament || 'Texas Children\'s Houston Open 2026',
      round: status.round || 'Round 4',
      course: 'Memorial Park Golf Course',
      status: status.status || 'active',
      lastUpdated: leaderboard._lastUpdated || new Date().toISOString(),
      leaderboard: players.map((p, i) => ({
        ...p,
        position: i + 1
      })),
      updates: [
        `${status.round} - ${status.status}`,
        players.length > 0 ? `${players[0].fullName} leads at ${players[0].score}` : 'Loading...',
        `Last synced: ${new Date(leaderboard._lastUpdated || Date.now()).toLocaleTimeString()}`
      ]
    }

    // Handle foursome team scoring if requested
    if (playersParam) {
      const foursomeNames = playersParam.split(',').map(n => n.trim().toLowerCase())
      const foursomePlayers = players.filter(p =>
        foursomeNames.includes(p.name.toLowerCase()) || foursomeNames.includes(p.fullName.toLowerCase())
      )
      const teamTotal = foursomePlayers.reduce((sum, p) => sum + p.scoreNum, 0)
      const teamTotalStrokes = foursomePlayers.reduce((sum, p) => sum + p.totalStrokes, 0)

      response.foursome = {
        players: foursomePlayers,
        teamTotal: teamTotal < 0 ? `${teamTotal}` : `+${teamTotal}`,
        teamTotalNum: teamTotal,
        teamTotalStrokes,
        teamRank: 1
      }
    }

    return new Response(JSON.stringify(response), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return new Response(JSON.stringify({
      error: 'Could not fetch leaderboard',
      message: error.message,
      lastUpdated: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const config = { path: '/api/masters-live' }
