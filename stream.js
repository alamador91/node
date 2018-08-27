var fs = require('fs');
var data = '';

var reading = function() {
	var readerStream = fs.createReadStream('input.txt');

	readerStream.setEncoding('UTF8');

	readerStream.on('data', function(chunk) {
		data += chunk;
	});

	readerStream.on('end', function() {
		console.log(data);
	});

	readerStream.on('error', function() {
		console.log(err.stack);
	});
}

var writing = function() {
	data = "Simply Easy Learning";

	var writerStream = fs.createWriteStream('output.txt');

	writerStream.write(data, 'UTF8');

	writerStream.end();

	writerStream.on('finish', function() {
		console.log("Write completed");
	});

	writerStream.on('error', function() {
		console.error(err.stack);
	})
}

var piping = function() {
	var readerStream = fs.createReadStream('input.txt');

	var writerStream = fs.createWriteStream('outputPipe.txt');

	readerStream.pipe(writerStream);
}

var compress = function() {
	var zlib = require('zlib');

	fs.createReadStream('input.txt')
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream('input.txt.gz'));

	console.log('File compressed');
}

var decompress = function() {
	var zlib = require('zlib');

	fs.createReadStream('input.txt.gz')
	.pipe(zlib.createGunzip())
	.pipe(fs.createWriteStream('input2.txt'));

	console.log('File decompressed');
}

//compress();
decompress();

console.log("End " + data);