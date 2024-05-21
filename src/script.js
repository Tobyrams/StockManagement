"use strict";

const sidePanel = document.querySelector(".sidePanel");
const toggeOpen = document.querySelector(".sideToggleOpen");
const toggeClose = document.querySelector(".sideToggleClose");
const overlay = document.querySelector(".overlay");

function removeAnimation() {
  sidePanel.classList.remove("animate__slideInLeft");
  sidePanel.classList.remove("animate__slideOutLeft");
}

if (toggeOpen || toggeClose || overlay) {
  toggeOpen.addEventListener("click", () => {
    sidePanel.classList.remove("hidden");
    removeAnimation();
    sidePanel.classList.add("animate__slideInLeft", "animate__fast");
    overlay.classList.remove("hidden");
  });

  toggeClose.addEventListener("click", function () {
    sidePanel.classList.remove("hidden");
    removeAnimation();
    sidePanel.classList.add("animate__slideOutLeft");
    overlay.classList.add("hidden");
  });

  overlay.addEventListener("click", function () {
    if (!sidePanel.classList.contains("hidden")) {
      sidePanel.classList.remove("hidden");
    }
    removeAnimation();
    sidePanel.classList.add("animate__slideOutLeft");
    // overlay.classList.add("hidden");
  });
}
// ------------------ Login Feature -----------------
const loginForm = document.getElementById("loginForm");

//Removes admin role from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.pathname === "/index.html" ||
    window.location.pathname === "/signup.html"
  ) {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminLoggedIn");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.pathname === "/Dashboard.html" &&
    localStorage.getItem("adminLoggedIn") !== "true"
  ) {
    setTimeout(() => {
      Toastify({
        text: "Welcome Admin",
        style: {
          background: "black",
        },
      }).showToast();

      localStorage.setItem("adminLoggedIn", "true"); // Set the flag in localStorage
    }, 1000);
  }
});

// Function to set the role restrictions
function setRoleRestrictions() {
  var buttons = document.querySelectorAll(".btn, .card__Btn, .btn__light");
  var isAdmin = localStorage.getItem("isAdmin");

  if (isAdmin === "true") {
    buttons.forEach(function (button) {
      button.style.visibility = "visible";
    });
  } else if (isAdmin === "false") {
    buttons.forEach(function (button) {
      button.style.visibility = "hidden";
    });
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email === "admin12@gmail.com" && password === "admin123") {
      window.location.href = "/Dashboard.html";
      localStorage.setItem("isAdmin", "true");
    } else {
      window.location.href = "/Dashboard.html";
      localStorage.setItem("isAdmin", "false");
    }
  });
}

// Set the button visibility when the page loads
document.addEventListener("DOMContentLoaded", function () {
  setRoleRestrictions();
});

const logOutBtn = document.querySelector(".logOutBtn");
if (logOutBtn) {
  logOutBtn.addEventListener("click", function () {
    localStorage.removeItem("isAdmin");
  });
}

// Dashboard date

// Get the current date
const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, "0"); // Ensures two-digit format with leading zero if necessary
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
const year = currentDate.getFullYear();
const formattedDate = `${day}-${month}-${year}`;

// Update the content of the element with id "currentDate"
const currentDateElement = document.getElementById("currentDate");
if (currentDateElement) {
  currentDateElement.textContent = formattedDate;
}
// ---------------------Card Horizontal  Scroll------------------
// https://www.youtube.com/watch?v=C9EWifQ5xqA

// Select the element with the class "sml__cards" and assign it to the variable "slider"
const slider = document.querySelector(".sml__cards");

// Initialize variables for tracking mouse events and scroll position
let isDown = false;
let startX;
let scrollLeft;

//Cheks if el exists to not thorw an error
if (slider) {
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
}

// --------------------- FILTER ------------------

// Get the input field, all card elements, and create a container for the message
const filterInput = document.getElementById("filterInput");
const cards = document.querySelectorAll(".card__lg");
const lgCard = document.querySelector(".lg__cards");
const messageContainer = document.createElement("div");

messageContainer.classList.add("message");
if (lgCard) {
  lgCard.appendChild(messageContainer); // Append the message container to the cards container
}

if (filterInput) {
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
}

// Stock Management Page

