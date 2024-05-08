document.querySelector('#btn-menu').addEventListener("click", toggleMenu);


function toggleMenu(){

    document.querySelector(".navigation").classList.toggle("show");
}

document.querySelector("#darkMode").addEventListener("click", darkMode);
function darkMode(){
 document.querySelector("#fondo").classList.toggle("darkBack")
 document.querySelector(".menu").classList.toggle("darkMenu")
 document.querySelector("h1").classList.toggle("darkLetters")
 document.querySelector(".aboutUs").classList.toggle("darkLetters")
/*NO SE APLICAN*/
 document.querySelector(".content").classList.add("darkLetters")
 document.querySelector("#menuBtn").src="images/menuBtnD.png"
 document.querySelector("#icon").src="images/LogoD.png"
 
}