// ============================================
// LinkWords - MSStart Games SDK Integration
// Wraps the MSStart Games SDK for ad placements
// and game lifecycle events.
//
// When running outside MSN (local dev, standalone),
// all calls gracefully no-op.
// ============================================

const MSStartSDK = (function () {
    let sdk = null;
    let isReady = false;

    function init() {
        // The MSStart SDK injects window.msStartGamesSDK when running inside MSN iframe
        if (window.msStartGamesSDK) {
            sdk = window.msStartGamesSDK;
            isReady = true;
            console.log("[MSStart] SDK detected, initializing...");
            try {
                sdk.game.reportGameReady();
            } catch (e) {
                console.warn("[MSStart] reportGameReady failed:", e);
            }
        } else {
            console.log("[MSStart] SDK not found (running standalone). Ad calls will no-op.");
        }
    }

    // ---- Lifecycle Events ----

    // Call when player starts a game round
    function onGameStart(mode) {
        if (!isReady) return;
        try {
            sdk.game.reportGameStart({ gameMode: mode || "daily" });
        } catch (e) { console.warn("[MSStart] reportGameStart:", e); }
    }

    // Call when a level/group is completed
    function onLevelComplete(level, score) {
        if (!isReady) return;
        try {
            sdk.game.reportLevelComplete({ level: level, score: score });
        } catch (e) { console.warn("[MSStart] reportLevelComplete:", e); }
    }

    // Call when the game ends (win or lose)
    function onGameEnd(won, score, time) {
        if (!isReady) return;
        try {
            sdk.game.reportGameEnd({
                won: won,
                score: score,
                time: time
            });
        } catch (e) { console.warn("[MSStart] reportGameEnd:", e); }
    }

    // ---- Ad Placements ----

    // Show an interstitial ad (between rounds, after game over)
    // Returns a promise that resolves when ad is done/skipped/failed
    function showInterstitialAd() {
        if (!isReady) {
            console.log("[MSStart] Ad skipped (no SDK)");
            return Promise.resolve();
        }
        try {
            return sdk.ads.showInterstitial().catch(() => {
                // Ad failed to load - that's OK, continue game
            });
        } catch (e) {
            console.warn("[MSStart] showInterstitial:", e);
            return Promise.resolve();
        }
    }

    // Show a rewarded ad (optional: player chooses to watch for bonus)
    // Returns promise - resolves true if ad was watched, false otherwise
    function showRewardedAd() {
        if (!isReady) {
            console.log("[MSStart] Rewarded ad skipped (no SDK)");
            return Promise.resolve(false);
        }
        try {
            return sdk.ads.showRewarded()
                .then(() => true)
                .catch(() => false);
        } catch (e) {
            console.warn("[MSStart] showRewarded:", e);
            return Promise.resolve(false);
        }
    }

    // Pre-load ad for faster display
    function preloadAd() {
        if (!isReady) return;
        try {
            sdk.ads.preload();
        } catch (e) { /* silent */ }
    }

    // ---- Status ----
    function isAvailable() { return isReady; }

    return {
        init,
        onGameStart,
        onLevelComplete,
        onGameEnd,
        showInterstitialAd,
        showRewardedAd,
        preloadAd,
        isAvailable
    };
})();
