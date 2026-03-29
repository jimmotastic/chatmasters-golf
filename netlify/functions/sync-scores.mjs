import { getStore } from '@netlify/blobs'

export default async (req, context) => {
  try {
    const store = getStore({ name: 'tournament-scores', consistency: 'strong' })
    
    // Fresh Round 4 data
    const scores = {
      "_lastUpdated": new Date().toISOString(),
      "woodland": { playerName: "Woodland", fullName: "Gary Woodland", totalStrokes: 192, toPar: -18, thru: "F", status: "completed" },
      "højgaard": { playerName: "Højgaard", fullName: "Nicolai Højgaard", totalStrokes: 193, toPar: -17, thru: "F", status: "completed" },
      "lee": { playerName: "Lee", fullName: "Min Woo Lee", totalStrokes: 198, toPar: -12, thru: "F", status: "completed" },
      "day": { playerName: "Day", fullName: "Jason Day", totalStrokes: 199, toPar: -11, thru: "F", status: "completed" },
      "scott": { playerName: "Scott", fullName: "Adam Scott", totalStrokes: 201, toPar: -9, thru: "F", status: "completed" }
    }
    
    const status = {
      status: 'completed',
      round: 'Round 4',
      coursePar: 72,
      lastUpdated: new Date().toISOString(),
      winner: { playerName: "Woodland", fullName: "Gary Woodland", totalStrokes: 192, totalScore: -18 }
    }
    
    await store.setJSON('player-scores', scores)
    await store.setJSON('tournament-status', status)
    
    return new Response(JSON.stringify({ success: true, updated: new Date().toISOString() }), {
      headers: { "Content-Type": "application/json" }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export const config = { path: "/api/sync-scores" }
