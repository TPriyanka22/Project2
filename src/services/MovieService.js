//global.fetch = require('node-fetch');
export const movieService = {
    getAll,
    getMovieByID,
    createMovie,
    updateMovie,
    getMovieByUserID,
    deleteMovie,
    createMovieBooking,
    getMovieBookingByUserID,
    getCast,
    deleteCast
}
export const apiConfig = {
    endpointURL: "https://showtimedrivein.com/api",
}
function getAll() {
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/movies/all`, requestOption).then(res => {
        console.log("printing in getall of movieService",res); 
        return res.json();
    })
}
function getMovieByID(movieId) {
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/movies/${movieId}`, requestOption).then(res => {
        console.log(" printing res inside movieService",res); 
        return res.json();
    })
}
function getCast(imagename) {
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/movies/${imagename}/cast`, requestOption).then(res => {
        console.log(" printing res inside movieService",res); 
        return res.json();
    })
}

function createMovie(userEmail, movie_name, about, genre, releasedate, bookingdate, bookingtime, location, city, inputFile, movielength) {
    const detailsofForm = new FormData();
        detailsofForm.append('name', movie_name);
        detailsofForm.append('about', about);
        detailsofForm.append('genre', genre);
        detailsofForm.append('releasedate', releasedate);
        detailsofForm.append('bookingdate', bookingdate);
        detailsofForm.append('bookingtime', bookingtime);
        detailsofForm.append('location', location);
        detailsofForm.append('city', city);
        detailsofForm.append('inputFile', inputFile);
        detailsofForm.append('movielength', movielength);
    const requestOption = {
        method: 'POST',
        body: detailsofForm,
    }
    console.log("requestOption",requestOption)
    for (var key of detailsofForm.entries()) {
        console.log(key[0] + ', ' + key[1])
    }
    return fetch(`${apiConfig.endpointURL}/users/${userEmail}/movies`, requestOption).then(res => {
        //            console.log(res.json());
        return res;
    })
}

function updateMovie(movieId, name, location, city, about, genre, release_date, booking_date, booking_time, movie_length) {
    
    const requestOption = {
        method: 'PUT',
        body: JSON.stringify({
            "name": name,
            "location": location,
            "city": city,
            "about": about,
            "genre": genre,
            "releasedate": release_date,
            "bookingdate": booking_date,
            "bookingtime": booking_time,
            "movielength": movie_length,
         
        }),
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/movies/${movieId}`, requestOption).then(res => {
        return res.json();
    })
}

function getMovieByUserID(userEmail) {
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/users/${userEmail}/movies`, requestOption).then(res => {
        //console.log(res); 
        return res.json();
    })
}

function deleteMovie(userEmail, movieId) {
    const requestOption = {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/users/${userEmail}/movies/${movieId}`, requestOption)
}
function deleteCast(image_name) {
    const requestOption = {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/users/${image_name}/deletecast`, requestOption)
}
function createMovieBooking(movieId, movieName, location, booking_date, ticket_count, userEmail) {
    const requestOption = {
        method: 'POST',
        body: JSON.stringify({
            "MovieName": movieName,
            "MovieLocation": location,
            "BookingDate": booking_date,
            "MovieSlots": ticket_count,
            "UserEmail": userEmail
        }),
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/booking`, requestOption).then(res => {
                   console.log("printing inside createmovie booking method of movieService",res.json());
        return res.json();
    })
}

function getMovieBookingByUserID(userEmail) {
    console.log(userEmail)
    const requestOption = {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }
    return fetch(`${apiConfig.endpointURL}/users/${userEmail}/booking`, requestOption).then(res => {
        return res.json();
    })
}


