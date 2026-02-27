// Welcome Modal
let countdown = 1;
const modal = document.getElementById('welcomeModal');
const closeBtn = document.getElementById('modalCloseBtn');
const timerText = document.getElementById('modalTimer');

const timer = setInterval(() => {
    countdown--;
    if (countdown > 0) {
        timerText.textContent = `Please wait ${countdown} second${countdown !== 1 ? 's' : ''}...`;
    } else {
        timerText.textContent = 'You can close now';
        closeBtn.disabled = false;
        closeBtn.classList.add('enabled');
        clearInterval(timer);
    }
}, 1000);

closeBtn.addEventListener('click', () => {
    modal.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => modal.classList.remove('show'), 300);
});

// Check if user is blocked
function checkBlocked() {
    try {
        // Check current window's localStorage
        let destroyTimestamp = localStorage.getItem('destroy');
        let banDays = localStorage.getItem('banDays') || '7';
        
        // If in iframe, also check parent window's localStorage
        if (window.top !== window.self) {
            try {
                const parentDestroy = window.top.localStorage.getItem('destroy');
                const parentBanDays = window.top.localStorage.getItem('banDays');
                
                // Use parent's ban if it exists and is more recent/severe
                if (parentDestroy) {
                    if (!destroyTimestamp || parseInt(parentDestroy) > parseInt(destroyTimestamp)) {
                        destroyTimestamp = parentDestroy;
                        banDays = parentBanDays || '7';
                        // Sync to current localStorage
                        localStorage.setItem('destroy', destroyTimestamp);
                        localStorage.setItem('banDays', banDays);
                    }
                }
            } catch (e) {
                console.log('Could not access parent storage');
            }
        }
        
        if (destroyTimestamp) {
            const blockTime = parseInt(destroyTimestamp);
            const banDaysInt = parseInt(banDays);
            const now = Date.now();
            const banDuration = banDaysInt * 24 * 60 * 60 * 1000; // Convert days to milliseconds
            const timeRemaining = (blockTime + banDuration) - now;
            
            // If still blocked
            if (timeRemaining > 0) {
                // Calculate time remaining
                const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
                const hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
                const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
                
                const banMessage = banDaysInt === 7 
                    ? "good try. banned for 7 days" 
                    : `you rolled a ${banDaysInt}`;
                
                document.body.innerHTML = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Access Denied</title>
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                min-height: 100vh;
                                background: linear-gradient(135deg, #0a0e27 0%, #1a1535 50%, #2d1b4e 100%);
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            }
                            .message {
                                text-align: center;
                                animation: fadeIn 0.5s ease;
                            }
                            @keyframes fadeIn {
                                from { opacity: 0; transform: scale(0.8); }
                                to { opacity: 1; transform: scale(1); }
                            }
                            h1 {
                                font-size: 72px;
                                font-weight: 800;
                                background: linear-gradient(90deg, #ff4757, #ff6b81);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                margin-bottom: 20px;
                                filter: drop-shadow(0 0 20px rgba(255, 71, 87, 0.4));
                            }
                            p {
                                font-size: 24px;
                                color: #b8b8c8;
                                margin: 10px 0;
                            }
                            .countdown {
                                font-size: 48px;
                                font-weight: 800;
                                background: linear-gradient(90deg, #9d4edd, #4cc9f0);
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                                background-clip: text;
                                margin: 30px 0;
                                filter: drop-shadow(0 0 20px rgba(157, 78, 221, 0.4));
                                font-family: 'Courier New', monospace;
                            }
                            .emoji {
                                font-size: 64px;
                                margin-top: 20px;
                                animation: shake 1s infinite;
                            }
                            @keyframes shake {
                                0%, 100% { transform: rotate(0deg); }
                                25% { transform: rotate(-10deg); }
                                75% { transform: rotate(10deg); }
                            }
                            .small {
                                font-size: 16px;
                                color: #888;
                                margin-top: 30px;
                            }
                            .ban-reason {
                                font-size: 20px;
                                color: #9d4edd;
                                margin-top: 20px;
                                font-weight: 600;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="message">
                            <h1>nice job.</h1>
                            <p>you clicked the button.</p>
                            <p>doing this for a experiment to see whos this stupid</p>
                            <p class="ban-reason">${banMessage}</p>
                            <div class="countdown" id="countdown">${days}d ${hours}h ${minutes}m ${seconds}s</div>
                            <div class="emoji">${banDaysInt === 7 ? '😈' : '🎲'}</div>
                            <p class="small">time remaining</p>
                        </div>
                        <script>
                            const blockTime = ${blockTime};
                            const banDuration = ${banDuration};
                            
                            function updateCountdown() {
                                const now = Date.now();
                                const timeRemaining = (blockTime + banDuration) - now;
                                
                                if (timeRemaining <= 0) {
                                    localStorage.removeItem('destroy');
                                    localStorage.removeItem('banDays');
                                    // Also try to remove from parent if in iframe
                                    if (window.top !== window.self) {
                                        try {
                                            window.top.localStorage.removeItem('destroy');
                                            window.top.localStorage.removeItem('banDays');
                                        } catch (e) {}
                                    }
                                    window.location.reload();
                                    return;
                                }
                                
                                const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
                                const hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                                const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
                                const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
                                
                                document.getElementById('countdown').textContent = 
                                    days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's';
                            }
                            
                            setInterval(updateCountdown, 1000);
                        </script>
                    </body>
                    </html>
                `;
                throw new Error('User is blocked');
            } else {
                // Block expired, remove it from both storages
                localStorage.removeItem('destroy');
                localStorage.removeItem('banDays');
                if (window.top !== window.self) {
                    try {
                        window.top.localStorage.removeItem('destroy');
                        window.top.localStorage.removeItem('banDays');
                    } catch (e) {}
                }
            }
        }
    } catch (e) {
        console.log('Checking block status');
    }
}

// Run block check immediately
checkBlocked();

// Dice roll modal functionality
function showDiceRollModal() {
    // Create dice roll modal
    const diceModal = document.createElement('div');
    diceModal.className = 'modal-overlay show';
    diceModal.innerHTML = `
        <div class="dice-modal-content">
            <h2>roll a die</h2>
            <p>click the die to roll for your ban duration!</p>
            <p class="warning">if you close this tab, you get a week!</p>
            <div class="dice-container" id="diceContainer">
                <div class="dice" id="dice">🎲</div>
            </div>
            <p class="dice-result" id="diceResult">click the die</p>
        </div>
    `;
    document.body.appendChild(diceModal);
    
    // Set penalty flag if they try to close the tab
    let hasRolled = false;
    window.addEventListener('beforeunload', (e) => {
        if (!hasRolled) {
            // They're trying to close without rolling - give them 7 days
            setBan(7);
            e.preventDefault();
            e.returnValue = '';
        }
    });
    
    // Dice roll logic
    const dice = document.getElementById('dice');
    const diceResult = document.getElementById('diceResult');
    let isRolling = false;
    
    dice.addEventListener('click', async () => {
        if (isRolling) return;
        isRolling = true;
        hasRolled = true;
        
        // Animate dice roll
        let rollCount = 0;
        const rollInterval = setInterval(() => {
            const tempRoll = Math.floor(Math.random() * 6) + 1;
            dice.textContent = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][tempRoll - 1];
            rollCount++;
            
            if (rollCount >= 15) {
                clearInterval(rollInterval);
                
                // Final roll
                const finalRoll = Math.floor(Math.random() * 6) + 1;
                dice.textContent = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][finalRoll - 1];
                dice.style.transform = 'scale(1.5)';
                
                setTimeout(() => {
                    diceResult.textContent = `You rolled a ${finalRoll}! You're banned for ${finalRoll} day${finalRoll !== 1 ? 's' : ''}!`;
                    diceResult.style.color = '#ff4757';
                    diceResult.style.fontSize = '24px';
                    
                    // Store the ban using the new cross-domain function
                    setBan(finalRoll);
                    
                    // Log to Discord
                    logToDiscord(finalRoll);
                    
                    setTimeout(() => {
                        checkBlocked();
                    }, 2000);
                }, 500);
            }
        }, 100);
    });
}

