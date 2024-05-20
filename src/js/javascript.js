document.querySelector('#btn-menu').addEventListener("click", toggleMenu);
document.querySelector("#darkMode").addEventListener("click", darkMode);
document.querySelector("form").addEventListener("submit", captchaCheck);
let captchArreglo = ['jk5lf', 'h1y4s', 'd3toa', 'rg7eb']
let indice = (Math.floor(Math.random() * 4) + 0);
document.querySelector("#captchaImg").src = "images/captcha" + indice + ".png";

function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("show");
}

function captchaCheck(e) {
    e.preventDefault();
    let flag = false;
    let captchaInput = document.querySelector("#inputCaptcha").value.toLowerCase();
    if (captchaInput == captchArreglo[indice])
        flag = true;
    else
        flag = false;

    let message = document.querySelector("#msg")
    document.querySelector(".captcha").appendChild(message);
    if (flag) {
        message.innerHTML = "Message has been sent successfully!";
        message.classList.remove("msgWrong");
        message.classList.add("msgOk");
    } else {
        message.innerHTML = "Message could not be sent. Check captcha input.";
        message.classList.remove("msgOK");
        message.classList.add("msgWrong");
        indice = (Math.floor(Math.random() * 4) + 0);
        document.querySelector("#captchaImg").src = "images/captcha" + indice + ".png";
    }
}

function darkMode() {
    
    let dmButton = document.querySelector("#darkMode")
    console.log(dmButton.value)
    if (dmButton.src.includes("images/darkModeOff.png"))
        dmButton.src = "images/darkModeOn.png"
    else
        dmButton.src = "images/darkModeOff.png"
    document.querySelector("#icon").classList.toggle("darkImg");
    document.querySelector("#menuBtn").classList.toggle("darkImg");
    document.querySelector("#fondo").classList.toggle("darkBack");
    document.querySelector(".menu").classList.toggle("darkMenu");
    document.querySelector("h1").classList.toggle("darkLetters");
    document.querySelector("main").classList.toggle("darkLetters");
    document.querySelector("table").classList.toggle("darkTable");
    let tableLinesCell = document.querySelectorAll("td")
    let tableLinesRow = document.querySelectorAll("tr")
    tableLinesCell.forEach(e => {
        e.classList.toggle("darkTable");
    })
    tableLinesRow.forEach(e => {
        e.classList.toggle("darkTable");
    })
    document.querySelector("tr").classList.toggle("darkTable");
}


