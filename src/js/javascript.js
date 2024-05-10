document.querySelector('#btn-menu').addEventListener("click", toggleMenu);
document.querySelector("#darkMode").addEventListener("click", darkMode);

let captchArreglo = ['jk5lf','h1y4s','d3toa','rg7eb']
let indice=(Math.floor(Math.random() * 4) + 0);
document.querySelector("#captchaImg").src="images/captcha" + indice + ".png";
document.querySelector("#sbmtBtn").addEventListener("click", captchaCheck) 

function toggleMenu() {

    document.querySelector(".navigation").classList.toggle("show");
}

function darkMode() {
    document.querySelector("#icon").classList.toggle("darkImg")
    document.querySelector("#menuBtn").classList.toggle("darkImg")
    document.querySelector("#fondo").classList.toggle("darkBack")
    document.querySelector(".menu").classList.toggle("darkMenu")
    document.querySelector("h1").classList.toggle("darkLetters")
    document.querySelector("main").classList.toggle("darkLetters")
    
}

function captchaCheck(){
    let flag= false;
    let captchaInput=document.querySelector("#inputCaptcha").value.toLowerCase()
    if(captchaInput == captchArreglo[indice])
            flag=true;
        else
            flag=false

    let message = document.createElement("div");
    document.querySelector(".captcha").appendChild(message)
    if(flag){
        message.innerHTML="Message has been sent successfully!"
        message.classList.add("msgBueno")
    }else{
        message.innerHTML="Message could not be sent. Check captcha input."
        message.classList.add("msgMalo")
    }
}
