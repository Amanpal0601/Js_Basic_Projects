document.addEventListener("DOMContentLoaded", ()=>{

    const cityInput = document.getElementById('city-input');
    const getWeatherbtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');


    const Api_key = "f2c6ae20b97bcca21b4476e75a340ed5" // env enviornmnet 

    getWeatherbtn.addEventListener('click', async()=>{
       const city = cityInput.value.trim(); // agar city name se koi input ki value leh rahe hote hai toh saare extra spaces cut out ho jaaye taaki API call meh dikkat naa aaaye 
       if(!city) return;


       // after we have the city we need to make a web request 


       // it may throw an error 
       // server / database is always in another continent 

       try {
        // this is delay function so it should have await in it 
           const weatherData = await fetchWeatherData(city);
           displayWeatherData(weatherData);
       } catch (error) {
            showError();
       }
    });

    // function to fetch weather data from the API
       async function fetchWeatherData(city){
        // get the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_key}`;
        
        const response = await fetch(url);

        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok){
            throw new Error ("city not found ");
        }
        // it is also response .json() bhi immediately data nahi deta so we also need to await in it 0
        const data = await response.json();

        return data;
       }

       // function to display weather data on the webpage
       function displayWeatherData(Data){
        // get the info 
        console.log(Data);

        const {name,main,weather} = Data; // destructuring of data which we are getting in Json format and haa usko use karne ke liye hamko json data ke baare meh achhe se pata ho chaiye hai 
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`; 
        // unlock the display as hidden class is injected to it 
        weatherInfo.classList.remove('hidden'); // yeh css class thi
        errorMessage.classList.add('hidden'); // aur hame error waale ki hidden css class ko add kar diya

        
       }

       function showError(){
        // isme ham dispaly weather info waale ki hidden class ko active kar denge matlab voh chup jaayege aur 
        // error message voh hidden class ko remove kar denge matlab voh visible ho jaayege
        weatherInfo.classList.remove('hidden'); // yeh css class thi 
        errorMessage.classList.add('hidden'); 

       }
    
    
    
})