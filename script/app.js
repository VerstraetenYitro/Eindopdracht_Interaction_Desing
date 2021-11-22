'use strict';

const provider = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const copyright = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>';

let map, layergroup;

let listView = false;
let list, divMap;

const makeMarker = function (coords, adres, campusnaam) {
  // console.log(coords);
  const arr_coords = coords.split(',');
  layergroup.clearLayers();
  let marker = L.marker(arr_coords).addTo(layergroup);
  marker.bindPopup(`<h3>${campusnaam}</h3><em>${adres}</em>`);
};

const addEventsToCampus = function () {
  const campussen = document.querySelectorAll('.c-campus__row');
  for (const campus of campussen) {
    campus.addEventListener('click', function () {
      const coords = this.querySelector('.js-coords').innerHTML;
      const adres = this.querySelector('.js-adres').innerHTML;
      const campusnaam = this.querySelector('.js-campusnaam').innerHTML;
      maakMarker(coords, adres, campusnaam);
    });
  }
};

const showVenues = function (data) {
  console.log(data);
  for (const venue of data.venues) {
    console.log(venue);
    //makeMarker(`${data.lat}, ${data.lon}`, 'ff', 'fff');
  }
};

const getAPI = function (lat, lon) {
  //const url = `https://coinmap.org/api/v1/venues/?lat1=${lat}&lon1=${lon}`;
  //const url = `https://coinmap.org/api/v1/venues/?lat1=50&lon1=4`;
  //const url = 'https://coinmap.org/api/v1/coins/';

  //const url = 'https://api.publicapis.org/entries';
  //const url = 'https://cors-anywhere.herokuapp.com/https://coinmap.org/api/v1/venues/?lat1=40.0000&lon1=-75.0000&lat2=42.0000&lon2=-74.0000';

  //const searchQuery = `https://cors-anywhere.herokuapp.com/https://coinmap.org/api/v1/venues/?lat1=${lat}&lon1=${lon}`;
  const url = 'https://testcoinmap.azurewebsites.net/api/v1/coin';
  console.log(url);
  const request = fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showVenues(data);
    });
};

const toggleListView = function () {
  if (listView == true) {
    showMap();
    listView = false;
  } else if (listView == false) {
    showList();
    listView = true;
  }
};

const showMap = function () {
  // eerst de kaart nog zichtbaar maken en de lijst onzichtbaar maken.
  // onzichtbaar en zichtbaar maken met 'hidden' class toe te voegen/ verwijderen aan/van de classlist
  list.classList.add('hidden');
  divMap.classList.remove('hidden');
  getAPI();
};

const showList = function () {
  list.classList.remove('hidden');
  divMap.classList.add('hidden');
  let listhtml = makeList();
  // eerst de kaart onzichtbaar maken en dan de lijst zichtbaar maken.
};

const makeList = function () {};

const init = function () {
  console.log('init initiated!');

  list = document.querySelector('.js-list');
  divMap = document.querySelector('.js-map');

  map = L.map('mapid').setView([51.04028, 3.398512], 10);
  L.tileLayer(provider, { attribution: copyright }).addTo(map);

  document.querySelector('.js-btn').addEventListener('click', function () {
    toggleListView();
  });
  getAPI(50, 4);
  console.log('end');
};

document.addEventListener('DOMContentLoaded', init);
