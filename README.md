# ChatMasters Golf Leaderboard

Real-time golf tournament scoring system for the Texas Children's Houston Open.

## Endpoints

- `GET /api/masters-live` - Full leaderboard with scores and updates
- `GET /api/masters-live?foursome=PlayerName1,PlayerName2,PlayerName3,PlayerName4` - Foursome team scores
- `POST /api/sync-scores` - Manually trigger score sync (runs automatically every 5 minutes)

## Deployment

This project is connected to Netlify. Every push to `main` auto-deploys.

```bash
git push origin main
```

Netlify will automatically:
1. Deploy the updated functions
2. Run the `/api/sync-scores` scheduler every 5 minutes
3. Update the leaderboard in real-time

## Updating Scores

### For the Next Tournament

1. Update the player list in `netlify/functions/masters-live.mjs`
2. Update the seed scores in `generateRound4Scores()`
3. Push to GitHub - Netlify deploys automatically

### Quick Score Updates

POST to `/api/sync-scores` to manually trigger an update:

```bash
curl -X POST https://thechatmasters.com/api/sync-scores
```

## Architecture

- **Netlify Functions**: Serverless JavaScript functions
- **Netlify Blobs**: Persistent storage for scores
- **Netlify Scheduled Functions**: Auto-update scores every 5 minutes
- **GitHub**: Source control + auto-deployment

## Testing

```bash
# Local testing
netlify dev

# Production endpoint
curl https://thechatmasters.com/api/masters-live | jq .
```
