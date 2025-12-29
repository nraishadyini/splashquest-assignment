
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
// DESTINATION 
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
// LOGIN & REGISTER SYSTEM 
// ===============================
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

// Toggle forms
if(showRegister){
  showRegister.addEventListener("click", e => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });
}

if(showLogin){
  showLogin.addEventListener("click", e => {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });
}

// REGISTER
if(registerForm){
  registerForm.addEventListener("submit", e => {
    e.preventDefault();

    const u = document.getElementById("regUsername").value.trim();
    const p = document.getElementById("regPassword").value.trim();
    const status = document.getElementById("registerStatus");

    if(!u || !p){
      status.textContent = "Please fill all fields.";
      status.style.color = "red";
      return;
    }

    localStorage.setItem("user_" + u, p);
    status.textContent = "Account created successfully! Please login.";
    status.style.color = "green";

    setTimeout(() => {
      registerForm.style.display = "none";
      loginForm.style.display = "block";
    }, 1000);
  });
}

// LOGIN
if(loginForm){
  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const u = document.getElementById("loginUsername").value.trim();
    const p = document.getElementById("loginPassword").value.trim();
    const status = document.getElementById("loginStatus");

    const savedPass = localStorage.getItem("user_" + u);

    if(savedPass === null){
      status.textContent = "Account not found.";
      status.style.color = "red";
      return;
    }

    if(savedPass !== p){
      status.textContent = "Incorrect password.";
      status.style.color = "red";
      return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", u);

    status.textContent = "Login successful! Redirecting...";
    status.style.color = "green";

    setTimeout(() => {
      location.hash = "#home";
    }, 800);
  });
}




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
      "Post sent successfully.";
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


