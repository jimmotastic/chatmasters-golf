# ⛳ ChatMasters Golf Leaderboard

Real-time tournament scoring system for golf fantasy leagues.

**Live:** https://thechatmasters.com  
**API:** `/api/masters-live`  
**Built:** 2026-03-29  

## Quick Start

### For Next Tournament

1. **Edit the scores** in `netlify/functions/masters-live.mjs`:
   - Update `PLAYERS` array
   - Update `ROUND_4_SCORES` object

2. **Push to deploy**:
   ```bash
   git push origin main
   ```

3. **Done.** Netlify auto-deploys instantly.

## API Endpoints

### Full Leaderboard
```bash
curl https://thechatmasters.com/api/masters-live
```

**Response:**
```json
{
  "tournament": "Texas Children's Houston Open 2026",
  "round": "Round 4",
  "status": "completed",
  "winner": {
    "fullName": "Gary Woodland",
    "totalScore": -18,
    "totalStrokes": 192
  },
  "leaderboard": [
    {
      "position": 1,
      "fullName": "Gary Woodland",
      "score": "-18",
      "totalStrokes": 192,
      "thru": "F"
    },
    ...
  ],
  "updates": [...]
}
```

### Foursome Team Scores
```bash
curl "https://thechatmasters.com/api/masters-live?foursome=Woodland,Lee,Day,Scott"
```

**Response includes:**
- Individual player scores
- Team total (sum of all to-par)
- Team rank

## File Structure

```
netlify/
  functions/
    masters-live.mjs      ← Edit this for next tournament
    sync-scores.mjs       ← Scheduled updates (5 min)
netlify.toml              ← Netlify config
README.md
```

## How It Works

1. **GitHub Source Control**
   - Edit `masters-live.mjs`
   - Commit & push
   - GitHub webhook triggers Netlify build

2. **Netlify Auto-Deploy**
   - Detects push
   - Rebuilds functions
   - Deploys in 30-60 seconds

3. **Live Leaderboard**
   - API serves fresh data
   - No manual uploads
   - 0 downtime

## Scheduled Score Syncs

The `sync-scores.mjs` function runs every 5 minutes during tournament hours:

```
*/5 * * * *  (5-minute intervals)
```

Can be triggered manually:
```bash
curl -X POST https://thechatmasters.com/api/sync-scores
```

## Updating For Next Tournament

### Players & Scores
```javascript
// netlify/functions/masters-live.mjs

const PLAYERS = [
  { name: "Woodland", fullName: "Gary Woodland", rank: 1 },
  { name: "Højgaard", fullName: "Nicolai Højgaard", rank: 2 },
  // ... add your tournament players
];

const ROUND_4_SCORES = {
  "woodland": { totalStrokes: 192, toPar: -18, thru: "F" },
  "højgaard": { totalStrokes: 193, toPar: -17, thru: "F" },
  // ... add final scores
};
```

### Commit & Deploy
```bash
git add netlify/functions/masters-live.mjs
git commit -m "Update: [Tournament Name] final scores"
git push origin main
```

Netlify deploys automatically. No manual steps.

## Features

✅ Real-time leaderboard  
✅ Team scoring (foursomes)  
✅ Tie handling  
✅ Live updates  
✅ Auto-deployment  
✅ Scheduled syncs  
✅ Zero downtime  
✅ Mobile-friendly API  

## Architecture

```
GitHub (Source)
    ↓ (push)
Netlify (Auto-build)
    ↓ (deploy)
Production (thechatmasters.com)
    ↓ (scheduled functions)
Real-time Leaderboard
```

## Deployment Logs

- **Build logs:** https://app.netlify.com/projects/dreamy-fudge-f9edd2/deploys
- **Function logs:** https://app.netlify.com/projects/dreamy-fudge-f9edd2/logs/functions

## Questions?

Check the commit history for updates, or review `netlify/functions/masters-live.mjs` for implementation details.

Built with ❤️ by Mr. Bigglesworth  
Netlify + GitHub + Automated for Speed
