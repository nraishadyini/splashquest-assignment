// ===== SPA NAV (switch sections) =====
const links = Array.from(document.querySelectorAll("[data-link]"));
const pages = Array.from(document.querySelectorAll("section[data-page]"));
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

function setActivePage(pageId){
  pages.forEach(s => s.classList.toggle("active", s.dataset.page === pageId));
  links.forEach(a => a.classList.toggle("active", a.dataset.link === pageId));
  nav.classList.remove("open"); // close mobile menu
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

// HOME button: go to destination page
const planBtn = document.getElementById("planTripBtn");
if(planBtn){
  planBtn.addEventListener("click", () => { location.hash = "#destination"; });
}

// ===== DESTINATIONS (filter demo) =====
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

  const list = destinations.filter(d => filter === "all" ? true : d.tags.includes(filter));
  destGrid.innerHTML = "";

  list.forEach(d => {
    const card = document.createElement("div");
    card.className = "panel center";

    card.innerHTML = `
  <img class="media-img" src="${d.img}" alt="${d.name}">
  <div class="muted" style="margin-top:10px;font-size:13px;">${d.name}</div>
  <div class="muted" style="margin-top:6px;font-size:11px;">
    ${d.tags.map(t => "#" + t).join(" ")}
  </div>
`;


    destGrid.appendChild(card);
  });
}

if(filterWrap){
  filterWrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if(!btn) return;

    const filter = btn.dataset.filter;

    Array.from(filterWrap.querySelectorAll(".pill"))
      .forEach(p => p.classList.toggle("active", p === btn));

    renderDestinations(filter);
  });
}

renderDestinations("all");

// ===== FORMS (demo only) =====
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();
    const status = document.getElementById("loginStatus");
    status.textContent = (u && p)
      ? "Login demo: success (no backend connected)."
      : "Please fill in username & password.";
  });
}

const contactForm = document.getElementById("contactForm");
if(contactForm){
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("contactStatus").textContent =
      "Message sent (demo). Thanks for reaching out!";
    e.target.reset();
  });
}

const postForm = document.getElementById("postForm");
if(postForm){
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("postStatus").textContent =
      "Posted (demo). You can connect this to a database later.";
    e.target.reset();
  });
}
