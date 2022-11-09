const app = {};

app.token = "ZLv4DuWOXJMDJjtoemNuEtwro"
app.url = "https://data.cityofnewyork.us/resource/p937-wjvj.json"


app.getRecords = (house, street, borough)=> {

  const url = new URL (app.url);
 
  url.search = new URLSearchParams({
    "$$app_token": app.token,
    "$limit": 5,
    "$order": "inspection_date DESC",
    "house_number": house,
    "street_name": street,
    "borough": borough,
  });

  fetch(url).then((rodent) =>{
    
    if (rodent.ok) {
      return rodent.json();
    } else {
      throw new Error("There was an unexpected problem with the API. Please try again later.")
    }
  })
  .then((jsonData) =>{
    
    if (jsonData.length === 0) {

      const noResults = document.createElement("div");
      noResults.classList.add("noRecords");
      noResults.innerHTML =
      `<p class="noRecords"> No records found. You're probably safe.</p>`

      const append = () => {
        document.querySelector(".inspectionResults").append(noResults);
      }

      setTimeout(() => {
        append();
      }, 100);

    } else {

    app.displayResults(jsonData);
    }
  })
  .catch((error)=> {
    noResults.classList.add("noRecords");
      noResults.innerHTML =
      `<p class="noRecords"> Sorry there was a problem with your request. Please try again later</p>`
  });
};

app.displayResults = (arrayOfObjects) => {
  arrayOfObjects.forEach((obj) =>{
    const number = obj.house_number;
    const address = obj.street_name;
    const zipCode = obj.zip_code;
    const borough = obj.borough;
    const date = obj.inspection_date;
    const initial = obj.inspection_type;
    const iResult = obj.result;
    
    const resultContainer = document.createElement("div");
    resultContainer.classList.add('resultContainer');
    
    const record = document.createElement("div");
    record.classList.add('record');
    record.innerHTML = `
    <div class = "labels">
      <p class = "recordDetails"> ADDRESS:</p>
      <p class = "recordDetails"> BOROUGH:</p>
      <p class = "recordDetails"> ZIP CODE:</p>
      <p class = "recordDetails"> INSPECTION DATE:</p>
      <p class = "recordDetails"> INSPECTION TYPE:</p>
      <p class = "recordDetails"> RESULT:</p>
    </div>
    `

    const details = document.createElement("div");
    details.classList.add("details");
    details.innerHTML = `
    <div class ="information">
      <p class = "recordDetails"> ${number} ${address}</p>
      <p class = "recordDetails"> ${borough}</p>
      <p class = "recordDetails"> ${zipCode}</p>
      <p class = "recordDetails"> ${date}</p>
      <p class = "recordDetails"> ${initial}</p>
      <p class = "recordDetails"> ${iResult}</p>
    </div>`
  
      resultContainer.append(record, details); 
  
    const append = () => {
      document.querySelector('.inspectionResults').append(resultContainer); 
    }

    setTimeout(() => {
      append();
    }, 100);
  })
}

app.events = () => { 

  document.querySelector("form").addEventListener('submit', function(event){
    event.preventDefault();

  document.querySelector(".inspectionResults").replaceChildren();

    const house =  document.querySelector("#houseNumber").value;
    const streetRaw = document.querySelector("#streetName").value
    const street = streetRaw.replace(/(\d+)(st|nd|rd|th)/, "$1").toUpperCase();
    const borough = document.querySelector("#borough").value;

    console.log(street)

  app.getRecords(house, street, borough)
  });
};
 
app.init = () => {
  app.events();
};

app.init();

