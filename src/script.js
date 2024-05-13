"use strict";

const sidePanel = document.querySelector(".sidePanel");
const toggeOpen = document.querySelector(".sideToggleOpen");
const toggeClose = document.querySelector(".sideToggleClose");
const overlay = document.querySelector(".overlay");

function removeAnimation() {
  sidePanel.classList.remove("animate__slideInLeft");
  sidePanel.classList.remove("animate__slideOutLeft");
}

toggeOpen.addEventListener("click", () => {
  sidePanel.classList.remove("hidden");
  removeAnimation();
  sidePanel.classList.add("animate__slideInLeft", "animate__fast");
  overlay.classList.remove("hidden");
});

toggeClose.addEventListener("click", () => {
  sidePanel.classList.remove("hidden");
  removeAnimation();
  sidePanel.classList.add("animate__slideOutLeft");
  overlay.classList.add("hidden");
});

// Dashboard date
document.addEventListener("DOMContentLoaded", function () {
  // Get the current date
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0"); // Ensures two-digit format with leading zero if necessary
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  // Update the content of the element with id "currentDate"
  document.getElementById("currentDate").textContent = formattedDate;
});

// ---------------------Card Horizontal  Scroll------------------
// https://www.youtube.com/watch?v=C9EWifQ5xqA

// Select the element with the class "sml__cards" and assign it to the variable "slider"
const slider = document.querySelector(".sml__cards");

// Initialize variables for tracking mouse events and scroll position
let isDown = false;
let startX;
let scrollLeft;

// Event listener for mouse button down event on the slider
slider.addEventListener("mousedown", (e) => {
  // Set "isDown" flag to true to indicate mouse button is down
  isDown = true;
  // Calculate the initial position of the mouse pointer relative to the slider
  startX = e.pageX - slider.offsetLeft;
  // Store the initial scroll position of the slider
  scrollLeft = slider.scrollLeft;
});
// Event listener for mouse leaving the slider area
slider.addEventListener("mouseleave", () => {
  // Reset the "isDown" flag to false when mouse leaves the slider area
  isDown = false;
});
// Event listener for mouse button up event on the slider
slider.addEventListener("mouseup", () => {
  // Reset the "isDown" flag to false when mouse button is released
  isDown = false;
});
// Event listener for mouse movement over the slider
slider.addEventListener("mousemove", (e) => {
  // Check if mouse button is not down, exit the function
  if (!isDown) return;
  // Prevent default behavior of mousemove event (e.g., text selection)
  e.preventDefault();
  // Calculate the new position of the mouse pointer relative to the slider
  const x = e.pageX - slider.offsetLeft;
  // Calculate the distance moved by the mouse pointer from the initial position
  const walk = x - startX;
  // Update the scroll position of the slider by subtracting the distance moved
  slider.scrollLeft = scrollLeft - walk;
});
