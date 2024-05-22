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
  });
}
/**
 * Redirect to signup page
 */
function showSignupPage() {
  const loginPage = document.querySelector(".login_page");
  const signupPage = document.querySelector(".signup_page");

  loginPage.classList.toggle("hidden");
  signupPage.classList.toggle("hidden");
}
/**
 * Redirect to login page
 */
function showLoginPage() {
  const loginPage = document.querySelector(".login_page");
  const signupPage = document.querySelector(".signup_page");

  loginPage.classList.toggle("hidden");
  signupPage.classList.toggle("hidden");
}

// ------------------ Auth ---------------------------
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}
function getUserRole() {
  const user = getCurrentUser();
  return user ? user.role : null;
}

console.log(getUserRole());

document.addEventListener("DOMContentLoaded", function () {
  const currUser = JSON.parse(localStorage.getItem("currentUser"));
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const logOutBtn = document.querySelector(".logOutBtn");

  // add an admin user to local storage on first load
  (function addDefaultAdmin() {
    if (!localStorage.getItem("users")) {
      const adminUser = {
        email: "admin@gmail.com",
        password: "admin123",
        role: "admin",
      };
      const users = [adminUser];
      localStorage.setItem("users", JSON.stringify(users));
    }
  })();

  // Initialize items in localStorage on startup
  (function initializeItems() {
    if (!localStorage.getItem("stockItems")) {
      const initialItems = [
        { name: "Rice", quantity: 25, unit: "kg", expiry: "2024-10-15" },
      ];
      localStorage.setItem("stockItems", JSON.stringify(initialItems));
    }
  })();

  function setRoleRestrictions(currentUser) {
    var buttons = document.querySelectorAll(".btn, .card__Btn, .btn__light");

    if (currentUser.role === "admin") {
      buttons.forEach(function (button) {
        button.style.visibility = "visible";
      });
    } else if (currentUser.role === "user") {
      buttons.forEach(function (button) {
        button.style.visibility = "hidden";
      });
    }
  }

  function logUserOut() {
    ToastMessage("Logging out... ", "black", "_");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1500);
  }

  function showWelcomeMessage(currentUser) {
    setTimeout(() => {
      ToastMessage("Welcome " + currentUser.email, "black", "_", 3000);
    }, 1000);
  }

  // If on dashboard page, check if the user is logged in
  if (window.location.pathname.includes("Dashboard.html")) {
    if (currUser) {
      // displayHomePage(currenUser);

      setRoleRestrictions(currUser);
      const welcomeShown =
        JSON.parse(localStorage.getItem("welcomeShown")) || false;
      if (!welcomeShown) {
        showWelcomeMessage(currUser);
        localStorage.setItem("welcomeShown", true);
      }
    } else {
      //Redirect to login page if not logged in
      window.location.href = "index.html";
    }
  }
  // If on Stock page, check if the user is logged in
  if (window.location.pathname.includes("Stock.html")) {
    if (currUser) {
      setRoleRestrictions(currUser);
    } else {
      //Redirect to login if not logged in
      window.location.href = "/index.html";
    }
  }

  // If on ingredients page, check if the user is logged in
  if (window.location.pathname.includes("ingredients.html")) {
    if (currUser) {
      setRoleRestrictions(currUser);
    } else {
      //Redirect to login if not logged in
      window.location.href = "/index.html";
    }
  }

  // If on product page, check if the user is logged in
  if (window.location.pathname.includes("Product.html")) {
    if (currUser) {
      setRoleRestrictions(currUser);
    } else {
      //Redirect to login if not logged in
      window.location.href = "/index.html";
    }
  }

  // If on analytics page, check if the user is logged in
  if (window.location.pathname.includes("Analytics.html")) {
    if (currUser) {
      setRoleRestrictions(currUser);
    } else {
      //Redirect to login if not logged in
      window.location.href = "/index.html";
    }
  }

  // If on Finances page, check if the user is logged in
  if (window.location.pathname.includes("Finances.html")) {
    if (currUser) {
      setRoleRestrictions(currUser);
    } else {
      //Redirect to login if not logged in
      window.location.href = "/index.html";
    }
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "/Dashboard.html";
      } else {
        ToastMessage("Invalid email or password", "red");
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get the form data
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;

      let users = JSON.parse(localStorage.getItem("users")) || [];
      //Check if email already exists
      if (users.find((user) => user.email === email)) {
        ToastMessage("Email already exists", "red");
        return;
      }

      //Add the new user to the list of users
      const newUser = { email, password, role: "user" };
      users.push(newUser);
      //Save the updated user list to local storage
      localStorage.setItem("users", JSON.stringify(users));
      ToastMessage("Account created!", "black");
      //clear the input
      signupForm.reset();
      showLoginPage();
    });
  }

  if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("welcomeShown");
      logUserOut();
    });
  }
});

