async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
}
let countries = [];
let currentCountry = null;
let score = 0;
let totalQuestions = 0;

async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
}

async function initializeQuiz() {
    countries = await fetchCountries();
    nextQuestion();
}

function nextQuestion() {
    const index = Math.floor(Math.random() * countries.length);
    currentCountry = countries[index];
    const correctCapital = currentCountry.capital ? currentCountry.capital[0] : 'No capital';

    // Get 3 random incorrect capitals
    let incorrectCapitals = [];
    while (incorrectCapitals.length < 3) {
        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountry = countries[randomIndex];
        const randomCapital = randomCountry.capital ? randomCountry.capital[0] : null;
        if (randomCapital && randomCapital !== correctCapital && !incorrectCapitals.includes(randomCapital)) {
            incorrectCapitals.push(randomCapital);
        }
    }

    // Combine correct and incorrect capitals, then shuffle them
    let options = [...incorrectCapitals, correctCapital];
    options = options.sort(() => Math.random() - 0.5);

    document.getElementById('country-name').innerText = `What is the capital of ${currentCountry.name.common}?`;
    options.forEach((option, index) => {
        document.getElementById(`option${index + 1}`).innerText = option;
        document.getElementById(`option${index + 1}`).onclick = () => checkAnswer(option);
    });
    document.getElementById('question-container').classList.remove('hidden');
    document.getElementById('result-container').classList.add('hidden');
}

function checkAnswer(selectedOption) {
    const correctAnswer = currentCountry.capital ? currentCountry.capital[0] : 'No capital';

    if (selectedOption === correctAnswer) {
        score += 100;
        document.getElementById('result').innerText = 'Correct!';
    } else {
        score -= 50;
        document.getElementById('result').innerText = `Wrong! The correct answer is ${correctAnswer}.`;
    }

    totalQuestions++;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('question-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', initializeQuiz);
