const myIcon = document.querySelector('.icon');
const myLocation = document.querySelector('.location');
const myTemperature = document.querySelector('.temperature');
const myHint = document.querySelector('.hint');

const rootElement = document.documentElement;

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

  const apiUri = `${endpoint}?lon=${longitude}&lat=${latitude}&units=${units}&lang=${language}&appid=${apiKey}`;

  // chiamata

  fetch(apiUri)
    .then(function (response) {
      const data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);

      // prendo le info che mi servono
      const locationName = data.name;
      const temperature = Math.floor(data.main.temp);
      const iconCode = data.weather[0].icon;
      const description = data.weather[0].description;

      // chiamiamo la funzione del suggerimento in base al meteo
      const hint = gethint(iconCode);

      // inseriamo questi dati in pagina
      myLocation.innerText = locationName;
      myTemperature.innerText = `${temperature}°C`;
      myIcon.alt = description;
      myIcon.src = `img/${iconCode}.png`;
      myHint.innerHTML = hint;

      // rimuovere loading
      rootElement.classList.remove('loading');
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