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
            $('#city-name').text(cityName.toUpperCase())
            $('#today-date').text(new Date(data.dt * 1000).toDateString())
            $('#weather-visual').attr('src',`https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
            $('#temp-value').text(data.main.temp + ' °F');
            $('#wind-value').text(data.wind.speed + ' MPH')
            $('#humidity-value').text(data.main.humidity + ' %');
        })
}
function showForcastWeather(cityName){
    $('#forcast-box').empty();

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${weatherApiKey}&units=imperial`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        for (let i = 0; i < 5; i++) {
            const myTest = $(`<div class="card col-2" ><p><strong>${new Date(data.list[i*8].dt * 1000).toDateString()}</strong></p><img src="https://openweathermap.org/img/w/${data.list[i*8].weather[0].icon}.png"></img><ul><li>Temp: ${data.list[i*8].main.temp + ' °F'}</li><li>Wind: ${data.list[i*8].wind.speed + ' MPH'}</li><li>Humidity: ${data.list[i*8].main.humidity + ' %'}</li></ul></div>`)

            $('#forcast-box').append(myTest);

            
        }
    })
}


