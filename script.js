//* Async Await Version
async function pingAPI(location) {
    //Currently has no error handling
        //you await for fetch to return promise
        const pingedAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=`, {mode: 'cors'});

        //you await for fetches await then return it in JSON
        const pingedJson = await pingedAPI.json()
        console.log(pingedJson);
        
        return pingedJson;
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


pingAPI('Kansas+City');