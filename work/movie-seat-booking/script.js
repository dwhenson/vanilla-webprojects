// GOAL: Display movie choices and seats in a theater to select from in order to purchase tickets

// - User can select a movie / price
// - User can select / deselect seats
// - User can not select occupied seats
// - Number of seats and price will update
// - Save seats, movie and price to local storage so that UI is still populated on refresh

// STEPS//
// Make an array of all the seats for each film using option value as variable name (4 objects?)
// Each seat should be an object with the index number, occupied true/false
//
// On select 'change' get the array from local storage and render the class names
// On click if occupied ignore, otherwise toggle selected class
// On click, count number of selected, multiply by price and render seats/total to HTML
// On select 'change' if has selected class set occupied as true, and save to localStorage

console.log("It works");
