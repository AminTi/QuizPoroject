let btn = document.querySelector(".Categories")
let li = document.querySelectorAll(".categories_list-item")
let wrapper = document.querySelector(".wrapper")
let wrapperBtn = document.querySelector(".wrapperBtn")

let answer1 = document.querySelector(".answer1")
let answer2 = document.querySelector(".answer2")
let answer3 = document.querySelector(".answer3")
let answer4 = document.querySelector(".answer4")
let wrapper_Category = document.querySelector(".wrapper_Category")
let question = document.querySelector(".question")
let subWrapper = document.querySelector(".subWrapper")



let choices = Array.from(document.getElementsByClassName("quizDiv"))

let currentQuestion = {}
let acceptingAnswers = false
let score = 0;
let questionCounter = 0;
let availabelQuestions = []


let questions = [{
        question: "Il s'apple comment le roi du Maroc",
        choice1: "Mohamed 6",
        choice2: "Amin 2",
        choice3: "Abdellah Titi",
        choice4: "Mohamed 5",
        answer: 1
    },
    {
        question: " la plus grand ville du Maroc",
        choice1: "Kenitra",
        choice2: "Casablanca",
        choice3: "Rabat",
        choice4: "Sale",
        answer: 2

    }, {
        question: "La capitale de la suede",
        choice1: "Göteborg",
        choice2: "Kalmar",
        choice3: "Stockholm",
        choice4: "Malmö",
        answer: 3,
    },
]

let bonus = 10;
let maxQuestions = 3


function startGame() {
    score = 0;
    questionCounter = 0;
    availabelQuestions = [...questions]
    getNewquestion()
}


function getNewquestion() {

    if (availabelQuestions.length === 0 || questionCounter >= maxQuestions) {

        return window.location.assign("/end.html")

    }
    questionCounter++
    const index = Math.floor(Math.random() * availabelQuestions.length)
    currentQuestion = availabelQuestions[index]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]

    });

    availabelQuestions.splice(index, 1)
    acceptingAnswers = true

}



choices.forEach(choice => {
    choice.addEventListener("click", function (e) {
        if (!acceptingAnswers) return;
        acceptingAnswers = false
        const selectChoice = e.target
        const selecAnswers = selectChoice.dataset["number"]

        console.log(selecAnswers)

        const classToapply = selecAnswers == currentQuestion.answer ? "correct" : "incorrect"
        selectChoice.classList.add(classToapply)

        setTimeout(() => {
            selectChoice.classList.remove(classToapply)
            getNewquestion()

        }, 2000);

    })
});
startGame()