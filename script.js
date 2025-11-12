// script.js
// https://script.google.com/macros/s/AKfycbwDu46uJ31ToqIUMJ51iMaN7gXdm3a4pP18ua1lYQwsW1rt-TfNZLJAPHLVrSg5m76X/exec
// === SPEELSE QUIZ LOGICA ===
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const rubrieken = document.querySelectorAll('fieldset');
  const quizForm = document.getElementById('quizForm');
  let currentIndex = 0;

  function showRubriek(index) {
    rubrieken.forEach((fs, i) => fs.classList.toggle('hidden', i !== index));
  }

  // Start quiz na invullen naam
  startBtn.addEventListener('click', () => {
    const voornaam = document.querySelector('input[name="voornaam"]').value.trim();
    const achternaam = document.querySelector('input[name="achternaam"]').value.trim();
    if (!voornaam || !achternaam) {
      alert('Vul je voornaam en achternaam in om te starten.');
      return;
    }
    document.querySelector('.intro').classList.add('hidden');
    showRubriek(0);
  });

  // Volgende knop — minimaal één antwoord vereist
  document.querySelectorAll('.nextBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const fieldset = btn.closest('fieldset');
      const inputs = fieldset.querySelectorAll('input[type="text"]');
      const ingevuld = Array.from(inputs).some(i => i.value.trim() !== '');
      if (!ingevuld) {
        alert(`Vul minimaal één antwoord in bij rubriek: "${fieldset.dataset.rubriek}".`);
        return;
      }
      currentIndex++;
      if (currentIndex < rubrieken.length) {
        showRubriek(currentIndex);
      }
    });
  });

  // === VERSTUREN VAN QUIZ ===
  quizForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const lastRubriek = rubrieken[rubrieken.length - 1];
    const inputs = lastRubriek.querySelectorAll('input[type="text"]');
    const ingevuld = Array.from(inputs).some(i => i.value.trim() !== '');
    if (!ingevuld) {
      alert(`Vul minimaal één antwoord in bij de laatste rubriek: "${lastRubriek.dataset.rubriek}".`);
      return;
    }

    // Verzamel alle antwoorden
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // === URL VAN JE GOOGLE APPS SCRIPT WEB APP ===
    const webAppUrl = 'https://script.google.com/macros/s/AKfycby2U1x_sqXn8zV83Y9z7E-oV9l3q5tYrVbasOsTq1k-5xSfgQa81-hVVJx0yvkR3mpj/exec';

    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const res = await response.json();
      if (res.result === 'success') {
        alert('🎉 Bedankt! Je quiz is succesvol verzonden.');
        quizForm.reset();
        rubrieken.forEach(fs => fs.classList.add('hidden'));
        document.querySelector('.intro').classList.remove('hidden');
        currentIndex = 0;
      } else {
        throw new Error(res.message || 'Onbekende fout');
      }
    } catch (error) {
      console.error('Fout bij verzenden:', error);
      alert('❌ Er is iets misgegaan bij het verzenden van je quiz. Probeer het later opnieuw.');
    }
  });
});


