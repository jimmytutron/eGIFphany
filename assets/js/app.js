//global variables

//topics

var aesthetics = ["scenery","cinemagraph","nature","timelapse","architecture"];
var gallery = $("#gallery")

function createInputs() {
	gallery.empty();

	for (var i= 0; i < aesthetics.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("subject");
		newButton.attr("data-name",aesthetics[i]);
		newButton.text(aesthetics[i]);

		gallery.append(newButton);
	}
};

$("#addToGallery").on("click", function(event){
	event.preventDefault();

	var subject = $("#subject-input").val().trim();
	aesthetics.push(subject);
	createInputs();
});

createInputs();


function displayGallery(){
	var gallerySubject  = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gallerySubject + "&api_key=E5tZleXqhxHbqi6ns8x5xTX15OVhBNZv";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response){
		
	})
}