// Dashboard date

// Get the current date
// const currentDate = new Date();
// const day = String(currentDate.getDate()).padStart(2, "0"); // Ensures two-digit format with leading zero if necessary
// const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
// const year = currentDate.getFullYear();
// const formattedDate = `${day}-${month}-${year}`;

// // Update the content of the element with id "currentDate"
// const currentDateElement = document.getElementById("currentDate");
// if (currentDateElement) {
//   currentDateElement.textContent = formattedDate;
// }
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

// // Get the input field, all card elements, and create a container for the message
// const filterInput = document.getElementById("filterInput");
// const cards = document.querySelectorAll(".card__lg");
// const lgCard = document.querySelector(".lg__cards");
// const messageContainer = document.createElement("div");

// messageContainer.classList.add("message");
// if (lgCard) {
//   lgCard.appendChild(messageContainer); // Append the message container to the cards container
// }

// if (filterInput) {
//   // Add an event listener to the input field for input events (when user types)
//   filterInput.addEventListener("input", function () {
//     const filterText = this.value.toLowerCase();
//     let foundMatch = false; // Flag to track if a match is found

//     // Loop through each card element
//     cards.forEach((card) => {
//       const title = card.querySelector("h2").textContent.toLowerCase();

//       // Check if the title text of the card includes the filter text
//       if (title.includes(filterText)) {
//         card.style.display = "block"; // Show the card if there's a match
//         foundMatch = true; // Set flag to true if a match is found
//       } else {
//         card.style.display = "none"; // Hide the card if there's no match
//       }
//     });

//     // Display message if no match is found
//     if (!foundMatch) {
//       messageContainer.textContent = "No matching results found."; // Set the message content
//       messageContainer.style.display = "flex";
//       messageContainer.style.height = "75vh";
//       messageContainer.style.width = "100vw";
//       messageContainer.style.fontWeight = "400";
//       messageContainer.style.fontSize = "3rem";
//       messageContainer.style.color = "red";
//       messageContainer.style.marginTop = "10px";
//       messageContainer.style.flexDirection = "column";
//       messageContainer.style.justifyContent = "center";
//       messageContainer.style.alignItems = "center";
//     } else {
//       messageContainer.textContent = ""; // Clear the message if a match is found
//       messageContainer.style.display = "none"; // Hide the message container
//     }
//   });
// }

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

const cardsContainer = document.getElementById("cardsContainer");
const cardsExpiryTContainer = document.getElementById("cardsExpiryTContainer");
let currentEditIndex = null;

