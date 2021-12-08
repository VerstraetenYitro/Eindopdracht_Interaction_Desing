'use strict';

const provider = 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
const copyright = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>';

let map, layergroup;

let listView = false;
let list, divMap;

const makeMarker = function (coords, adres, campusnaam) {
  // eerst kijken hoe de coordinaten worden doorgegeven in het andere programma en dat hier op toepassen.
  // console.log(coords);
  const arr_coords = coords.split(',');
  //layergroup.clearLayers();
  let marker = L.marker(arr_coords).addTo(layergroup);
  marker.bindPopup(`<h3>${campusnaam}</h3><em>${adres}</em>`);
};

const showVenues = function (data) {
  let nameVenue = '';
  let categoryVenue = '';
  console.log(data);
  console.log(data.venues[0]);
  let coords = `${data.venues[0].lat},${data.venues[0].lon}`;
  console.log(coords);
  makeMarker(coords, 'ff', 'fff');

  for (const venue of data.venues) {
    //console.log(venue);
    coords = `${venue.lat},${venue.lon}`;
    nameVenue = venue.name;
    categoryVenue = venue.category;

    makeMarker(coords, categoryVenue, nameVenue);
  }
};

const makeCards = function (data) {
  let id = 0;
  let lat = 0;
  let lon = 0;
  let category = '';
  let name = '';
  console.log(list);
  let htmlList = '';
  for (const venue of data.venues) {
    id = venue.id;
    lat = venue.lat;
    lon = venue.lon;
    category = venue.category;
    name = venue.name;
    //console.log(`${id} - ${lat} - ${lon} - ${category} - ${name}`);

    htmlList += `<table class="js-card hidden"><tr>
    <th></th>
    <th></th>
    </tr>
    <tr>
    <td>id:</td>
    <td>${id}</td>
    </tr>
    <tr>
    <td>latitude:</td>
    <td>${lat}</td>
    </tr>
    <tr>
    <td>longitude:</td>
    <td>${lon}</td>
    </tr>
    <tr>
    <td>category:</td>
    <td>${category}</td>
    </tr>
    <tr>
    <td>name:</td>
    <td>${name}</td>
    </tr></table>
    <br>`;
  }
  list.innerHTML = htmlList;
};

const getAPI = function (lat, lon) {
  const url = 'https://testcoinmap.azurewebsites.net/api/v1/coin';
  console.log(url);
  const request = fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showVenues(data);
      makeCards(data);
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
  for (const div of document.querySelectorAll('.js-card')) {
    div.classList.add('hidden');
  }
  divMap.classList.remove('hidden');
};

const showList = function () {
  list.classList.remove('hidden');
  for (const div of document.querySelectorAll('.js-card')) {
    div.classList.remove('hidden');
  }

  divMap.classList.add('hidden');

  // eerst de kaart onzichtbaar maken en dan de lijst zichtbaar maken.
};

const init = function () {
  console.log('init initiated!');

  list = document.querySelector('.js-list');
  divMap = document.querySelector('.js-map');

  map = L.map('mapid').setView([51.04028, 4.398512], 9);
  L.tileLayer(provider, { attribution: copyright }).addTo(map);
  layergroup = L.layerGroup().addTo(map);

  document.querySelector('.js-checkbox').addEventListener('change', function () {
    toggleListView();
  });
  getAPI(50, 4);
  console.log('end');
};

document.addEventListener('DOMContentLoaded', init);
