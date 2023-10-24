//Page elements
const searchBarElement = $('#city-search-bar');
const searchBtnElement = $('#city-search-button')

//Api keys
const weatherApiKey = '923a850bd61fc38e956f15c51f45cfe2';

//Api call urls
const weatherApiUrlBase = 'https://api.openweathermap.org/data/3.0/onecall/timemachine?appid=' + weatherApiKey;
const locationByNameUrlBase = 'http://api.openweathermap.org/geo/1.0/direct?appid=' + weatherApiKey;

searchBtnElement.on('click', showWeather)

function showWeather(event){
    event.preventDefault();
    
    cityName = searchBarElement.val();
    getCityCoords(cityName);
}

function getCityCoords(cityName){
    fetch(locationByNameUrlBase + '&q=' + cityName)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            getCityWeather(data[0].lat, data[0].lon);
            
        })
}
//when a city is typed into a search bar
//collect that value
//call openweather geocoding api to turn name into cordinates
//call openweather to turn cordinates into information
//collect info in variables
//render information on screen

