/// Code for fetching a particular movies details
fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(data => {
          const movieContainer = document.getElementById('movieContainer');
          data.forEach(film => {
            const listItem = document.createElement('li');
            listItem.textContent = film.title;
            listItem.addEventListener('click', () => showMovieDetails(film));
            movieContainer.appendChild(listItem);
          });
        });
 // Display details for a selected movie
 function showMovieDetails(films) {
    const filmsDetails = document.getElementById('movieContainer');
    filmsDetails.innerHTML = `
    <strong><label>MOVIE TITLE:</label></strong><h2>${films.title}</h2>
      <img src="${films.poster}" alt="${films.title}" style="max-width:300px">
      <br>
      <strong><label>MOVIE ID:</label></strong><p>${films.id}</p>
      <strong><label>MOVIE SHOWTIME:</label></strong><p>${films.showtime}</p>
      <strong><label>MOVIE RUNTIME:</label></strong><p>${films.runtime}</p>
      <strong><label>AVAILABLE TICKETS:</label></strong><p> ${films.capacity - films.tickets_sold}</p>
      <strong><label>TICKETS SOLD:</label></strong><p>${films.tickets_sold}</p>
       <strong><label>MOVIE CAPACITY:</label></strong><p>${films.capacity}</p>
       <strong><label>MOVIE DESCRIPTION:</label></strong><p>${films.description}</p>
    `;
 }
    const returnButton = document.getElementById('returnButton');
    returnButton.addEventListener('click', () => {
        location.reload();
    });