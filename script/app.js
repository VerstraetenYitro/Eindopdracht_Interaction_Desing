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
  //makeMarker('50.815950,3.316900', 'Luipaardstraat 12A, Kortrijk', 'Campus Kortrijk The Square');

  for (const venue of data.venues) {
    //console.log(venue);
    coords = `${venue.lat},${venue.lon}`;
    nameVenue = venue.name;
    categoryVenue = venue.category;

    makeMarker(coords, categoryVenue, nameVenue);
  }
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
  layergroup = L.layerGroup().addTo(map);

  document.querySelector('.js-btn').addEventListener('click', function () {
    toggleListView();
  });
  getAPI(50, 4);
  console.log('end');
};

document.addEventListener('DOMContentLoaded', init);
