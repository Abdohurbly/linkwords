# LinkWords - Microsoft Store & MSN Submission Guide

## Quick Start (Local Dev)
```bash
npm run dev
# or
npm run serve
```
Open http://localhost:3000

## Files Overview
```
index.html        - Main game (single page)
style.css         - All styles + animations
game.js           - Game engine (modes, scoring, timer)
puzzles.js        - 30 puzzles with difficulty tiers
sfx.js            - Sound effects (Web Audio API)
msstart-sdk.js    - MSStart Games SDK integration
sw.js             - Service worker (offline/PWA)
manifest.json     - PWA manifest
icon.svg          - App icon
package.json      - Package metadata
```

## Step 1: Publish to Microsoft Store

1. Go to https://partner.microsoft.com/ and sign in (free account)
2. Create a new app submission
3. Choose "Progressive Web App (PWA)"
4. Enter your hosted URL (where the game is deployed)
5. Upload icon-192.png and icon-512.png (generate from icon.svg)
6. Fill in store listing:
   - Name: LinkWords - Daily Word Puzzle
   - Description: Find 4 groups of 4 connected words in this addictive daily brain teaser. Features timed mode, practice mode, and challenge-a-friend multiplayer.
   - Category: Games > Puzzle & Trivia
   - Age rating: Everyone
7. Submit for review

## Step 2: Deploy to a Public URL

Options (all free):
- **GitHub Pages**: Push to a repo, enable Pages in settings
- **Vercel**: `npx vercel` from this directory
- **Netlify**: Drag & drop this folder at netlify.com/drop
- **Azure Static Web Apps**: Free tier, integrates with Store

## Step 3: MSN Start Games Onboarding

1. Publish to Microsoft Store first (required)
2. Visit the MSStart Games Onboarding Portal:
   https://assets.msn.com/staticsb/statics/latest/msstart-games-sdk/documentation/docs/onboarding/index.html
3. Enter your Publisher ID and Product ID from Partner Center
4. Choose submission type:
   - "Submit URL" if you're self-hosting
   - "Submit ZIP" to let Microsoft host it
5. Select genre: "Word" or "Puzzle"
6. The SDK integration (msstart-sdk.js) is already wired up:
   - Game lifecycle events (start, level complete, end)
   - Interstitial ads between rounds
   - Ad preloading for faster load times

## Step 4: Generate PNG Icons

The icon.svg needs to be exported as PNG for the Store:

```bash
# Using ImageMagick (if installed)
magick convert icon.svg -resize 192x192 icon-192.png
magick convert icon.svg -resize 512x512 icon-512.png

# Or use any online SVG-to-PNG converter
```

## Revenue

Once onboarded to MSN Start Games:
- Ads are served automatically during gameplay
- Revenue is shared monthly (10-20% depending on tier)
- Payments via Stripe
- Monthly reports on the 15th

## Technical Notes

- Game runs entirely client-side (no server needed)
- All data stored in localStorage
- Works offline via service worker
- Responsive: mobile, tablet, desktop
- Runs in sandboxed iframe on MSN (no popups, no navigation)
- MSStart SDK gracefully no-ops when running standalone
