// Initial array of animals
var gifs = ['Chicken', 'Rabbit', 'Goat', 'Donkey'];

// ===================================================================================================================================


// Generic function for displaying animal data 
function renderButtons() {


    
    // Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
    $('#gifsView').empty();



    // Loops through the array of movies
    for (var i = 0; i < gifs.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // Note the jQUery syntax here... 
        var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
        a.addClass('movie'); // Added a class 
        a.attr('data-name', gifs[i]); // Added a data-attribute
        a.text(gifs[i]); // Provided the initial button text
        $('#gifsView').append(a); // Added the button to the HTML
    }
}


// ===================================================================================================================================
//Animal buttons do not exist when page is loaded. This creates button for animals when submit button is clicked.

$('#gifsView').on('click', '.movie', function() {
    var title = $(this).attr('data-name');

    //The queryURL and ajax to get the data from giphy. 
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + title + "&limit=10&api_key=dc6zaTOxFJmzC";

    $.ajax({ url: queryURL, method: 'GET' })
        .done(function(response) {

            //Testing a different way to put images in screen using jQuery - please ignore
            //$("#gifView").empty();
            //console.log(response);
            //console.log("this is array length: " + response.data.length);

            var gifDiv = $("<div>");

            //For loop to get 10 gif's from the giphy website
            for (i = 0; i < response.data.length; i++) {

                console.log("the i counter: " + i);
                //console.log("response data length: " + response.data.length);
                //This console log shows me the rating and the url for the still and animated gif.               
                console.log("this is the rating: " + response.data[i].rating);
                console.log("this is the still URL: " + response.data[i].images.fixed_height_small_still.url);
                console.log("this is the action URL: " + response.data[i].images.fixed_height_small.url);



                //This section contains the variable for the image that is on the screen.  I am setting the attributes
                //of the variable so that I can use in the next section (animate/still).

                var giphyImage = $("<img>");
                giphyImage.addClass("movinggiphyImage");
                giphyImage.attr({
                    "src": response.data[i].images.fixed_height_small_still.url,
                    "data-still": response.data[i].images.fixed_height_small_still.url,
                    "data-animate": response.data[i].images.fixed_height_small.url,
                    "data-state": "still",
                    "class": "gif",
                });



                //Appending the rating and images to the page using jQuery
                //$("#gifRating").append("Rating: " + response.data[i].rating + " ");
                //$("#gifView").append(giphyImage);


                //Old stuff I have not deleted yet.
                //$('#gifInfo').text(JSON.stringify(data));


                //This section will make information appear in the screen.
                
                //gifDiv.append("<p>Moving Image<p>"); 
                //gifDiv.append("<p>Still Image " + image + "<p>");
                //gifDiv.append("<p>Moving Image " + stillgiphyImage[i] + "<p>");
                gifDiv.append("<p>Rating " + response.data[i].rating + "<p>");
                gifDiv.append(giphyImage[0]);
                $('body').append(gifDiv);

            }

            
            // ===========================================================================================================

            //This section contains the code for still and animate images
            $(".gif").on("click", function() {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).data("animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    // If the clicked image's state is still, update it's src attribute to what it's data-animate value is.
                    // Then set the image's data-state to animate
                    $(this).attr("src", $(this).data("still"));
                    $(this).attr("data-state", "still");
                }
            });

            // ===========================================================================================================



        });
});




// ========================================================

// This function handles events where one button is clicked.  We are adding buttons
$('#addMovie').on('click', function() {

    // This line of code will grab the input from the textbox
    var movie = $('#movie-input').val().trim();

    // The movie from the textbox is then added to our array
    gifs.push(movie);

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
