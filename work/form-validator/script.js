/* ==========  Variables  ========== */

const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirm = document.querySelector("#confirm");
const inputs = Array.from(document.querySelectorAll("input"));

/* ==========  Functions  ========== */

function typeMismatch(input, container) {
	switch (input.id) {
		case "email":
			container.textContent = `Please check your email address`;
			break;
		default:
			container.textContent = `Please complete this field`;
	}
}
function tooShort(input, container) {
	switch (input.id) {
		case "username":
			container.textContent = `Please add a username at least 3 characters long`;
			break;
		case "password":
			container.textContent = `Please add a password at least 6 characters long`;
			break;
		default:
			container.textContent = `Please complete this field`;
	}
}

function valueMissing(input, container) {
	switch (input.id) {
		case "username":
			container.textContent = `Please add a username at least 3 characters long`;
			break;
		case "email":
			container.textContent = `Please add an email address`;
			break;
		case "password":
			container.textContent = `Please add a password at least 6 characters long`;
			break;
		case "confirm":
			container.textContent = `Please type your password again`;
			break;
		default:
			container.textContent = `Please complete this field`;
	}
}

function checkPasswords() {
	if (password.value !== confirm.value) {
		const messageContainer = document.querySelector(`.confirm-error`);
		messageContainer.classList.add("error", "active");
		messageContainer.textContent = `Please check your passwords match`;
	}
}

function showErrors() {
	inputs.forEach((input) => {
		if (input.validity.valid) return;
		const messageContainer = document.querySelector(`.${input.id}-error`);
		if (input.validity.valueMissing) {
			valueMissing(input, messageContainer);
		} else if (input.validity.tooShort) {
			tooShort(input, messageContainer);
		} else if (input.validity.typeMismatch) {
			typeMismatch(input, messageContainer);
		}
		messageContainer.classList.add("error", "active");
	});
	checkPasswords();
}

function inputHandler() {
	inputs.forEach((input) => {
		if (!input.validity.valid) {
			showErrors();
		}
		const messageContainer = document.querySelector(`.${input.id}-error`);
		messageContainer.classList.remove("error", "active");
		messageContainer.textContent = "";
		input.classList.add("success");
	});
	showErrors();
}

function setChecks() {
	username.setAttribute("minlength", 3);
	username.setAttribute("required", "");
	email.setAttribute("type", "email");
	email.setAttribute("required", "");
	password.setAttribute("minlength", 6);
	password.setAttribute("required", "");
	confirm.setAttribute("required", "");
}

function focusOnError() {
	const errors = document.querySelectorAll("input:invalid");
	errors[0].focus();
}

form.addEventListener("submit", function (event) {
	setChecks();
	if (!form.checkValidity()) {
		event.preventDefault();
		focusOnError();
		showErrors();
		form.addEventListener("input", inputHandler);
	} else {
		form.submit();
	}
});
