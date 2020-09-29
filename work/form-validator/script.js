// TODO
// Instead of individual listeners can I use event delegation and event.target?
// - Requires two listeners - input and submit
// Separate out required attributes and add on first submit, to give user a chance first
// Make showError a check event.target and then call specific showError function
// Update HTML (or functions) so that correct span is targeted)

/* ==========  Variables  ========== */

const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const emailError = document.querySelector("#email + span.error");
const password = document.querySelector("#password");
const confirm = document.querySelector("#confirm");

/* ==========  Functions  ========== */

function showError() {
	if (email.validity.valueMissing) {
		emailError.textContent = "Please add your email address";
	} else if (email.validity.typeMismatch) {
		emailError.textContent = "Please check your email address";
	}
	emailError.className = "error active";
}

/* ==========  Inits and Event Listeners  ========== */

username.addEventListener("input", function () {
	if (username.validity.valid) {
		username.nextElementSibling.innerHTML = "";
		username.nextElementSibling.className = "error";
	} else {
		showError();
	}
});

email.addEventListener("input", function () {
	if (email.validity.valid) {
		emailError.innerHTML = "";
		emailError.className = "error";
	} else {
		showError();
	}
});

form.addEventListener("submit", function (event) {
	username.setAttribute("minlength", 3);
	email.setAttribute("required", "");
	if (!email.validity.valid) {
		showError();
		event.preventDefault();
	}
});
