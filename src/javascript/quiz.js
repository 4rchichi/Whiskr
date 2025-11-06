
const questions = document.querySelectorAll('.quiz-question');
const quizPage = document.querySelector('.quiz-page');
const resultsSection = document.getElementById('quizResults');
const resultImage = document.getElementById('resultImage');
const resultBreedName = document.getElementById('resultBreedName');
const resultBreedDescription = document.getElementById('resultBreedDescription');
const resultBadges = document.getElementById('resultBadges');
const restartBtn = document.getElementById('restartQuiz');

let currentQuestion = 1;
let answers = {};


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


document.querySelectorAll('.answer-card').forEach(card => {
    card.addEventListener('click', function () {
        const answer = this.getAttribute('data-answer');
        const questionNum = this.closest('.quiz-question').getAttribute('data-question');


        answers[questionNum] = answer;


        if (currentQuestion < questions.length) {

            questions[currentQuestion - 1].classList.remove('active');


            currentQuestion++;
            questions[currentQuestion - 1].classList.add('active');
        } else {

            showResults();
        }
    });
});


function showResults() {

    questions.forEach(q => q.classList.remove('active'));


    const answerKey = `${answers['1']}-${answers['2']}-${answers['3']}`;


    const result = breedMatches[answerKey] || breedMatches['default'];


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


    if (quizPage) {
        quizPage.style.display = 'none';
    }


    if (resultsSection) {
        resultsSection.classList.add('active');


        setTimeout(() => {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const resultsTop = resultsSection.offsetTop - headerHeight;
            window.scrollTo({ top: Math.max(0, resultsTop), behavior: 'smooth' });
        }, 100);
    }
}


if (restartBtn) {
    restartBtn.addEventListener('click', function () {

        currentQuestion = 1;
        answers = {};


        if (resultsSection) resultsSection.classList.remove('active');


        if (quizPage) {
            quizPage.style.display = '';
        }


        questions.forEach((q, index) => {
            if (index === 0) {
                q.classList.add('active');
            } else {
                q.classList.remove('active');
            }
        });


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
