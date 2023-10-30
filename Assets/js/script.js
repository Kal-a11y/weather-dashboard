//Page elements
const searchBarElement = $('#city-search-bar');
const searchBtnElement = $('#city-search-button')

//Api keys
const weatherApiKey = '923a850bd61fc38e956f15c51f45cfe2';

//Api call urls
const weatherApiUrlBase = 'https://api.openweathermap.org/data/2.5/weather?appid=' + weatherApiKey + '&units=imperial';
const locationByNameUrlBase = 'http://api.openweathermap.org/geo/1.0/direct?appid=' + weatherApiKey;

searchBtnElement.on('click', showWeather)

//Main working function
function showWeather(event) {
    event.preventDefault();

    cityName = searchBarElement.val();

    if (cityName === '') {
        console.log('TODO: Alert or toast to show invalid input')
        window.alert('You need to put in a city name')
        return
    }
    showTodayWeather(cityName);
    showForcastWeather(cityName);


    addCityHistoryBtn(cityName);
    searchBarElement.val('')
}

//Add button for city
function addCityHistoryBtn() {
    //create a button with data
    let cityBtn = $('<button>', { type: 'button', class: 'btn btn-outline-primary historyData col-12', id: `${cityName.toLowerCase().replace(' ', '')}Btn` }).text(cityName.toUpperCase())

    //Added button to list
    $('#history-list').append(cityBtn)
    let historyList = $('#history-list').children()

    //Check if new button already exists in list
    for (let index = 0; index < historyList.length; index++) {
        let lastIndex = historyList.length - 1;

        if (historyList[index].id === historyList[lastIndex].id) {
            if (index !== lastIndex) {
                historyList[lastIndex].remove();
            }
        }

    }

    //Add event listener for button
    cityBtn.on('click', function () {
        showTodayWeather(this.textContent);
        showForcastWeather(this.textContent)
    })
}

//Get and show today's weather data
function showTodayWeather(cityName) {
    fetch(weatherApiUrlBase + '&q=' + cityName)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            $('#city-name').text(cityName.toUpperCase())
            $('#today-date').text(new Date(data.dt * 1000).toDateString())
            $('#weather-visual').attr('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
            $('#temp-value').text(data.main.temp + ' °F');
            $('#wind-value').text(data.wind.speed + ' MPH')
            $('#humidity-value').text(data.main.humidity + ' %');
        })
}

//Get and show 5-day weather data
function showForcastWeather(cityName) {
    $('#forcast-box').empty();

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${weatherApiKey}&units=imperial`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //For 5 cards
            for (let i = 0; i < 5; i++) {
                
                //Create this element card with nested elements
                const myTest = $(`<div class="card col-2 text-white gradient-bg" id="forcast-day-${i}"><p><strong>${new Date(data.list[i * 8].dt * 1000).toDateString()}</strong></p><img src="https://openweathermap.org/img/w/${data.list[i * 8].weather[0].icon}.png"></img><ul><li>Temp: ${data.list[i * 8].main.temp + ' °F'}</li><li>Wind: ${data.list[i * 8].wind.speed + ' MPH'}</li><li>Humidity: ${data.list[i * 8].main.humidity + ' %'}</li></ul></div>`)

                //Show card to screen
                $('#forcast-box').append(myTest);


            }
        })
}