// ------------------------Stock Management CRUD ------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Functions ----------------------------------------
  function setRoleRestrictions(currentUser) {
    var buttons = document.querySelectorAll(".btn, .card__Btn, .btn__light");

    if (currentUser.role === "admin") {
      buttons.forEach(function (button) {
        button.style.visibility = "visible";
      });
    } else if (currentUser.role === "user") {
      buttons.forEach(function (button) {
        button.style.visibility = "hidden";
      });
    }
  }

  /**
   * - Load items from localStorage and display them in the cardsContainer.
   * - Also attach event listeners to the edit and delete buttons of each item.
   */
  function loadItems() {
    // Clear the current contents of the cardsContainer
    if (cardsContainer) {
      cardsContainer.innerHTML = "";

      //Get the current user's role
      const userRole = getUserRole();

      // Retrieve items from localStorage, or initialize an empty array if no items are found
      const items = JSON.parse(localStorage.getItem("stockItems")) || [];

      // Loop through each item and create a div element to display it
      items.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        const itemHr = document.createElement("hr");

        // Add a class to the div for styling
        itemDiv.classList.add("card__details");

        // Set the innerHTML of the div to include the item details and action buttons
        itemDiv.innerHTML = `
        <p>${item.name}</p>
        <p>${item.quantity}</p>
        <p>${item.unit}</p>
        <p>${item.expiry}</p>
        <span>
          <i class="fa-regular fa-pen-to-square card__Btn editBtn" data-index="${index}"></i>
          <i class="fa-regular fa-trash-can card__Btn deleteBtn" data-index="${index}"></i>
        </span>
    `;

        // Append the item div and a horizontal rule to the cardsContainer

        cardsContainer.appendChild(itemDiv);
        cardsContainer.appendChild(itemHr);

        // Add a class to the cardsContainer for styling
        cardsContainer.classList.add("cardsContainer");
      });

      // Attach event listeners to each edit and delete button
      if (userRole === "admin") {
        document
          .querySelectorAll(".editBtn")
          .forEach((btn) => btn.addEventListener("click", editItem));
        document
          .querySelectorAll(".deleteBtn")
          .forEach((btn) => btn.addEventListener("click", deleteItem));
      }
    }
  }

  function loadExpirtyItems() {
    // Clear the current contents of the cardsContainer
    if (cardsExpiryTContainer) {
      cardsExpiryTContainer.innerHTML = "";

      // Retrieve items from localStorage, or initialize an empty array if no items are found
      const items = JSON.parse(localStorage.getItem("stockItems")) || [];

      // Loop through each item and create a div element to display it
      items.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        const itemHr = document.createElement("hr");

        // Add a class to the div for styling
        itemDiv.classList.add("expiry__info");

        // Set the innerHTML of the div to include the item details and action buttons
        itemDiv.innerHTML = `
        <p>${item.name}</p>
        
        <p>${item.expiry}</p>
        
    `;

        // Append the item div and a horizontal rule to the cardsContainer

        cardsExpiryTContainer.appendChild(itemDiv);
        cardsExpiryTContainer.appendChild(itemHr);

        // Add a class to the cardsContainer for styling
        cardsExpiryTContainer.classList.add("cardsContainer");
      });
    }
  }

  /**
   * Toggle visibility of modals and overlay
   */
  function toggleModal(modal) {
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  }

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

  /**
   * Edit an item:
   * - Retrieve the item data from localStorage using the index from the clicked button.
   * - Populate the edit form with the current item data.
   * - Show the edit modal.
   *
   * @param {Event} e - The event object from the click event.
   */
  function editItem(e) {
    // Get the index of the item to be edited from the data-index attribute of the clicked button
    const index = e.target.dataset.index;

    // Retrieve the list of items from localStorage, or initialize an empty array if no items are found
    const items = JSON.parse(localStorage.getItem("stockItems")) || [];

    // Get the specific item to be edited using the index
    const item = items[index];

    // Store the current edit index globally to reference when saving the edited item
    currentEditIndex = index;

    // Populate the edit form fields with the current item data
    editItemForm.editname.value = item.name;
    editItemForm.editQuantity.value = item.quantity;
    editItemForm.editUnitOfMeasurement.value = item.unit;
    editItemForm.editexpirydate.value = item.expiry;

    // Show the edit item modal
    toggleModal(editItemModal);
  }

  /**
   * Delete an item:
   * - Retrieve the item index from the clicked button.
   * - Remove the item from the items array.
   * - Update localStorage with the modified items array.
   * - Reload the items to reflect the changes in the UI.
   *
   * @param {Event} e - The event object from the click event.
   */
  function deleteItem(e) {
    // Get the index of the item to be deleted from the data-index attribute of the clicked button
    const index = e.target.dataset.index;

    // Retrieve the list of items from localStorage, or initialize an empty array if no items are found
    const items = JSON.parse(localStorage.getItem("stockItems")) || [];

    // Remove the item from the items array using the index
    items.splice(index, 1);

    // Update localStorage with the modified items array
    localStorage.setItem("stockItems", JSON.stringify(items));

    // Reload the items to update the UI
    loadItems();

    ToastMessage("Item deleted", "#40A578", "_", 3000);
  }

  // Event Listeners ----------------------------------------

  //Btns -------------
  if (addNewItemBtn) {
    // Show the add item modal when "Add New Item" button is clicked
    addNewItemBtn.addEventListener("click", () => {
      addItemForm.reset();
      toggleModal(addItemModal);
    });
  }

  if (addBatchBtn) {
    addBatchBtn.addEventListener("click", () => {
      addBatchForm.reset();
      toggleModal(addBatchModal);
    });
  }

  if (addProductBtn) {
    addProductBtn.addEventListener("click", () => {
      addProductForm.reset();
      toggleModal(addProductModal);
    });
  }

  if (addFinanceBtn) {
    addFinanceBtn.addEventListener("click", () => {
      addFinanceForm.reset();
      toggleModal(addFinanceModal);
    });
  }

  //Forms -------------
  if (addItemForm || editItemForm) {
    // Handle form submission to add a new item
    addItemForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevent the default form submission behavior

      //Crud check
      if (getUserRole() !== "admin") {
        ToastMessage("Only admins can add new items");
        return;
      }
      // Get the values from the form inputs
      const name = addItemForm.name.value;
      const quantity = addItemForm.Quantity.value;
      const unit = addItemForm.UnitOfMeasurement.value;
      const expiry = addItemForm.expirydate.value;

      // Create a new item object with the form values
      const newItem = { name, quantity, unit, expiry };

      // Retrieve the current list of items from localStorage, or initialize an empty array if no items are found
      const items = JSON.parse(localStorage.getItem("stockItems")) || [];

      // Push the new item to the items array
      items.push(newItem);

      // Save the updated items array back to localStorage
      localStorage.setItem("stockItems", JSON.stringify(items));

      // Reload the items to update the UI with the new item
      loadItems();

      // Close the add item modal
      toggleModal(addItemModal);

      ToastMessage("Item added!", "#40A578", "_", 3000);
    });

    // Handle form submission to edit an existing item
    editItemForm.addEventListener("submit", (e) => {
      e.preventDefault();
      //Crud Check
      if (getUserRole() !== "admin") {
        ToastMessage("Only admins can add new items");
        return;
      }

      // Get the values from the edit form inputs
      const name = editItemForm.editname.value;
      const quantity = editItemForm.editQuantity.value;
      const unit = editItemForm.editUnitOfMeasurement.value;
      const expiry = editItemForm.editexpirydate.value;

      // Create an updated item object with the form values
      const updatedItem = { name, quantity, unit, expiry };

      // Retrieve the current list of items from localStorage, or initialize an empty array if no items are found
      const items = JSON.parse(localStorage.getItem("stockItems")) || [];

      // Update the item at the current edit index with the new values
      items[currentEditIndex] = updatedItem;

      // Save the updated items array back to localStorage
      localStorage.setItem("stockItems", JSON.stringify(items));

      // Reload the items to update the UI with the edited item
      loadItems();

      // Close the edit item modal
      toggleModal(editItemModal);

      ToastMessage("Item updated! ", "#40A578", "_", 3000);
    });
  }

  // Overlay -------
  if (overlay) {
    // Hide modals when overlay is clicked
    overlay.addEventListener("click", () => {
      // Check if either modals exist
      if (
        addItemModal ||
        editItemModal ||
        addBatchModal ||
        addProductModal ||
        addFinanceModal
      ) {
        if (addItemModal) handleModalHideAnimation(addItemModal);
        if (editItemModal) handleModalHideAnimation(editItemModal);
        if (addBatchModal) handleModalHideAnimation(addBatchModal);
        if (addProductModal) handleModalHideAnimation(addProductModal);
        if (addFinanceModal) handleModalHideAnimation(addFinanceModal);
      }
    });
  }

  // TODO: Add features to perfom crud
  if (addBatchForm) {
    addBatchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleModalHideAnimation(addBatchModal);
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

  // Loading -----------
  loadItems();
  loadExpirtyItems();

  const currentUser = getCurrentUser();
  if (currentUser) {
    setRoleRestrictions(currentUser); // Apply role restrictions on page load
  }
});

