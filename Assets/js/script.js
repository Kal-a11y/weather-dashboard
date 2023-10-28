//Page elements
const searchBarElement = $('#city-search-bar');
const searchBtnElement = $('#city-search-button')

//Api keys
const weatherApiKey = '923a850bd61fc38e956f15c51f45cfe2';

//Api call urls
const weatherApiUrlBase = 'https://api.openweathermap.org/data/2.5/weather?appid=' + weatherApiKey + '&units=imperial';
const locationByNameUrlBase = 'http://api.openweathermap.org/geo/1.0/direct?appid=' + weatherApiKey;

searchBtnElement.on('click', showWeather)

function showWeather(event){
    event.preventDefault();
    
    cityName = searchBarElement.val();
    
    if (cityName === ''){
        console.log('TODO: Alert or toast to show invalid input')
        return
    }
     showTodayWeather(cityName);
     showForcastWeather(cityName);

     
    }
    
    function showTodayWeather(cityName){
        fetch(weatherApiUrlBase + '&q=' + cityName)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            $('#temp-value').text(data.main.temp);
            $('#wind-value').text(data.wind.speed)
            $('#humidity-value').text(data.main.humidity);
        })
}
function showForcastWeather(cityName){
    $('#forcast-box').empty();

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${weatherApiKey}`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        for (let i = 0; i < 5; i++) {
            const myTest = $(`<div class="card col-2" ><p><strong>${new Date(data.list[i*8].dt * 1000).toDateString()}</strong></p><p><span></span></p><ul><li>Temp: ${data.list[i*8].main.temp}</li><li>Wind: ${data.list[i*8].wind.speed}</li><li>Humidity: ${data.list[i*8].main.humidity}</li></ul></div>`)

            $('#forcast-box').append(myTest);

            
        }
    })
}


