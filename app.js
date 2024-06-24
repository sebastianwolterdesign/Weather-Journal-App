const apiKey = '029f79731c7e70e5ace9f963bde4784f';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  getWeather(baseUrl, zipCode, apiKey)
  .then(function(data){
    postData('/add', {date: newDate, temp: data.main.temp, feel: feelings});
  })
  .then(function() {
    updateUI();
  });
}

const getWeather = async (baseUrl, zip, key)=>{
  const res = await fetch(`${baseUrl}${zip}&appid=${key}`)
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

const postData = async (url = '', data = {})=>{
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

  try {
    const newData = await response.json();
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById('date').innerHTML = allData.date;
  } catch(error) {
    console.log("error", error);
  }
}