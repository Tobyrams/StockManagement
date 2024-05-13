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
