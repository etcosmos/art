document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchResultTemplate = document.getElementById('searchResultTemplate').innerHTML;

  searchResults.innerHTML = 'Games are loading...';

  // Load favorites from localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

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
    };

    // initial render (all games)
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
