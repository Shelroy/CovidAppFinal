const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config()
// use EJS as ur view engine
app.set("view engine", "ejs");
// user body parser
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
  extended: true
}));
// brining in the date module that I created
const date = require (__dirname + "/date.js");

// send the home page as a response when user goes to the root of the application

let countryId = '' ;

let day = date();
let guyana = process.env.GUYANA_ID;
let mainCountryId ;
console.log(day);
// using arrow function
app.get("/",(req, res) => {
  // empty array everrytime you refresh the page
  let weeklyDeath = [];
  let dailyInfected = [];
  let dailyRecovery = [];
  let currentMonthCasesArray = [];
  let currentMonthDeathsArray = [];
  let currentMonthRecoveriesArray = [];


 if(countryId === ''){
   mainCountryId = guyana;
 }
 else{
   mainCountryId  = countryId
 }

  var historyUrl = {
    'method': 'GET',
    'hostname': 'coronavirus.app',
    // get guyana ID
    'path': "/get-history?id=" + mainCountryId,
    'headers': {
      'Authorization': process.env.API
    },
    'maxRedirects': 20
  };
  https.get(historyUrl, (response) => {
    var rawHistoryData = [];
    response.on('data', (historyChunk) => {
      rawHistoryData += historyChunk;
    });
    response.on('end', () => {
      try {
        historyData = JSON.parse(rawHistoryData);
         // get the last 7 days death number
    for (let i = 0; i < 2; i++){
      weeklyDeath.unshift(historyData.data.history[i].dead)
      dailyRecovery.unshift(historyData.data.history[i].recovered)
    }
     // get daily infected for the past 7 days 
    for (let i = 0; i < 7; i++){
      dailyInfected.unshift(historyData.data.history[i].infected-historyData.data.history[i + 1].infected)
    }
    // current month data for chart 

    // get the total for the month thus far 
    for(i = day[1]-1; i >=0; i--){
      currentMonthCasesArray.push(historyData.data.history[i].infected)

      currentMonthDeathsArray.push(historyData.data.history[i].dead)
      currentMonthRecoveriesArray.push(historyData.data.history[i].recovered)
    }
    let currentMonthCases = currentMonthCasesArray[day[1]-1] - currentMonthCasesArray[0];
    let currentMonthDeaths = currentMonthDeathsArray[day[1]-1] - currentMonthDeathsArray[0];

    let currentMonthRecoveries = currentMonthRecoveriesArray[day[1]-1] - currentMonthRecoveriesArray[0];

    // daily death cal
      let newDeaths = weeklyDeath[1] - weeklyDeath[0];
      let newRecoveries = dailyRecovery[1] - dailyRecovery[0];
        let pop = historyData.data.pop;
        let country = historyData.data.name;
        let vaccinated = historyData.data.history[0].vaccinated;
        let dead = historyData.data.history[0].dead;
        let recovered = historyData.data.history[0].recovered;
        let infected = historyData.data.history[0].infected;
        let newCases = dailyInfected[6];



        res.render("index", {
          nameOfCountry: country,
          amountInfected: infected,
          amountVaccinated: vaccinated,
          amountDead: dead,
          amountRecovered: recovered,
          population: pop,
          currentDate : day,
          weeklyDeath: weeklyDeath,
          dailyInfected: dailyInfected, 
          newCases : newCases,
          newDeaths:newDeaths,
          newRecoveries:newRecoveries,
          currentMonthCases:currentMonthCases,
          currentMonthDeaths:currentMonthDeaths,
          currentMonthRecoveries:currentMonthRecoveries


        });
      } catch (e) {
        console.error(e.message);
      }

    });
  });
});
let url = {
  'method': 'GET',
  'hostname': 'coronavirus.app',
  'path': '/get-places',
  'headers': {
    'Authorization': process.env.API
  },
  'maxRedirects': 20
};


// this handels the post request from the search box

app.post("/", (req, res) => {
  // thake the value that came in and store it in a variable called searchCountry
  const searchCountry = req.body.searchCountry;
  // create a get request that returns a response and a URl
  https.get(url, (response) => {
    let rawData = '';

    response.on('data', (chunk) => {
      rawData += chunk;
    });

    response.on('end', () => {
      try {
        const covidData = JSON.parse(rawData);

        let dataArray = covidData.data;


          const findCountry = (country) => {

          return country.name === searchCountry;
        }

        let country = dataArray.find(findCountry);
        if(country === undefined){
          res.redirect("/");
        }
       

        countryId = country.id;
        res.redirect("/");


// end of the try block
      }

       catch (e) {
        console.error(e.message);
      }
    });
  });
// close post request
});

// run server on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 3000");
});
