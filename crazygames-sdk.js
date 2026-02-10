// ============================================
// LinkWords - CrazyGames SDK Integration
// Wraps the CrazyGames SDK for ad placements
// and game lifecycle events.
//
// When running outside CrazyGames (local dev, standalone),
// all calls gracefully no-op.
// ============================================

const CrazyGamesSDK = (function () {
    let isReady = false;
    let sdk = null;

    async function init() {
        if (window.CrazyGames && window.CrazyGames.SDK) {
            try {
                await window.CrazyGames.SDK.init();
                sdk = window.CrazyGames.SDK;
                const env = sdk.environment;
                if (env === "crazygames") {
                    isReady = true;
                    console.log("[CrazyGames] SDK initialized on CrazyGames platform");
                } else {
                    console.log("[CrazyGames] SDK detected but not on CrazyGames (env: " + env + ")");
                }
            } catch (e) {
                console.warn("[CrazyGames] SDK init failed:", e);
            }
        } else {
            console.log("[CrazyGames] SDK not found (running standalone). Calls will no-op.");
        }
    }

    // ---- Lifecycle Events ----

    function onLoadingStart() {
        if (!isReady) return;
        try { sdk.game.loadingStart(); }
        catch (e) { console.warn("[CrazyGames] loadingStart:", e); }
    }

    function onLoadingStop() {
        if (!isReady) return;
        try { sdk.game.loadingStop(); }
        catch (e) { console.warn("[CrazyGames] loadingStop:", e); }
    }

    function onGameplayStart() {
        if (!isReady) return;
        try { sdk.game.gameplayStart(); }
        catch (e) { console.warn("[CrazyGames] gameplayStart:", e); }
    }

    function onGameplayStop() {
        if (!isReady) return;
        try { sdk.game.gameplayStop(); }
        catch (e) { console.warn("[CrazyGames] gameplayStop:", e); }
    }

    function onHappyTime() {
        if (!isReady) return;
        try { sdk.game.happytime(); }
        catch (e) { console.warn("[CrazyGames] happytime:", e); }
    }

    // ---- Ad Placements ----

    // Midgame ad (between rounds, after game over)
    function showMidgameAd() {
        if (!isReady) return Promise.resolve();
        return new Promise((resolve) => {
            try {
                sdk.ad.requestAd("midgame", {
                    adStarted: () => {
                        if (typeof SFX !== "undefined") SFX.mute && SFX.mute();
                    },
                    adFinished: () => {
                        if (typeof SFX !== "undefined") SFX.unmute && SFX.unmute();
                        resolve();
                    },
                    adError: () => {
                        if (typeof SFX !== "undefined") SFX.unmute && SFX.unmute();
                        resolve();
                    }
                });
            } catch (e) {
                console.warn("[CrazyGames] midgame ad error:", e);
                resolve();
            }
        });
    }

    // Rewarded ad (player opts in for bonus)
    function showRewardedAd() {
        if (!isReady) return Promise.resolve(false);
        return new Promise((resolve) => {
            try {
                sdk.ad.requestAd("rewarded", {
                    adStarted: () => {
                        if (typeof SFX !== "undefined") SFX.mute && SFX.mute();
                    },
                    adFinished: () => {
                        if (typeof SFX !== "undefined") SFX.unmute && SFX.unmute();
                        resolve(true);
                    },
                    adError: () => {
                        if (typeof SFX !== "undefined") SFX.unmute && SFX.unmute();
                        resolve(false);
                    }
                });
            } catch (e) {
                console.warn("[CrazyGames] rewarded ad error:", e);
                resolve(false);
            }
        });
    }

    function isAvailable() { return isReady; }

    return {
        init,
        onLoadingStart,
        onLoadingStop,
        onGameplayStart,
        onGameplayStop,
        onHappyTime,
        showMidgameAd,
        showRewardedAd,
        isAvailable
    };
})();
