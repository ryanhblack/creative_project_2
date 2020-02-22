function loadCurrentWeatherByCity(city) {
    const apiKey = "5a305dcb038e4a72653de0b774be24ad";
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",US&units=imperial&appid=" + apiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            let results = "";
            results += '<h2>Current Weather in ' + json.name + '</h2><hr />';
            results += '<div style="max-width: 500px; margin: auto;">';
            for (let i = 0; i < json.weather.length; i++) {
                results += '<img style="display: block; margin: auto;" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png" alt="Weather Icon" />';
            }
            results += '<h2 style="text-align: center;">' + Math.round(json.main.temp) + ' &deg;F</h2>';
            results += '<p style="text-align: center;"><strong>';
            for (let i = 0; i < json.weather.length; i++) {
                results += json.weather[i].description;
                if (i !== json.weather.length - 1) {
                    results == ", ";
                }
            }
            results += "</strong></p>";
            results += '<div style="text-align: center;" class="col-xs-6">';
            results += '<p><strong>Feels Like:</strong>';
            results += ' ' + Math.round(json.main.feels_like) + '&deg;F</p>';
            results += '<p><strong>Max/Min:</strong>';
            results += ' ' + Math.round(json.main.temp_min) + '/';
            results += Math.round(json.main.temp_max) + '&deg;F</p>';
            results += '</div>';
            results += '<div style="text-align: center;" class="col-xs-6">';
            results += '<p><strong>Wind:</strong>';
            results += ' ' + Math.round(json.wind.speed) + ' MPH @ ';
            results += json.wind.deg + '&deg;</p>';
            results += '<p><strong>Humidity:</strong>';
            results += ' ' + json.main.humidity + '%</p>';
            results += '</div>';
            results += '</div>';
            document.getElementById('current-weather').innerHTML = results;
        });
    return;
}

function loadForecastByCity(city) {
    const apiKey = "5a305dcb038e4a72653de0b774be24ad";
    const url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&units=imperial&appid=" + apiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            let results = "";
            document.getElementById("forecast-header").innerHTML = 'Forecast for ' + json.city.name;
            document.getElementById("3-day").classList.add("active");
            document.getElementById("5-day").classList.remove("active");
            results += '<table id="forecast-table">';
            results += '<tr>';
            for (let i = 0; i < 6; i += 1) {
                var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                var date = new Date(json.list[i].dt_txt);
                results += '<td>';
                results += '<p style="text-align: center;"><strong>';
                results += days[date.getDay()];
                results += ' ' + date.getDate() + ' ';
                if (date.getHours() == 0) {
                    results += '- Midnight';
                } else if (date.getHours() < 12) {
                    results += '- ' + date.getHours() + 'AM';
                } else if (date.getHours() == 12) {
                    results += '- Noon';
                } else {
                    results += '- ' + (date.getHours() - 12) + 'PM';
                }
                results += '</strong></p>'
                results += '<img style="display: block; margin: auto;" src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png" alt="Weather Icon" />';
                results += '<p style="text-align: center;"><strong>';
                results += Math.round(json.list[i].main.temp);
                results += '&deg;F</strong><br />'
                results += Math.round(json.list[i].main.temp_min) + '/';
                results += Math.round(json.list[i].main.temp_max);
                results += '&deg;F</p>'
                results += '</td>';
            }
            results += '</tr>';
            results += '</table>'
            document.getElementById('forecast').innerHTML = results;
        });
    return;
}

function load5DayForecastByCity(city) {
    const apiKey = "5a305dcb038e4a72653de0b774be24ad";
    const url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + ",US&units=imperial&appid=" + apiKey;
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            document.getElementById("3-day").classList.remove("active");
            document.getElementById("5-day").classList.add("active");
            let results = "";
            results += '<table id="forecast-table">';
            results += '<tr>';
            for (let i = 0; i < 40; i += 8) {
                var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                var date = new Date(json.list[i].dt_txt);
                results += '<td>';
                results += '<p style="text-align: center;"><strong>';
                results += days[date.getDay()];
                results += ' ' + date.getDate() + '</strong></p>'
                results += '<img style="display: block; margin: auto;" src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png" alt="Weather Icon" />';
                results += '<p style="text-align: center;"><strong>';
                results += Math.round(json.list[i].main.temp);
                results += '&deg;F</strong><br />'
                results += Math.round(json.list[i].main.temp_min) + '/';
                results += Math.round(json.list[i].main.temp_max);
                results += '&deg;F</p>'
                results += '</td>';
            }
            results += '</tr>';
            results += '</table>'
            document.getElementById('forecast').innerHTML = results;
        });
    return;
}

document.getElementById("5-day").addEventListener("click", function (event) {
    event.preventDefault();
    if (document.getElementById("currentCity").value) {
        load5DayForecastByCity(document.getElementById("currentCity").value)
    } else {
        load5DayForecastByCity("Provo");
    }
    return;
});

document.getElementById("3-day").addEventListener("click", function (event) {
    event.preventDefault();
    if (document.getElementById("currentCity").value) {
        loadForecastByCity(document.getElementById("currentCity").value)
    } else {
        loadForecastByCity("Provo");
    }
    return;
});

document.getElementById("weatherSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    if (document.getElementById("weatherInput").value) {
        loadCurrentWeatherByCity(document.getElementById("weatherInput").value);
        loadForecastByCity(document.getElementById("weatherInput").value);
        document.getElementById("currentCity").value = document.getElementById("weatherInput").value;
    }
    return;
})

window.addEventListener("load", function (event) {
    event.preventDefault();
    loadCurrentWeatherByCity("Provo");
    loadForecastByCity("Provo");
});
