const rootElement = document.documentElement;

// meteo attuale
const myIcon = document.querySelector('.icon');
const myDescription = document.querySelector('.description');
const myLocation = document.querySelector('.location');
const myTemperature = document.querySelector('.temperature');
const myTempMax = document.querySelector('.temp-max');
const myTempMin = document.querySelector('.temp-min');
const myHint = document.querySelector('.hint');

// previsioni meteo
const myIconForecast = document.querySelector('.icon-forecast');
const myDescriptionForecast = document.querySelector('.description-forecast');
const myTemperatureForecast = document.querySelector('.temp-forecast');
const myDayTime = document.querySelector('.daytime');

const myIconForecast2 = document.querySelector('.icon-forecast2');
const myDescriptionForecast2 = document.querySelector('.description-forecast2');
const myTemperatureForecast2 = document.querySelector('.temp-forecast2');
const myDayTime2 = document.querySelector('.daytime2');

const myIconForecast3 = document.querySelector('.icon-forecast3');
const myDescriptionForecast3 = document.querySelector('.description-forecast3');
const myTemperatureForecast3 = document.querySelector('.temp-forecast3');
const myDayTime3 = document.querySelector('.daytime3');

// recuperare la posizione
window.navigator.geolocation.getCurrentPosition(onSuccess, onError);

// in caso di errore
function onError(error) {
  console.log(error);
  myIcon.src = "img/geolocation_disabled.png";
  myLocation.innerText = 'Attiva la geolocalizazione!';
  rootElement.classList.remove('loading');
  myHint.innerHTML = 'Impossibile reperire le informazioni...';
}

