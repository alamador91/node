const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const request = require('request')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index')
})

function index(req, res){
    //res.render('index')    
    let apiKey = 'aa0d0a68978dbfbb8507163eb903452a'
    let city = req.body.city || 'Havana,cu'
    let units = req.body.units
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units='+units+'&appid='+apiKey

    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'})
        } else {
            //res.send('{"coord":{"lon":-82.37,"lat":23.14},"weather":[{"id":200,"main":"Thunderstorm","description":"thunderstorm with light rain","icon":"11d"}],"base":"stations","main":{"temp":26,"pressure":1017,"humidity":88,"temp_min":26,"temp_max":26},"visibility":9000,"wind":{"speed":4.1,"deg":300},"clouds":{"all":75},"dt":1535320620,"sys":{"type":1,"id":4096,"message":0.002,"country":"CU","sunrise":1535281803,"sunset":1535327493},"id":3553478,"name":"Havana","cod":200}');
            //console.log('body:', body)
            let weather = JSON.parse(body)

            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    })
    //console.log(url)
}

app.post('/', index)

app.listen(3500, function() {
    console.log('Running...')
})