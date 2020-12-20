// Write your JavaScript code here!
    window.addEventListener("load", function() {
        let form = document.querySelector("form");
        let list = document.getElementById("faultyItems");
        let pilotStat = document.getElementById("pilotStatus");
        let copilotStat = document.getElementById("copilotStatus");
        let launchStat = document.getElementById("launchStatus");
        let fuelStat = document.getElementById("fuelStatus");
        let cargoStat = document.getElementById("cargoStatus");
        list.style.visibility = "hidden"

        fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
            response.json().then( function(json) {
               const div = document.getElementById("missionTarget");
                div.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                   <li>Name: ${json[1].name}</li>
                   <li>Diameter: ${json[1].diameter}</li>
                   <li>Star: ${json[1].star}</li>
                   <li>Distance from Earth: ${json[1].distance}</li>
                   <li>Number of Moons: ${json[1].moons}</li>
                </ol>
                <img src="${json[1].image}">`;
            });
        });

        form.addEventListener("submit", function(event) {
            event.preventDefault();
            let pilotNameInput = document.querySelector("input[name=pilotName]");
            let copilotNameInput = document.querySelector("input[name=copilotName]");
            let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
            let cargoMass = document.querySelector("input[name=cargoMass]");

            if (pilotNameInput.value === ""|| copilotNameInput.value === ""|| fuelLevelInput.value === ""|| cargoMass.value === "") {
            alert("All fields are required!");
                 } else if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value)) {
                     alert("Pilot and co-pilot names must consist of letters.")
                 }
                  else if (isNaN(fuelLevelInput.value)|| isNaN(cargoMass.value)) {
                     alert("Fuel level and cargo mass must be numbers.")
                 } else {
                     list.style.visibility = "visible"
                     pilotStat.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch.`
                     copilotStat.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch.`
                     if (fuelLevelInput.value < 10000) {
                        launchStat.innerHTML = "Shuttle not ready for launch."
                        launchStat.style.color = "red"
                        fuelStat.innerHTML = "Fuel level too low for launch!"
                     } else if (cargoMass.value > 10000) {
                         launchStat.innerHTML = "Shuttle not ready for launch."
                         launchStat.style.color = "red"
                         cargoStat.innerHTML = "Cargo too heavy for launch!" 
                        
                     } else {
                         launchStat.innerHTML = "Shuttle is ready for launch!"
                         launchStat.style.color = "green"
                     }                                            
        
                 }
        });
    });

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
