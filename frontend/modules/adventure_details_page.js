import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  //console.log("from getAdventureIdFromURL(), search :: ", search);
  
  const params = new URLSearchParams(search);
  let adventureId = params.get('adventure');
  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try{
    let adventureDetailsUrl = config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`;
    let response = await fetch(adventureDetailsUrl);
    let data = await response.json();
    //console.log(data);
    return data;
  }catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  //return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  //console.log(adventure);

  let adventureNameEle = document.getElementById("adventure-name");
  let adventureSubtitleEle = document.getElementById("adventure-subtitle");
  let photoGalleryDiv = document.getElementById("photo-gallery");
  let adventureDetailsEle = document.getElementById("adventure-content");

  adventureNameEle.innerHTML = `${adventure.name}`;
  adventureSubtitleEle.innerHTML = `${adventure.subtitle}`;
  
  adventure.images.forEach((image) => {
    let adventureImagesEle = document.createElement("div");

    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", `${image}`);
    imageElement.setAttribute("class", "activity-card-image");

    adventureImagesEle.appendChild(imageElement);
    photoGalleryDiv.appendChild(adventureImagesEle);
  })
 
  adventureDetailsEle.innerHTML = `${adventure.content}`;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let photoGalleryDiv = document.getElementById("photo-gallery");
  //photoGalleryDiv.innerHTML = "";

  photoGalleryDiv.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="carousel-indicators"></div>
  <div class="carousel-inner" id="carousel-inner"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
  
images.map((item, index) => {
    //for carousel bottom button slider
    let button = document.createElement("button");
    button.setAttribute("type","button");
    button.setAttribute("data-bs-target","#carouselExampleIndicators");
    button.setAttribute("data-bs-slide-to",`${index}`);
    button.setAttribute("aria-label",`Slide ${index}`);
    button.setAttribute("class",`${index === 0 ? "active" : ""}`);
    button.setAttribute("aria-current",`${index === 0 ? "true" : ""}`);
    document.getElementById("carousel-indicators").appendChild(button);

    //for multiple images
    let innerImgDiv = document.createElement("div");
    innerImgDiv.setAttribute("class",`carousel-item ${index === 0 ? "active" : ""}`);
    innerImgDiv.innerHTML = `<img src=${item} class="activity-card-image pb-3 pb-md-0" alt="...">`;
    document.getElementById("carousel-inner").appendChild(innerImgDiv);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  //console.log(adventure);
  if(adventure.available === true){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";

    document.getElementById("reservation-person-cost").innerHTML = `${adventure.costPerHead}`;
  }else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  //console.log(adventure);
  let formElement  = document.getElementById('myForm');
  formElement.addEventListener('submit',async (event) => {
    console.log(event);
    event.preventDefault();
    try{
      let newReservationUrl = config.backendEndpoint + "/reservations/new";
      let res = await fetch(newReservationUrl, {
        method: "POST",
        body: JSON.stringify({
          name: formElement.elements['name'].value,
          date: formElement.elements['date'].value,
          person: formElement.elements["person"].value,
          adventure: adventure.id
        }),
        headers: {
          "Content-type": "application/json"
        }
      });
      if(res.ok){
        alert("Success!");
        console.log(res);
        window.location.reload();
      }else{
        let data = await res.json();
        alert(`Failed - ${data.message}`);
      }
    }catch(err){
      alert(err);
    }
});
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none"; 
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
