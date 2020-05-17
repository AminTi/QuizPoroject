let btn = document.querySelector(".Categories")
let li = document.querySelectorAll(".categories_list-item")
let wrapper = document.querySelector(".wrapper")
let wrapperBtn = document.querySelector(".wrapperBtn")
let quizDiv = Array.from(document.querySelectorAll(".quizDiv"))
let question = document.querySelector(".question")
let subWrapper = document.querySelector(".subWrapper")
let progressBArfull = document.querySelector(".progressBArfull")
let bonusCounter = document.querySelector(".bonusCounter")
let wrapper_Category = document.querySelector(".wrapper_Category")

let acceptingAnswers = true
let score = 0
let counter = 1
let availabelQuestions = []
let bonus = 10
let maxQuestions = 10
let countClick = 0

async function getCountry(categorie) {
    let res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${categorie}&difficulty=medium&type=multiple`
    )
    return res.json()
}
for (let i = 0; i < li.length; i++) {
    const BtnLi = li[i]
    getlistValue(BtnLi)
}

function getlistValue(elm) {
    elm.addEventListener("click", function (e) {
        let categorie = e.target.textContent
        if (categorie === "Sports") {
            categorie = "21"
        } else if (categorie === "History") {
            categorie = "23"
        } else {
            categorie = "9"
        }
        getCountry(categorie).then((data) => {
            updateUi(data)
        })
        toggleClasses()
        hideList()
    })
}

function updateUi(data) {
    let result = data.results
    let i = 0
    wrapperBtn.addEventListener("click", function (e) {
        popUp(countClick++)
        if (i < result.length) {
            const elm = result[i++]
            ChangeBtnInnerText(e)
            getData(elm)
            disabledTarget()
            progressBarCounter(counter++)

        }
    })
}

disabledTarget = () => {
    for (let i = 0; i < quizDiv.length; i++) {
        const element = quizDiv[i]
        wrapperBtn.disabled = true
        element.disabled = false
    }
}

function myFunction() {
    var uri = "McDonald&#039;s";
    var uri_enc = encodeURIComponent(uri);
    var uri_dec = decodeURIComponent(uri_enc);
    var res = "Encoded URI: " + uri_enc + "<br>" + "Decoded URI: " + uri_dec;
    document.getElementById("demo").innerHTML = res;
}

getData = (elm) => {
    let parser = new DOMParser;
    let dom = parser.parseFromString(
        '<!doctype html><body>' + elm.question, 'text/html');
    let decodedString = dom.body.textContent;

    let answer1 = parser.parseFromString(
        '<!doctype html><body>' + elm.incorrect_answers[0], 'text/html');
    let answer2 = parser.parseFromString(
        '<!doctype html><body>' + elm.incorrect_answers[1], 'text/html');
    let answer3 = parser.parseFromString(
        '<!doctype html><body>' + elm.incorrect_answers[2], 'text/html');
    let correctAnswer = parser.parseFromString(
        '<!doctype html><body>' + elm.correct_answer, 'text/html');

    wrapper_Category.textContent = elm.category
    question.textContent = decodedString
    quizDiv[0].textContent = answer1.body.textContent
    quizDiv[1].textContent = answer2.body.textContent
    quizDiv[2].textContent = answer3.body.textContent
    quizDiv[3].textContent = correctAnswer.body.textContent

    for (let i = 0; i < quizDiv.length; i++) {
        subWrapper.appendChild(
            quizDiv[Math.floor(Math.random() * quizDiv.length)]
        )
    }
    prepareEvent(elm)
}

prepareEvent = (elm) => {
    quizDiv.forEach((choice) => {
        choice.addEventListener("click", function (e) {
            wrapperBtn.disabled = false
            let eventTarget = e.target
            executeColors(eventTarget, elm)
        })
        choice.style.background = "rgb(221, 219, 219)"
        choice.style.color = "black"
    })
}

executeColors = (eventTarget, elm) => {
    if (eventTarget.textContent === elm.correct_answer) {
        eventTarget.style.background = "green"
        eventTarget.style.color = "white"
        countBonus(bonus)
        disabledEvents()
    } else {
        eventTarget.style.background = "red"
        eventTarget.style.color = "white"
        disabledEvents()
    }
}

disabledEvents = () => {
    for (let i = 0; i < quizDiv.length; i++) {
        const element = quizDiv[i]
        element.disabled = true
    }
}
toggleClasses = () => {
    wrapperBtn.textContent = "Start"
}

ChangeBtnInnerText = (e) => {
    if (e.target.textContent === "Start") {
        e.target.textContent = "Next"
        let loader = document.getElementById("loader")
        loader.style.display = "none"
        question.style.visibility = "visible"
        for (let i = 0; i < quizDiv.length; i++) {
            quizDiv[i].style.visibility = "visible"
        }
    }
}

progressBarCounter = (counter) => {
    progressBArfull.style.width = `${(counter / maxQuestions) * 100}%`
}

countBonus = (num) => {
    score += num
    bonusCounter.innerText = `Score: ${score}`
}

hideList = () => {
    for (let i = 0; i < li.length; i++) {
        let listItem = li[i]
        listItem.style.display = "none"
    }
    btn.textContent = "Restart"
    btn.addEventListener("click", function () {
        if ((btn.innerText = "Restart")) {
            location.reload()
        }
    })
}

let popup = document.querySelector(".popup")
let popUpScore = document.querySelector(".popUpScore")
let popuUpBtn = document.querySelector(".popupBtn")

popUp = (countClick) => {
    if (countClick == maxQuestions) {
        popup.style.display = "block"
        popUpScore.textContent = bonusCounter.textContent.slice(7)
        popuUpBtn.addEventListener("click", function (e) {
            location.reload()
        })
    }
}