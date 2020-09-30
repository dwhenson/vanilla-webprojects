// TODO
//
// Basically, I want no listeners, only check if things are OK when submitted by adding
// the required attributes. Then if not valid add listeners and check on input.
//
// Instead of individual listeners can I use event delegation and event.target?
// - Requires two listeners - input and submit
// Separate out required attributes and add on first submit, to give user a chance first
// Make showError a check event.target and then call specific showError function
// Update HTML (or functions) so that correct span is targeted)

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

function inputHandler(event) {
	console.log(event.target);
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
		input.className = "error active";
	});
}

function setChecks() {
	username.setAttribute("minlength", 3);
	username.setAttribute("required", "");
	email.setAttribute("required", "");
	password.setAttribute("minlength", 6);
	password.setAttribute("required", "");
	confirm.setAttribute("required", "");
}

form.addEventListener("submit", function (event) {
	setChecks();
	if (!form.checkValidity()) {
		event.preventDefault();
		showErrors();
		form.addEventListener("input", inputHandler);
	} else {
		form.submit();
	}
});
