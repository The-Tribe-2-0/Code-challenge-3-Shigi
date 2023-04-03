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
function showMovieDetails(film) {
  const movieDetails = document.getElementById('movieContainer');
  movieDetails.innerHTML = `
    <strong><label>MOVIE TITLE:</label></strong><h2>${film.title}</h2>  <br> <button id="ticketButton">Buy Ticket</button>
    <img src="${film.poster}" alt="${film.title}" style="max-width:300px">
    <br>
    <strong><label>MOVIE ID:</label></strong><p>${film.id}</p>
    <strong><label>MOVIE RUNTIME:</label></strong><p>${film.runtime}</p>
    <strong><label>AVAILABLE TICKETS:</label></strong><p id="availableTickets">${film.capacity - film.tickets_sold}</p>
    <strong><label>TICKETS SOLD:</label></strong><p>${film.tickets_sold}</p>
    <strong><label>MOVIE CAPACITY:</label></strong><p>${film.capacity}</p>
    <strong><label>MOVIE DESCRIPTION:</label></strong><p>${film.description}</p>
    
  `;

  const buyTicketButton = document.getElementById('ticketButton');
  const availableTicketsElement = document.getElementById('availableTickets');

  // Disable buy ticket button if all tickets are sold out or if the user has already bought a ticket
  if (film.tickets_sold >= film.capacity) {
    buyTicketButton.disabled = true;
    availableTicketsElement.textContent = 'Sold Out';
  } else if (film.user_bought_ticket) {
    buyTicketButton.disabled = true;
    availableTicketsElement.textContent = `Available Tickets: ${film.capacity - film.tickets_sold}`;
    alert('You already bought a ticket!');
  } else {
    availableTicketsElement.textContent = `Available Tickets: ${film.capacity - film.tickets_sold}`;
    buyTicketButton.addEventListener('click', () => {
      // Increment tickets sold and update server
      film.tickets_sold++;
      film.user_bought_ticket = true;
      fetch(`http://localhost:3000/films/${film.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(film)
      })
      .then(response => response.json())
      .then(updatedData => {
        // Calculate available tickets and update UI
        const ticketsAvailable = updatedData.capacity - updatedData.tickets_sold;
        availableTicketsElement.textContent = `Available Tickets: ${ticketsAvailable}`;
        buyTicketButton.disabled = true;
        alert('Ticket bought!');
      });
    });
  }
}

const returnButton = document.getElementById('returnButton');
returnButton.addEventListener('click', () => {
location.reload();
});

const APIURL = 'http://localhost:3000/films';
const main = document.getElementById("main");
const form = document.getElementById("form");

// Get movies based on search term
form.addEventListener("submit", (event) => {
event.preventDefault();
const searchTerm = document.getElementById("search").value;
fetch(`${APIURL}?q=${searchTerm}`)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayMovies(movies);
  })
  .catch((error) => console.error(error));
});

// Display movies in the main section
function displayMovies(movies) {
main.innerHTML = "";
const moviesList = document.createElement("ul");
movies.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    li.dataset.id = movie.id;
    moviesList.appendChild(li);
  });
  main.appendChild(moviesList);
}
films.tickets_sold++;
    const ticketsAvailableElement = document.querySelector("#movieContainer p");
    ticketsAvailableElement.textContent = `Available Tickets: ${movie.capacity - movie.tickets_sold}`;
    // Disable buy ticket button
    buyTicketButton.disabled = true;
    // Update server
    fetch(`${APIURL}/${movie.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
    .then(() => {
      // Refresh movie list to show updated information
      fetch(APIURL)
        .then(response => response.json())
        .then(data => displayMovies(data))
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));