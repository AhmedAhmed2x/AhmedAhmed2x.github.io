/* ==========================================================
   Tiger Home Health Care, LLC
   Content lives in data objects at the top so the site can later
   move to a framework (React, Vue, etc.) or a CMS with minimal rework.
   ========================================================== */

const CONFIG = {
  email: "info@tigerhomehealth.com",
  // Set to a secure form-service URL later. Empty = email fallback.
  formEndpoint: ""
};

const SERVICES = [
  {
    id: "personal-care", title: "Personal Care", icon: "fa-person",
    tags: "Bathing \u2022 Grooming \u2022 Dressing",
    description: "Personal care support can assist individuals with daily personal routines while promoting comfort, dignity, and independence.",
    includes: ["Bathing", "Grooming", "Dressing", "Personal hygiene", "Daily personal routines"],
    benefit: "Individuals who would like help with personal routines while keeping as much independence as possible."
  },
  {
    id: "meal-preparation", title: "Meal Preparation", icon: "fa-utensils",
    tags: "Meals \u2022 Planning \u2022 Routines",
    description: "Support that helps keep regular, nourishing meals part of each day.",
    includes: ["Meal preparation", "Basic kitchen assistance", "Meal planning support", "Maintaining regular meal routines"],
    benefit: "Individuals who find cooking tiring or who want help keeping consistent meal habits."
  },
  {
    id: "personal-assistance", title: "Personal Assistance", icon: "fa-hands-holding-heart",
    tags: "Daily activities \u2022 Routines",
    description: "Hands-on help with everyday activities so each day runs more smoothly.",
    includes: ["Activities of daily living", "Daily routines", "Personal needs", "Household-related assistance"],
    benefit: "Individuals who need a steady helping hand with daily tasks at home."
  },
  {
    id: "respite-care", title: "Respite Care", icon: "fa-people-arrows",
    tags: "Breaks \u2022 Rest \u2022 Family support",
    description: "Respite care gives family caregivers time away, knowing their loved one is receiving appropriate support.",
    includes: ["Time to take a break", "Time to attend appointments", "Time to handle personal responsibilities", "Rest while your loved one receives support"],
    benefit: "Family caregivers who need rest or time for their own responsibilities."
  },
  {
    id: "homemaking", title: "Homemaking", icon: "fa-house-chimney",
    tags: "Housekeeping \u2022 Laundry",
    description: "Help keeping the home tidy, organized, and comfortable.",
    includes: ["Light housekeeping", "Laundry", "Organization", "Maintaining a comfortable home environment"],
    benefit: "Individuals who want a clean, orderly home without the physical strain."
  },
  {
    id: "medication-reminders", title: "Medication Reminders", icon: "fa-pills",
    tags: "Timely reminders",
    description: "Friendly reminders to help clients keep up with the medication routine they have already been given.",
    includes: ["Reminders at scheduled times", "Support staying on a routine"],
    benefit: "Individuals who sometimes forget a scheduled dose and would like a reminder.",
    note: "Tiger Home Health Care provides medication reminders only. We do not administer medication."
  },
  {
    id: "errands", title: "Errands", icon: "fa-bag-shopping",
    tags: "Groceries \u2022 Pickups",
    description: "Support with the everyday errands that keep a household running.",
    includes: ["Grocery shopping", "Picking up items", "Everyday errands", "Assistance with routine tasks"],
    benefit: "Individuals who find getting out to do errands difficult or tiring."
  },
  {
    id: "companionship", title: "Companionship", icon: "fa-user-group",
    tags: "Conversation \u2022 Activities",
    description: "Meaningful time together that helps reduce isolation and brings more connection to the day.",
    includes: ["Conversation", "Social interaction", "Activities", "Reducing isolation", "Meaningful companionship"],
    benefit: "Individuals who spend much of the day alone or would enjoy regular company."
  },
  {
    id: "appointment-support", title: "Appointment Support", icon: "fa-calendar-check",
    tags: "Prepare \u2022 Organize \u2022 Accompany",
    description: "Help getting ready for appointments and having support along the way.",
    includes: ["Helping clients prepare for appointments", "Helping organize what they need", "Accompanying them for support"],
    benefit: "Individuals who feel more confident with someone beside them at appointments."
    // Intentionally no mention of transportation. Add only if Tiger offers it.
  }
];

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- Footer year ---------- */
$("#current-year").textContent = new Date().getFullYear();

/* ---------- Logo fallback (shows text if logo file is missing) ---------- */
const logo = $(".brand-logo");
logo.addEventListener("error", () => { logo.hidden = true; $(".brand-text").hidden = false; });
const footerLogo = $(".footer-logo");
footerLogo.addEventListener("error", () => { footerLogo.hidden = true; });

/* ---------- Insurance logo fallback ---------- */
$$(".ins-logo img").forEach(img => {
  const mark = () => { img.hidden = true; img.parentElement.classList.add("no-logo"); };
  img.addEventListener("error", mark);
  if (img.complete && img.naturalWidth === 0) mark();
});

