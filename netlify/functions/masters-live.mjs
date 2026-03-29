// Texas Children's Houston Open - Round 4 FINAL SCORES
// Generated: 2026-03-29 17:05 UTC
// Source: https://github.com/jimmotastic/chatmasters-golf

import { getStore } from '@netlify/blobs'

const PLAYERS = [
  { name: "Woodland", fullName: "Gary Woodland", rank: 1 },
  { name: "Højgaard", fullName: "Nicolai Højgaard", rank: 2 },
  { name: "Thorbjornsen", fullName: "Michael Thorbjornsen", rank: 3 },
  { name: "Lee", fullName: "Min Woo Lee", rank: 4 },
  { name: "Stevens", fullName: "Sam Stevens", rank: 5 },
  { name: "Day", fullName: "Jason Day", rank: 6 },
  { name: "Yellamaraju", fullName: "Sudarshan Yellamaraju", rank: 7 },
  { name: "Theegala", fullName: "Sahith Theegala", rank: 8 },
  { name: "Waring", fullName: "Paul Waring", rank: 9 },
  { name: "Keefer", fullName: "Johnny Keefer", rank: 10 },
  { name: "Scott", fullName: "Adam Scott", rank: 11 },
  { name: "Knapp", fullName: "Jake Knapp", rank: 12 },
  { name: "Vilips", fullName: "Karl Vilips", rank: 13 },
  { name: "Fisk", fullName: "Steven Fisk", rank: 14 },
  { name: "Hoey", fullName: "Rico Hoey", rank: 15 },
  { name: "Ramey", fullName: "Chad Ramey", rank: 16 },
  { name: "McCarthy", fullName: "Denny McCarthy", rank: 17 },
  { name: "Hossler", fullName: "Beau Hossler", rank: 18 },
  { name: "Dou", fullName: "Zecheng Dou", rank: 19 },
  { name: "Burgoon", fullName: "Bronson Burgoon", rank: 20 },
  { name: "Jaeger", fullName: "Stephan Jaeger", rank: 21 },
  { name: "Vegas", fullName: "Jhonattan Vegas", rank: 22 },
  { name: "Gotterup", fullName: "Chris Gotterup", rank: 23 },
  { name: "Burns", fullName: "Sam Burns", rank: 24 },
  { name: "Kitayama", fullName: "Kurt Kitayama", rank: 25 },
];

// ROUND 4 FINAL - ESPN 2026-03-29
const ROUND_4_SCORES = {
  "woodland": { playerName: "Woodland", fullName: "Gary Woodland", totalStrokes: 192, toPar: -18, thru: "F" },
  "højgaard": { playerName: "Højgaard", fullName: "Nicolai Højgaard", totalStrokes: 193, toPar: -17, thru: "F" },
  "thorbjornsen": { playerName: "Thorbjornsen", fullName: "Michael Thorbjornsen", totalStrokes: 198, toPar: -12, thru: "F" },
  "lee": { playerName: "Lee", fullName: "Min Woo Lee", totalStrokes: 198, toPar: -12, thru: "F" },
  "stevens": { playerName: "Stevens", fullName: "Sam Stevens", totalStrokes: 199, toPar: -11, thru: "F" },
  "day": { playerName: "Day", fullName: "Jason Day", totalStrokes: 199, toPar: -11, thru: "F" },
  "yellamaraju": { playerName: "Yellamaraju", fullName: "Sudarshan Yellamaraju", totalStrokes: 200, toPar: -10, thru: "F" },
  "theegala": { playerName: "Theegala", fullName: "Sahith Theegala", totalStrokes: 200, toPar: -10, thru: "F" },
  "waring": { playerName: "Waring", fullName: "Paul Waring", totalStrokes: 200, toPar: -10, thru: "F" },
  "keefer": { playerName: "Keefer", fullName: "Johnny Keefer", totalStrokes: 201, toPar: -9, thru: "F" },
  "scott": { playerName: "Scott", fullName: "Adam Scott", totalStrokes: 201, toPar: -9, thru: "F" },
  "knapp": { playerName: "Knapp", fullName: "Jake Knapp", totalStrokes: 205, toPar: -8, thru: "F" },
  "vilips": { playerName: "Vilips", fullName: "Karl Vilips", totalStrokes: 204, toPar: -8, thru: "F" },
  "fisk": { playerName: "Fisk", fullName: "Steven Fisk", totalStrokes: 204, toPar: -8, thru: "F" },
  "hoey": { playerName: "Hoey", fullName: "Rico Hoey", totalStrokes: 203, toPar: -8, thru: "F" },
  "ramey": { playerName: "Ramey", fullName: "Chad Ramey", totalStrokes: 203, toPar: -8, thru: "F" },
  "mccarthy": { playerName: "McCarthy", fullName: "Denny McCarthy", totalStrokes: 203, toPar: -8, thru: "F" },
  "hossler": { playerName: "Hossler", fullName: "Beau Hossler", totalStrokes: 203, toPar: -8, thru: "F" },
  "dou": { playerName: "Dou", fullName: "Zecheng Dou", totalStrokes: 202, toPar: -8, thru: "F" },
  "burgoon": { playerName: "Burgoon", fullName: "Bronson Burgoon", totalStrokes: 202, toPar: -8, thru: "F" },
  "jaeger": { playerName: "Jaeger", fullName: "Stephan Jaeger", totalStrokes: 202, toPar: -8, thru: "F" },
  "vegas": { playerName: "Vegas", fullName: "Jhonattan Vegas", totalStrokes: 202, toPar: -8, thru: "F" },
  "gotterup": { playerName: "Gotterup", fullName: "Chris Gotterup", totalStrokes: 202, toPar: -8, thru: "F" },
  "burns": { playerName: "Burns", fullName: "Sam Burns", totalStrokes: 206, toPar: -7, thru: "F" },
  "kitayama": { playerName: "Kitayama", fullName: "Kurt Kitayama", totalStrokes: 210, toPar: -2, thru: "F" },
};

