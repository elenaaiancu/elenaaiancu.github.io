async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data.filter(country => country.region === 'Europe');
}

let countries = [];
let currentCountry = null;
let score = 0;
let totalQuestions = 0;
let answered = false;

async function initializeQuiz() {
    countries = await fetchCountries();
    nextQuestion();
}

function nextQuestion() {
    answered = false;
    const nextButton = document.getElementById('next-button');
    nextButton.classList.remove('enabled');
    nextButton.classList.add('disabled');
    nextButton.disabled = true;

    const index = Math.floor(Math.random() * countries.length);
    currentCountry = countries[index];
    const correctCapital = currentCountry.capital ? currentCountry.capital[0] : 'No capital';

    let incorrectCapitals = [];
    while (incorrectCapitals.length < 3) {
        const randomIndex = Math.floor(Math.random() * countries.length);
        const randomCountry = countries[randomIndex];
        const randomCapital = randomCountry.capital ? randomCountry.capital[0] : null;
        if (randomCapital && randomCapital !== correctCapital && !incorrectCapitals.includes(randomCapital)) {
            incorrectCapitals.push(randomCapital);
        }
    }

    let options = [...incorrectCapitals, correctCapital];
    options = options.sort(() => Math.random() - 0.5);

    document.getElementById('country-nameeu').innerText = `What is the capital of ${currentCountry.name.common}?`;
    options.forEach((option, index) => {
        const button = document.getElementById(`option${index + 1}`);
        button.innerText = option;
        button.disabled = false;
        button.onclick = () => checkAnswer(option);
    });
    document.getElementById('question-container2').classList.remove('hidden');
    document.getElementById('result-container2').classList.add('hidden');
}

function checkAnswer(selectedOption) {
    if (answered) return;
    answered = true;

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
    document.getElementById('question-container2').classList.add('hidden');
    document.getElementById('result-container2').classList.remove('hidden');

    const nextButton = document.getElementById('next-button');
    nextButton.classList.add('enabled');
    nextButton.classList.remove('disabled');
    nextButton.disabled = false;
}

document.addEventListener('DOMContentLoaded', initializeQuiz);