/* ---------- Mobile menu ---------- */
const menuToggle = $("#menu-toggle");
const nav = $("#main-nav");
function setMenu(open) {
  nav.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuToggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
$$("a", nav).forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* ---------- Highlight current section in nav ---------- */
const navLinks = $$(".main-nav ul a");
const sections = navLinks.map(a => $(a.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => io.observe(s));
}

/* ---------- Services: render cards + select options ---------- */
const grid = $("#services-grid");
const serviceSelect = $("#service");

SERVICES.forEach(s => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "service-card";
  card.dataset.service = s.id;
  card.setAttribute("aria-haspopup", "dialog");
  card.innerHTML = `
    <span class="service-icon"><i class="fa-solid ${s.icon}" aria-hidden="true"></i></span>
    <h3>${s.title}</h3>
    <p class="service-tags">${s.tags}</p>
    <span class="service-more">Learn more <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>`;
  grid.appendChild(card);

  const opt = document.createElement("option");
  opt.textContent = s.title;
  serviceSelect.appendChild(opt);
});
const other = document.createElement("option");
other.textContent = "Other";
serviceSelect.appendChild(other);

/* ---------- Service modal ---------- */
const modal = $("#service-modal");
let currentService = null;
let lastFocus = null;

function openService(id, trigger) {
  const s = SERVICES.find(x => x.id === id);
  if (!s) return;
  currentService = s;
  lastFocus = trigger;
  $("#modal-title").textContent = s.title;
  $("#modal-desc").textContent = s.description;
  $("#modal-benefit").textContent = s.benefit;
  $("#modal-icon").innerHTML = `<i class="fa-solid ${s.icon}" aria-hidden="true"></i>`;
  const list = $("#modal-includes");
  list.innerHTML = "";
  s.includes.forEach(item => { const li = document.createElement("li"); li.textContent = item; list.appendChild(li); });
  const note = $("#modal-note");
  note.hidden = !s.note;
  note.textContent = s.note || "";
  modal.showModal();
}

grid.addEventListener("click", e => {
  const card = e.target.closest(".service-card");
  if (card) openService(card.dataset.service, card);
});
$("#modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); }); // backdrop click
modal.addEventListener("close", () => { if (lastFocus) lastFocus.focus(); });

$("#modal-request").addEventListener("click", e => {
  e.preventDefault();
  if (currentService) serviceSelect.value = currentService.title;
  modal.close();
  lastFocus = null;
  $("#contact").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => $("#name").focus({ preventScroll: true }), 600);
});

/* ---------- Who we serve accordions ---------- */
$$(".serve-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
  });
});

/* ---------- Contact form ---------- */
const form = $("#contact-form");
const statusEl = $("#form-status");

function setError(field, msg) {
  const wrap = field.closest(".field");
  const err = $(".error", wrap);
  wrap.classList.toggle("invalid", Boolean(msg));
  field.setAttribute("aria-invalid", msg ? "true" : "false");
  if (err) err.textContent = msg;
  if (err) field.setAttribute("aria-describedby", err.id);
}

function validate() {
  const name = form.name, phone = form.phone, email = form.email;
  let ok = true;
  setError(name, name.value.trim() ? "" : "Please enter your name.");
  if (!name.value.trim()) ok = false;

  const hasPhone = phone.value.trim(), hasEmail = email.value.trim();
  const digits = phone.value.replace(/\D/g, "");
  let phoneMsg = "", emailMsg = "";
  if (!hasPhone && !hasEmail) { phoneMsg = "Please give a phone number or email so we can reach you."; ok = false; }
  else {
    if (hasPhone && digits.length < 10) { phoneMsg = "Please enter a 10-digit phone number."; ok = false; }
    if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { emailMsg = "Please enter a valid email address."; ok = false; }
  }
  setError(phone, phoneMsg);
  setError(email, emailMsg);
  return ok;
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  statusEl.className = "form-status";
  statusEl.textContent = "";
  if (!validate()) {
    const firstBad = $("[aria-invalid='true']", form);
    if (firstBad) firstBad.focus();
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  const endpoint = form.dataset.endpoint || CONFIG.formEndpoint;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Request failed");
      form.reset();
      statusEl.className = "form-status success";
      statusEl.textContent = "Thank you. Our team will follow up with you soon.";
    } catch (err) {
      statusEl.className = "form-status fail";
      statusEl.innerHTML = 'We could not send your request. Please call <a href="tel:+12164903633">216-490-3633</a>.';
    }
    return;
  }

  // No secure backend yet: open the visitor's email app with a pre-filled message.
  const body = [
    `Name: ${data.name}`, `Phone: ${data.phone || "-"}`, `Email: ${data.email || "-"}`,
    `Service: ${data.service || "-"}`, "", data.message || ""
  ].join("\n");
  window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Service request from website")}&body=${encodeURIComponent(body)}`;
  statusEl.className = "form-status success";
  statusEl.textContent = "Your email app should open with your request ready to send. If it doesn't, call 216-490-3633.";
});

$$("input, textarea", form).forEach(el => el.addEventListener("input", () => {
  if (el.getAttribute("aria-invalid") === "true") setError(el, "");
}));
