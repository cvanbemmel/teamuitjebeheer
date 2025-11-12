// script.js

document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault(); // voorkomt standaard submit

    // Formulierdata verzamelen
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // URL van je Google Apps Script Web App
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbyYMBHjV9t4aFRMLZfkrX4YeraTGEpXNa-dsQ0iDXymlivANI3wMnAsdRvQsB0jkG2x/exec'; 
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
            e.target.reset(); //
