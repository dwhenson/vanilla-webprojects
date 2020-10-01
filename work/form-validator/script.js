/* ==========  Variables  ========== */

const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirm = document.querySelector("#confirm");
const inputs = Array.from(document.querySelectorAll("input"));

/* ==========  Functions  ========== */

/**
 * Renders error messages in case ot typeMismatch failure
 *
 * @param   {Object}  input      The element being verified
 * @param   {Object}  container  The element to render the error message inside
 *
 * @return  {String}             The error message
 */
function typeMismatch(input, container) {
	switch (input.id) {
		case "email":
			container.textContent = `Please check your email address`;
			break;
		default:
			container.textContent = `Please complete this field`;
	}
}

/**
 * Renders error messages in case ot tooShort failure
 *
 * @param   {Object}  input      The element being verified
 * @param   {Object}  container  The element to render the error message inside
 *
 * @return  {String}             The error message
 */
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

/**
 * Renders error messages in case ot valueMissing failure
 *
 * @param   {Object}  input      The element being verified
 * @param   {Object}  container  The element to render the error message inside
 *
 * @return  {String}             The error message
 */
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

/**
 * Checks if the password and confirm password values are identical
 */
function checkPasswords() {
	if (password.value !== confirm.value) {
		confirm.classList.remove("success");
		confirm.classList.add("password-check");

		const messageContainer = document.querySelector(`.confirm-error`);
		messageContainer.classList.add("error", "active");
		messageContainer.textContent = `Please check your passwords match`;
		return;
	}
	confirm.classList.remove("password-check");
}

/**
 * Checks the input elements for validity errors calls function to render error messages
 */
function showErrors() {
	inputs.forEach((input) => {
		const messageContainer = document.querySelector(`.${input.id}-error`);
		if (input.validity.valid) {
			input.classList.add("success");
		} else if (input.validity.valueMissing) {
			valueMissing(input, messageContainer);
		} else if (input.validity.tooShort) {
			tooShort(input, messageContainer);
		} else if (input.validity.typeMismatch) {
			typeMismatch(input, messageContainer);
		} else if (password.value !== confirm.value) {
			confirm.classList.add("test");
		}
		messageContainer.classList.add("error", "active");
	});
}

/**
 * Checks if validity errors are resolved on each input event
 */
function inputHandler() {
	inputs.forEach((input) => {
		if (!input.validity.valid) {
			showErrors();
		}
		const messageContainer = document.querySelector(`.${input.id}-error`);
		messageContainer.classList.remove("error", "active");
		messageContainer.textContent = "";
	});
	showErrors();
	checkPasswords();
}

/**
 * Adds attributes to the form required for validity checks
 *
 * @return  {[type]}  [return description]
 */
function setChecks() {
	username.setAttribute("minlength", 3);
	username.setAttribute("required", "");
	email.setAttribute("type", "email");
	email.setAttribute("required", "");
	password.setAttribute("minlength", 6);
	password.setAttribute("required", "");
	confirm.setAttribute("required", "");
}

/**
 * Moves keyboard focus to the first error found in the form
 */
function focusOnError() {
	const errors = document.querySelectorAll("input:invalid");
	errors[0].focus();
}

/* ==========  Inits and Event Listeners  ========== */

/**
 * Listens for the submit event, if validity check fails prevent submission
 * On failure, show errors and add event listener to check validity on input rather than submit
 */
form.addEventListener("submit", function (event) {
	setChecks();
	if (!form.checkValidity()) {
		event.preventDefault();
		showErrors();
		focusOnError();
		form.addEventListener("input", inputHandler);
	} else {
		form.submit();
	}
});
