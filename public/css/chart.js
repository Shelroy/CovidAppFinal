/////// BEGINNING OF BAR CHART WITH VAX VS POPULATION /////////////

var chartPopulation = document.getElementById('x').textContent;
var chartVaccinated = document.getElementById('y').textContent;

var ctx = document.getElementById('chart');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Population', 'Vaccinated'],
//         datasets: [{
//             label: 'Population VS Vaccinated',
//             data: [chartPopulation, chartVaccinated],
//             backgroundColor: [
//                 'rgba(220, 53, 69, 0.2)',
//                 'rgba(33, 150, 243 0.3)',

//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//       responsive:true,
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });


// pie chart OPTIONS
var options = {
   tooltips: {
     enabled: false
   },
   plugins: {
     datalabels: {
       formatter: (value, ctx) => {
         let datasets = ctxPie.chart.data.datasets;
         if (datasets.indexOf(ctxPie.dataset) === datasets.length - 1) {
           let sum = datasets[0].data.reduce((a, b) => a + b, 0);
           let percentage = Math.round((value / sum) * 100) + '%';
           return percentage;
         } else {
           return percentage;
         }
       },
       color: '#fff',
     }
   }
 };

 /////// BEGINNING OF PIE CHART /////////////

// var ctxPie = document.getElementById('pieChart');
// var myChart = new Chart(ctxPie, {
//     type: 'pie',
//     data: {
//         labels: ['Population', 'Vaccinated'],
//         datasets: [{
//             label: 'Population VS Vaccinated',
//             data: [chartPopulation, chartVaccinated],
//             backgroundColor: [
//                 'rgba(220, 53, 69, 0.2)',
//                 'rgba(33, 150, 243, 0.3)',

//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//             ],
//             borderWidth: 1,
//         }]
//     },
//     options: options,
//       responsive:true,

//     });
//

/////// BEGINNING OF DATE FUNCTION THAT LET'S ME GET THE LAST 7 DAYS  /////////////

function getDate(){
  let dayArray = [];
  var options = {
    day : "numeric",
    weekday:"long",
    month : "long"
  };
  for(let i = 0; i < 7; i++)
  {
    let today = new Date();
    today.setDate(today.getDate() - [i]);
    let day = today.toLocaleDateString("en-US", options);
    dayArray.unshift(day);
    console.log(day);
  }
  return dayArray;
}

daysOfWeek = getDate();

/////// BEGINNING OF LINE CHART WITH DAILY DEATH NUMBERS /////////////
var myLineChart = document.getElementById('lineChart');
// var weeklyDeath = document.getElementById('z').textContent;
var dailyInfected = document.getElementById('z').textContent;
// convert each array element to a number and seperate it by a comma
// var resultArray = weeklyDeath.split(',').map(function(weeklyDeath){return Number(weeklyDeath);});

var dailyInfectedArray = dailyInfected.split(',').map(function(dailyInfected){return Number(dailyInfected);});

var lineChart = new Chart(myLineChart,{
  type:'line',
  data:{
    labels: daysOfWeek,
    datasets: [{
      label: 'Total Infected over the last 7 Days',
      backgroundColor: [
        'rgba(60, 121, 231, 0.8)',
        'rgba(33, 150, 243 0.3)',
        "rgba(0, 140, 255, 1)"
      ],
      data: dailyInfectedArray,
      // data: [609,606,602,601,594,594,591],
      fill: false,
      borderColor: 'rgb(33, 150, 243)',
      tension: 0.1
  }]
},
options: {
    responsive: true,
    maintainAspectRatio: false
}

});

/////// BEGINNING OF BAR CHART WITH DAILY VAX NUMBERS /////////////

