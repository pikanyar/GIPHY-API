// Initial array of movies
var movies = ["office", "friends", "Mr. Nobody", "The Lion King"];


var apikey = "5sAdRPYmPRjCwe9qHB5LstWj4B7mYLAy"

// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + APIkey;
//var queryURLBase = "https://api.giphy.com/v1/stickers/search?api_key=5sAdRPYmPRjCwe9qHB5LstWj4B7mYLAy&q=tv shows&limit=25&offset=0&rating=G&lang=en"

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

    // Grabbing and storing the data-name property value from the button
    var movie = $(this).attr("data-name");

    // Storing our giphy API URL for a random movie image
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=5sAdRPYmPRjCwe9qHB5LstWj4B7mYLAy&limit=10&offset=0&rating=G&lang=en";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
        // After data comes back from the request
    }).done(function (response) {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#movies-view").empty(response);


        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var movieDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var movieImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            movieImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the movieDiv
            movieDiv.append(p);
            movieDiv.append(movieImage);

            // Prependng the movieDiv to the HTML page in the "#movies-view" div
            $("#movies-view").prepend(movieDiv);
        }

        $("movieImage").on("click", function () {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });

    });

}

// Function for displaying movie data
function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("movie");
        // Added a data-attribute
        a.attr("data-name", movies[i]);
        // Provided the initial button text
        a.text(movies[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add movie button is clicked
$("#add-movie").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var movie = $("#movie-input").val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);
    console.log(movies);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
