document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const movie = new Movie();

    // Get the search term from URL parameters
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search');

    if (searchTerm) {
        document.querySelector('.result-title').textContent = `Showing results for "${searchTerm}"`;

        movie.searchMovies(searchTerm)
            .then(response => {
                if (response.movies && response.movies.length) {
                    ui.addMovies(response.movies, response.img_base_url);
                } else {
                    document.querySelector('.movies-container').innerHTML = '<p>No results found</p>';
                }
            })
            .catch(err => console.error('Error searching for movies:', err));
    } else {
        document.querySelector('.result-title').textContent = 'No search term provided';
    }

    // Handle the search form submission
    const movieForm = document.getElementById('movie-form');
    movieForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInput = document.getElementById('search').value;
        if (searchInput) {
            window.location.href = `?search=${encodeURIComponent(searchInput)}`;
        }
    });
});
