/* ==========  Variables  ========== */

// Elements
const year = document.querySelector("#year");
const app = document.querySelector("#app");

// Times

/* ==========  Functions  ========== */

function renderHTML(d, h, m, s) {
	app.innerHTML = `
		<div>
			<p>${d}</p>
			<p id="days">Days</p>
		</div>
		<div>
			<p>${h}</p>
			<p id="hours">Hours</p>
		</div>
		<div>
			<p>${m}</p>
			<p id="minutes">Minutes</p>
		</div>
		<div>
			<p>${s}</p>
			<p id="seconds">Seconds</p>
		</div>
	`;
}

function convertMS(milliseconds) {
	const d = Math.floor(milliseconds / 1000 / 60 / 60 / 24);
	const h = Math.floor(milliseconds / 1000 / 60 / 60) % 24;
	const m = Math.floor(milliseconds / 1000 / 60) % 60;
	const s = Math.floor(milliseconds / 1000) % 60;
	renderHTML(d, h, m, s);
}

// year.textContent = `${new Date().getFullYear() + 1}`;
/* ==========  Inits and Event Listeners  ========== */

setInterval(() => {
	const date = new Date();
	const yearEnd = new Date(Date.parse("2022-12-01"));
	const timeDifference = yearEnd - date;
	convertMS(timeDifference);
}, 1000);