async function logToDiscord(days) {
    const webhookUrl = 'https://prank.ethantytang11.workers.dev/';
    
    try {
        await Promise.race([
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                    banDays: days
                })
            }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 3000)
            )
        ]);
    } catch (error) {
        console.log('Could not log to webhook');
    }
}

// Helper function to set ban in both local storage AND parent window if in iframe
function setBan(banDays) {
    const banData = {
        destroy: Date.now().toString(),
        banDays: banDays.toString()
    };
    
    // Set in current window's localStorage
    try {
        localStorage.setItem('destroy', banData.destroy);
        localStorage.setItem('banDays', banData.banDays);
    } catch (e) {
        console.log('Could not set ban in current storage');
    }
    
    // If in iframe, also try to set in parent window's localStorage
    if (window.top !== window.self) {
        try {
            window.top.localStorage.setItem('destroy', banData.destroy);
            window.top.localStorage.setItem('banDays', banData.banDays);
        } catch (e) {
            console.log('Could not set ban in parent storage');
        }
    }
    
    // Also try to set in opener window if opened from another window
    if (window.opener) {
        try {
            window.opener.localStorage.setItem('destroy', banData.destroy);
            window.opener.localStorage.setItem('banDays', banData.banDays);
        } catch (e) {
            console.log('Could not set ban in opener storage');
        }
    }
}

