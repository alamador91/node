var fs = require('fs');

var fileIn = 'input.txt';
var fileOut = 'output2.txt';

var syncRead = function(file) {
	var data = fs.readFileSync(file);

	console.log("Sync read: " + data.toString());
}

var asyncRead = function(file) {
	fs.readFile(file, function(err, data) {
		if(err) 
			return console.error(err);
		console.log("Async read: " + data.toString());
	}); 
}

var stats = function(file) {
	fs.stat(file, function(err, stats) {
		console.log(stats);

		console.log(stats.isFile() ? "Is file" : "Is not file");
	});
}

/**
Flags del open:
r-read w-write a-append
con r(r, r+, rs, rs+)
rs-sync read   +-exception si no existe
con w(w, wx, w+, wx+)
x-falla si existe +-+reading
con a(a, ax, a+, ax+)
x-falla si existe +-+reading
*/
var write = function(file, data) {
	fs.writeFile(file, data, function(err) {
		if(err)
			return console.error(err);

		console.log("File written successfully");		
	});
}

var readBuffer = function(file) {
	var buf = new Buffer(1024);

	fs.open(file, 'r+', function(err, fd) {
		if(err) 
			return console.error(err);

		fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
			if(err)
				console.error(err);
			if(bytes > 0)
				console.log(buf.slice(0, bytes).toString());

			fs.close(fd, function(err) {
				if(err)
					console.error(err);
			});
			console.log("File closed");
		});
	});
}

var truncate = function(file, length) {
	fs.open(file, 'r+', function(err, fd) {
		if(err)
			return console.error(err);

		fs.ftruncate(fd, length, function(err) {
			if(err)
				console.error(err);

			console.log("File truncated");
		});

		fs.close(fd, function(err) {
			if(!err)
				console.log("File closed");
		});
	});
	syncRead(fileIn);
}

var rm = function(file) {
	fs.unlink(file, function(err) {
		if(err)
			return console.error(err);
		console.log("File deleted");
	});
}

var mkdir = function(folder) {
	fs.mkdir(folder, function(err) {
		if(err)
			return console.error(err);
		console.log("Folder " + folder + " created");
	});
}

var readdir = function(folder) {
	fs.readdir(folder, function(err, files) {
		if(err)
			return console.error(err);
		files.forEach( function(file) {
			fs.stat(file, function(err, stats) {
				console.log((stats.isDirectory() ? "Folder: " : "")+ file);
			});
		});
	});
}

var rmdir = function(folder) {
	fs.rmdir(folder, function(err) {
		if(err)
			console.error(err);
		else 
			console.log("Folder " + folder + " deleted");
	});

}

//stats(fileIn);
//write(fileOut, "Simply Easy Learning!");
//readBuffer(fileIn);
//truncate(fileIn, 5);
//rm('output2.txt');
//readdir('D:\\Docs\\Desktop\\node');
//mkdir('D:\\Docs\\Desktop\\node\\asd');
rmdir('D:\\Docs\\Desktop\\node\\asd');


console.log("***---Program Ended---***");