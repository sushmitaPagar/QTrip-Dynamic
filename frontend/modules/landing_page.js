import config from "../conf/index.js";

async function init() {
  //console.log("From init()");
  console.log(config.backendEndpoint);
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  
  //Updates the DOM with the cities
  cities.forEach((key) => {
    //console.log(key.id);
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let url = config.backendEndpoint + "/cities";
    let response = await fetch(url);
    let cities = await response.json();
    console.log(cities);
    return cities;
  }catch(err){
    alert(err);
    return null;
  }
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  //console.log(image);
  let dataDiv = document.getElementById("data");

  let childDiv = document.createElement("div");
  childDiv.setAttribute("class", "col-sm-6 col-lg-3 my-4");
  childDiv.innerHTML = `<a href="pages/adventures/?city=${id}" id="${id}">
  <div class="tile">
    <div class="tile-text">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
    <img src=${image} alt=${id} class="img-fluid"/>
  </div>
  </a>`;
  dataDiv.appendChild(childDiv);
}

export { init, fetchCities, addCityToDOM };
