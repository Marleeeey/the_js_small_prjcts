const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const wetherDetails = document.querySelector('.weather-details');
const theError = document.querySelector('.not-found');


search.addEventListener('click', () => {
    const APIkey = '9788c3acacc9770e2c2a279fcb56a965';
    const city = document.querySelector('.search-box input').value;

    if (city === '') 
        return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).
            then(response => response.json()).then
            (json => {
                if (json.cod === '404') {
                    container.style.height = '400px';
                    weatherBox.style.display = 'none';
                    wetherDetails.style.display = 'none';
                    theError.style.display = 'block';
                    theError.classList.add('fadeIn');
                    return;
                }
                theError.style.display = 'none';
                theError.classList.remove('fadeIn');
                const img = document.querySelector('.weather-box img');
                const temperateur = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humadity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                switch (json.weather[0].main) {
                    case 'Clear':
                        img.src = '/images/clear.png'
                        break;

                    case 'Rain':
                        img.src = '/images/rain.png'
                        break;

                    case 'Clouds':
                        img.src = '/images/cloud.png'
                        break;

                    case 'Mist':
                        img.src = '/images/mist.png'
                        break;

                    case 'Snow':
                        img.src = '/images/snow.png'
                        break;

                    default:
                        img.src = '';
                }

                temperateur.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humadity.innerHTML = `${json.main.humadity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                weatherBox.style.display = '';
                wetherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                wetherDetails.classList.add('fadeIn');
                container.style.height = '590px';

            })
    }
)

