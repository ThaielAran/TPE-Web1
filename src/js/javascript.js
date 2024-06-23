document.querySelector('#btn-menu').addEventListener("click", toggleMenu);
document.querySelector("#darkMode").addEventListener("click", darkMode);
loadPage("home.html")


                                                                            //event listener for all html partial  render
document.querySelector("#contact").addEventListener("click", (e) => {
    e.preventDefault()
    loadPage("contact.html")
});
document.querySelector("#aboutUs").addEventListener("click", (e) => {
    e.preventDefault()
    loadPage("aboutus.html")
});
document.querySelector(".icon").addEventListener("click", (e) => {
    e.preventDefault()
    loadPage("home.html")
});
document.querySelector("#products").addEventListener("click", (e) => {
    e.preventDefault()
    loadPage("products.html")
});

function toggleMenu() {                                                     //shows or hides navigation menu
    document.querySelector(".navigation").classList.toggle("show");
}

let captchArreglo = ['jk5lf', 'h1y4s', 'd3toa', 'rg7eb'];
let indice = (Math.floor(Math.random() * 4) + 0);
function captchaCheck(e) {                                                  //checks if input value matches with captcha,
    e.preventDefault();                                                     //which is stored in an array (name and index point to img)
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

function darkMode() {                                                       //modifies classes on elements to bring a dark or light style

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

function loadPage(htmlLoad) {                                               //fetches an html and if response is ok calls processText
    fetch(htmlLoad).then(function (response) {                              //to add it to the dom
        if (response.ok) {
            response.text().then(processText)
        }
    }).catch(error => {
        console.log(error)
    })


}

function processText(t) {                                                   //processes fetched html into the dom and calls addBtnEvent
    let container = document.querySelector("#use-ajax")
    container.innerHTML = t
    addBtnEvent(t);
}

function addBtnEvent(t) {                                                   //adds events to buttons depending on which html is loaded
    let container = document.querySelector("#use-ajax")                     
    if (t.includes("captcha")) {
        container.querySelector("#captchaImg").src = "images/captcha" + indice + ".png";
        container.querySelector("#contactForm").addEventListener("submit", captchaCheck);
    } else {
        show_products();
        container.querySelector("#new").addEventListener("click", () => {
            createForm = container.querySelector("#create")
            createForm.classList.toggle("hidden")                           //form is shown when new is clicked
            createForm.classList.toggle("show")
            createForm.addEventListener('submit', create_product);
        })
    }

}

