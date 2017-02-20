var fs = require('fs');
const {dialog} = require('electron').remote


function openFile () {

	dialog.showOpenDialog(function (fileNames) {

		if (fileNames === undefined) return;
		var fileName = fileNames[0];
		fs.readFile(fileName, 'mp3', function (err, data) {
		//document.getElementById("editor").value = data;
			console.log(data);

		});

	}); 

}



