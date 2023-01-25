let unit = "F";
let weatherData;

//* Async Await Version
//This function pings the api.
async function pingWeatherAPI(location) {
	//Currently has no error handling
	//you await for fetch to return promise
	const pingedAPI = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=`,
		{ mode: "cors" }
	);

	//you await for fetches await then return it in JSON
	const pingedJson = await pingedAPI.json();
	console.log(pingedJson);
	return pingedJson;
}
async function pingGiphyAPI(name) {
	const img = document.querySelector("img");
	try {
		const pingedAPI = await fetch(
			`https://api.giphy.com/v1/gifs/translate?api_key=apikey=${name}`,
			{ mode: "cors" }
		);

		const pingedJSON = await pingedAPI.json();
		console.log(pingedJSON);
		return pingedJSON;
	} catch (error) {
		console.log("Gif Error: " + error);
	}
	// img.src = ''
}

//This function waits for for the api to be pinged. It continues with the try condition if it resolved or goes through the catch if there was an error.
async function proccessAPIData(pingedWeatherAPI) {
	//Data i want from API
	//Name: , Weather[0].main (Rain) and  Weather[0].desc (moderate rain) , wind , temp
	try {
		const weatherJSON = await pingedWeatherAPI;
		console.log(weatherJSON);
		//Weather Data proccessing
		const locationName = await weatherJSON.name;
		const weatherType = await weatherJSON.weather[0].main;
		const weatherDescription = await weatherJSON.weather[0].description;
		const windSpeed = await weatherJSON.wind.speed;
		const temp = await weatherJSON.main.temp;

		const proccessedData = await [
			locationName,
			weatherType,
			weatherDescription,
			windSpeed,
			temp,
		];
		//set JSON weather data to the global variable.
		weatherData = proccessedData;

		console.log(
			"location: " +
				locationName +
				" " +
				"Weather: " +
				weatherType +
				" " +
				"Weather Desc: " +
				weatherDescription +
				" " +
				"Wind: " +
				windSpeed +
				" " +
				"Temp: " +
				temp
		);

		//Gif Proccessing
		const pingGiphy = await pingGiphyAPI(weatherType);

		const giphyImgUrl = await pingGiphy.data.images.original.url;

		//returned Data
		return [proccessedData, giphyImgUrl];
	} catch (error) {
		console.log("Opps: " + error);
		console.log(error);
	}
}

//* Promise Version
// function pingAPI(location) {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=`, {mode: 'cors'})
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(response) {
//         console.log(response);
//     })
//     .catch(function(err) {
//         console.log(err);
//     })
// }

function populateElements(proccessedData) {
	const locationHeader = document.querySelector(".location");
	const tempEle = document.querySelector(".temp");
	const windEle = document.querySelector(".wind");
	const weatherCondition = document.querySelector(".weather-main");
	const weatherDesc = document.querySelector(".weather-desc");
	const img = document.querySelector("img");

	proccessedData.then(function (proccessAPIDataArray) {
		console.log(proccessAPIDataArray);
		//Weather Data population
		const weatherData = proccessAPIDataArray[0];

		locationHeader.innerText = weatherData[0];

		//Unit is in kelvin default should be F / ability to change to C
		let tempature = returnUnit(weatherData[4]);
		tempEle.innerText = Math.floor(tempature);

		windEle.innerText = Math.floor(weatherData[3] * 2.37) + "MPH";

		weatherCondition.innerText = weatherData[1];

		weatherDesc.innerText = weatherData[2];

		//Giphy Data population
		const giphyImgUrl = proccessAPIDataArray[1];
		img.src = giphyImgUrl;

		let awaitLocationEle = document.querySelector('.location');
		return awaitLocationEle;
	});
}
function convertToCelsius(valNum) {
	valNum = parseFloat(valNum);
	const celsius = valNum - 273.15;
	return celsius;
}
function convertToFarenheight(valNum) {
	valNum = parseFloat(valNum);

	const farenheight = (valNum - 273.15) * 1.8 + 32;

	return farenheight;
}

function returnUnit(kelvin) {
	if (unit === "F") {
		const farenheight = convertToFarenheight(kelvin);
		return farenheight;
	} else if (unit === "C") {
		const celsius = convertToCelsius(kelvin);
		return celsius;
	}
}
//Event listner for user location
const userLocationBtn = document.querySelector(".location-btn");
userLocationBtn.addEventListener("click", () => {
	const userInput = document.querySelector(".user-location").value;

	populateElements(proccessAPIData(pingWeatherAPI(userInput)));
});

//event listner for the type of unit user wants C/F
const unitSlider = document.querySelector(".slider");
const tempElement = document.querySelector(".temp");
unitSlider.addEventListener("click", () => {
	unitSlider.classList.toggle("special");
	const tempKelvin = weatherData[4];
	if (unit === "F") {
		unit = "C";
		const cTemp = returnUnit(tempKelvin);
		tempElement.innerText = Math.floor(cTemp);
	} else if (unit === "C") {
		unit = "F";
		const fTemp = returnUnit(tempKelvin);
		tempElement.innerText = Math.floor(fTemp);
	}
});

function displayChange() {
	
}

const changeLocation = async () => {
	const displayChanged = await displayChange(); 
}
