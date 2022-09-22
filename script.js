"use strict";

///////////////////////////////////////

const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navLinksContainer = document.querySelector(".nav__links");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");

// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const message = document.createElement("div");
message.classList.add("cookie-message");

message.innerHTML =
  'We use cookies to improve functionality and analytics. <button class="btn btn--close-cookie">Okay</button>';

header.append(message);

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// Smooth scroll to first section

btnScrollTo.addEventListener("click", function () {
  // const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: "smooth" });
});

// page navigation

navLinksContainer.addEventListener("click", function (e) {
  e.preventDefault();

  //Check which el was clicked and ignore other clicks
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Tabbed component

tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  //Remove active classes

  tabs.forEach(function (t) {
    t.classList.remove("operations__tab--active");
  });

  tabContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  // Active tab
  clicked.classList.add("operations__tab--active");

  // Activate content

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
