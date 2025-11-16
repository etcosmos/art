document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const favoritesCards = document.getElementById('favoritesCards');
  const searchResultTemplate = document.getElementById('searchResultTemplate').innerHTML;

  searchResults.innerHTML = 'Games are loading...';

  // Load favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const saveFavorites = () => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const isFavorited = (title) => favorites.includes(title);

  const toggleFavorite = (title) => {
    if (isFavorited(title)) {
      favorites = favorites.filter(fav => fav !== title);
    } else {
      favorites.push(title);
    }
    saveFavorites();
    renderFavorites();
  };

  const renderFavorites = () => {
    favoritesCards.innerHTML = '';
    if (favorites.length === 0) {
      favoritesCards.innerHTML = '<p>No favorites yet.</p>';
      return;
    }
    const fragment = document.createDocumentFragment();
    favorites.forEach(title => {
      const game = data.find(g => g.title === title);
      if (game) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = searchResultTemplate.replace(/{{(.*?)}}/g, (match, key) => game[key.trim()]);
        const link = wrapper.querySelector('a');
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '★';
        star.style.color = 'yellow';
        star.addEventListener('click', (e) => {
          e.preventDefault();
          toggleFavorite(title);
        });
        link.appendChild(star);
        fragment.appendChild(wrapper.firstElementChild);
      }
    });
    favoritesCards.appendChild(fragment);
  };

  try {
    const data = await fetch('games.json').then(res => res.json());

    const renderSearchResults = (searchTerm = '') => {
      searchResults.innerHTML = '';

      const filteredResults = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const fragment = document.createDocumentFragment();

      filteredResults.forEach(result => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = searchResultTemplate.replace(/{{(.*?)}}/g, (match, key) => result[key.trim()]);
        const link = wrapper.querySelector('a');
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '★';
        star.style.color = isFavorited(result.title) ? 'yellow' : 'gray';
        star.addEventListener('click', (e) => {
          e.preventDefault();
          toggleFavorite(result.title);
          star.style.color = isFavorited(result.title) ? 'yellow' : 'gray';
        });
        link.appendChild(star);
        fragment.appendChild(wrapper.firstElementChild);
      });

      searchResults.appendChild(fragment);
    };

    // initial render (all games)
    renderSearchResults();
    renderFavorites();

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
