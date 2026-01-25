// Particle background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 60;
const mouse = { x: null, y: null, radius: 150 };

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = 'rgba(157, 78, 221, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connect() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                const opacity = 1 - (distance / 120);
                ctx.strokeStyle = `rgba(157, 78, 221, ${opacity * 0.3})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
        
        if (mouse.x !== null && mouse.y !== null) {
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const opacity = 1 - (distance / mouse.radius);
                ctx.strokeStyle = `rgba(76, 201, 240, ${opacity * 0.5})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connect();
    
    if (mouse.x !== null && mouse.y !== null) {
        ctx.fillStyle = 'rgba(76, 201, 240, 0.8)';
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

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
        timerText.textContent = 'You can close now!';
        closeBtn.disabled = false;
        closeBtn.classList.add('enabled');
        clearInterval(timer);
    }
}, 1000);

closeBtn.addEventListener('click', () => {
    modal.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => modal.classList.remove('show'), 300);
});

// Game functionality
let favorites = [];
let recentlyPlayed = [];
let allGames = [];
let currentView = 'grid';

// Load settings from localStorage
try {
    const stored = localStorage.getItem('favorites');
    if (stored) favorites = JSON.parse(stored);
    
    const storedRecent = localStorage.getItem('recentlyPlayed');
    if (storedRecent) recentlyPlayed = JSON.parse(storedRecent);
    
    const storedView = localStorage.getItem('viewMode');
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

function addToRecent(game) {
    recentlyPlayed = recentlyPlayed.filter(g => g.title !== game.title);
    recentlyPlayed.unshift(game);
    if (recentlyPlayed.length > 6) {
        recentlyPlayed = recentlyPlayed.slice(0, 6);
    }
    
    try {
        localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
    } catch (e) {
        console.log('Could not save recent games');
    }
    
    renderRecent();
}

function createGameCard(game) {
    const card = document.createElement('div');
    const isFav = favorites.includes(game.title);
    card.className = 'game-card';
    card.innerHTML = `
        <div class="favorite-btn ${isFav ? 'active' : ''}" data-title="${game.title}">
            <i class="fas fa-star"></i>
        </div>
        <img src="${game.image}" class="game-image" alt="${game.title}">
        <div class="game-info">
            <div class="game-title">${game.title}</div>
        </div>
    `;
    
    // 3D tilt effect
    card.addEventListener('mousemove', (e) => {
        if (currentView === 'list') return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 5;
        const rotateY = (centerX - x) / 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        
        const mouseX = (x / rect.width) * 100;
        const mouseY = (y / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${mouseX}%`);
        card.style.setProperty('--mouse-y', `${mouseY}%`);
    });
    
    card.addEventListener('mouseleave', () => {
        if (currentView === 'list') return;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.favorite-btn')) {
            addToRecent(game);
            let gameUrl = game.link;
            if (!gameUrl.startsWith('http://') && !gameUrl.startsWith('https://') && !gameUrl.startsWith('/')) {
                gameUrl = 'https://ethanytangcodes.github.io/art/' + gameUrl;
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
    
    try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {
        console.log('Could not save favorites');
    }
    renderGames(allGames);
    renderFavorites();
    renderRecent();
}

// View toggle
document.querySelectorAll('.view-btn[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        currentView = view;
        
        try {
            localStorage.setItem('viewMode', view);
        } catch (e) {}
        
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
        gameUrl = 'https://ethanytangcodes.github.io/art/' + gameUrl;
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
