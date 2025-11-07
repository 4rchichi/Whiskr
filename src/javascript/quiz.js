/* Quiz elements - Selects all DOM elements needed for quiz functionality */
const questions = document.querySelectorAll('.quiz-question');
const quizPage = document.querySelector('.quiz-page');
const resultsSection = document.getElementById('quizResults');
const resultImage = document.getElementById('resultImage');
const resultBreedName = document.getElementById('resultBreedName');
const resultBreedDescription = document.getElementById('resultBreedDescription');
const resultBadges = document.getElementById('resultBadges');
const restartBtn = document.getElementById('restartQuiz');

/* Quiz state - Tracks current question and user answers */
let currentQuestion = 1;
let answers = {};

/* Breed matching - Maps answer combinations to recommended cat breeds */
const breedMatches = {
    'high-social-minimal-grooming-small-apartment': {
        breed: 'Siamese',
        image: '../../images/siamese.jpg',
        description: 'The Siamese is perfect for you! Highly social and vocal, they love interaction and don\'t require extensive grooming. They adapt well to apartment living and will keep you entertained with their playful personality.'
    },
    'medium-activity-moderate-grooming-medium-house': {
        breed: 'Ragdoll',
        image: '../../images/ragdoll.jpg',
        description: 'The Ragdoll is your ideal match! They offer a perfect balance of affection and independence. With moderate grooming needs and a gentle nature, they\'re great companions for a comfortable home.'
    },
    'low-social-minimal-grooming-large-space': {
        breed: 'British Shorthair',
        image: '../../images/britishshorthair.jpg',
        description: 'The British Shorthair suits you perfectly! Independent yet affectionate, they don\'t demand constant attention. Their plush coat requires minimal grooming, and they\'ll love having space to roam.'
    },

    'default': {
        breed: 'Maine Coon',
        image: '../../images/mainecoon.jpg',
        description: 'The Maine Coon is a versatile match for you! Known as gentle giants, they\'re adaptable, friendly, and get along with everyone. They balance playfulness with a calm demeanor.'
    }
};

/* Answer selection - Handles click events on answer cards */
document.querySelectorAll('.answer-card').forEach(card => {
    card.addEventListener('click', function () {
        const answer = this.getAttribute('data-answer');
        const questionNum = this.closest('.quiz-question').getAttribute('data-question');

        /* Stores user's answer */
        answers[questionNum] = answer;

        /* Advances to next question or shows results */
        if (currentQuestion < questions.length) {
            /* Hide current question */
            questions[currentQuestion - 1].classList.remove('active');

            /* Show next question */
            currentQuestion++;
            questions[currentQuestion - 1].classList.add('active');
        } else {
            /* All questions answered - show results */
            showResults();
        }
    });
});

/* Show results - Displays quiz results with breed recommendation */
function showResults() {
    /* Hides all questions */
    questions.forEach(q => q.classList.remove('active'));

    /* Creates answer key from user's selections */
    const answerKey = `${answers['1']}-${answers['2']}-${answers['3']}`;

    /* Gets matching breed or uses default */
    const result = breedMatches[answerKey] || breedMatches['default'];

    /* Populattes result image and breed name */
    if (resultImage) {
        resultImage.src = result.image;
        resultImage.alt = result.breed;
    }
    if (resultBreedName) {
        resultBreedName.textContent = result.breed;
    }
    if (resultBreedDescription) {
        resultBreedDescription.textContent = result.description;
    }

    /* Generattes badges based on user answers */
    if (resultBadges) {
        const badges = [];
        switch (answers['1']) {
            case 'high-social':
                badges.push('Outgoing');
                break;
            case 'medium-activity':
                badges.push('Balanced Energy');
                break;
            case 'low-social':
                badges.push('Independent');
                break;
        }
        switch (answers['2']) {
            case 'minimal-grooming':
                badges.push('Low Grooming');
                break;
            case 'moderate-grooming':
                badges.push('Moderate Grooming');
                break;
        }
        switch (answers['3']) {
            case 'small-apartment':
                badges.push('Apartment Friendly');
                break;
            case 'medium-house':
                badges.push('Home Friendly');
                break;
            case 'large-space':
                badges.push('Loves Space');
                break;
        }

        resultBadges.innerHTML = badges
            .map(label => `<span class="result-badge">${label}</span>`)
            .join('');
    }

    /* Hides quiz page */
    if (quizPage) {
        quizPage.style.display = 'none';
    }

    /* Shows results section and scrolls to it */
    if (resultsSection) {
        resultsSection.classList.add('active');

        /* Smooth scroll to results after brief delay */
        setTimeout(() => {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const resultsTop = resultsSection.offsetTop - headerHeight;
            window.scrollTo({ top: Math.max(0, resultsTop), behavior: 'smooth' });
        }, 100);
    }
}

/* Restart quiz - Resets quiz to initial state and returns to first question */
if (restartBtn) {
    restartBtn.addEventListener('click', function () {
        /* Resets quiz state */
        currentQuestion = 1;
        answers = {};

        /* Hides results section */
        if (resultsSection) resultsSection.classList.remove('active');

        /* Shows quiz page */
        if (quizPage) {
            quizPage.style.display = '';
        }

        /* Resets all quesstions to initial state */
        questions.forEach((q, index) => {
            if (index === 0) {
                q.classList.add('active');
            } else {
                q.classList.remove('active');
            }
        });

        /* Smooth scroll back to quiz */
        setTimeout(() => {
            if (quizPage) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const quizTop = quizPage.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: quizTop, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);
    });
}