function formatScore(score) {
  if (score === 0) return "E";
  if (score > 0) return `+${score}`;
  return `${score}`;
}

function buildLeaderboard() {
  const leaderboard = PLAYERS.map((player) => {
    const key = player.name.toLowerCase();
    const playerScore = ROUND_4_SCORES[key];

    if (playerScore) {
      return {
        name: player.name,
        fullName: player.fullName,
        rank: player.rank,
        currentHole: 18,
        totalScore: playerScore.toPar,
        totalStrokes: playerScore.totalStrokes,
        thru: playerScore.thru,
        today: playerScore.toPar,
      };
    }

    return {
      name: player.name,
      fullName: player.fullName,
      rank: player.rank,
      currentHole: 0,
      totalScore: 0,
      totalStrokes: 0,
      thru: '-',
      today: 0,
    };
  });

  leaderboard.sort((a, b) => {
    if (a.totalScore !== b.totalScore) return a.totalScore - b.totalScore;
    return a.totalStrokes - b.totalStrokes;
  });

  let pos = 1;
  for (let i = 0; i < leaderboard.length; i++) {
    if (i > 0 && leaderboard[i].totalScore === leaderboard[i - 1].totalScore) {
      leaderboard[i].position = leaderboard[i - 1].position;
    } else {
      leaderboard[i].position = pos;
    }
    pos = i + 2;
  }

  return leaderboard;
}

function generateUpdates(leaderboard) {
  const updates = [];
  const leader = leaderboard[0];

  updates.push({
    type: "highlight",
    text: `🏆 TOURNAMENT COMPLETE! ${leader.fullName} wins with ${leader.totalStrokes} strokes at ${formatScore(leader.totalScore)}!`,
    timestamp: new Date().toISOString(),
  });

  const runnerUp = leaderboard[1];
  if (runnerUp) {
    updates.push({
      type: "movement",
      text: `${runnerUp.fullName} finishes 2nd at ${formatScore(runnerUp.totalScore)} (${runnerUp.totalStrokes} strokes).`,
      timestamp: new Date().toISOString(),
    });
  }

  return updates;
}

export default async (request) => {
  const url = new URL(request.url);
  const playersParam = url.searchParams.get("foursome");
  const leaderboard = buildLeaderboard();

  const response = {
    tournament: "Texas Children's Houston Open 2026",
    round: "Round 4",
    course: "Memorial Park Golf Course",
    status: "completed",
    lastUpdated: new Date().toISOString(),
    leaderboard: leaderboard.map((p) => ({
      position: p.position,
      name: p.name,
      fullName: p.fullName,
      score: formatScore(p.totalScore),
      scoreNum: p.totalScore,
      totalStrokes: p.totalStrokes,
      thru: p.thru,
      currentHole: p.currentHole,
      today: formatScore(p.today),
    })),
    updates: generateUpdates(leaderboard),
    winner: {
      playerName: leaderboard[0].name,
      fullName: leaderboard[0].fullName,
      totalStrokes: leaderboard[0].totalStrokes,
      totalScore: leaderboard[0].totalScore,
    }
  };

  if (playersParam) {
    const foursomeNames = playersParam.split(",").map((n) => n.trim().toLowerCase());
    const foursomePlayers = leaderboard.filter((p) =>
      foursomeNames.includes(p.name.toLowerCase()) || foursomeNames.includes(p.fullName.toLowerCase())
    );
    const teamTotal = foursomePlayers.reduce((sum, p) => sum + p.totalScore, 0);
    const teamTotalStrokes = foursomePlayers.reduce((sum, p) => sum + p.totalStrokes, 0);

    response.foursome = {
      players: foursomePlayers.map((p) => ({
        name: p.name,
        fullName: p.fullName,
        score: formatScore(p.totalScore),
        scoreNum: p.totalScore,
        totalStrokes: p.totalStrokes,
        currentHole: p.currentHole,
        thru: p.thru,
      })),
      teamTotal: formatScore(teamTotal),
      teamTotalNum: teamTotal,
      teamTotalStrokes,
      teamRank: 1,
    };
  }

  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
};

export const config = {
  path: "/api/masters-live",
};
