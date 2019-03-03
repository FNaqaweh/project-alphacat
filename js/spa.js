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
	nav: function(ev) {
		ev.preventDefault();
		let currentPage = ev.target.getAttribute("data-target");
		document.querySelector(".active").classList.remove("active");
		document.getElementById(currentPage).classList.add("active");
		history.pushState({}, currentPage, `#${currentPage}`);
		document.getElementById(currentPage).dispatchEvent(app.show);
	},
	pageShown: function(ev) {
		let heading = ev.target.querySelector("h2");
		heading.classList.add("initial-big");
		setTimeout(
			h => {
				h.classList.remove("initial-big");
			},
			500,
			heading
		);
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
