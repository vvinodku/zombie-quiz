const questions = [

    {
        question: "The outbreak begins while you're at home. What's your first move?",
        answers: [
            "Immediately barricade the doors and booby trap your house",
            "Raid the nearest grocery store for supplies",
            "Call your family",
            "Google 'what to do during zombie apocalypse'",
            "Honestly? Go back to sleep and deal with it later"
        ]
    },

    {
        question: "You encounter a group of survivors. What's your role?",
        answers: [
            "Leader",
            "Medic",
            "Scavenger",
            "Morale officer",
            "Person who keeps asking 'wait, where are we going?'"
        ]
    },

    {
        question: "You need to get across a city full of zombies. Which route are you taking?",
        answers: [
            "The highway",
            "Underground",
            "Rooftops",
            "Back alleys",
            "Whatever route has the best restaurants"
        ]
    },

    {
        question: "You hear a strange noise coming from the basement. What do you do?",
        answers: [
            "Investigate",
            "Leave immediately",
            "Send someone else",
            "Make a weapon first",
            "Chill out where you are and hope it goes away"
        ]
    },

    {
        question: "You find an abandoned grocery store. You can only choose one item, what are you grabbing?",
        answers: [
            "Canned food",
            "Water",
            "Batteries",
            "Medicine",
            "Chocolate",
            "Beer"
        ]
    },

    {
        question: "What's your greatest asset in a zombie apocalypse?",
        answers: [
            "Physical strength",
            "Intelligence",
            "Resourcefulness",
            "Charisma",
            "Dumb luck"
        ]
    },

    {
        question: "Your group has one car, but it only has room for four people.",
        answers: [
            "Pick the four most useful people",
            "Draw names",
            "Fight for a spot",
            "Advocate for the most vulnerable",
            "Steal the car and figure it out later"
        ]
    },

    {
        question: "A zombie is approaching and you have no weapons. Your strategy is:",
        answers: [
            "Run",
            "Hide",
            "Climb",
            "Fight",
            "Somehow convince it we're friends (they're misunderstood)"
        ]
    },

    {
        question: "You have seconds to grab one of these things before leaving your house. What are you taking?",
        answers: [
            "Backpack with food and water",
            "A first aid kit",
            "Your phone",
            "Your drink",
            "Something completely useless but emotionally important"
        ]
    },

    {
        question: "You have to choose one weapon.",
        answers: [
            "Baseball bat",
            "Crossbow",
            "Katana",
            "Purse",
            "Fist"
        ]
    }

];


const partners = [
    
    {
        name: "Gordon Ramsay",
        image: "images/gordon.jpeg"
    },

    {
        name: "Sidney Prescott",
        image: "images/sidney.jpeg"
    },

    {
        name: "Billionaire",
        image: "images/bill.jpeg"
    },

    {
        name: "Your Boyfriend?",
        image: "images/vaishakh.jpeg"
    },

    {
        name: "Ben Johnson",
        image: "images/ben.jpeg"
    },

    {
        name: "Shaun of the Dead",
        image: "images/shaun.jpeg"
    },

    {
        name: "Charliiiize Theron",
        image: "images/charlize.jpeg"
    },

    {
        name: "Bad Bunny",
        image: "images/bad.jpeg"
    }

];


let selectedPartner = null;

let currentQuestion = 0;

let answersChosen = [];



function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

}



function startQuiz() {

    currentQuestion = 0;

    answersChosen = [];

    selectedPartner = null;

    showScreen("quiz");

    displayQuestion();

}



