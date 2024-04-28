document.addEventListener("DOMContentLoaded", function() {
    // Functionality 1
    quizGame();
    setupQuizButton();
    setupVisibilityToggles();
        initializeSwiper();
});



function quizGame() {
    const quizLink = document.querySelector('.action-call a');
    const quizContainer = document.createElement('div');
    const actionCallDiv = document.querySelector('.action-call');
    quizContainer.id = 'quiz';
    quizContainer.style.padding = '15px';
    quizContainer.style.marginTop = '40px';
    quizContainer.style.marginBottom = '120px';
    quizContainer.style.border = '1px solid #ccc';
    quizContainer.style.borderRadius = '8px';
    quizContainer.style.backgroundColor = '#f9f9f9';
    quizContainer.style.display = 'none';
    quizLink.parentNode.insertBefore(quizContainer, quizLink.nextSibling);
    
 

    const questions = [
        { question: "What year was the first Earth Day celebrated?", options: ["1960", "1970", "1980", "1990"], answer: "1970" },
        { question: "Which animal is often used as a symbol of conservation?", options: ["Panda", "Lion", "Elephant", "Rhino"], answer: "Panda" },
        { question: "How much of the Earth's surface is covered by oceans?", options: ["50%", "60%", "70%", "80%"], answer: "70%" },
        { question: "What gas do trees absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
        { question: "What is the main benefit of reducing plastic waste?", options: ["Save energy", "Reduce pollution", "Increase biodiversity", "All of the above"], answer: "All of the above" }
    ];
    let currentQuestion = 0;
    let correctAnswers = 0;

    function showQuestion() {
        quizContainer.innerHTML = `<div>${questions[currentQuestion].question}</div>
            <div style="margin-top: 10px;">` +
            questions[currentQuestion].options.map(option =>
                `<button style="background-color: #4CAF50; border: none; color: white; padding: 10px 20px; margin: 5px; cursor: pointer; border-radius: 4px; box-shadow: none;"
                onclick="selectAnswer('${option}')">${option}</button>`
            ).join('') + '</div>';
    }

    window.selectAnswer = (answer) => {
        const nextButton = `<button style="background-color: #4CAF50; border: none; color: white; padding: 10px 20px; margin-top: 10px; cursor: pointer; border-radius: 4px;" onclick="nextQuestion()">Next Question</button>`;
        const retryButton = `<button style="background-color: red; border: none; color: white; padding: 10px 20px; margin-top: 10px; cursor: pointer; border-radius: 4px;" onclick="restartQuiz()">Try Again</button>`;
        
        if (answer === questions[currentQuestion].answer) {
            correctAnswers++;
            alert("Correct!");
            quizContainer.innerHTML += currentQuestion < questions.length - 1 ? nextButton : '';
        } else {
            alert("Wrong answer.");
            quizContainer.innerHTML += retryButton;
        }

        if (currentQuestion === questions.length - 1 && correctAnswers === questions.length) {
            quizContainer.innerHTML = `<h3>Congratulations! 🏆</h3>
            <p>You have answered all questions correctly!</p>`;
        }
    };

    window.nextQuestion = () => {
        currentQuestion++;
        showQuestion();
    };

    window.restartQuiz = () => {
        currentQuestion = 0;
        correctAnswers = 0;
        showQuestion();
    };

    quizLink.addEventListener('click', function(event) {
        event.preventDefault();
        quizContainer.style.display = 'block';
        actionCallDiv.style.marginTop = '152px';
        showQuestion();
    });
}

function setupQuizButton() {
    const quizLink = document.querySelector('.action-call a');
    if (quizLink) {
        // Insert an icon before the existing text without overwriting innerHTML
        quizLink.insertAdjacentHTML('afterbegin', '<i class="fa fa-question-circle"></i> ');

        // Add a class for styling
        quizLink.classList.add('quiz-button');

        // Ensure the parent div is styled for centering
        const actionCallDiv = quizLink.parentElement;
        actionCallDiv.style.display = 'flex';
        actionCallDiv.style.justifyContent = 'center';
        actionCallDiv.style.alignItems = 'center';
        actionCallDiv.style.height = '100px';  // Set a height if needed
    }
}

function setupVisibilityToggles() {
    const articles = document.querySelectorAll('section article');
    if (articles.length >= 2) {
        articles[0].id = 'first-article';  // Assign ID to the first article
        articles[1].id = 'second-article'; // Assign ID to the second article
    }
}

function initializeSwiper() {
    // Find the <ul> within the specific article about how you can help
    const helpList = document.querySelector('article > ul');
    const helpSection = helpList.parentNode;

    // Create a new div for the swiper, and replace the <ul> with it
    const swiperContainer = document.createElement('div');
    swiperContainer.className = 'swiper';

    const slidesData = [
        {
            title: "Reduce, reuse, and recycle",
            content: "Minimizing waste can significantly reduce environmental impact. Practice recycling materials and reusing items whenever possible.",
            bgImage: "url('https://i.imgur.com/rVVYreK.jpeg')"
        },
        {
            title: "Volunteer for cleanups in your community",
            content: "Join local efforts to clean up rivers, parks, and streets to help enhance your community's environmental health.",
            bgImage: "url('https://i.imgur.com/mc6Tfvv.jpeg')"
        },
        {
            title: "Conserve water and electricity",
            content: "Reducing your consumption of water and energy reduces your carbon footprint and saves resources.",
            bgImage: "url('https://i.imgur.com/zWuTAIH.jpeg')"
        },
        {
            title: "Plant a tree",
            content: "Trees provide oxygen, improve air quality, conserve water, preserve soil, and support wildlife.",
            bgImage: "url('https://i.imgur.com/mjpOqZS.jpeg')"
        },
        {
            title: "Educate others about environmental conservation",
            content: "Spreading awareness and educating people about environmental issues is crucial for global change.",
            bgImage: "url('https://i.imgur.com/TmBLXYS.jpeg')"
        }
    ];

    let slidesHTML = '<div class="swiper-wrapper">';
    slidesData.forEach(slide => {
        slidesHTML += `
            <div class="swiper-slide" style="background-image: ${slide.bgImage}; background-size: cover; background-position: center;">
                <h3>${slide.title}</h3>
                <p>${slide.content}</p>
            </div>
        `;
    });
    slidesHTML += '</div><div class="swiper-pagination"></div>';
    swiperContainer.innerHTML = slidesHTML;

    // Replace the <ul> with the swiper container
    helpSection.replaceChild(swiperContainer, helpList);

    // Initialize Swiper
    // Check if swiper is not already initialized to prevent multiple instances
    if (!window.swiperInstance) {
        window.swiperInstance = new Swiper('.swiper', {
            effect: "cube",
            grabCursor: true,
            cubeEffect: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 5000,  // Delay of 5 seconds between slides
                disableOnInteraction: false  // Autoplay will not stop after interactions
            },
        });
    }
}


window.addEventListener('scroll', function() {
    var testimonial = document.querySelector('.testimonial');
    var position = testimonial.getBoundingClientRect();
    
    // Check if testimonial is within the viewport
    if(position.top < window.innerHeight && position.bottom >= 0) {
        testimonial.classList.add('visible');
    }
});

