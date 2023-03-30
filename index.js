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
 // Display details for selected movie
 function showMovieDetails(films) {
    const filmsDetails = document.getElementById('movieContainer');
    filmsDetails.innerHTML = `
    <label>MOVIE TITLE:</label><h2>${films.title}</h2>
      <img src="${films.poster}" alt="">
      <br>
      <label>MOVIE ID:</label><p>${films.id}</p>
      <label>MOVIE RUNTIME:</label><p>${films.runtime}</p>
      <label>AVAILABLE TICKETS:</label><p> [${films.capacity}-${films.tickets_sold}]</p>
       <label>MOVIE SHOWTIME:</label> <p>${films.showtime}</p>
       <label>MOVIE CAPACITY:</label><p>${films.capacity}</p>
       <label>MOVIE DESCRIPTION:</label><p>${films.description}</p>
    `;
 }
    // Code for making a buy ticket button
  const returnButton = document.getElementById('return-button');
    returnButton.addEventListener('click', () => {
      const voteCount = document.getElementById('vote-count');
     animal.votes++;
      voteCo.texunttContent = animal.votes;
    });
