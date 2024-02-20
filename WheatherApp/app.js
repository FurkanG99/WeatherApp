const container = document.querySelector('.container');
const search = document.querySelector('.search');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIkey = '27423237a42f83da49a9ae2d2086fa20';
    const city = document.querySelector('.search-box input').value;



    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {

        if(json.cod == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            error404.classList.add('active');
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            return;
        }



        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        if (cityHide.textContent == city) {
            return;
        } else{
            cityHide.textContent = city;

            
        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

            setTimeout(()  => {
                container.classList.remove('active');
            }, 30000)


        
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                    case 'Haze':
                        image.src = 'images/mist.png';
                        break;
            default:
                image.src = 'images/cloud.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');


        const elCloneinfoWeather  = infoWeather.cloneNode(true);
        const elCloneinfoHumidity  = infoHumidity.cloneNode(true);
        const elCloneinfoWind  = infoWind.cloneNode(true);

        elCloneinfoWeather.id = 'clone-info-weather';
        elCloneinfoHumidity.classList.add('active-clone')

        elCloneinfoHumidity.id = 'clone-info-humidity';
        elCloneinfoHumidity.classList.add('active-clone');

        elCloneinfoWind.id = 'clone-info-wind';
        elCloneinfoWind.classList.add('active-clone');
        
        setTimeout(() => {
            infoWeather.insertAdjacentElement("afterend", elCloneinfoWeather);
            infoWind.insertAdjacentElement("afterend", elCloneinfoWind);
            infoHumidity.insertAdjacentElement("afterend", elCloneinfoHumidity);
        }, 2200);


        const cloneinfoWeather = document.querySelectorAll('.info-weather.active-clone');
        const totalCloneInfoWeather = cloneinfoWeather.length;
        const cloneinfoWeatherFirst  = cloneinfoWeather[0];
        
        const cloneinfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
        const cloneinfoHumidityFirst  = cloneinfoHumidity[0];

        const cloneinfoWind = document.querySelectorAll('.info-wind.active-clone');
        const cloneinfoWindFirst  = cloneinfoWind[0];

        if (totalCloneInfoWeather > 0) {
            cloneinfoWeatherFirst.classList.remove('active-clone');
            cloneinfoHumidityFirst.classList.remove('active-clone');
            cloneinfoWindFirst.classList.remove('active-clone');


            setTimeout(() => {
                cloneinfoWeatherFirst.remove();
                cloneinfoHumidityFirst.remove();
                cloneinfoWindFirst.remove();
            }, 2200);
        }


        }





    })


});