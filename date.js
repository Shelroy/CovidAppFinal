module.exports = getDate;
function getDate(){
  let today = new Date();

  let options = {
    weekday:"long",
    day : "numeric",
    month : "long"
  };

  let options2 = {
    
    day : "numeric"
    
  }

  let day = today.toLocaleDateString("en-US", options);
  let date = today.toLocaleDateString("en-US", options2);

  let CurrentDate=[day, date]


  return CurrentDate;
}