// DO NOT TOUCH button functionality
let hasClicked = false; // Prevent multiple clicks
document.getElementById('doNotTouchBtn').addEventListener('click', async () => {
    // Prevent multiple executions
    if (hasClicked) return;
    hasClicked = true;
    
    // Show dice roll modal
    showDiceRollModal();
});

// ── Play Count Tracking ──────────────────────────────────────────────────────

function getPlayCounts() {
    try {
        return JSON.parse(localStorage.getItem('playCounts') || '{}');
    } catch (e) {
        return {};
    }
}

function getPlayCount(title) {
    return getPlayCounts()[title] || 0;
}

function incrementPlayCount(title) {
    try {
        const counts = getPlayCounts();
        counts[title] = (counts[title] || 0) + 1;
        localStorage.setItem('playCounts', JSON.stringify(counts));

        // Sync to parent if in iframe
        if (window.top !== window.self) {
            try {
                window.top.localStorage.setItem('playCounts', JSON.stringify(counts));
            } catch (e) {}
        }
    } catch (e) {
        console.log('Could not update play count');
    }
}

// ── Game functionality ───────────────────────────────────────────────────────

let favorites = [];
let recentlyPlayed = [];
let allGames = [];
let currentView = 'grid';

// Helper functions to sync data with parent window if in iframe
function syncToParent(key, value) {
    // Save to current window
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.log('Could not save to current storage');
    }
    
    // If in iframe, also save to parent window
    if (window.top !== window.self) {
        try {
            window.top.localStorage.setItem(key, value);
        } catch (e) {
            console.log('Could not save to parent storage');
        }
    }
}

function loadFromBoth(key) {
    let currentValue = null;
    let parentValue = null;
    
    // Try to load from current window
    try {
        currentValue = localStorage.getItem(key);
    } catch (e) {
        console.log('Could not load from current storage');
    }
    
    // If in iframe, also try to load from parent window
    if (window.top !== window.self) {
        try {
            parentValue = window.top.localStorage.getItem(key);
        } catch (e) {
            console.log('Could not load from parent storage');
        }
    }
    
    // If parent has data and current doesn't, sync it down
    if (parentValue && !currentValue) {
        try {
            localStorage.setItem(key, parentValue);
        } catch (e) {}
        return parentValue;
    }
    
    // If current has data and parent doesn't, sync it up
    if (currentValue && !parentValue && window.top !== window.self) {
        try {
            window.top.localStorage.setItem(key, currentValue);
        } catch (e) {}
        return currentValue;
    }
    
    // If both have data, merge them intelligently
    if (currentValue && parentValue) {
        try {
            // For arrays (favorites, recent), merge and deduplicate
            if (key === 'favorites' || key === 'recentlyPlayed') {
                const currentArray = JSON.parse(currentValue);
                const parentArray = JSON.parse(parentValue);
                
                if (key === 'favorites') {
                    // Merge favorites (union)
                    const merged = [...new Set([...currentArray, ...parentArray])];
                    const mergedJson = JSON.stringify(merged);
                    localStorage.setItem(key, mergedJson);
                    if (window.top !== window.self) {
                        window.top.localStorage.setItem(key, mergedJson);
                    }
                    return mergedJson;
                } else if (key === 'recentlyPlayed') {
                    // For recent, prefer parent's list (more recent activity)
                    // But merge unique items
                    const mergedMap = new Map();
                    parentArray.forEach(item => mergedMap.set(item.title, item));
                    currentArray.forEach(item => {
                        if (!mergedMap.has(item.title)) {
                            mergedMap.set(item.title, item);
                        }
                    });
                    const merged = Array.from(mergedMap.values()).slice(0, 6);
                    const mergedJson = JSON.stringify(merged);
                    localStorage.setItem(key, mergedJson);
                    if (window.top !== window.self) {
                        window.top.localStorage.setItem(key, mergedJson);
                    }
                    return mergedJson;
                }
            }
            
            // For other keys, prefer parent value
            localStorage.setItem(key, parentValue);
            return parentValue;
        } catch (e) {
            return currentValue || parentValue;
        }
    }
    
    return currentValue || parentValue;
}

