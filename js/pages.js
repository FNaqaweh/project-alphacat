const app = {
	pages: [],
	show: new Event("show"),
	init: function() {
		app.pages = document.querySelectorAll(".page-content");
		app.pages.forEach(pg => {
			pg.addEventListener("show", app.pageShown);
		});

		document.querySelectorAll(".nav-link").forEach(link => {
			link.addEventListener("click", app.nav);
		});

		history.replaceState({}, "Home", "#home-page");
		window.addEventListener("popstate", app.poppin);
	},
	nav: function(ev) {	//The function called when beginning navigation
		ev.preventDefault();
		let currentPage = ev.target.getAttribute("data-target");
		document.querySelector(".active").classList.remove("active");
		document.getElementById(currentPage).classList.add("active");
		history.pushState({}, currentPage, `#${currentPage}`);
		document.getElementById(currentPage).dispatchEvent(app.show);
	},
	pageShown: function(ev) { //The function called once the page is loaded
		let heading = ev.target.querySelector("h2");
		if (heading != null) { //If an h2 element exists on the page
			heading.classList.add("initial-big");
			setTimeout(
				h => {
					h.classList.remove("initial-big");
				},
				500,
				heading
			);
		}
		window.scrollTo(0,0); //Resets scroll bar to the top upon page landing
		document.getElementById("nav-toggle").checked = false; //Uncheck the navbar checkbox to close the menu upon page landing
	},
	poppin: function(ev) {
		console.log(location.hash, "popstate event");
		let previousPage = location.hash.replace("#", "");
		document.querySelector(".active").classList.remove("active");
		document.getElementById(previousPage).classList.add("active");
		document.getElementById(previousPage).dispatchEvent(app.show);
	}
};

document.addEventListener("DOMContentLoaded", app.init);
