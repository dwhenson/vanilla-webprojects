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
	let d;
	let h;
	let m;
	let s;
	s = Math.floor(milliseconds / 1000);
	m = Math.floor(s / 60);
	s %= 60;
	h = Math.floor(m / 60);
	m %= 60;
	d = Math.floor(h / 24);
	h %= 24;
	renderHTML(d, h, m, s);
}

year.textContent = `${new Date().getFullYear()}`;
/* ==========  Inits and Event Listeners  ========== */

setInterval(() => {
	const date = new Date();
	const yearEnd = new Date(date.getFullYear(), 11, 31, 24);
	const timeDifference = yearEnd - date;
	convertMS(timeDifference);
}, 1000);
