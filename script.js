document.getElementById('quizForm').addEventListener('submit', function(e){
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  // Stuur data naar je Google Apps Script Web App
  fetch('https://script.google.com/macros/s/AKfycbyYMBHjV9t4aFRMLZfkrX4YeraTGEpXNa-dsQ0iDXymlivANI3wMnAsdRvQsB0jkG2x/exec', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(res => {
    alert('Quiz succesvol verzonden! Dank je wel.');
    e.target.reset();
  })
  .catch(err => {
    console.error(err);
    alert('Er is iets misgegaan bij het verzenden van de quiz.');
  });
});
