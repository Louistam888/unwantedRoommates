const app = {};

app.token = "ZLv4DuWOXJMDJjtoemNuEtwro"

//URLS
app.url = "https://proxy-ugwolsldnq-uc.a.run.app/https://data.cityofnewyork.us/resource/p937-wjvj.json"
app.url2 = "https://proxy-ugwolsldnq-uc.a.run.app/https://data.cityofnewyork.us/resource/wz6d-d3jb.json"


//REUSABLE FUNCTION TO CONVERT TIME TO HUMAN READABLE FORMAT
const convertTime = (timeObj) => { 
  return new Date(timeObj).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
}


//FUNCTION TO FETCH RAT API RECORDS
app.getRatRecords = (house, street, borough)=> {

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
      throw new Error(rodent.statusText)
    }
  })
  .then((jsonData) =>{
    
    if (jsonData.length === 0) {

      const noResults = document.createElement("div");
      noResults.classList.add("noRecords");
      noResults.innerHTML =
      `<p class="noRecords"> No records found. You're probably safe from rats.</p>`

      document.querySelector(".inspectionResults").append(noResults);

    } else {

    app.displayRatResults(jsonData);
    }
  })
  .catch((error)=> {

    if(error.message === "Not Found") {
      const noResults = document.createElement("div");
      noResults.classList.add("noRecords");
      noResults.innerHTML =
      `<p class="noRecords"> The API containing rat inspection data is currently unavailable. Please try again later.</p>`

      document.querySelector(".inspectionResults").append(noResults);  
    }
  });
};


//FUNCTION TO DISPLAY RAT RESULTS 
app.displayRatResults = (arrayOfObjects) => {
  arrayOfObjects.forEach((obj) =>{
    const number = obj.house_number;
    const address = obj.street_name;
    const zipCode = obj.zip_code;
    const borough = obj.borough;
    const date = convertTime(obj.inspection_date);
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
    document.querySelector('.inspectionResults').append(resultContainer); 
  })
}


//FUNCTION TO FETCH BEDBUG API RECORDS 
app.getBedBugRecords = (house, street, borough)=> {

  const url = new URL (app.url2);
 
  url.search = new URLSearchParams({
    "$$app_token": app.token,
    "$limit": 5,
    "$order": "filing_date DESC",
    "house_number": house,
    "street_name": street,
    "borough": borough.toUpperCase(),
  });

  fetch(url).then((bedbug) =>{
  
    if (bedbug.ok) {
      return bedbug.json();
    } else {
      throw new Error(bedbug.statusText)
    }
   
  })
  .then((jsonData) =>{
  
    if (jsonData.length === 0) {

      const noResults = document.createElement("div");
      noResults.classList.add("noRecords");
      noResults.innerHTML =
      `<p class="noRecords"> No records found. You're probably safe from bedbugs.</p>`

      document.querySelector(".inspectionResults2").append(noResults);
    
    } else {

    app.displayBedBugRecords(jsonData);
    }
  })
  .catch((error)=> {

    if(error.message === "Not Found") {
      const noResults = document.createElement("div");
      noResults.classList.add("noRecords");
      noResults.innerHTML =
      `<p class="noRecords"> The API containing bedbug inspection data is currently unavailable. Please try again later.</p>`

      document.querySelector(".inspectionResults2").append(noResults);
    } 
  });
};


//FUNCTION TO DISPLAY BEDBUG RESULTS

app.displayBedBugRecords = (arrayOfObjects) => {
  arrayOfObjects.forEach((obj) =>{
    
    const number = obj.house_number;
    const address = obj.street_name;
    const borough = obj.borough;
    const zipCode = obj.postcode;
    const fileDate = convertTime(obj.filing_date);
    const fileStart = convertTime(obj.filing_period_start_date);
    const fileEnd = convertTime(obj.filling_period_end_date);
    const totalUnits = obj.of_dwelling_units;
    const infestedUnits = obj.infested_dwelling_unit_count;
    const infestedPercentage = Math.round((infestedUnits/totalUnits) * 100) + "%";  

    const resultContainer = document.createElement("div");
    resultContainer.classList.add('resultContainer');
    
    const record = document.createElement("div");
    record.classList.add('record');
    record.innerHTML = `
    <div class = "labels">
      <p class = "recordDetails"> ADDRESS:</p>
      <p class = "recordDetails"> BOROUGH:</p>
      <p class = "recordDetails"> ZIP CODE:</p>
      <p class = "recordDetails"> RESULTS REPORTED:</p>
      <p class = "recordDetails"> INSPECTION PERIOD:</p>
      <p class = "recordDetails"> UNITS INFESTED:</p>
    </div>
    `

    const details = document.createElement("div");
    details.classList.add("details");
    details.innerHTML = `
    <div class ="information">
      <p class = "recordDetails"> ${number} ${address}</p>
      <p class = "recordDetails"> ${borough}</p>
      <p class = "recordDetails"> ${zipCode}</p>      
      <p class = "recordDetails"> ${fileDate}</p>
      <p class = "recordDetails"> ${fileStart} to ${fileEnd}</p>
      <p class = "recordDetails"> ${infestedPercentage}</p>
    </div>`
  
    resultContainer.append(record, details); 
    document.querySelector('.inspectionResults2').append(resultContainer); 
  })
}


app.events = () => { 

  document.querySelector("form").addEventListener('submit', function(event){
    event.preventDefault();

    document.querySelector(".inspectionResults").replaceChildren();
    document.querySelector(".inspectionResults2").replaceChildren();

    const recordHeadlines = document.querySelectorAll('.h2Results')
      recordHeadlines.forEach((headline) => {
      headline.style.display = "block";
    });
  
    const house =  document.querySelector("#houseNumber").value;
    const streetRaw = document.querySelector("#streetName").value
    const street = streetRaw.replace(/(\d+)(st|nd|rd|th)/, "$1").toUpperCase();
    const borough = document.querySelector("#borough").value;
    
  app.getRatRecords(house, street, borough)
  app.getBedBugRecords(house, street, borough)
  });
};
 
app.init = () => {
  app.events();
};

app.init();