// Load settings from localStorage (with cross-domain sync)
try {
    const storedFavorites = loadFromBoth('favorites');
    if (storedFavorites) favorites = JSON.parse(storedFavorites);
    
    const storedRecent = loadFromBoth('recentlyPlayed');
    if (storedRecent) recentlyPlayed = JSON.parse(storedRecent);
    
    const storedView = loadFromBoth('viewMode');
    if (storedView) currentView = storedView;
} catch (e) {
    console.log('Using default settings');
}

async function loadGames() {
    try {
        const response = await fetch('games.json');
        if (!response.ok) throw new Error('Failed to load');
        allGames = await response.json();
        renderGames(allGames);
        renderFavorites();
        renderRecent();
        applyViewSettings();
    } catch (error) {
        document.getElementById('gamesGrid').innerHTML =
            '<p style="color: #888;">Error loading games.</p>';
    }
}

function applyViewSettings() {
    const mainGrid = document.getElementById('gamesGrid');
    if (currentView === 'list') {
        mainGrid.classList.add('list-view');
        document.getElementById('gridViewBtn').classList.remove('active');
        document.getElementById('listViewBtn').classList.add('active');
    } else {
        mainGrid.classList.remove('list-view');
        document.getElementById('gridViewBtn').classList.add('active');
        document.getElementById('listViewBtn').classList.remove('active');
    }
}

async function trackGameClick(game) {
    try {
        await fetch('https://gamecount.ethantytang11.workers.dev/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                game: game.title,
                link: game.link,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                url: window.location.href
            })
        });
    } catch (e) {
        // Silently fail — don't block navigation
    }
}

function addToRecent(game) {
    // Increment play count first
    incrementPlayCount(game.title);
    // Track click on remote worker (fire and forget)
    trackGameClick(game);

    recentlyPlayed = recentlyPlayed.filter(g => g.title !== game.title);
    recentlyPlayed.unshift(game);
    if (recentlyPlayed.length > 6) {
        recentlyPlayed = recentlyPlayed.slice(0, 6);
    }
    
    // Use cross-domain sync
    syncToParent('recentlyPlayed', JSON.stringify(recentlyPlayed));
    
    renderRecent();
}

