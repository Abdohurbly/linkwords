// ============================================
// LinkWords - Sound Effects (Web Audio API)
// Zero dependencies, no files needed
// ============================================

const SFX = (function () {
    let ctx = null;
    let enabled = true;

    function getCtx() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        return ctx;
    }

    function play(fn) {
        if (!enabled) return;
        try { fn(getCtx()); } catch (e) { /* silent fail */ }
    }

    // Short click/tap
    function tap() {
        play(c => {
            const o = c.createOscillator();
            const g = c.createGain();
            o.connect(g); g.connect(c.destination);
            o.frequency.value = 600;
            o.type = "sine";
            g.gain.setValueAtTime(0.08, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
            o.start(c.currentTime);
            o.stop(c.currentTime + 0.08);
        });
    }

    // Select a tile
    function select() {
        play(c => {
            const o = c.createOscillator();
            const g = c.createGain();
            o.connect(g); g.connect(c.destination);
            o.frequency.value = 880;
            o.type = "sine";
            g.gain.setValueAtTime(0.1, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.1);
            o.start(c.currentTime);
            o.stop(c.currentTime + 0.1);
        });
    }

    // Deselect a tile
    function deselect() {
        play(c => {
            const o = c.createOscillator();
            const g = c.createGain();
            o.connect(g); g.connect(c.destination);
            o.frequency.value = 440;
            o.type = "sine";
            g.gain.setValueAtTime(0.06, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08);
            o.start(c.currentTime);
            o.stop(c.currentTime + 0.08);
        });
    }

    // Correct group found
    function correct() {
        play(c => {
            const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
            notes.forEach((freq, i) => {
                const o = c.createOscillator();
                const g = c.createGain();
                o.connect(g); g.connect(c.destination);
                o.frequency.value = freq;
                o.type = "triangle";
                const t = c.currentTime + i * 0.08;
                g.gain.setValueAtTime(0.12, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
                o.start(t);
                o.stop(t + 0.3);
            });
        });
    }

    // Wrong guess
    function wrong() {
        play(c => {
            const o = c.createOscillator();
            const g = c.createGain();
            o.connect(g); g.connect(c.destination);
            o.frequency.value = 200;
            o.type = "sawtooth";
            g.gain.setValueAtTime(0.1, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);
            o.start(c.currentTime);
            o.stop(c.currentTime + 0.3);
        });
    }

    // Win fanfare
    function win() {
        play(c => {
            const melody = [523, 587, 659, 784, 1047];
            melody.forEach((freq, i) => {
                const o = c.createOscillator();
                const g = c.createGain();
                o.connect(g); g.connect(c.destination);
                o.frequency.value = freq;
                o.type = "triangle";
                const t = c.currentTime + i * 0.12;
                g.gain.setValueAtTime(0.15, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
                o.start(t);
                o.stop(t + 0.5);
            });
        });
    }

    // Lose sound
    function lose() {
        play(c => {
            const notes = [400, 350, 300, 200];
            notes.forEach((freq, i) => {
                const o = c.createOscillator();
                const g = c.createGain();
                o.connect(g); g.connect(c.destination);
                o.frequency.value = freq;
                o.type = "sine";
                const t = c.currentTime + i * 0.15;
                g.gain.setValueAtTime(0.1, t);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
                o.start(t);
                o.stop(t + 0.4);
            });
        });
    }

    function toggle() {
        enabled = !enabled;
        return enabled;
    }

    function isEnabled() { return enabled; }

    return { tap, select, deselect, correct, wrong, win, lose, toggle, isEnabled };
})();
