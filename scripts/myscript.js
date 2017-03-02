var nodeID3 = require('node-id3');
var fs = require('fs');
const {dialog} = require('electron').remote;
var request = require('request');
var $ = require('jquery');
var handlebars = require('handlebars');


var track_spotify = function (query, fileName) {
    $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
            q: query,
            type: 'track',
            limit: 1
        },
        success: function (response) {
            //resultsPlaceholder.innerHTML = template(response);
        	var object = response.tracks.items;
        	var id = object[0].id;
        	var title = object[0].name;
        	var album_title = object[0].album.name;
        	var album_cover = object[0].album.images[1].url;
        	var artist_name = object[0].artists[0].name;
        	console.log(title + " "+ album_title + " " + album_cover + " " + artist_name);
        
        	var data = {
        			album:album_title,
        			artist: artist_name,
        			title: title	
        	};
        
        	        

        	request(album_cover).pipe(fs.createWriteStream(__dirname + 'cover.png'));
        	
        	var tags = {
        			  title: title,
        			  artist: artist_name,
        			  album: album_title,
        			  image: album_cover
        			}
        	nodeID3.removeTags(fileName);
        	var success = nodeID3.write(tags, fileName);
        	 
        	//returns true if written correctly
        	console.log(success);
        	
        	
        	

        	
        }
    });
};




function initializateDiv(fileName, id){
	
	var div_cover = '<div id ='+id+' class=" contenitor">	<div id="cover" style="display: inline-block;"><img src="{{image}}" alt="cover" "></div><div id ="label_name" style ="display: inline-block;"><label id = "label" for="male">Title</label><input type="text" id ="input" name="title" value={{title}}></div></div>';
	var template = handlebars.compile(div_cover);
	var data = template({image: "no_cover.jpg", title: fileName});
//
	document.getElementById("box").innerHTML += data;
//	document.getElementById("contenitor1").style.visibility = "visible";
}




function openFile () {
	
	
	dialog.showOpenDialog({properties: [ 'multiSelections']}, function (fileNames) {

		if (fileNames === undefined) return;
		//var fileName = fileNames[0];
		

		for (var i = 0; i < fileNames.length; i++) {
		    // Iterate over numeric indexes from 0 to 5, as everyone expects.
		    console.log(fileNames[i]);
			title = fileNames[i].substring(fileNames[i].search(/[a-zA-Z s è é ò à _ . ,]+.mp3/), fileNames[i].length -4);
			console.log(title);
			initializateDiv(title, "id_"+i);
		    
		}
		
		
		
		
		
		
//		console.log(fileName);
//		
//		//espressione regolare sbagliata!!
//		title = fileName.substring(fileName.search(/[a-zA-Z s è é ò à _ . ,]+.mp3/), fileName.length -4);
//		console.log(title);
//		initializateDiv(title);
//		
//		track_spotify(title, fileName);
	

		var element = document.getElementById("contenitor");
		element.outerHTML = "";	
		delete element;
	
		var element = document.getElementById("button");
		element.outerHTML = "";
		delete element;
	}); 

}




