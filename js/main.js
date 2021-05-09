
/* -------------------- Navigation menu -------------------- */

(() => {

	const hamburgerBtn = document.querySelector(".hamburger-btn"),
		navMenu = document.querySelector(".nav-menu"),
		closeNavBtn = navMenu.querySelector(".close-nav-menu");

		hamburgerBtn.addEventListener("click", showNavMenu);
		closeNavBtn.addEventListener("click", hideNavMenu);

		function showNavMenu(){
			navMenu.classList.add("open");
			bodyScrollingToggle();
		}

		function hideNavMenu(){
			navMenu.classList.remove("open");
			fadeOutEffect();
			bodyScrollingToggle();
		} 

		function fadeOutEffect(){
			document.querySelector(".fade-out-effect").classList.add("active");
			setTimeout(() => {
				document.querySelector(".fade-out-effect").classList.remove("active");
			
			}, 300)
		}

		// attach an event handler to document
		document.addEventListener("click", (event) => {
			// console.log(event.target);
			if(event.target.classList.contains('link-item')){
				// console.log("event.target contains 'link-item' class");
				// console.log(event.target.hash);
				/* make sure event.target.hash has a value before overriding default behaviour */ 
				if(event.target.hash !==""){
					// prevent default anchor click behaviour
					event.preventDefault()
					const hash = event.target.hash;
					// deactivate existing active 'section'
					document.querySelector(".section.active").classList.add("hide");
					document.querySelector(".section.active").classList.remove("active");
					// activate new 'section'
					document.querySelector(hash).classList.add("active");
					document.querySelector(hash).classList.remove("hide");
					/* deactivate existing active Navigation menu 'link-item' */
					navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
					navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
					/* if clicked 'link-item' is contained within the navigation menu */ 
					if(navMenu.classList.contains("open")){
						// activate new Navigation menu 'link-item'
						event.target.classList.add("active", "inner-shadow");
						event.target.classList.remove("outer-shadow", "hover-in-shadow");
						// hide Navigation menu
						hideNavMenu();
					}
					else{
						let navItems = navMenu.querySelectorAll(".link-item");
						navItems.forEach((item) => {
							if(hash === item.hash){
								// activate the navigation menu 'link-item'
								item.classList.add("active", "inner-shadow");
								item.classList.remove("outer-shadow", "hover-in-shadow");
							}
						})
						fadeOutEffect();
					}
					// add hash(#) to url
					window.location.hash = hash;
				}
			}
			else{
				// console.log("event.target does not contain 'link-item' class");
			}
		})

})();





/* -------------------- About Section tabs -------------------- */
(() =>{
		// console.log('Hello World!');
		const aboutSection = document.querySelector(".about-section"),
			tabsContainer = document.querySelector(".about-tabs");
			tabsContainer.addEventListener("click", (event) => {
				/* if event.target contains 'tab-item' class and not contains 'active' class */ 
				if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")){
					/* console.log("event.target contains 'tab-item' class and not contains 'active' class ");
					console.log(event.target); */
					const target = event.target.getAttribute("data-target");
					// console.log(target);
					// deactivate existing active 'tab-item'
					tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
					// activate new 'tab-item'
					event.target.classList.add("active", "outer-shadow");
					// deactivate existing active 'tab-content'
					aboutSection.querySelector(".tab-content.active").classList.remove("active");
					// activate the 'tab-content'
					// console.log(aboutSection.querySelector(target));
					aboutSection.querySelector(target).classList.add("active"); 
				}
			})
})();


function bodyScrollingToggle(){
	document.body.classList.toggle("hidden-scrolling");
}


