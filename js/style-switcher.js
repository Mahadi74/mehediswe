
/* ------------------ toggle style switcher -------------------- */

const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click", () => {
	document.querySelector(".style-switcher").classList.toggle("open");
})

// hide the style switcher on scrolling
window.addEventListener("scroll", () => {
	if(document.querySelector(".style-switcher").classList.contains("open")){
		document.querySelector(".style-switcher").classList.remove("open");
	}
}) 

/* ------------------------- theme colors -------------------------  */ 

const alternateStyles = document.querySelectorAll(".alternate-style");
// console.log(alternateStyles);

function setActiveStyle(color){
	// console.log(color);

	localStorage.setItem("color", color);
	// console.log(localStorage.getItem("color"));
	changeColor();	

}

function changeColor(){
	alternateStyles.forEach((style) => {
		// console.log(style);
		if(localStorage.getItem("color") === style.getAttribute("title")){
			style.removeAttribute("disabled");
		}
		else{
			style.setAttribute("disabled", "true");
		}
	})
}

// checking if color key exists
if(localStorage.getItem("color") !== null){
	// console.log("exists");
	changeColor();
}
else{
	// console.log("Does not exists");
}


/* ------------------------- theme light and dark mode -------------------------  */

const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
	document.body.classList.toggle("dark");
	if(document.body.classList.contains("dark")){
		localStorage.setItem("theme", "dark");
	}
	else{
		localStorage.setItem("theme", "light");
	}
	updateIcon();
})

function themeMode(){
	// checking if 'theme' key exists in local storage
	if(localStorage.getItem("theme") !== null){
		// console.log("exists");
		if(localStorage.getItem("theme") === "light"){
			document.body.classList.remove("dark");
		}
		else{
			document.body.classList.add("dark");
		}
	}
	else{
		// console.log("does not exists");
	}
	updateIcon();
}

themeMode();

function updateIcon(){
	if(document.body.classList.contains("dark")){
		dayNight.querySelector("i").classList.remove("fa-moon");
		dayNight.querySelector("i").classList.add("fa-sun");
	
	}
	else{
		dayNight.querySelector("i").classList.remove("fa-sun");
		dayNight.querySelector("i").classList.add("fa-moon");
	}
}

// window.addEventListener("load", () => {
// 	if(document.body.classList.contains("dark")){
// 		dayNight.querySelector("i").classList.add("fa-sun");
// 	}
// 	else{
// 		dayNight.querySelector("i").classList.add("fa-moon");
// 	}
// })