//Modals
const addItemModal = document.querySelector(".addItemModal");
const editItemModal = document.querySelector(".editItemModal");
const addBatchModal = document.querySelector(".addBatchModal");
const addProductModal = document.querySelector(".addProductModal");
const addFinanceModal = document.querySelector(".addFinanceModal");
//Btns
const addNewItemBtn = document.querySelector(".addNewItemBtn");
const addBatchBtn = document.querySelector(".addBatchBtn");
const addProductBtn = document.querySelector(".addProductBtn");
const addFinanceBtn = document.querySelector(".addFinanceBtn");

//forms
const addBatchForm = document.getElementById("addBatchForm");
const addItemForm = document.getElementById("addItemForm");
const editItemForm = document.getElementById("editItemForm");
const addProductForm = document.getElementById("addProductForm");
const addFinanceForm = document.getElementById("addFinanceForm");

// Btn event listeners ------------------------------

function addModal(btn, form, modal) {
  btn.addEventListener("click", function () {
    form.reset(); // Resets the form
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
}

if (addNewItemBtn) {
  addModal(addNewItemBtn, addItemForm, addItemModal);
}

if (addBatchBtn) {
  addModal(addBatchBtn, addBatchForm, addBatchModal);
}

if (addProductBtn) {
  addModal(addProductBtn, addProductForm, addProductModal);
}

if (addFinanceBtn) {
  addModal(addFinanceBtn, addFinanceForm, addFinanceModal);
}

/**
 * Handles the animation for hiding a modal element.
 * @param {*} modal The modal element to animate.
 */
const handleModalHideAnimation = (modal) => {
  // Check if the modal currently has the 'animate__fadeInUp' class
  if (modal.classList.contains("animate__fadeInUp")) {
    // Remove 'animate__fadeInUp' and add 'animate__fadeOutDown' for hiding animation
    modal.classList.remove("animate__fadeInUp");
    modal.classList.add("animate__fadeOutDown");

    // Hide the modal after the animation ends
    setTimeout(() => {
      modal.classList.add("hidden"); // Hide the modal
      modal.classList.remove("animate__fadeOutDown"); // Reset animation class
      modal.classList.add("animate__fadeInUp"); // Prepare for next appearance
    }, 700);

    // Hide the overlay slightly before the modal hide animation ends
    setTimeout(() => {
      overlay.classList.add("hidden"); // Hide the overlay
    }, 650);
  }
};
if (overlay) {
  overlay.addEventListener("click", function () {
    // Check if either modals exist
    if (
      addItemModal ||
      editItemModal ||
      addBatchModal ||
      addProductModal ||
      addFinanceModal
    ) {
      // Handle animation for addItemModal if it exists

      if (addItemModal) {
        handleModalHideAnimation(addItemModal);
      }

      // Handle animation for editItemModal if it exists
      if (editItemModal) {
        handleModalHideAnimation(editItemModal);
      }

      // Handle animation for addBatchModal if it exists
      if (addBatchModal) {
        handleModalHideAnimation(addBatchModal);
      }
      // Handle animation for addProductModal if it exists
      if (addProductModal) {
        handleModalHideAnimation(addProductModal);
      }

      // Handle animation for addFinanceModal if it exists
      if (addFinanceModal) {
        handleModalHideAnimation(addFinanceModal);
      }
    }

    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 650);
  });
}

if (addBatchForm) {
  addBatchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    handleModalHideAnimation(addBatchModal);
    comingSoon();
  });
}
if (editItemForm) {
  editItemForm.addEventListener("submit", function (e) {
    e.preventDefault();
    handleModalHideAnimation(editItemModal);
    comingSoon();
  });
}

if (addProductModal) {
  addProductForm.addEventListener("submit", function (e) {
    e.preventDefault();
    handleModalHideAnimation(addProductModal);
    comingSoon();
  });
}

if (addFinanceModal) {
  addFinanceForm.addEventListener("submit", function (e) {
    e.preventDefault();
    handleModalHideAnimation(addFinanceModal);
    comingSoon();
  });
}

