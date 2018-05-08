//global variables

//topics

var aesthetics = ["anime scenery","cinemagraph","nature","timelapse","landscape"];
var gallery = $("#gallery");


//creates the buttons in aesthetics array
function createInputs() {
	$("#list").empty();

	for (var i= 0; i < aesthetics.length; i++) {
		var newLink = $("<li>");
		newLink.addClass("subject");
		newLink.attr("data-name",aesthetics[i]);
		newLink.text(aesthetics[i]);

		$("#list").append(newLink);
	}
};

//adds user's input to the end of the array and creates a button for it
$("#addToGallery").on("click", function(event){
	event.preventDefault();

	var subject = $("#subject-input").val().trim();
	aesthetics.push(subject);
	createInputs();
	$("#subject-input").val("");

});

$("#clearGallery").on("click", function(event){
	event.preventDefault();
	gallery.empty();
})

function displayGallery(){
	gallery.empty();

	var gallerySubject  = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gallerySubject + "&api_key=E5tZleXqhxHbqi6ns8x5xTX15OVhBNZv&limit=14";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response){
		console.log(queryURL);
		console.log(response);

		var results = response.data;
		for (var i = 0; i < results.length; i++){
			currentGif = results[i];

			var gifDiv = $("<div class ='gif-container'>");


			var rating = "Rated " + currentGif.rating;

			var galleryGif = $("<img>");

			var stillGif = currentGif.images.original_still.url;
			var animatedGif = currentGif.images.original.url;


			galleryGif.attr("class", "img-fluid gif animated flipInY");
			galleryGif.attr("src", stillGif);
			galleryGif.attr("data-state", "still");
			galleryGif.attr("data-still", stillGif);
			galleryGif.attr("data-animate", animatedGif);

			galleryGif.attr("data-toggle", "tooltip");
			galleryGif.attr("data-placement", "top");
			galleryGif.attr("title", rating);

			// gifDiv.append(galleryGif);
			// gifCol.append(gifDiv)
			gallery.append(galleryGif);
		}
	});
};


$(document).on("click", ".subject", displayGallery);
createInputs();

//animate on hover
$(document).on({
	mouseenter:function() {

  var gif = $(this);
  var animated = gif.attr("data-animate");

  gif.attr("data-state","animate");
  gif.attr("src", animated);
	},
	mouseleave:function(){

  var gif = $(this);
  var still = gif.attr("data-still");

  	gif.attr("data-state","still");
    gif.attr("src",still);
	}
}, ".gif");

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})





