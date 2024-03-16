const apikey = '3cb80ddd548c89ec04aa2397d192af7e'

const weatherForm = document.querySelector('.weatherForm')
const card = document.querySelector('.card')

const cityInput = document.querySelector('.cityInput')
let city =""

weatherForm.addEventListener('submit', async event => {
    event.preventDefault()

    
    city = cityInput.value.toLowerCase();
    city = city.trim();
    
    if(city){
        try {
            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData)
        } catch (error) {
            displayError(error)
        }
    }
    else{
        displayError('please enter the city')
    }
})

async function getWeatherData(data){
    const urlapi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(urlapi)
    // console.log(response)
    if(!response.ok){
        throw new Error('could not fetch the weater data. Please enter a valid city')

    }
    return response.json()
}

function displayError(message){
    const errorDisplay = document.createElement('p')
    errorDisplay.textContent = message
    errorDisplay.classList.add('errorDisplay')

    card.textContent = ""
    card.style.display = 'flex'
    card.appendChild(errorDisplay)
}

function displayWeatherInfo(data){
    // console.log(data)
    const {
        name:city, 
            main:{temp,humidity},
            weather:[
                {
                    description,
                    id
                }
            ]
        } = data
        
        card.textContent = ""
        card.style.display = 'flex'
    const cityDisplay = document.createElement('h1');
    cityDisplay.textContent = city
    cityDisplay.classList.add('cityDisplay')
    card.appendChild(cityDisplay)

    const tempDisplay = document.createElement('p')
    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}℃`
    tempDisplay.classList.add('tempDisplay')
    card.appendChild(tempDisplay)

    const humidityDisplay = document.createElement('p')
    humidityDisplay.textContent = `humidity: ${humidity}%`
    humidityDisplay.classList.add('humidityDisplay')
    card.appendChild(humidityDisplay)

    const descDisplay = document.createElement('p')
    descDisplay.textContent = description
    descDisplay.classList.add('descDisplay')
    card.appendChild(descDisplay)

    const weatherEmoji = document.createElement('p')
    weatherEmoji.textContent = getWeatherEmoji(id)
    weatherEmoji.classList.add('weatherEmoji')
    card.appendChild(weatherEmoji)
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case(weatherId >=300  && weatherId<400):
            return "🌧️";
        case(weatherId >=500 && weatherId<600):
            return "🌦️";
        case(weatherId >= 600 && weatherId < 700):
            return "❄️"
        case(weatherId >= 700 && weatherId < 800):
            return "💨"
        case(weatherId===800):
            return "☀️"
        case(weatherId >= 801 && weatherId < 805):
            return "☁️"
    }
}
