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
    
}
//when a city is typed into a search bar
//collect that value
//call openweather geocoding api to turn name into cordinates
//call openweather to turn cordinates into information
//collect info in variables
//render information on screen

