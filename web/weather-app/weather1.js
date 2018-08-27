const request = require('request')

const argv = require('yargs').argv

test = false
let apiKey = 'aa0d0a68978dbfbb8507163eb903452a'
let city = argv.c || 'Havana,cu'
let units = 'metric'
let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units='+units+'&appid='+apiKey

if(!test){
    request(url, function(err, response, body){
        if(err){
            console.error(err)
        } else {
            console.log('body:', body)
        }    
    })
} else {
    var body = '{"coord":{"lon":-82.37,"lat":23.14},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],"base":"stations","main":{"temp":305.15,"pressure":1018,"humidity":59,"temp_min":305.15,"temp_max":305.15},"visibility":9000,"wind":{"speed":4.1,"deg":100},"clouds":{"all":75},"dt":1535306100,"sys":{"type":1,"id":4096,"message":0.0049,"country":"CU","sunrise":1535281800,"sunset":1535327502},"id":3553478,"name":"Havana","cod":200}'
}

let weather = JSON.parse(body)

console.log(weather)