function createGameCard(game) {
    const card = document.createElement('div');
    const isFav = favorites.includes(game.title);
    const playCount = getPlayCount(game.title);
    const playLabel = playCount === 0
        ? 'never played'
        : `played: ${playCount} time${playCount !== 1 ? 's' : ''}`;

    card.className = 'game-card';
    card.innerHTML = `
        <div class="favorite-btn ${isFav ? 'active' : ''}" data-title="${game.title}">
            <i class="fas fa-star"></i>
        </div>
        <img src="${game.image}" class="game-image" alt="${game.title}">
        <div class="game-info">
            <div class="game-hover-info">
                <div class="game-title">${game.title}</div>
                <div class="game-play-count">${playLabel}</div>
            </div>
        </div>
    `;
    
    // Enhanced 3D tilt effect - WAY MORE INTENSE
    card.addEventListener('mousemove', (e) => {
        if (currentView === 'list') return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Increased rotation intensity from /5 to /2 for MUCH more tilt
        const rotateX = (y - centerY) / 2;
        const rotateY = (centerX - x) / 2;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        card.style.transition = 'transform 0.1s ease-out';
        
        const mouseX = (x / rect.width) * 100;
        const mouseY = (y / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${mouseX}%`);
        card.style.setProperty('--mouse-y', `${mouseY}%`);
    });
    
    card.addEventListener('mouseleave', () => {
        if (currentView === 'list') return;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.favorite-btn')) {
            addToRecent(game);
            let gameUrl = game.link;
            if (!gameUrl.startsWith('http://') && !gameUrl.startsWith('https://') && !gameUrl.startsWith('/')) {
                gameUrl = 'https://etcosmos.github.io/art/' + gameUrl;
            }
            window.location.href = gameUrl;
        }
    });
    
    card.querySelector('.favorite-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(game.title);
    });
    
    return card;
}

function renderGames(games) {
    const grid = document.getElementById('gamesGrid');
    grid.innerHTML = '';
    if (!games.length) return grid.innerHTML = '<p style="color: #888;">No games found.</p>';
    games.forEach(g => grid.appendChild(createGameCard(g)));
    applyViewSettings();
    setupScrollAnimation();
}

function renderFavorites() {
    const container = document.getElementById('favoritesContainer');
    const favGames = allGames.filter(g => favorites.includes(g.title));
    if (!favGames.length) {
        return container.innerHTML = `<div class="empty-state">
            <i class="fas fa-star"></i>
            <p>No favorites yet. Star some games to see them here!</p>
        </div>`;
    }
    container.innerHTML = '<div class="games-grid"></div>';
    const grid = container.querySelector('.games-grid');
    favGames.forEach(game => grid.appendChild(createGameCard(game)));
}

function renderRecent() {
    const section = document.getElementById('recentSection');
    const hr = document.getElementById('recentHr');
    const grid = document.getElementById('recentGrid');
    
    if (!recentlyPlayed.length) {
        section.style.display = 'none';
        hr.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    hr.style.display = 'block';
    grid.innerHTML = '';
    
    recentlyPlayed.forEach(game => {
        grid.appendChild(createGameCard(game));
    });
}

function toggleFavorite(title) {
    if (favorites.includes(title)) {
        favorites = favorites.filter(f => f !== title);
    } else {
        favorites.push(title);
    }
    
    // Use cross-domain sync
    syncToParent('favorites', JSON.stringify(favorites));
    
    renderGames(allGames);
    renderFavorites();
    renderRecent();
}

// View toggle
document.querySelectorAll('.view-btn[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        currentView = view;
        
        // Use cross-domain sync
        syncToParent('viewMode', view);
        
        document.querySelectorAll('.view-btn[data-view]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const grid = document.getElementById('gamesGrid');
        if (view === 'list') {
            grid.classList.add('list-view');
        } else {
            grid.classList.remove('list-view');
        }
    });
});

// I'm Feeling Lucky button
document.getElementById('luckyBtn').addEventListener('click', () => {
    if (allGames.length === 0) return;
    
    const randomGame = allGames[Math.floor(Math.random() * allGames.length)];
    addToRecent(randomGame);
    
    let gameUrl = randomGame.link;
    if (!gameUrl.startsWith('http://') && !gameUrl.startsWith('https://') && !gameUrl.startsWith('/')) {
        gameUrl = 'https://etcosmos.github.io/art/' + gameUrl;
    }
    window.location.href = gameUrl;
});

// Search
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const q = e.target.value.toLowerCase();
        renderGames(q ? allGames.filter(g => g.title.toLowerCase().includes(q)) : allGames);
    }, 300);
});

// Scroll animation
function setupScrollAnimation() {
    const cards = document.querySelectorAll('.game-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    cards.forEach(card => {
        card.classList.add('fade-in-scroll');
        observer.observe(card);
    });
}

document.addEventListener('DOMContentLoaded', loadGames);
