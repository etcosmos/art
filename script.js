document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const favoritesGrid = document.getElementById('favoritesGrid');
  const searchResultTemplate = document.getElementById('searchResultTemplate').innerHTML;

  searchResults.innerHTML = 'Games are loading...';

  // Load favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  try {
    const data = await fetch('games.json').then(res => res.json());

    const renderFavorites = () => {
      favoritesGrid.innerHTML = '';
      const favoriteGames = data.filter(game => favorites.includes(game.title));
      const fragment = document.createDocumentFragment();

      favoriteGames.forEach(result => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = searchResultTemplate.replace(/{{(.*?)}}/g, (match, key) => result[key.trim()]);
        const gameElement = wrapper.firstElementChild;
        const starElement = gameElement.querySelector('.favorite-star');

        // Favorites are always favorited
        starElement.classList.add('favorited');

        // Add click event to star
        starElement.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(result.title, starElement);
        });

        // Change link to open in iframe window
        const linkElement = gameElement.querySelector('a');
        linkElement.href = '#';
        linkElement.addEventListener('click', (e) => {
          e.preventDefault();
          openGameInWindow(result.link, result.title);
        });

        fragment.appendChild(gameElement);
      });

      favoritesGrid.appendChild(fragment);
    };

    const renderSearchResults = (searchTerm = '') => {
      searchResults.innerHTML = '';

      const filteredResults = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const fragment = document.createDocumentFragment();

      filteredResults.forEach(result => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = searchResultTemplate.replace(/{{(.*?)}}/g, (match, key) => result[key.trim()]);
        const gameElement = wrapper.firstElementChild;
        const starElement = gameElement.querySelector('.favorite-star');

        // Check if game is favorited
        if (favorites.includes(result.title)) {
          starElement.classList.add('favorited');
        }

        // Add click event to star
        starElement.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(result.title, starElement);
        });

        // Change link to open in iframe window
        const linkElement = gameElement.querySelector('a');
        linkElement.href = '#';
        linkElement.addEventListener('click', (e) => {
          e.preventDefault();
          openGameInWindow(result.link, result.title);
        });

        fragment.appendChild(gameElement);
      });

      searchResults.appendChild(fragment);
    };

    const toggleFavorite = (title, starElement) => {
      if (favorites.includes(title)) {
        favorites = favorites.filter(fav => fav !== title);
        starElement.classList.remove('favorited');
      } else {
        favorites.push(title);
        starElement.classList.add('favorited');
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
      renderFavorites(); // Re-render favorites after toggle
    };

    const openGameInWindow = (link, title) => {
      // Create a modal-like window
      const windowDiv = document.createElement('div');
      windowDiv.style.position = 'fixed';
      windowDiv.style.top = '0';
      windowDiv.style.left = '0';
      windowDiv.style.width = '100%';
      windowDiv.style.height = '100%';
      windowDiv.style.backgroundColor = 'rgba(0,0,0,0.8)';
      windowDiv.style.zIndex = '1000';
      windowDiv.style.display = 'flex';
      windowDiv.style.alignItems = 'center';
      windowDiv.style.justifyContent = 'center';

      // Header with close and open in new tab buttons
      const header = document.createElement('div');
      header.style.width = '100%';
      header.style.height = '50px';
      header.style.backgroundColor = '#333';
      header.style.display = 'flex';
      header.style.alignItems = 'center';
      header.style.justifyContent = 'space-between';
      header.style.padding = '0 20px';
      header.style.color = 'white';
      header.innerHTML = `<span>${title}</span>`;

      const closeBtn = document.createElement('button');
      closeBtn.innerText = 'Close';
      closeBtn.style.padding = '5px 10px';
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(windowDiv);
      });

      const newTabBtn = document.createElement('button');
      newTabBtn.innerText = 'Open in New Tab';
      newTabBtn.style.padding = '5px 10px';
      newTabBtn.addEventListener('click', () => {
        window.open(link, '_blank');
      });

      header.appendChild(closeBtn);
      header.appendChild(newTabBtn);

      // Iframe
      const iframe = document.createElement('iframe');
      iframe.src = link;
      iframe.style.width = '90%';
      iframe.style.height = 'calc(100% - 50px)';
      iframe.style.border = 'none';

      windowDiv.appendChild(header);
      windowDiv.appendChild(iframe);
      document.body.appendChild(windowDiv);
    };

    // initial render
    renderFavorites();
    renderSearchResults();

    // debounce search input
    let timeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        renderSearchResults(searchInput.value.trim());
      }, 200); // delay in ms (200 = smooth typing)
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    searchResults.innerHTML = 'Error loading games.';
  }
});
