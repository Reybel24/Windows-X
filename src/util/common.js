// Generate a random int,inclusive
function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export { randomNumberBetween }