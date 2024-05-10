document.querySelector('#btn-menu').addEventListener("click", toggleMenu);
document.querySelector("#darkMode").addEventListener("click", darkMode);

function toggleMenu() {

    document.querySelector(".navigation").classList.toggle("show");
}

function darkMode() {
    document.querySelector("#icon").src = "images/LogoD.jpg"
    document.querySelector("#menuBtn").src = "images/menuBtnD.png"
    document.querySelector("#fondo").classList.toggle("darkBack")
    document.querySelector(".menu").classList.toggle("darkMenu")
    document.querySelector("h1").classList.toggle("darkLetters")
    document.querySelector("main").classList.toggle("darkLetters")
    
}

