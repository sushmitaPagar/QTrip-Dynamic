import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  let cityId = params.get('city');
  
  return cityId;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let adventuresUrl = config.backendEndpoint + `/adventures?city=${city}`;
    let response = await fetch(adventuresUrl);
    let data = await response.json();
    return data;
  }catch(err){
    return null;
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let dataDiv = document.getElementById("data");
  adventures.forEach((key) => {
    addAdventure(key.id, key.category, key.image, key.name, key.costPerHead, key.duration);
  });

  function addAdventure(id, category, image, name, costPerHead, duration){
    
    let childDiv = document.createElement("div");
    childDiv.setAttribute("class", "col-6 col-sm-6 col-lg-3 mb-3");
    childDiv.style = "position: relative";
    dataDiv.appendChild(childDiv);

    let anchorElement = document.createElement("a");
    anchorElement.setAttribute("href", `detail/?adventure=${id}`);
    anchorElement.setAttribute("id", `${id}`);
    anchorElement.innerHTML = `<div class="category-banner">${category}</div>    
    <div class="card activity-card">
          <img src="${image}" alt="${name}" />
          <div class="card-body">
            <div class="d-md-flex justify-content-between">
              <p class="card-title">${name}</p>
              <p class="card-text">₹${costPerHead}</p>
            </div>
            <div class="d-md-flex justify-content-between">
              <p class="card-title">Duration</p>
              <p class="card-text">${duration} Hours</p>
            </div>
          </div>
        </div>`;
        childDiv.appendChild(anchorElement);
  }
  
  // let newAdventureBtn = document.createElement("button");
  // newAdventureBtn.setAttribute("type", "button");
  // newAdventureBtn.setAttribute("id", "addNewAdventure");
  // newAdventureBtn.innerText = "Add New Adventure";

  // let body = document.body;
  // body.appendChild(newAdventureBtn);
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
