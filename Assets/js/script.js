//Page elements
const searchBarElement = $('#city-search-bar');
const searchBtnElement = $('#city-search-button')

//Api keys
const weatherApiKey = '923a850bd61fc38e956f15c51f45cfe2';
const weatherApiUrl = 'https://api.openweathermap.org/data/3.0/onecall?'
    + 'lat=' + {lat} 
    + '&lon=' + {lon}
    + '&exclude=' + {part}
    + '&appid=' + weatherApiKey;


//when a city is typed into a search bar
//collect that value
//call openweather geocoding api to turn name into cordinates
//call openweather to turn cordinates into information
//collect info in variables
//render information on screen