// in caso di successo
function onSuccess(position) {
  console.log(position);

  // dati per l'API
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiKey = '0f89ba0942b2be3e0bd7130cbccdcedc';
  const language = 'it';
  const units = 'metric';
  const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
  const forecast = 'https://api.openweathermap.org/data/2.5/forecast';

  const apiUri = `${endpoint}?lon=${longitude}&lat=${latitude}&units=${units}&lang=${language}&appid=${apiKey}`;  
  const apiUriForecast = `${forecast}?lon=${longitude}&lat=${latitude}&units=${units}&lang=${language}&appid=${apiKey}`;

  // chiamata per il meteo corrente
  fetch(apiUri)
    .then(function (response) {
      const data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);

      // prendo le info che mi servono
      const locationName = data.name;
      const temperature = Math.round(data.main.temp);
      const tempMax = Math.round(data.main.temp_max);
      const tempMin = Math.round(data.main.temp_min);
      const iconCode = data.weather[0].icon;
      const description = data.weather[0].description;

      // chiamiamo la funzione del suggerimento in base al meteo
      const hint = gethint(iconCode);

      // inseriamo questi dati in pagina
      myLocation.innerText = locationName;
      myTemperature.innerText = `${temperature}°C`;
      myTempMax.innerText = `${tempMax}°C`;
      myTempMin.innerText = `${tempMin}°C`;
      myIcon.alt = description;
      myDescription.innerText = description;
      myIcon.src = `img/${iconCode}.png`;
      myHint.innerHTML = hint;

      // rimuovere loading
      rootElement.classList.remove('loading');
    });

  //  chiamata per le previsioni meteo
  fetch(apiUriForecast)
    .then(function (response) {
      const dataForecast = response.json();
      return dataForecast;
    })
    .then(function (dataForecast) {
      console.log(dataForecast);

      // prendo le info che mi servono
      const iconCode = dataForecast.list[8].weather[0].icon;
      const description = dataForecast.list[8].weather[0].description;
      const temperature = Math.round(dataForecast.list[8].main.temp);
      let daytime = dataForecast.list[8].dt_txt;

      const iconCode2 = dataForecast.list[16].weather[0].icon;
      const description2 = dataForecast.list[16].weather[0].description;
      const temperature2 = Math.round(dataForecast.list[16].main.temp);
      let daytime2 = dataForecast.list[16].dt_txt;

      const iconCode3 = dataForecast.list[24].weather[0].icon;
      const description3 = dataForecast.list[24].weather[0].description;
      const temperature3 = Math.round(dataForecast.list[24].main.temp);
      let daytime3 = dataForecast.list[24].dt_txt;

      formatDateIT();
      formatDateIT2();
      formatDateIT3();

      // inseriamo questi dati in pagina
      myIconForecast.src = `img/${iconCode}.png`;
      myIconForecast.alt = description;
      myDescriptionForecast.innerText = description;
      myTemperatureForecast.innerText = `${temperature}°C`;
      myDayTime.innerText = `${daytime}`;

      myIconForecast2.src = `img/${iconCode2}.png`;
      myIconForecast2.alt = description2;
      myDescriptionForecast2.innerText = description2;
      myTemperatureForecast2.innerText = `${temperature2}°C`;
      myDayTime2.innerText = `${daytime2}`;

      myIconForecast3.src = `img/${iconCode3}.png`;
      myIconForecast3.alt = description3;
      myDescriptionForecast3.innerText = description3;
      myTemperatureForecast3.innerText = `${temperature3}°C`;
      myDayTime3.innerText = `${daytime3}`;

      //formatto le date in formato italiano (gg/mmm)
      function formatDateIT() {
        let dateArray = daytime.split(/(?:-| )+/);
        if (dateArray[1] == '01') {
          dateArray[1] = "Gennaio";
        }
        if (dateArray[1] == '02') {
          dateArray[1] = "Febbraio";
        }
        if (dateArray[1] == '03') {
          dateArray[1] = "Marzo";
        }
        if (dateArray[1] == '04') {
          dateArray[1] = "Aprile";
        }
        if (dateArray[1] == '05') {
          dateArray[1] = "Maggio";
        }
        if (dateArray[1] == '06') {
          dateArray[1] = "Giugno";
        }
        if (dateArray[1] == '07') {
          dateArray[1] = "Luglio";
        }
        if (dateArray[1] == '08') {
          dateArray[1] = "Agosto";
        }
        if (dateArray[1] == '09') {
          dateArray[1] = "Settembre";
        }
        if (dateArray[1] == '10') {
          dateArray[1] = "Ottobre";
        }
        if (dateArray[1] == '11') {
          dateArray[1] = "Novembre";
        }
        if (dateArray[1] == '12') {
          dateArray[1] = "Dicembre";
        }

        let ItDate = (`${dateArray[2]} ${dateArray[1]}`);
        daytime = ItDate;
      };
      function formatDateIT2() {
        let dateArray = daytime2.split(/(?:-| )+/);
        if (dateArray[1] == '08') {
          dateArray[1] = "Agosto";
        }
        let ItDate = (`${dateArray[2]} ${dateArray[1]}`);
        daytime2 = ItDate;
      };
      function formatDateIT3() {
        let dateArray = daytime3.split(/(?:-| )+/);
        if (dateArray[1] == '09') {
          dateArray[1] = "Settembre";
        }
        let ItDate = (`${dateArray[2]} ${dateArray[1]}`);
        daytime3 = ItDate;
      };

    });  
}

// funzione per recuperare il suggerimento giusto
function gethint(iconCode) {
  const hints = {
    '01d': 'Bevi tanta acqua!',
    '01n': 'Serata limpida',
    '02d': 'Qualche nuvola in cielo',
    '02n': 'Qualche nuvola notturna...',
    '03d': 'Niente abbronzatura oggi',
    '03n': 'Buonanotte',
    '04d': 'Che cielo grigio :(',
    '04n': 'Non si vede nemmeno la luna!',
    '09d': 'Prendi l\'ombrello, se esci...',
    '09n': 'Copriti bene!',
    '10d': 'Prendi l\'ombrello',
    '10n': 'Copriti bene!',
    '11d': 'Attento ai fulmini!',
    '11n': 'I lampi accendono la notte!',
    '13d': 'Esci a fare un pupazzo di neve!',
    '13n': 'Notte perfetta per stare sotto il piumone!',
    '50d': 'Accendi i fendinebbia!',
    '50n': 'Ed è subito Silent Hill',
  }

  return hints[iconCode];
}
