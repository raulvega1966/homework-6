// Initial array of animals
var movies = ['Chicken', 'Rabbit', 'Goat', 'Donkey'];

// ========================================================

// ========================================================
// Generic function for displaying animal data 
function renderButtons() {
    // Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
    $('#moviesView').empty();

    // Loops through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array

        // Note the jQUery syntax here... 
        var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        a.addClass('movie'); // Added a class 
        a.attr('data-name', movies[i]); // Added a data-attribute
        a.text(movies[i]); // Provided the initial button text
        $('#moviesView').append(a); // Added the button to the HTML
    }
}



//Animal buttons do not exist when page is loaded. this creates button for animals when submit button is clicked.
//movie buttons do not exist when page is loaded. this creates button for movie when add movie button is clicked.

$('#moviesView').on('click', '.movie', function() {
    var title = $(this).attr('data-name');



//Please note that I am only bringin back 1 gif.  i shall change to the required 10 once the program is working.
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + title + "&limit=1&api_key=dc6zaTOxFJmzC";

    $.ajax({ url: queryURL, method: 'GET' })
        .done(function(response) {
            
            //console.log(response);

            //console.log("this is array length: " + response.data.length);

            for (i = 0; i < response.data.length; i++) {

                //console.log("the i counter: " + i);
                
//This console log shows me the rating and the url for the still and animated gif.               
                console.log("this is the rating: " + response.data[i].rating);
                console.log("this is the still URL: " + response.data[i].images.fixed_height_small_still.url);
                console.log("this is the action URL: " + response.data[i].images.fixed_height_small.url);


//This variable was working this morning.  I was able to make the still and animated gifs appear on the screen.

                //var stillgiphyImage = "<img src= " + response.data[i].images.fixed_height_small_still.url + ">";
                //var movinggiphyImage = "<img src= " + response.data[i].images.fixed_height_small.url + ">";
                


                //var movinggiphyImage = "<img src= " + response.data[i].images.fixed_height_small.url + ">";
                //This section contains the variable for the image that is on the screen.  I am setting the attributes
                //of the variable so that I can use in the next section (animate/still).

                //var stillgiphyImage = "<img src= " + response.data[i].images.fixed_height_small_still.url + 
                //"data-still" = response.data[i].images.fixed_height_small_still.url,
                //"data-animate" = response.data[i].images.fixed_height_small.url,
                //"data-state" = "still",
                //class = "gif" ">";

//This is what I am trying to work on at the moment.  it is not working and the image does not appear on the screen.
  
                var movinggiphyImage = $("<img>");
                movinggiphyImage.addClass("movinggiphyImage");
                movinggiphyImage.attr({
                    "src": response.data[i].images.fixed_height_small_still.url,
                    "data-still": response.data[i].images.fixed_height_small_still.url,
                    "data-animate": response.data[i].images.fixed_height_small.url,
                    "data-state": "still",
                });
  
                
//This does not appear to work anymore either. nothing appears on the screen when the animal buttons are pressed.

                //This section will make information appear in the screen.
                //$('#movieInfo').text(JSON.stringify(data));
                var movieDiv = $("<div>");
                //movieDiv.append("<h2>Title " + data.title + "<h2>");
                movieDiv.append("<p>Rating " + response.data[i].rating + "<p>");
                movieDiv.append("<p>Moving Image " + movinggiphyImage + "<p>");
                //movieDiv.append("<p>Still Image " + image + "<p>");
                movieDiv.append("<p>Moving Image " + stillgiphyImage + "<p>");
                

         
            }

        });
});

 


// ========================================================

// This function handles events where one button is clicked
$('#addMovie').on('click', function() {

    // This line of code will grab the input from the textbox
    var movie = $('#movie-input').val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Our array then runs which handles the processing of our movie array
    renderButtons();

    // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
    return false;
});

// ========================================================
                



// This calls the renderButtons() function
renderButtons();


//HERE WE CREATE THE HTML THAT WILL BE INJECTED INTO OUR DIV AND DISPLAYED ON THE PAGE.
var html = "";
