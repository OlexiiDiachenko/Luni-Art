// Comparison For Mouse
export function mouseComparisonMove(event) {
  let comparisonBefore = this.querySelector(".image-comparison_before"), // Get Block With Painting
    button = this.querySelector(".comparison-button"), // Get Our Circle Button
    left = event.pageX - this.offsetLeft, // Calculate This Position Left
    width = this.clientWidth; // Get True Width Our Parent Block
  if (left < 0) left = 0;
  if (left > width) left = width;
  button.style.left = `${left}px`;
  comparisonBefore.style.width = `${left}px`;
}

// Comparison For Touch
export function touchComparisonMove(event) {
  let parent = this.parentElement,
    comparisonBefore = parent.querySelector(".image-comparison_before"), // Get Block With Painting
    button = parent.querySelector(".comparison-button"), // Get Our Circle Button
    touches = event.changedTouches, // Get All Touches
    touch = touches[0], // Get Out First Touch On Button
    left = touch.pageX - parent.offsetLeft, // Calculate This Position Left
    width = parent.clientWidth; // Get True Width Our Parent Block
  if (left < 0) left = 0;
  if (left > width) left = width;
  button.style.left = `${left}px`;
  comparisonBefore.style.width = `${left}px`;
}