// //   Filtering the items --------------
// document.addEventListener("DOMContentLoaded", function () {
//   const searchInput = document.getElementById("stockSearch");
//   const items = document.querySelectorAll(".card__details");
//   const cardHeading = document.querySelector(".card_Heading");
//   const hrElements = document.querySelectorAll(".card hr");

//   if (searchInput) {
//     searchInput.addEventListener("input", function () {
//       const searchTerm = searchInput.value.toLowerCase();
//       let visibleItems = 0;

//       items.forEach((item) => {
//         const itemName = item.querySelector("p").textContent.toLowerCase();
//         if (itemName.includes(searchTerm)) {
//           item.style.display = "";
//           visibleItems++;
//         } else {
//           item.style.display = "none";
//         }
//       });

//       // Show or hide hr elements based on visible items
//       hrElements.forEach((hr, index) => {
//         if (index < visibleItems) {
//           hr.style.display = "";
//         } else {
//           hr.style.display = "none";
//         }
//       });

//       // Ensure the cardHeading is always visible
//       cardHeading.style.display = visibleItems > 0 ? "" : "none";
//     });
//   }
// });

// //   Adding items to the form------------

// if (addItemForm) {
//   addItemForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const name = document.getElementById("name").value;
//     const quantity = document.getElementById("Quantity").value;
//     const unit = document.getElementById("UnitOfMeasurement").value;
//     const expiryDate = document.getElementById("expirydate").value;