//   Filtering the items --------------
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("stockSearch");
  const items = document.querySelectorAll(".card__details");
  const cardHeading = document.querySelector(".card_Heading");
  const hrElements = document.querySelectorAll(".card hr");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      let visibleItems = 0;

      items.forEach((item) => {
        const itemName = item.querySelector("p").textContent.toLowerCase();
        if (itemName.includes(searchTerm)) {
          item.style.display = "";
          visibleItems++;
        } else {
          item.style.display = "none";
        }
      });

      // Show or hide hr elements based on visible items
      hrElements.forEach((hr, index) => {
        if (index < visibleItems) {
          hr.style.display = "";
        } else {
          hr.style.display = "none";
        }
      });

      // Ensure the cardHeading is always visible
      cardHeading.style.display = visibleItems > 0 ? "" : "none";
    });
  }
});

//   Adding items to the form------------

if (addItemForm) {
  addItemForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const quantity = document.getElementById("Quantity").value;
    const unit = document.getElementById("UnitOfMeasurement").value;
    const expiryDate = document.getElementById("expirydate").value;

    const newItem = document.createElement("div");
    newItem.classList.add("card__details");
    newItem.innerHTML = `
            
            <p>${name}</p>
            <p>${quantity}</p>
            <p>${unit}</p>
            <p>${expiryDate}</p>
            <span>
            <i class="fa-regular fa-pen-to-square card__Btn"></i>
            <i class="fa-regular fa-trash-can card__Btn"></i>
            </span>
          `;

    const card = document.querySelector(".card");
    const hr = document.createElement("hr");

    card.appendChild(hr);
    card.appendChild(newItem);
    card.appendChild(hr);

    // Clear the form
    addItemForm.reset();

    // Hide the modal
    addItemModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
}

//   function to remove the item from the list when trash button is clicked
const card = document.querySelector(".card");
if (card) {
  card.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-trash-can")) {
      const cardDetails = event.target.closest(".card__details");
      const hr = cardDetails.nextElementSibling;
      cardDetails.remove();
      hr.remove();
    }
  });

  //function for the edit button
  card.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-pen-to-square")) {
      const cardDetails = event.target.closest(".card__details");
      const hr = cardDetails.nextElementSibling;

      // Get the values from the card details
      const name = cardDetails.children[0].textContent;
      const quantity = cardDetails.children[1].textContent;
      const unit = cardDetails.children[2].textContent;
      const expiryDate = cardDetails.children[3].textContent;

      // Fill the form with the values
      document.getElementById("editname").value = name;
      document.getElementById("editQuantity").value = quantity;
      document.getElementById("editUnitOfMeasurement").value = unit;
      document.getElementById("editexpirydate").value = expiryDate;

      // Show the modal
      editItemModal.classList.remove("hidden");
      overlay.classList.remove("hidden");
    }
  });
}

function comingSoon() {
  Swal.fire({
    icon: "question",
    title: "Coming Soon!",
    showConfirmButton: false,
    timer: 1500,
  });
}

// Analytics Graph toggle
const toggleLineBtn = document.getElementById("toggle-Line");
const toggleBarBtn = document.getElementById("toggle-Bar");
const container_toggles = document.querySelector(".container_toggles");

const LineCard = document.querySelector(".lineCard");
const barCard = document.querySelector(".barCard");

function toggleView() {
  // Setting toggle active state
  toggleLineBtn.classList.toggle("task-toggle--active");
  toggleBarBtn.classList.toggle("task-toggle--active");

  // Hiding the pages
  LineCard.classList.toggle("hidden");
  barCard.classList.toggle("hidden");

  barCard.classList.toggle("barCardStyle");
}

if (toggleLineBtn || toggleBarBtn) {
  toggleLineBtn.addEventListener("click", toggleView);
  toggleBarBtn.addEventListener("click", toggleView);
}
/**
 * Adds a CSS animation class to an element, then removes it after a specified time.
 * @param {HTMLElement} className - The DOM element to animate.
 * @param {string} animationName - The name of the CSS animation class. From (https://github.com/animate-css/animate.css)
 * @param {number} animationTime - The time (in milliseconds) before removing the animation class.
 */
const clickAnimation = function (
  className,
  animationName,
  animationTime = 500
) {
  // Add the specified animation class to the element
  className.classList.add(animationName);

  // Add a generic animation class ('animate__animated') to trigger the animation
  className.classList.add("animate__animated");

  // Set a timeout to remove both animation classes after the specified time
  setTimeout(() => {
    className.classList.remove(animationName);
    className.classList.remove("animate__animated");
  }, animationTime);
};
