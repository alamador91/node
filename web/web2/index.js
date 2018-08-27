var express = require('express'), 
logger = require('morgan'), 
template = require('jade').compileFile(__dirname + '/source/templates/homepage.jade');

var app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res, next){
    try {
        var html = template({ title: 'Home'});
        res.send(html);
    } catch(e) {
        next(e);
    }
})

app.listen(3000, function() {
    console.log("Listenting on port 3000");
})