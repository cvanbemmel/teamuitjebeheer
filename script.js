// script.js
// https://script.google.com/macros/s/AKfycbyYMBHjV9t4aFRMLZfkrX4YeraTGEpXNa-dsQ0iDXymlivANI3wMnAsdRvQsB0jkG2x/exec


// script.js

document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault(); // voorkomt standaard submit

    // Rubrieken en bijbehorende input namen
    const rubrieken = {
        "Over mij": ["over_mij_1","over_mij_2","over_mij_3","over_mij_4","over_mij_5","over_mij_6","over_mij_7","over_mij_8"],
        "Top secret": ["top_secret_1","top_secret_2","top_secret_3","top_secret_4","top_secret_5","top_secret_6"],
        "Vrije tijd": ["vrije_tijd_1","vrije_tijd_2","vrije_tijd_3","vrije_tijd_4","vrije_tijd_5","vrije_tijd_6"],
        "Waardevol": ["waardevol_1","waardevol_2","waardevol_3","waardevol_4","waardevol_5","waardevol_6"],
        "Wat als…": ["wat_als_1","wat_als_2","wat_als_3","wat_als_4","wat_als_5","wat_als_6","wat_als_7","wat_als_8"],
        "Werk": ["werk_1","werk_2","werk_3","werk_4","werk_5","werk_6"]
    };

    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value.trim();
    });

    // Validatie: minimaal één antwoord per rubriek
    for (let rubriek in rubrieken) {
        const inputs = rubrieken[rubriek];
        const ingevuld = inputs.some(name => data[name] && data[name].length > 0);
        if (!ingevuld) {
            alert(`Vul minimaal één antwoord in bij rubriek: "${rubriek}"`);
            return; // stopt submit
        }
    }

    // Check voornaam en achternaam
    if(!data.voornaam || !data.achternaam){
        alert('Vul je voornaam en achternaam in.');
        return;
    }

    // URL van je Google Apps Script Web App
    const webAppUrl = 'https://script.google.com/macros/s/AKfycby2U1x_sqXn8zV83Y9z7E-oV9l3q5tYrVbasOsTq1k-5xSfgQa81-hVVJx0yvkR3mpj/exec'; 
    // Vervang JE_WEBAPP_URL door je eigen Web App URL

    // POST request naar Google Apps Script
    fetch(webAppUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(res => {
        if(res.result === 'success'){
            alert('Quiz succesvol verzonden! Dank je wel.');
            e.target.reset(); // formulier leegmaken
        } else {
            alert('Er is iets misgegaan bij het verzenden van de quiz.');
            console.error(res);
        }
    })
    .catch(error => {
        console.error('Fetch fout:', error);
        alert('Er is iets misgegaan bij het verzenden van de quiz. Controleer de console voor details.');
    });
});

