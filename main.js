
// Foursquare API Info
const clientId = 'FV30URZXLCYNDVJWNS0YMH14O0O0R01YE0MRHYVOJFW3WDRN';
const clientSecret = 'MK3J2LY2RZAVD5OTM2QADQRYNIDFH5PPN54MEQTUPAMOBCKG';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '9c5b5b1f1a7553da329313a7865e41c8';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async() => {
    const city= $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20191225`;
    console.log(urlToFetch);
  try{
    const response = await fetch(urlToFetch);
    console.log(response);
    if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse);
renderVenues(jsonResponse.response.groups[0]);
    }
    
  }catch(error){
    console.log(error);
  }
}

const getForecast = () => {

}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    let venuesDetails = venues.items[index].venue;
    let venueContent = createVenueHTML(venuesDetails.name,
      venuesDetails.categories[0].icon.prefix+venuesDetails.categories[0].icon.suffix,
      venuesDetails.location);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues.items[0].venue.location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  
	let weatherContent = '';
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues()
  getForecast()
  return false;
}

$submit.click(executeSearch)