// ============================================
// LinkWords - Game Engine v3
// Modes: Daily, Timed, Practice, Challenge
// + Keyboard navigation, Day-based difficulty
// ============================================

(function () {
    "use strict";

    // ---- Constants ----
    const MAX_MISTAKES = 4;
    const MAX_SELECTED = 4;
    const GROUP_COLORS = ["group-0", "group-1", "group-2", "group-3"];
    const GROUP_EMOJIS = ["\uD83D\uDFE8", "\uD83D\uDFE9", "\uD83D\uDFE6", "\uD83D\uDFEA"];
    const STORAGE_KEY = "linkwords_stats";
    const TIMED_DURATION = 90; // seconds

    // Scoring
    const SCORE_BASE = 1000;
    const SCORE_TIME_PENALTY = 2;
    const SCORE_MISTAKE_PENALTY = 250;
    const TIMED_BONUS_PER_SECOND = 15; // bonus per second remaining in timed mode

    // ---- State ----
    let state = {
        puzzleIndex: 0,
        puzzle: null,
        words: [],
        selected: [],
        solved: [],
        mistakes: 0,
        guessHistory: [],
        gameOver: false,
        won: false,
        previousGuesses: [],
        timerStart: 0,
        timerElapsed: 0,
        timerInterval: null,
        score: 0,
        consecutiveCorrect: 0,
        mode: "daily",         // "daily", "timed", "practice", "challenge"
        challengeData: null,
        focusIndex: 0,         // keyboard focus position in grid
    };

    // ---- DOM Refs ----
    const $ = (id) => document.getElementById(id);
    const screens = {
        start: $("screen-start"),
        game: $("screen-game"),
        result: $("screen-result")
    };

    // ---- Utility ----
    function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function getDayIndex() {
        const start = new Date(2025, 0, 1);
        const now = new Date();
        return Math.floor((now - start) / (1000 * 60 * 60 * 24));
    }

    function getTodayKey() {
        const now = new Date();
        return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    }

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    }

    // ---- Difficulty by Day ----
    function getDailyPuzzle() {
        const dayOfWeek = new Date().getDay(); // 0=Sun
        const tier = DAY_TIER_MAP[dayOfWeek];
        const pool = getPuzzlesByTier(tier);
        const dayIndex = getDayIndex();
        return { puzzle: pool[dayIndex % pool.length], dayOfWeek, tier };
    }

    function getRandomPuzzle(preferTier) {
        const pool = preferTier ? getPuzzlesByTier(preferTier) : PUZZLES;
        const idx = Math.floor(Math.random() * pool.length);
        return pool[idx];
    }

    // ---- Challenge URL ----
    function encodeChallenge(puzzleIndex, score, time, mistakes) {
        return btoa(JSON.stringify({ p: puzzleIndex, s: score, t: time, m: mistakes }));
    }

    function decodeChallenge(hash) {
        try { return JSON.parse(atob(hash)); }
        catch (e) { return null; }
    }

    function checkForChallenge() {
        const params = new URLSearchParams(window.location.search);
        const c = params.get("c");
        if (!c) return null;
        const data = decodeChallenge(c);
        if (!data || data.p === undefined) return null;
        return { puzzleIndex: data.p, friendScore: data.s || 0, friendTime: data.t || 0, friendMistakes: data.m || 0 };
    }

    // ---- Stats / Storage ----
    function loadStats() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) return JSON.parse(raw);
        } catch (e) { /* ignore */ }
        return { played: 0, won: 0, streak: 0, bestStreak: 0, bestScore: 0, bestTimed: 0, lastDate: null };
    }

    function saveStats(stats) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); }
        catch (e) { /* ignore */ }
    }

    function hasPlayedToday() {
        return loadStats().lastDate === getTodayKey();
    }

    function recordResult(won, score) {
        if (state.mode !== "daily") {
            // For non-daily, just track best scores
            const stats = loadStats();
            if (state.mode === "timed") {
                stats.bestTimed = Math.max(stats.bestTimed || 0, score || 0);
            }
            stats.bestScore = Math.max(stats.bestScore, score || 0);
            saveStats(stats);
            return;
        }
        const stats = loadStats();
        const todayKey = getTodayKey();
        if (stats.lastDate === todayKey) return;

        stats.played++;
        if (won) {
            stats.won++;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yKey = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;
            stats.streak = (stats.lastDate === yKey || stats.streak === 0) ? stats.streak + 1 : 1;
        } else {
            stats.streak = 0;
        }
        stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
        stats.bestScore = Math.max(stats.bestScore, score || 0);
        stats.lastDate = todayKey;
        saveStats(stats);
    }

    // ---- Screen Management ----
    function showScreen(name) {
        Object.values(screens).forEach(s => s.classList.remove("active"));
        screens[name].classList.add("active");
    }

    // ---- Timer ----
    function startTimer() {
        state.timerStart = Date.now();
        state.timerElapsed = 0;
        updateTimerDisplay();

        if (state.mode === "timed") {
            $("timer-bar-container").style.display = "";
            $("timer-bar").style.width = "100%";
            $("timer").classList.add("timer-countdown");
        } else {
            $("timer-bar-container").style.display = "none";
            $("timer").classList.remove("timer-countdown");
        }

        state.timerInterval = setInterval(() => {
            state.timerElapsed = Math.floor((Date.now() - state.timerStart) / 1000);
            updateTimerDisplay();
            updateLiveScore();

            // Timed mode countdown
            if (state.mode === "timed") {
                const remaining = TIMED_DURATION - state.timerElapsed;
                const pct = Math.max(0, (remaining / TIMED_DURATION) * 100);
                $("timer-bar").style.width = pct + "%";

                if (remaining <= 10) {
                    $("timer").classList.add("timer-danger");
                }

                if (remaining <= 0) {
                    // Time's up
                    state.gameOver = true;
                    state.won = false;
                    state.score = calculateScore();
                    stopTimer();
                    showToast("Time's up!");
                    SFX.lose();
                    setTimeout(() => revealAll(), 600);
                }
            }
        }, 250); // update more frequently for smoother bar
    }

    function stopTimer() {
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
        $("timer").classList.remove("timer-danger");
    }

    function updateTimerDisplay() {
        if (state.mode === "timed") {
            const remaining = Math.max(0, TIMED_DURATION - state.timerElapsed);
            $("timer").textContent = formatTime(remaining);
        } else {
            $("timer").textContent = formatTime(state.timerElapsed);
        }
    }

    // ---- Scoring ----
    function calculateScore() {
        if (!state.won) {
            // Partial score in timed mode
            if (state.mode === "timed") {
                return Math.max(0, state.solved.length * SCORE_BASE - state.mistakes * SCORE_MISTAKE_PENALTY);
            }
            return 0;
        }
        let score = state.solved.length * SCORE_BASE;
        score -= state.timerElapsed * SCORE_TIME_PENALTY;
        score -= state.mistakes * SCORE_MISTAKE_PENALTY;

        // Timed mode bonus: reward finishing fast
        if (state.mode === "timed") {
            const remaining = Math.max(0, TIMED_DURATION - state.timerElapsed);
            score += remaining * TIMED_BONUS_PER_SECOND;
        }

        return Math.max(0, score);
    }

    function updateLiveScore() {
        let projected;
        if (state.mode === "timed") {
            const remaining = Math.max(0, TIMED_DURATION - state.timerElapsed);
            projected = Math.max(0,
                state.solved.length * SCORE_BASE
                - state.mistakes * SCORE_MISTAKE_PENALTY
                + remaining * TIMED_BONUS_PER_SECOND
            );
        } else {
            projected = Math.max(0,
                state.solved.length * SCORE_BASE
                - state.timerElapsed * SCORE_TIME_PENALTY
                - state.mistakes * SCORE_MISTAKE_PENALTY
            );
        }
        $("score-display").textContent = projected + " pts";
    }

    // ---- Particles ----
    function spawnParticles(x, y, color) {
        const canvas = $("particle-canvas");
        for (let i = 0; i < 20; i++) {
            const p = document.createElement("div");
            p.className = "particle";
            const angle = (Math.PI * 2 * i) / 20 + (Math.random() - 0.5) * 0.5;
            const dist = 40 + Math.random() * 80;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist;
            const size = 4 + Math.random() * 6;
            p.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${color};--dx:${dx}px;--dy:${dy}px;`;
            canvas.appendChild(p);
            setTimeout(() => p.remove(), 700);
        }
    }

    function burstFromElement(el, colorVar) {
        const rect = el.getBoundingClientRect();
        const color = getComputedStyle(document.documentElement).getPropertyValue(colorVar).trim();
        spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, color);
    }

    function winCelebration() {
        const colors = ["--group-0", "--group-1", "--group-2", "--group-3"];
        const style = getComputedStyle(document.documentElement);
        for (let b = 0; b < 5; b++) {
            setTimeout(() => {
                spawnParticles(
                    100 + Math.random() * (window.innerWidth - 200),
                    100 + Math.random() * (window.innerHeight - 300),
                    style.getPropertyValue(colors[b % 4]).trim()
                );
            }, b * 200);
        }
    }

    // ---- Keyboard Navigation ----
    function initKeyboard() {
        document.addEventListener("keydown", handleKeyDown);
    }

    function handleKeyDown(e) {
        // Only handle during game screen
        if (!screens.game.classList.contains("active") || state.gameOver) return;

        const cols = 4;
        const total = state.words.length;
        if (total === 0) return;

        switch (e.key) {
            case "ArrowRight":
                e.preventDefault();
                state.focusIndex = (state.focusIndex + 1) % total;
                updateFocus();
                break;
            case "ArrowLeft":
                e.preventDefault();
                state.focusIndex = (state.focusIndex - 1 + total) % total;
                updateFocus();
                break;
            case "ArrowDown":
                e.preventDefault();
                state.focusIndex = (state.focusIndex + cols) % total;
                updateFocus();
                break;
            case "ArrowUp":
                e.preventDefault();
                state.focusIndex = (state.focusIndex - cols + total) % total;
                updateFocus();
                break;
            case " ":
                e.preventDefault();
                toggleSelect(state.focusIndex);
                break;
            case "Enter":
                e.preventDefault();
                if (state.selected.length === MAX_SELECTED) {
                    submitGuess();
                }
                break;
            case "s":
            case "S":
                if (!e.ctrlKey && !e.metaKey) {
                    shuffleWords();
                }
                break;
            case "Escape":
                deselectAll();
                break;
        }
    }

    function updateFocus() {
        const tiles = $("grid").querySelectorAll(".tile");
        tiles.forEach((t, i) => {
            t.classList.toggle("focused", i === state.focusIndex);
        });
        if (tiles[state.focusIndex]) {
            tiles[state.focusIndex].scrollIntoView({ block: "nearest" });
        }
    }

    // ---- Initialize ----
    function init() {
        const challenge = checkForChallenge();

        if (challenge) {
            state.mode = "challenge";
            state.challengeData = challenge;
            state.puzzleIndex = challenge.puzzleIndex;
            state.puzzle = PUZZLES[state.puzzleIndex % PUZZLES.length];
            $("start-title").textContent = "Challenge Mode";
            $("puzzle-number").innerHTML = `Puzzle #${state.puzzleIndex + 1}<br><span style="color:var(--group-1)">Your friend scored ${challenge.friendScore} pts</span>`;
            $("btn-play").textContent = "Accept Challenge";
            $("btn-challenge").style.display = "none";
            $("btn-timed").style.display = "none";
            $("btn-practice").style.display = "none";
            $("difficulty-label").style.display = "none";
        } else {
            state.mode = "daily";
            const { puzzle, dayOfWeek, tier } = getDailyPuzzle();
            state.puzzle = puzzle;
            state.puzzleIndex = getDayIndex();
            $("puzzle-number").textContent = `Puzzle #${state.puzzleIndex + 1}`;
            $("difficulty-label").textContent = DAY_LABELS[dayOfWeek];
            $("difficulty-label").className = "difficulty-label tier-" + tier;
        }

        // Streak
        const stats = loadStats();
        const parts = [];
        if (stats.streak > 0) parts.push(`\uD83D\uDD25 ${stats.streak} day streak`);
        if (stats.bestScore > 0) parts.push(`Best: ${stats.bestScore} pts`);
        if (stats.bestTimed > 0) parts.push(`Timed best: ${stats.bestTimed}`);
        if (parts.length) $("start-streak").innerHTML = parts.join(" &nbsp;|&nbsp; ");

        // Event listeners (always bind)
        $("btn-play").onclick = () => { state.mode = "daily"; startGame(); };
        $("btn-timed").onclick = startTimedMode;
        $("btn-practice").onclick = startPracticeMode;
        $("btn-challenge").onclick = startRandomChallenge;
        $("btn-shuffle").onclick = shuffleWords;
        $("btn-deselect").onclick = deselectAll;
        $("btn-submit").onclick = submitGuess;
        $("btn-share").onclick = shareResults;
        $("btn-challenge-share").onclick = shareChallenge;
        $("btn-play-again").onclick = playAgain;
        $("btn-home").onclick = goHome;
        $("sound-toggle").onclick = toggleSound;
        $("sound-toggle").textContent = SFX.isEnabled() ? "Sound: ON" : "Sound: OFF";

        initKeyboard();

        // If played today, show results
        if (state.mode === "daily" && hasPlayedToday()) {
            loadSavedGame();
            return;
        }

        showScreen("start");
    }

    function toggleSound() {
        const on = SFX.toggle();
        $("sound-toggle").textContent = on ? "Sound: ON" : "Sound: OFF";
    }

    // ---- Mode Starters ----
    function startTimedMode() {
        state.mode = "timed";
        state.puzzle = getRandomPuzzle();
        state.puzzleIndex = PUZZLES.indexOf(state.puzzle);
        state.challengeData = null;
        startGame();
    }

    function startPracticeMode() {
        state.mode = "practice";
        state.puzzle = getRandomPuzzle();
        state.puzzleIndex = PUZZLES.indexOf(state.puzzle);
        state.challengeData = null;
        startGame();
    }

    function startRandomChallenge() {
        state.mode = "challenge";
        state.puzzle = getRandomPuzzle();
        state.puzzleIndex = PUZZLES.indexOf(state.puzzle);
        state.challengeData = null;
        startGame();
    }

    function playAgain() {
        if (state.mode === "timed") {
            startTimedMode();
        } else if (state.mode === "practice") {
            startPracticeMode();
        } else {
            goHome();
        }
    }

    function goHome() {
        try { stopTimer(); } catch(e) {}
        state.gameOver = false;
        state.selected = [];
        state.solved = [];
        showScreen("start");
    }

    function loadSavedGame() {
        try {
            const saved = localStorage.getItem("linkwords_game_" + getTodayKey());
            if (saved) {
                const data = JSON.parse(saved);
                state.solved = data.solved || [];
                state.mistakes = data.mistakes || 0;
                state.guessHistory = data.guessHistory || [];
                state.won = data.won || false;
                state.score = data.score || 0;
                state.timerElapsed = data.time || 0;
                state.gameOver = true;
                showResults();
                return;
            }
        } catch (e) { /* ignore */ }
        showScreen("start");
    }

    function saveGameState() {
        if (state.mode !== "daily") return;
        try {
            localStorage.setItem("linkwords_game_" + getTodayKey(), JSON.stringify({
                solved: state.solved, mistakes: state.mistakes,
                guessHistory: state.guessHistory, won: state.won,
                score: state.score, time: state.timerElapsed
            }));
        } catch (e) { /* ignore */ }
    }

    // ---- Game Start ----
    function startGame() {
        const allWords = [];
        state.puzzle.groups.forEach((group, gi) => {
            group.words.forEach(word => allWords.push({ word, groupIndex: gi }));
        });
        state.words = shuffleArray(allWords);
        state.selected = [];
        state.solved = [];
        state.mistakes = 0;
        state.guessHistory = [];
        state.gameOver = false;
        state.won = false;
        state.previousGuesses = [];
        state.score = 0;
        state.consecutiveCorrect = 0;
        state.focusIndex = 0;

        // Mode badge
        const badge = $("hud-mode-badge");
        if (state.mode === "timed") {
            badge.style.display = "";
            badge.textContent = "TIMED";
            badge.className = "hud-mode-badge badge-timed";
        } else if (state.mode === "practice") {
            badge.style.display = "";
            badge.textContent = "PRACTICE";
            badge.className = "hud-mode-badge badge-practice";
        } else {
            badge.style.display = "none";
        }

        showScreen("game");
        renderMistakes();
        renderGrid();
        $("solved-groups").innerHTML = "";
        $("score-display").textContent = "0 pts";

        startTimer();
        SFX.tap();

        // SDK: report game start
        MSStartSDK.onGameStart(state.mode);
        MSStartSDK.preloadAd();
        CrazyGamesSDK.onGameplayStart();
    }

    // ---- Rendering ----
    function renderMistakes() {
        const dotsEl = $("mistake-dots");
        dotsEl.innerHTML = "";
        for (let i = 0; i < MAX_MISTAKES; i++) {
            const dot = document.createElement("div");
            dot.className = "dot" + (i < state.mistakes ? " used" : "");
            dotsEl.appendChild(dot);
        }
    }

    function renderGrid() {
        const grid = $("grid");
        grid.innerHTML = "";

        state.words.forEach((item, i) => {
            const tile = document.createElement("div");
            tile.className = "tile";
            if (i === state.focusIndex) tile.classList.add("focused");
            tile.textContent = item.word;
            tile.dataset.index = i;
            tile.tabIndex = -1;

            if (state.selected.includes(i)) tile.classList.add("selected");

            tile.addEventListener("click", () => {
                state.focusIndex = i;
                toggleSelect(i);
                updateFocus();
            });
            grid.appendChild(tile);
        });

        updateSubmitButton();
    }

    function toggleSelect(index) {
        if (state.gameOver) return;

        const pos = state.selected.indexOf(index);
        if (pos >= 0) {
            state.selected.splice(pos, 1);
            SFX.deselect();
        } else {
            if (state.selected.length >= MAX_SELECTED) return;
            state.selected.push(index);
            SFX.select();
        }

        const tiles = $("grid").querySelectorAll(".tile");
        tiles.forEach((tile, i) => tile.classList.toggle("selected", state.selected.includes(i)));

        if (pos < 0 && tiles[index]) {
            tiles[index].classList.remove("pop");
            void tiles[index].offsetWidth;
            tiles[index].classList.add("pop");
        }

        updateSubmitButton();
    }

    function updateSubmitButton() {
        $("btn-submit").disabled = state.selected.length !== MAX_SELECTED;
    }

    function deselectAll() {
        state.selected = [];
        const tiles = $("grid").querySelectorAll(".tile");
        tiles.forEach(t => t.classList.remove("selected"));
        updateSubmitButton();
    }

    function shuffleWords() {
        state.words = shuffleArray(state.words);
        state.selected = [];
        state.focusIndex = 0;
        renderGrid();
        SFX.tap();
    }

    // ---- Submit Guess ----
    function submitGuess() {
        if (state.selected.length !== MAX_SELECTED || state.gameOver) return;

        const selectedWords = state.selected.map(i => state.words[i]);
        const selectedWordSet = selectedWords.map(w => w.word).sort().join(",");

        if (state.previousGuesses.includes(selectedWordSet)) {
            showToast("Already guessed!");
            return;
        }
        state.previousGuesses.push(selectedWordSet);

        const groupCounts = {};
        selectedWords.forEach(w => {
            groupCounts[w.groupIndex] = (groupCounts[w.groupIndex] || 0) + 1;
        });

        state.guessHistory.push(selectedWords.map(w => w.groupIndex));

        const entries = Object.entries(groupCounts);
        const isCorrect = entries.length === 1 && entries[0][1] === 4;

        if (isCorrect) {
            state.consecutiveCorrect++;
            SFX.correct();
            solveGroup(parseInt(entries[0][0]));
        } else {
            state.consecutiveCorrect = 0;
            const maxCount = Math.max(...Object.values(groupCounts));
            if (maxCount === 3) showToast("One away...");

            state.mistakes++;
            renderMistakes();
            SFX.wrong();

            const tiles = $("grid").querySelectorAll(".tile");
            state.selected.forEach(i => {
                tiles[i].classList.add("shake");
                setTimeout(() => tiles[i].classList.remove("shake"), 500);
            });

            if (state.mistakes >= MAX_MISTAKES) {
                state.gameOver = true;
                state.won = false;
                state.score = calculateScore();
                stopTimer();
                setTimeout(() => revealAll(), 800);
            }

            deselectAll();
        }

        updateLiveScore();
        saveGameState();
    }

    function solveGroup(groupIndex) {
        state.solved.push(groupIndex);
        const group = state.puzzle.groups[groupIndex];

        state.words = state.words.filter(w => w.groupIndex !== groupIndex);
        state.selected = [];
        state.focusIndex = Math.min(state.focusIndex, state.words.length - 1);

        const solvedEl = $("solved-groups");
        const div = document.createElement("div");
        div.className = "solved-group";
        div.style.background = `var(--${GROUP_COLORS[group.difficulty]})`;
        div.style.color = `var(--${GROUP_COLORS[group.difficulty]}-text)`;
        div.innerHTML = `<div class="group-name">${group.name}</div><div class="group-words">${group.words.join(", ")}</div>`;
        solvedEl.appendChild(div);

        setTimeout(() => burstFromElement(div, `--${GROUP_COLORS[group.difficulty]}`), 100);
        renderGrid();

        // SDK: report level/group complete
        MSStartSDK.onLevelComplete(state.solved.length, calculateScore());
        CrazyGamesSDK.onHappyTime();

        if (state.solved.length === 4) {
            state.gameOver = true;
            state.won = true;
            state.score = calculateScore();
            stopTimer();
            SFX.win();
            winCelebration();
            setTimeout(() => showResults(), 800);
        }
    }

    function revealAll() {
        const remaining = [0, 1, 2, 3].filter(i => !state.solved.includes(i));
        let delay = 0;
        remaining.forEach(gi => {
            setTimeout(() => {
                state.solved.push(gi);
                const group = state.puzzle.groups[gi];
                const div = document.createElement("div");
                div.className = "solved-group";
                div.style.background = `var(--${GROUP_COLORS[group.difficulty]})`;
                div.style.color = `var(--${GROUP_COLORS[group.difficulty]}-text)`;
                div.innerHTML = `<div class="group-name">${group.name}</div><div class="group-words">${group.words.join(", ")}</div>`;
                $("solved-groups").appendChild(div);
            }, delay);
            delay += 400;
        });

        setTimeout(() => {
            state.words = [];
            if (!state.score) state.score = calculateScore();
            renderGrid();
            if (!state.won) SFX.lose();
            setTimeout(() => showResults(), 400);
        }, delay);
    }

    // ---- Results ----
    function showResults() {
        recordResult(state.won, state.score);
        saveGameState();

        // SDK: report game end + show ad between rounds
        MSStartSDK.onGameEnd(state.won, state.score, state.timerElapsed);
        MSStartSDK.showInterstitialAd();
        CrazyGamesSDK.onGameplayStop();
        CrazyGamesSDK.showMidgameAd();

        // Title
        if (state.won) {
            if (state.mode === "timed") {
                $("result-title").textContent = state.score > 4500 ? "SPEED DEMON!" : state.score > 3000 ? "Lightning Fast!" : "Made it!";
            } else if (state.score > 3000) {
                $("result-title").textContent = "PERFECT!";
            } else if (state.score > 2000) {
                $("result-title").textContent = "Brilliant!";
            } else if (state.score > 1000) {
                $("result-title").textContent = "Nice work!";
            } else {
                $("result-title").textContent = "You got it!";
            }
        } else {
            $("result-title").textContent = state.mode === "timed" ? "Time's up!" : "Better luck next time!";
        }

        // Score
        $("result-score-big").textContent = state.score + " pts";
        $("result-score-big").className = "result-score-big" + (state.won ? " glow" : "");

        // Mode badge on result
        const rmb = $("result-mode-badge");
        if (state.mode === "timed") {
            rmb.style.display = "";
            rmb.textContent = "TIMED MODE";
            rmb.className = "result-mode-badge badge-timed";
        } else if (state.mode === "practice") {
            rmb.style.display = "";
            rmb.textContent = "PRACTICE MODE";
            rmb.className = "result-mode-badge badge-practice";
        } else {
            rmb.style.display = "none";
        }

        // Groups
        const resultGroups = $("result-groups");
        resultGroups.innerHTML = "";
        state.puzzle.groups.forEach(group => {
            const div = document.createElement("div");
            div.className = "solved-group";
            div.style.background = `var(--${GROUP_COLORS[group.difficulty]})`;
            div.style.color = `var(--${GROUP_COLORS[group.difficulty]}-text)`;
            div.innerHTML = `<div class="group-name">${group.name}</div><div class="group-words">${group.words.join(", ")}</div>`;
            resultGroups.appendChild(div);
        });

        $("result-grid").textContent = buildShareGrid();

        // Stats
        const stats = loadStats();
        $("stat-time").textContent = formatTime(state.timerElapsed);
        $("stat-score").textContent = state.score;
        $("stat-streak").textContent = stats.streak;
        $("stat-played").textContent = stats.played;

        // Challenge VS
        const vsEl = $("challenge-vs");
        if (state.challengeData && state.challengeData.friendScore !== undefined) {
            vsEl.style.display = "block";
            $("vs-my-score").textContent = state.score;
            $("vs-friend-score").textContent = state.challengeData.friendScore;
            const diff = state.score - state.challengeData.friendScore;
            $("vs-result").textContent = diff > 0 ? `You win by ${diff} pts!` : diff < 0 ? `Friend wins by ${Math.abs(diff)} pts` : "It's a tie!";
            $("vs-result").style.color = diff > 0 ? "var(--group-1)" : diff < 0 ? "var(--error)" : "var(--group-0)";
        } else {
            vsEl.style.display = "none";
        }

        // Play Again button for timed/practice
        $("btn-play-again").style.display = (state.mode === "timed" || state.mode === "practice") ? "" : "none";

        // Hide challenge button on external platforms (URL won't work in iframe)
        if (CrazyGamesSDK.isAvailable()) {
            $("btn-challenge-share").style.display = "none";
        }

        // Countdown for daily
        if (state.mode === "daily") {
            updateCountdown();
            $("next-puzzle").style.display = "";
        } else {
            $("next-puzzle").style.display = "none";
        }

        showScreen("result");
    }

    function buildShareGrid() {
        return state.guessHistory.map(row =>
            row.map(gi => GROUP_EMOJIS[state.puzzle.groups[gi].difficulty]).join("")
        ).join("\n");
    }

    function shareResults() {
        const modeTag = state.mode === "timed" ? " (Timed)" : state.mode === "practice" ? " (Practice)" : "";
        const text = `LinkWords Puzzle #${state.puzzleIndex + 1}${modeTag}\n${state.score} pts | ${formatTime(state.timerElapsed)}\n${buildShareGrid()}`;
        copyOrShare(text);
    }

    function shareChallenge() {
        const encoded = encodeChallenge(state.puzzleIndex, state.score, state.timerElapsed, state.mistakes);
        const url = `${window.location.origin + window.location.pathname}?c=${encoded}`;
        copyOrShare(`I scored ${state.score} pts on LinkWords Puzzle #${state.puzzleIndex + 1}! Can you beat me?\n${url}`);
    }

    function copyOrShare(text) {
        if (navigator.share) {
            navigator.share({ text }).catch(() => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
                .then(() => showToast("Copied to clipboard!"))
                .catch(() => showToast("Score: " + state.score + " pts"));
        } else {
            // Iframe fallback - just show the score
            showToast("Score: " + state.score + " pts");
        }
    }

    function updateCountdown() {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const diff = tomorrow - now;
        $("next-puzzle").textContent = `Next puzzle in ${Math.floor(diff / 3600000)}h ${Math.floor((diff % 3600000) / 60000)}m`;
    }

    function showToast(msg) {
        const toast = $("toast");
        toast.textContent = msg;
        toast.classList.remove("show");
        void toast.offsetWidth;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2000);
    }

    document.addEventListener("DOMContentLoaded", async () => {
        MSStartSDK.init();
        await CrazyGamesSDK.init();
        CrazyGamesSDK.onLoadingStart();
        init();
        CrazyGamesSDK.onLoadingStop();
    });
})();