/* ------------------------ Portfolio filter and popup -------------------------*/
(() => {

	const filterContainer = document.querySelector(".portfolio-filter"),
		portfolioItemsContainer = document.querySelector(".portfolio-items"),
		portfolioItems = document.querySelectorAll(".portfolio-item"),
		popup = document.querySelector(".portfolio-popup"),
		prevBtn = popup.querySelector(".pp-prev"),
		nextBtn = popup.querySelector(".pp-next"),
		closeBtn = popup.querySelector(".pp-close"),
		projectDetailsContainer = popup.querySelector(".pp-details"),
		projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
		let itemIndex, slideIndex, screenshots;

		/* filter portfolio items */
		filterContainer.addEventListener("click", (event) => {
			// console.log(event.target);
			if(event.target.classList.contains("filter-item") && !event.target.classList.contains("active")){
				// console.log("true");
				// deactivate existing active 'filter-item'
				filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
				// activate new 'filter-item'
				event.target.classList.add("active", "outer-shadow");
				const target = event.target.getAttribute("data-target");
				// console.log(target);
				portfolioItems.forEach((item) => {
					// console.log(item);
					// console.log(item.getAttribute("data-category"));
					if(target === item.getAttribute("data-category") || target === "all"){
						item.classList.remove("hide");
						item.classList.add("show");
					}
					else{
						item.classList.remove("show");
						item.classList.add("hide");
					}
				})
			}
			else{
				// console.log("false");
			}
			// console.log(event.target);
		}) 

		portfolioItemsContainer.addEventListener("click", (event) => {
			// console.log(event.target);
			// console.log(event.target.closest(".portfolio-item-inner"));
			if(event.target.closest(".portfolio-item-inner")){
				const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
				// console.log(portfolioItem);
				// get the portfolioItem index
				itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
				// console.log(itemIndex);
				screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
				// console.log(screenshots);
				// convert screenshots into array
				screenshots = screenshots.split(",");
				// console.log(screenshots);
				if(screenshots.length === 1){
					prevBtn.style.display ="none";
					nextBtn.style.display ="none";
				}
				else{
					prevBtn.style.display ="block";
					nextBtn.style.display ="block";
				}
				slideIndex = 0;
				popupToggle();
				popupSlideshow();
				popupDetails();
			}
		})

		closeBtn.addEventListener("click", () =>{
			popupToggle();
			if(projectDetailsContainer.classList.contains("active")){
				popupDetailsToggle();
			}
		})

		function popupToggle(){
			popup.classList.toggle("open");
			bodyScrollingToggle();
		}

		function popupSlideshow(){
			const imgSrc = screenshots[slideIndex];
			// console.log(imgSrc);
			const popupImg = popup.querySelector(".pp-img");
			/* activate loader until the popImg loaded */ 
			popup.querySelector(".pp-loader").classList.add("active");
			popupImg.src = imgSrc;
			popupImg.onload =() =>{
				// deactivate loader after the popupImg loaded
				popup.querySelector(".pp-loader").classList.remove("active");
			}
			popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
		}

		// next slide
		nextBtn.addEventListener("click", () => {
			if(slideIndex === screenshots.length -1){
				slideIndex = 0;
			} 
			else{
				slideIndex++;
			}
			popupSlideshow();
			// console.log("slideIndex:" + slideIndex);
		})

		// prev slide
		prevBtn.addEventListener("click", () => {
			if(slideIndex === 0){
				slideIndex = (screenshots.length - 1);
			}
			else{
				slideIndex--;
			}
			popupSlideshow();
		})

		function popupDetails(){
			// if portfolio-item-details not exists
			if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
				projectDetailsBtn.style.display = "none";
				return; /* return function execution */
			}
			projectDetailsBtn.style.display = "block";
			// get the project details
			const details =portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
			// set the project details
			popup.querySelector(".pp-project-details").innerHTML = details;
			// get the project title
			const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
			// console.log(title);
			// set the project title
			popup.querySelector(".pp-title h2").innerHTML =title;
			// get the project category
			const category = portfolioItems[itemIndex].getAttribute("data-category");
			// console.log(category);
			// set the project category
			popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
		}

		projectDetailsBtn.addEventListener("click", () => {
			popupDetailsToggle();
		})

		function popupDetailsToggle(){
			if(projectDetailsContainer.classList.contains("active")){
				// console.log("true");
				projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
				projectDetailsBtn.querySelector("i").classList.add("fa-plus");
				projectDetailsContainer.classList.remove("active");
				projectDetailsContainer.style.maxHeight = 0 + "px";
			}
			else{
				// console.log("false");
				projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
				projectDetailsBtn.querySelector("i").classList.add("fa-minus");
				projectDetailsContainer.classList.add("active");
				projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
				popup.scrollTo(0, projectDetailsContainer.offsetTop);
			}
		}
})();


/* ----------------------- Testimonial slider ----------------------- */

// immediatley invoked expression -using arrow function



/* -------------------- hide all sections except active ----------------------- */

(() => {

	const sections = document.querySelectorAll(".section");
	// console.log(sections);
	sections.forEach((section) => {
		if(!section.classList.contains("active")){
			section.classList.add("hide");
		}
	})

})();

/*  -------------------------------- preloader -------------------------------  */ 
window.addEventListener("load", () => {
	// preloader
	document.querySelector(".preloader").classList.add("fade-out");
	setTimeout(() => {
		document.querySelector(".preloader").style.display ="none";
			
	}, 600)
}) 

var tempStr = "<div class='c'></div>"

var result = "";

for(var i=0;i<300;i++){
  result = result + " " + tempStr;
}
var parser = new DOMParser();
    var doc = parser.parseFromString(result, 'text/html');
document.getElementsByClassName("wrap_ani")[0].append(doc.body);



function AboutMe(){
	document.getElementById("welcome").classList.add("activeA");
	document.getElementById("skill").classList.remove("activeS");
	document.getElementById("why").classList.remove("activeW");
	document.getElementById("vision").classList.remove("activeV");
	document.getElementById("wel").classList.add("active");
	document.getElementById("ski").classList.remove("active");
	document.getElementById("wh").classList.remove("active");
	document.getElementById("vis").classList.remove("active");
	//document.getElementById("welcome").classList.remove("tab-pane");
}

function Skill(){
	document.getElementById("skill").classList.add("activeS");
	document.getElementById("welcome").classList.remove("activeA");
	document.getElementById("why").classList.remove("activeW");
	document.getElementById("vision").classList.remove("activeV");
	document.getElementById("ski").classList.add("active");
	document.getElementById("wel").classList.remove("active");
	document.getElementById("wh").classList.remove("active");
	document.getElementById("vis").classList.remove("active");
	//document.getElementById("skill").classList.remove("tab-pane");
	console.log('tag', '')
}
function Why(){
	document.getElementById("why").classList.add("activeW");
	document.getElementById("welcome").classList.remove("activeA");
	document.getElementById("vision").classList.remove("activeV");
	document.getElementById("skill").classList.remove("activeS");
	document.getElementById("wh").classList.add("active");
	document.getElementById("wel").classList.remove("active");
	document.getElementById("ski").classList.remove("active");
	document.getElementById("vis").classList.remove("active");
	//document.getElementById("skill").classList.remove("tab-pane");
	console.log('tag', '')
}
function Vision(){
	document.getElementById("vision").classList.add("activeV");
	document.getElementById("welcome").classList.remove("activeA");
	document.getElementById("why").classList.remove("activeW");
	document.getElementById("skill").classList.remove("activeS");
	document.getElementById("vis").classList.add("active");
	document.getElementById("wel").classList.remove("active");
	document.getElementById("ski").classList.remove("active");
	document.getElementById("wh").classList.remove("active");
	//document.getElementById("skill").classList.remove("tab-pane");
	console.log('tag', '')
}