//     const newItem = document.createElement("div");
//     newItem.classList.add("card__details");
//     newItem.innerHTML = `

//             <p>${name}</p>
//             <p>${quantity}</p>
//             <p>${unit}</p>
//             <p>${expiryDate}</p>
//             <span>
//             <i class="fa-regular fa-pen-to-square card__Btn"></i>
//             <i class="fa-regular fa-trash-can card__Btn"></i>
//             </span>
//           `;

//     const card = document.querySelector(".card");
//     const hr = document.createElement("hr");

//     card.appendChild(hr);
//     card.appendChild(newItem);
//     card.appendChild(hr);

//     // Clear the form
//     addItemForm.reset();

//     // Hide the modal
//     addItemModal.classList.add("hidden");
//     overlay.classList.add("hidden");
//   });
// }

// //   function to remove the item from the list when trash button is clicked
// const card = document.querySelector(".card");
// if (card) {
//   card.addEventListener("click", (event) => {
//     if (event.target.classList.contains("fa-trash-can")) {
//       const cardDetails = event.target.closest(".card__details");
//       const hr = cardDetails.nextElementSibling;
//       cardDetails.remove();
//       hr.remove();
//     }
//   });

//   //function for the edit button
//   card.addEventListener("click", (event) => {
//     if (event.target.classList.contains("fa-pen-to-square")) {
//       const cardDetails = event.target.closest(".card__details");
//       const hr = cardDetails.nextElementSibling;

//       // Get the values from the card details
//       const name = cardDetails.children[0].textContent;
//       const quantity = cardDetails.children[1].textContent;
//       const unit = cardDetails.children[2].textContent;
//       const expiryDate = cardDetails.children[3].textContent;

//       // Fill the form with the values
//       document.getElementById("editname").value = name;
//       document.getElementById("editQuantity").value = quantity;
//       document.getElementById("editUnitOfMeasurement").value = unit;
//       document.getElementById("editexpirydate").value = expiryDate;

//       // Show the modal
//       editItemModal.classList.remove("hidden");
//       overlay.classList.remove("hidden");
//     }
//   });
// }

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

/**
 * Creates a toast message with customizable background color and font color.
 * Source: [Toastify Documentation](https://github.com/apvarun/toastify-js/blob/master/README.md)
 * @param {string} message - The message to be displayed in the toast.
 * @param {string} backgroundColor - The background color of the toast. Defaults to a gradient from green to light green.
 * @param {string} fontColor - The font color of the toast message. Defaults to white.
 * @param {number} duration - The duration in milliseconds for which the toast message should be displayed. Defaults to 1000ms.
 * @param {string} gravity - The gravity direction for the toast message. 'top' or  'bottom'
 * @param {string} position - The position of the toast message.  'left','center' or 'right'
 */
function ToastMessage(
  Message,
  BackgroundColor = "Black",
  FontColor = "white",
  Duration = 1000,
  Gravity = "top",
  Position = "right"
) {
  Toastify({
    text: Message,
    duration: Duration,
    gravity: Gravity, // 'top' or  'bottom'
    position: Position, //'left','center' or 'right'

    style: {
      background: BackgroundColor,
      color: FontColor,
    },
  }).showToast();
}
