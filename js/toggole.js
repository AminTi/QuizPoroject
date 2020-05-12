let fabars = document.querySelector(".fa-bars")
let nav_container = document.querySelector(".nav_container")

fabars.addEventListener("click", function () {
    if (nav_container.style.visibility === "hidden") {
        nav_container.style.visibility = "visible"
        return false
    }
    nav_container.style.visibility = "hidden"
    return true
})


let ul = document.querySelector(".main_categorie-list")

let CategorieContainer = document.querySelector(".main_Categorie-container")

CategorieContainer.addEventListener("click", function () {

    if (ul.style.visibility === "hidden") {
        ul.style.visibility = "visible"
        return false
    }
    ul.style.visibility = "hidden"
    return true
})