function displayQuestion() {

    const q = questions[currentQuestion];

    document.getElementById("question-number").textContent =
        `QUESTION ${currentQuestion + 1}`;

    document.getElementById("question-counter").textContent =
        `${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("question-text").textContent =
        q.question;

    document.getElementById("progress").style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    const answerContainer = document.getElementById("answers");

    answerContainer.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer";

        button.textContent = answer;

        button.onclick = () => chooseAnswer(index);

        answerContainer.appendChild(button);

    });

}



function chooseAnswer(index) {

    answersChosen.push(index);

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        showLoading();

    } else {

        displayQuestion();

    }

}



function showLoading() {

    showScreen("loading");

    const progress = document.getElementById("loading-progress");

    const text = document.getElementById("loading-text");

    const messages = [

        "Consulting survival experts...",
        "Analyzing your fight-or-flight response...",
        "Calculating snack requirements...",
        "Simulating zombie encounters...",
        "Checking Twitter...",
        "Ignoring statistical errors...",
        "Finalizing results..."

    ];

    let step = 0;

    progress.style.width = "0%";

    text.textContent = messages[0];

    const interval = setInterval(() => {

        step++;

        progress.style.width =
            `${(step / messages.length) * 100}%`;

        if (step < messages.length) {
            text.textContent = messages[step];
        }

        if (step >= messages.length) {

            clearInterval(interval);

            setTimeout(showPartnerQuestion, 400);

        }

    }, 450);

}



/*
    NEW:
    Instead of going straight to the results,
    the loading screen now leads to the partner question.
*/

function showPartnerQuestion() {
    showScreen("partner-screen");
    createPartnerOptions();
}



function createPartnerOptions() {

    const container = document.getElementById("partner-options");

    const continueButton =
        document.getElementById("partner-continue");

    // Hide continue button until a partner is selected
    continueButton.classList.add("hidden");

    selectedPartner = null;

    // Shuffle the options
    // const shuffled = [...partners].sort(
    //     () => Math.random() - 0.5
    // );
    const shuffled = partners;

    container.innerHTML = "";

    shuffled.forEach(partner => {

        const button = document.createElement("button");

        button.className = "partner-card";

        button.innerHTML = `
            <img
                src="${partner.image}"
                alt="${partner.name}"
            >
            <span class="partner-name">
                ${partner.name}
            </span>
        `;

        button.addEventListener("click", () => {

            // Remove previous selection
            document.querySelectorAll(".partner-card").forEach(card => {
                card.classList.remove("selected");
            });

            // Select this partner
            button.classList.add("selected");

            selectedPartner = partner;

            // Show continue button
            continueButton.classList.remove("hidden");

        });

        container.appendChild(button);

    });

}



/*
    Partner Continue button:
    Partner question → Results
*/

document.getElementById("partner-continue").addEventListener("click", () => {

    if (!selectedPartner) {
        return;
    }

    showResult();

});



function showResult() {

    // Generates a somewhat randomized but repeatable-ish score
    // based on the answers.

    const answerTotal = answersChosen.reduce(
        (sum, answer) => sum + answer,
        0
    );

    const score = 93

    document.getElementById("survival-score").textContent =
        score;

    document.getElementById("brains").textContent =
        Math.min(99, score + 3);

    document.getElementById("running").textContent =
        Math.max(40, score - 3);

    document.getElementById("snacks").textContent =
        Math.min(99, score + 10);

    document.getElementById("result-description").textContent =
        getResultDescription(score);

    showScreen("result");

}



function getResultDescription(score) {

    if (score >= 90) {

        return "Your excellent choice in partner and quick thinking would give you great odds of being chill during a zombie apocalypse.";

    }

    if (score >= 75) {

        return "Pretty good. You'd probably survive long enough to become the leader of a small, strangely snack-focused survivor colony.";

    }

    if (score >= 60) {

        return "Not bad. You'd survive, although several decisions would later be described as 'bold.'";

    }

    return "Honestly, you're probably going to need a very competent partner.";

}



/*
    This is now ONLY used if you want to do
    something with the selected partner later.

    The partner question itself no longer replaces
    the results screen.
*/

function choosePartner(partner) {

    selectedPartner = partner;

}



/*
    Results → Final Question
*/

function showFinalQuestion() {

    showScreen("final");

}



function yesClicked() {

    document.querySelector(".final-reveal").innerHTML = `

        <div class="big-emoji">
            🥰
        </div>

        <h1>
            Excellent.
        </h1>

        <p>
            The scientific community has reached a unanimous conclusion:
            we are now a team.
        </p>

    `;

}
