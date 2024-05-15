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

// --------------------- FILTER ------------------

// Get the input field, all card elements, and create a container for the message
const filterInput = document.getElementById("filterInput");
const cards = document.querySelectorAll(".card__lg");
const messageContainer = document.createElement("div");
messageContainer.classList.add("message");
document.querySelector(".lg__cards").appendChild(messageContainer); // Append the message container to the cards container

// Add an event listener to the input field for input events (when user types)
filterInput.addEventListener("input", function () {
  const filterText = this.value.toLowerCase();
  let foundMatch = false; // Flag to track if a match is found

  // Loop through each card element
  cards.forEach((card) => {
    const title = card.querySelector("h2").textContent.toLowerCase();

    // Check if the title text of the card includes the filter text
    if (title.includes(filterText)) {
      card.style.display = "block"; // Show the card if there's a match
      foundMatch = true; // Set flag to true if a match is found
    } else {
      card.style.display = "none"; // Hide the card if there's no match
    }
  });

  // Display message if no match is found
  if (!foundMatch) {
    messageContainer.textContent = "No matching results found."; // Set the message content
    messageContainer.style.display = "flex";
    messageContainer.style.height = "75vh";
    messageContainer.style.width = "100vw";
    messageContainer.style.fontWeight = "400";
    messageContainer.style.fontSize = "3rem";
    messageContainer.style.color = "red";
    messageContainer.style.marginTop = "10px";
    messageContainer.style.flexDirection = "column";
    messageContainer.style.justifyContent = "center";
    messageContainer.style.alignItems = "center";
  } else {
    messageContainer.textContent = ""; // Clear the message if a match is found
    messageContainer.style.display = "none"; // Hide the message container
  }
});
