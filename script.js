// ===============================
// SPA NAVIGATION
// ===============================
const links = Array.from(document.querySelectorAll("[data-link]"));
const pages = Array.from(document.querySelectorAll("section[data-page]"));
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

function setActivePage(pageId){
  pages.forEach(s => s.classList.toggle("active", s.dataset.page === pageId));
  links.forEach(a => a.classList.toggle("active", a.dataset.link === pageId));
  nav.classList.remove("open");
}

function pageFromHash(){
  const hash = (location.hash || "#home").replace("#","");
  const exists = pages.some(s => s.dataset.page === hash);
  return exists ? hash : "home";
}

window.addEventListener("hashchange", () => setActivePage(pageFromHash()));

links.forEach(a => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    location.hash = a.getAttribute("href");
  });
});

navToggle.addEventListener("click", () => nav.classList.toggle("open"));
setActivePage(pageFromHash());

// ===============================
// HOME BUTTON
// ===============================
const planBtn = document.getElementById("planTripBtn");
if(planBtn){
  planBtn.addEventListener("click", () => {
    location.hash = "#destination";
  });
}

// ===============================
// DESTINATION FILTER
// ===============================
const destinations = [
  { name: "Pulau Tioman", tags: ["island","family"], img: "assets/dest-tioman.jpg" },
  { name: "Sipadan", tags: ["diving"], img: "assets/dest-sipadan.jpeg" },
  { name: "Langkawi", tags: ["island","family"], img: "assets/dest-langkawi.jpg" },
  { name: "Redang", tags: ["island","eco"], img: "assets/dest-redang.jpg" },
  { name: "Perhentian", tags: ["island","eco"], img: "assets/dest-tioman.jpg" },
  { name: "Mabul", tags: ["diving","eco"], img: "assets/dest-sipadan.jpeg" }
];

const destGrid = document.getElementById("destGrid");
const filterWrap = document.getElementById("filters");

function renderDestinations(filter){
  if(!destGrid) return;
  destGrid.innerHTML = "";

  const list = destinations.filter(d =>
    filter === "all" ? true : d.tags.includes(filter)
  );

  list.forEach(d => {
    const card = document.createElement("div");
    card.className = "panel center";
    card.innerHTML = `
      <img class="media-img" src="${d.img}" alt="${d.name}">
      <div class="muted mt10">${d.name}</div>
      <div class="muted small mt10">${d.tags.map(t => "#" + t).join(" ")}</div>
    `;
    destGrid.appendChild(card);
  });
}

if(filterWrap){
  filterWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if(!btn) return;

    document.querySelectorAll(".pill")
      .forEach(p => p.classList.toggle("active", p === btn));

    renderDestinations(btn.dataset.filter);
  });
}

renderDestinations("all");

// ===============================
// LOGIN SYSTEM (DEMO)
// ===============================
const loginForm = document.getElementById("loginForm");

if(loginForm){
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const status = document.getElementById("loginStatus");

    if(username === "" || password === ""){
      status.textContent = "Please enter your username and password.";
      status.style.color = "red";
      return;
    }

    // SAVE LOGIN STATUS (DEMO)
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);

    status.textContent = "Login successful! Redirecting...";
    status.style.color = "green";

    setTimeout(() => {
      location.hash = "#home";
    }, 800);
  });
}

// ===============================
// SOCIAL LOGIN DEMO
// ===============================
const socialButtons = document.querySelectorAll(".social");

socialButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    let provider = btn.title;
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", provider + "_user");

    const status = document.getElementById("loginStatus");
    status.textContent = `Login successful via ${provider}! Redirecting...`;
    status.style.color = "green";

    setTimeout(() => {
      location.hash = "#home";
    }, 800);
  });
});

// ===============================
// PROTECT CONVERSATION PAGE
// ===============================
const postForm = document.getElementById("postForm");

if(postForm){
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(!localStorage.getItem("loggedIn")){
      document.getElementById("postStatus").textContent =
        "Please login first to post.";
      return;
    }

    document.getElementById("postStatus").textContent =
      "Post sent successfully (demo).";
    e.target.reset();
  });
}

// ===============================
// CONTACT FORM
// ===============================
const contactForm = document.getElementById("contactForm");

if(contactForm){
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("contactStatus").textContent =
      "Message sent successfully. Thank you!";
    e.target.reset();
  });
}

// ===============================
// AUTO LOGIN CHECK
// ===============================
window.addEventListener("load", () => {
  if(localStorage.getItem("loggedIn")){
    console.log("User logged in:", localStorage.getItem("username"));
  }
});
