var i = 0;
var txt = "What do you have planned today?";

function typeWriter() {
	if (i < txt.length) {
		document.getElementsByClassName("js-typewrite")[0].innerHTML +=
			txt.charAt(i);
		i++;
		setTimeout(typeWriter, 100);
	}
}

setTimeout(typeWriter, 2000);

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		console.log(entry);
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		} else {
			entry.target.classList.remove("show");
		}
	});
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
     function openNav() {
			document.getElementById("side_navigation").style.width = "350px";
		}

		function closeNav() {
			document.getElementById("side_navigation").style.width = "0";
		}

