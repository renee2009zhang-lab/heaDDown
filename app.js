import { mobilePortrait, setupMobile } from "./mobile.js";

const root = document.documentElement;
const experience = document.querySelector(".experience");
const hero = document.querySelector(".xray-hero");
const scaleInput = document.querySelector("#bone-scale");
const scaleButtons = [...document.querySelectorAll(".scale-button")];
const regionLabel = document.querySelector("#bone-region");
const title = document.querySelector("#pain-title");
const copy = document.querySelector("#pain-copy");
const nav = document.querySelector("nav");
const navLinks = [...document.querySelectorAll("nav a")];
const contentPages = [...document.querySelectorAll(".content-page")];
const painStage = document.querySelector(".pain-stage");
const muscleMap = document.querySelector(".muscle-map");
const muscleBodyHit = document.querySelector(".muscle-body-hit");
const painPageCopy = document.querySelector("#pain-page-copy");
const painModeButtons = [...document.querySelectorAll("[data-pain-mode]")];
const musclePieces = [...document.querySelectorAll(".muscle-piece")];
const muscleHighlights = [...document.querySelectorAll(".muscle-highlight")];
const muscleNoises = [...document.querySelectorAll(".muscle-noise")];
const muscleFlashes = [...document.querySelectorAll(".muscle-flash")];
const muscleImage = document.querySelector(".muscle-image");
const localHeat = document.querySelector(".local-heat");
const localTingle = document.querySelector(".local-tingle");
const boneScroll = document.querySelector(".bone-scroll");
const boneGallery = document.querySelector(".bone-gallery");
const boneGalleryList = document.querySelector("#bone-gallery-list");
const boneNext = document.querySelector("[data-bone-next]");
const boneCheckin = document.querySelector("#bone-checkin");
const boneCheckinBegin = document.querySelector("[data-checkin-begin]");
const boneQuestionStage = document.querySelector(".bone-question-stage");
const boneMediaViewer = document.querySelector(".bone-media-viewer");
const boneMediaClose = document.querySelector(".bone-media-close");
const boneMediaDetail = document.querySelector(".bone-media-detail");
const habitShell = document.querySelector(".habits-shell");
const habitCarousel = document.querySelector("[data-habit-carousel]");
const habitCards = [...document.querySelectorAll("[data-habit-card]")];
const habitStatus = document.querySelector("[data-habit-status]");
const habitDetail = document.querySelector("[data-habit-detail]");
const habitDetailTopic = document.querySelector("[data-habit-detail-topic]");
const habitDetailTitle = document.querySelector("#habit-detail-title");
const habitDetailText = document.querySelector(".habit-detail-text");
const habitDetailInteraction = document.querySelector(".habit-detail-interaction");
const habitDetailImage = document.querySelector("[data-habit-detail-image]");
const habitImagePlaceholder = document.querySelector("[data-habit-image-placeholder]");
const habitDetailBack = document.querySelector("[data-habit-close]");
const reliefStage = document.querySelector("[data-relief-stage]");
const reliefIntro = document.querySelector("[data-relief-intro]");
const reliefNext = document.querySelector("[data-relief-next]");
const reliefSlider = document.querySelector("[data-relief-slider]");
const reliefThumb = document.querySelector("[data-relief-thumb]");
const reliefEnvelopes = [...document.querySelectorAll("[data-relief-envelope]")];
const reliefEnvelopeToggles = [...document.querySelectorAll("[data-envelope-toggle]")];
const reliefStamps = [...document.querySelectorAll("[data-relief-stamp]")];
const reliefLightbox = document.querySelector("[data-relief-lightbox]");
const reliefLightboxClose = document.querySelector("[data-relief-lightbox-close]");
const reliefStampNumber = document.querySelector("[data-relief-stamp-number]");
const reliefLightboxImage = document.querySelector("[data-relief-lightbox-image]");
const reliefLightboxTitle = document.querySelector("#relief-lightbox-title");
let heatArrival = null;
let activeHabitIndex = 0;
let activeHabitCard = null;
let habitTransitionLocked = false;
let habitWheelGesture = false;
let habitWheelTimer = null;
let habitTransitionTimer = null;
let habitDetailTimer = null;
let reliefDrag = null;
let reliefPosition = 0;
let reliefComplete = false;
let reliefUnlockTimer = null;

const habitDetails = {
  POSTURE: {
    image: "./assets/images/habit-posture-detail.png",
    imageAlt: "Five figures showing increasing cervical spine load as the head tilts forward",
    title: "A small tilt. A heavier load.",
    text: "0°  —  4.5–5.4 kg / 10–12 lbs\n15° —  12.2 kg / 27 lbs\n30° —  18.1 kg / 40 lbs\n45° —  22.2 kg / 49 lbs\n60° —  27.2 kg / 60 lbs",
    interaction: "As your head tilts forward, the estimated load on your cervical spine increases. It's a movement we repeat every day, often without noticing.",
  },
  DURATION: {
    image: "./assets/images/habit-duration-detail.png",
    imageAlt: "A person sitting at a desk and leaning toward a computer",
    title: "How long have you been sitting?",
    text: "every 30 min",
    interaction: "Your neck needs a change of position.\n\nStaying in one position for too long can leave your neck and shoulders stiff and sore.\n\nTry getting up or changing position every 30 minutes, even just for a moment.",
  },
  MOVEMENT: {
    image: "./assets/images/habit-movement-detail.jpg",
    imageAlt: "Exercise and stretching silhouettes with mobility equipment",
    title: "KEEP MOVING",
    text: "How much do you move?",
    interaction: "Regular physical activity helps support muscle strength and mobility. You don't need an intense workout—walking, stretching, and everyday movement all count.",
  },
  STRESS: {
    image: "./assets/images/habit-stress-detail.jpg",
    imageAlt: "An illustration of stress and emotions",
    title: "Stress and neck pain feed each other.",
    text: "Go easy on yourself.",
    interaction: "Mental stress can tighten your neck and shoulder muscles, while physical discomfort can add to your stress. The two can become a cycle.",
  },
  SLEEP: {
    image: "./assets/images/habit-sleep-detail.png",
    imageAlt: "A person sleeping beneath dark bedding",
    title: "Less sleep, more discomfort.",
    text: "The hours you give yourself.",
    interaction: "Not getting enough sleep may make neck pain feel worse. And when your neck hurts, falling asleep or staying asleep can become harder.",
  },
};

const bones = [
  { id: "occipital", name: "occipital bone", region: "skull base", x: 50, y: 6.1, w: 16, h: 5.4, copy: "The back of the skull forms the upper anchor where the neck begins." },
  { id: "c1", name: "C1 atlas", region: "upper cervical vertebra", x: 50, y: 9.8, w: 12, h: 3.2, copy: "C1 sits just under the skull. It supports the head like a quiet ring.", guide: 0 },
  { id: "c2", name: "C2 axis", region: "upper cervical vertebra", x: 50, y: 12.2, w: 12, h: 3.2, copy: "C2 helps the head rotate. It is one of the first bones affected by looking down.", guide: 1 },
  { id: "c3", name: "C3 vertebra", region: "upper-middle cervical vertebra", x: 50, y: 14.2, w: 11.8, h: 3.2, copy: "C3 belongs to the flexible column between the skull and shoulders.", guide: 2 },
  { id: "c4", name: "C4 vertebra", region: "middle cervical vertebra", x: 50, y: 16.4, w: 11.8, h: 3.2, copy: "C4 sits near the middle of the neck, where the column narrows and stacks.", guide: 3 },
  { id: "c5", name: "C5 vertebra", region: "middle-lower cervical vertebra", x: 50, y: 18.9, w: 11.8, h: 3.2, copy: "C5 is close to the routes that continue toward the shoulder and upper arm.", guide: 4 },
  { id: "c6", name: "C6 vertebra", region: "lower cervical vertebra", x: 50, y: 21.1, w: 12, h: 3.3, copy: "C6 is low in the neck, near the transition into the shoulder line.", guide: 5 },
  { id: "c7", name: "C7 vertebra", region: "lower cervical vertebra", x: 50, y: 23.2, w: 12.4, h: 3.4, copy: "C7 is the prominent base of the neck, a hinge between neck and upper back.", guide: 6 },
  { id: "t1", name: "T1 vertebra", region: "thoracic vertebra", x: 50, y: 26.5, w: 11.8, h: 3.4, copy: "T1 begins the upper back section and connects visually with the first ribs.", guide: 7 },
  { id: "t2", name: "T2 vertebra", region: "thoracic vertebra", x: 50, y: 30, w: 12.2, h: 3.5, copy: "T2 sits inside the upper back, where ribs, shoulder blades, and posture meet.", guide: 8 },
  { id: "t3", name: "T3 vertebra", region: "thoracic vertebra", x: 50, y: 33.6, w: 12.6, h: 3.6, copy: "T3 is between the shoulder blades, part of the upper back's central stack.", guide: 9 },
  { id: "t4", name: "T4 vertebra", region: "thoracic vertebra", x: 50, y: 37.5, w: 13, h: 3.7, copy: "T4 continues the thoracic curve beneath the shoulder blade area.", guide: 10 },
  { id: "t5", name: "T5 vertebra", region: "thoracic vertebra", x: 50, y: 41.7, w: 13.4, h: 3.8, copy: "T5 sits lower in the visible upper back, where the rib cage frames the spine.", guide: 11 },
  { id: "left-clavicle", name: "left clavicle", region: "collarbone", x: 28.6, y: 31.6, w: 35, h: 3.4, rotate: -1, shapeClip: "polygon(6% 27%, 13% 25.5%, 25% 26.6%, 38% 29%, 50% 32.5%, 48% 36.6%, 36% 34.2%, 23% 32.3%, 10% 32.5%)", copy: "The clavicle is the front bridge from the chest toward the shoulder." },
  { id: "right-clavicle", name: "right clavicle", region: "collarbone", x: 71.4, y: 31.6, w: 35, h: 3.4, rotate: 1, shapeClip: "polygon(94% 27%, 87% 25.5%, 75% 26.6%, 62% 29%, 50% 32.5%, 52% 36.6%, 64% 34.2%, 77% 32.3%, 90% 32.5%)", copy: "The clavicle helps hold the shoulder away from the rib cage." },
  { id: "left-scapula", name: "left scapula", region: "shoulder blade", x: 18.8, y: 41.6, w: 17, h: 16, rotate: -18, shapeClip: "polygon(6% 34%, 13% 31%, 25% 32%, 34% 38%, 31% 47%, 25% 58%, 17% 62%, 10% 54%, 7% 44%)", copy: "The scapula is the shoulder blade, a wide bone that glides over the rib cage." },
  { id: "right-scapula", name: "right scapula", region: "shoulder blade", x: 81.2, y: 41.6, w: 17, h: 16, rotate: 18, shapeClip: "polygon(94% 34%, 87% 31%, 75% 32%, 66% 38%, 69% 47%, 75% 58%, 83% 62%, 90% 54%, 93% 44%)", copy: "The scapula forms the back of the shoulder and connects motion to the ribs." },
  { id: "left-humerus", name: "left humeral head", region: "upper arm bone", x: 6.8, y: 35.8, w: 11.2, h: 9.8, shapeClip: "polygon(0% 31%, 5% 29%, 11% 29.5%, 16% 33%, 18% 40%, 16% 49%, 11% 52%, 5% 48%, 1% 41%)", copy: "The humeral head is the rounded top of the upper arm bone." },
  { id: "right-humerus", name: "right humeral head", region: "upper arm bone", x: 93.2, y: 35.8, w: 11.2, h: 9.8, shapeClip: "polygon(100% 31%, 95% 29%, 89% 29.5%, 84% 33%, 82% 40%, 84% 49%, 89% 52%, 95% 48%, 99% 41%)", copy: "The humeral head rotates beside the shoulder blade socket." },
];

const muscles = {
  "facial-muscles": {
    name: "facial muscles",
    copy: "The facial muscles shape expression and jaw movement. Tension here can gather around the temples, cheeks, and jaw line.",
  },
  "left-scm": {
    name: "left sternocleidomastoid",
    copy: "A front-neck muscle that turns and tilts the head. Tension here can feel sharp, pulling, or travel toward the jaw and skull base.",
  },
  "right-scm": {
    name: "right sternocleidomastoid",
    copy: "A front-neck muscle that helps rotate the head. It often reacts to forward-head posture and long screen focus.",
  },
  "left-trapezius": {
    name: "left upper trapezius",
    copy: "The upper trapezius lifts and steadies the shoulder. This is the classic neck-shoulder ache zone.",
  },
  "right-trapezius": {
    name: "right upper trapezius",
    copy: "The upper trapezius carries load from the neck into the shoulder line, where soreness and stiffness often collect.",
  },
  "left-pectoralis": {
    name: "left pectoralis major",
    copy: "The pectoralis major draws the shoulder forward. When tight, it can make the upper back work harder.",
  },
  "right-pectoralis": {
    name: "right pectoralis major",
    copy: "The pectoralis major sits across the front chest and can pull the shoulder inward during curled posture.",
  },
  "left-deltoid": {
    name: "left deltoid",
    copy: "The deltoid wraps the shoulder cap and responds to reaching, lifting, and held arm positions.",
  },
  "right-deltoid": {
    name: "right deltoid",
    copy: "The deltoid covers the shoulder and helps lift and move your arm.",
  },
  "left-biceps": {
    name: "left biceps brachii",
    copy: "The biceps brachii flexes the elbow and helps lift the arm. Repeated reaching can leave this front-arm line feeling heavy.",
  },
  "right-biceps": {
    name: "right biceps brachii",
    copy: "The biceps brachii works across the front of the upper arm, especially when the arm stays lifted or bent for a long time.",
  },
  "left-oblique": {
    name: "left external oblique",
    copy: "The external oblique supports rotation and side bending. One-sided bracing can make this flank feel tight and compressed.",
  },
  "right-oblique": {
    name: "right external oblique",
    copy: "The external oblique helps stabilize the trunk during rotation and can hold tension when the body leans or twists.",
  },
  "rectus-abdominis": {
    name: "rectus abdominis",
    copy: "The rectus abdominis stacks down the front trunk. In this map it helps show how pain can continue below the rib line.",
  },
};

const boneExperienceConfig = {
  gallery: [
    {
      image: "./assets/images/bone-data-young-map.png",
      alt: "World map of neck pain prevalence among 10 to 24 year-olds in 2019",
      title: "Neck Pain Prevalence Among 10-24 Year-olds in 2019",
      description: "",
      eyebrow: "YOUNG PEOPLE",
      stat: "10.32 MILLION",
      detailTitle: "Neck pain doesn't wait until you're older.",
      detail: [
        "In 2021, an estimated 10.32 million children and adolescents worldwide were living with neck pain, compared with 8.49 million in 1990.",
        "For many young people, neck pain is already part of everyday life, not something that only begins in adulthood.",
      ],
      source: "Source: GBD 2021, Frontiers in Neurology (2025).",
      ratio: "3 / 2",
      opacity: .82,
      kind: "data",
    },
    {
      image: "./assets/images/bone-data-age-chart.png",
      alt: "Neck pain chart showing male and female cases and prevalence by age",
      title: "Global, regional, and national burden of neck pain, 1990–2020, and projections to 2050",
      description: "",
      eyebrow: "GLOBAL BURDEN",
      stat: "203 MILLION",
      detailTitle: "More people are living with neck pain than ever before.",
      detail: [
        "The estimated number of people worldwide living with neck pain rose from 115 million in 1990 to 203 million in 2020.",
        "By 2050, that number could reach 269 million.",
        "Behind these numbers are millions of people dealing with discomfort in their everyday lives.",
      ],
      source: "Source: The Lancet Rheumatology (2024). The 2050 figure is a projection.",
      ratio: "1423 / 792",
      opacity: .78,
      kind: "data",
    },
    {
      image: "./assets/images/bone-data-phone-posture.png",
      alt: "Woman looking down at her phone",
      title: "Everyday screen posture",
      description: "",
      eyebrow: "EVERYDAY HABITS",
      stat: "LOOK DOWN. REPEAT.",
      detailTitle: "How often do you notice your posture?",
      detail: [
        "Studying, scrolling, typing, and watching videos can keep us in the same position for hours.",
        "We often notice how long we've been looking at a screen, but not how long our neck and shoulders have stayed still.",
        "When was the last time you changed your position?",
      ],
      ratio: "600 / 445",
      opacity: .78,
      kind: "photo",
    },
    {
      image: "./assets/images/bone-data-cervical-xray.png",
      alt: "Side-view X-ray of the cervical spine",
      title: "The growing burden of cervical spondylosis and future trends",
      description: "",
      eyebrow: "BENEATH THE SURFACE",
      stat: "WHAT YOU CAN'T SEE",
      detailTitle: "Your neck is more than what you feel on the surface.",
      detail: [
        "Seven cervical vertebrae support your head and allow it to move in different directions.",
        "Around them are muscles, joints, and nerves working together every time you look down, turn your head, or sit at your desk.",
        "What feels like a simple ache can involve more than one structure.",
      ],
      ratio: "1024 / 1536",
      opacity: .8,
      kind: "xray",
    },
  ],
  questions: [
    {
      id: "position-duration",
      type: "single",
      title: "How long have you been in the same position?",
      options: ["Less than 30 min", "30–60 min", "1–2 hours", "More than 2 hours"],
    },
    {
      id: "before-feeling",
      type: "multiple",
      title: "How do your neck and shoulders feel right now?",
      options: ["Fine", "Sore", "Stiff", "Heavy", "Tingling", "Headache"],
    },
    {
      id: "pause",
      type: "stretch",
      title: "Gently tilt your head to one side.",
      hint: "Keep your shoulder relaxed and down.",
    },
    {
      id: "after-feeling",
      type: "single",
      title: "How do your neck and shoulders feel now?",
      options: ["More relaxed", "A little better", "About the same", "More uncomfortable"],
    },
  ],
  results: {
    "More relaxed": "You don't have to wait for pain to pay attention. You can start now.",
    "A little better": "You don't have to wait for pain to pay attention. You can start now.",
    "About the same": "Not every discomfort changes quickly. Notice when it appears and what comes before it.",
    "More uncomfortable": "Stop if a movement makes you feel worse. Your body does not need to be pushed through pain.",
  },
};

let boneScale = Number(scaleInput.value);
let selectedHotspot = null;
let guideIndex = 0;
let guideDirection = 1;
let guideTimer = null;
let selectedPainMode = "soreness";
const guideHotspots = [];
let activeBoneMedia = null;
let currentBoneQuestion = 0;
const boneStretchTimers = new Set();
let boneQuestionRenderToken = 0;
let boneStretchSide = "Left side";
let boneStretchRemaining = 30;
const boneQuestionFadeDuration = 650;
let boneAnswers = {
  "position-duration": null,
  "before-feeling": [],
  "after-feeling": null,
};

function setBoneScale(value) {
  boneScale = Math.min(1.34, Math.max(0.76, Number(value)));
  root.style.setProperty("--bone-scale", boneScale.toFixed(2));
  scaleInput.value = boneScale.toFixed(2);
}

function stopGuide() {
  window.clearInterval(guideTimer);
  guideTimer = null;
  guideHotspots.forEach((hotspot) => hotspot?.classList.remove("guiding"));
  boneGuideShape.classList.remove("is-visible", "is-pulsing");
}

function showNextGuideBone() {
  const cervicalHotspots = guideHotspots.slice(0, 7).filter(Boolean);
  if (!cervicalHotspots.length) return;

  guideHotspots.forEach((hotspot) => hotspot?.classList.remove("guiding"));
  const hotspot = cervicalHotspots[guideIndex];
  const bone = bones.find(({ id }) => id === hotspot.dataset.bone);
  hotspot.classList.add("guiding");
  showBoneShape(boneGuideShape, bone, true);

  if (guideIndex === cervicalHotspots.length - 1) guideDirection = -1;
  else if (guideIndex === 0) guideDirection = 1;
  guideIndex += guideDirection;
}

function startGuide() {
  if (guideTimer || selectedHotspot) return;
  guideIndex = 0;
  guideDirection = 1;
  showNextGuideBone();
  guideTimer = window.setInterval(showNextGuideBone, 760);
}

function habitSlotFor(index) {
  let slot = index - activeHabitIndex;
  if (slot > 2) slot -= habitCards.length;
  if (slot < -2) slot += habitCards.length;
  return slot;
}

function updateHabitCarousel() {
  habitCards.forEach((card, index) => {
    const slot = habitSlotFor(index);
    const isActive = slot === 0;
    card.dataset.habitSlot = String(slot);
    card.classList.toggle("is-active", isActive);
    card.tabIndex = isActive ? 0 : -1;
    card.setAttribute("aria-current", isActive ? "true" : "false");
    card.setAttribute("aria-disabled", isActive ? "false" : "true");
  });

  if (habitStatus) {
    habitStatus.textContent = `${String(activeHabitIndex + 1).padStart(2, "0")} / ${String(habitCards.length).padStart(2, "0")}`;
  }
}

function moveHabitCarousel(direction) {
  if (!habitCards.length || habitTransitionLocked || habitDetail?.classList.contains("is-mounted")) return;
  activeHabitIndex = (activeHabitIndex + direction + habitCards.length) % habitCards.length;
  habitTransitionLocked = true;
  updateHabitCarousel();
  window.clearTimeout(habitTransitionTimer);
  habitTransitionTimer = window.setTimeout(() => {
    habitTransitionLocked = false;
  }, 760);
}

function openHabitDetail(card) {
  if (!card || card.dataset.habitSlot !== "0" || habitDetail?.classList.contains("is-mounted")) return;

  window.clearTimeout(habitDetailTimer);
  activeHabitCard = card;
  const topic = card.dataset.habitTopic;
  const detail = habitDetails[topic];
  habitDetailTopic.textContent = `${topic} / DETAIL FRAME`;
  habitDetail.dataset.habitTopic = topic.toLowerCase();

  if (detail) {
    habitDetailTitle.textContent = detail.title;
    habitDetailText.textContent = detail.text;
    habitDetailInteraction.textContent = detail.interaction;
    if (detail.image) {
      habitDetailImage.src = detail.image;
      habitDetailImage.alt = detail.imageAlt;
      habitDetailImage.hidden = false;
      habitImagePlaceholder.hidden = true;
    } else {
      habitDetailImage.removeAttribute("src");
      habitDetailImage.alt = "";
      habitDetailImage.hidden = true;
      habitImagePlaceholder.hidden = false;
    }
  } else {
    habitDetailTitle.textContent = "title placeholder";
    habitDetailText.textContent = "text placeholder";
    habitDetailInteraction.textContent = "interaction placeholder";
    habitDetailImage.removeAttribute("src");
    habitDetailImage.alt = "";
    habitDetailImage.hidden = true;
    habitImagePlaceholder.hidden = false;
  }

  card.classList.add("is-flipping");
  habitCarousel.setAttribute("aria-expanded", "true");

  habitDetailTimer = window.setTimeout(() => {
    habitDetail.classList.add("is-mounted");
    habitDetail.setAttribute("aria-hidden", "false");
    habitDetail.inert = false;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        habitCarousel.classList.add("is-detail-open");
        habitShell.classList.add("is-detail-open");
        habitDetail.classList.add("is-open");
        habitDetailBack.focus({ preventScroll: true });
      });
    });
  }, 700);
}

function closeHabitDetail(immediate = false) {
  if (!habitDetail || (!habitDetail.classList.contains("is-mounted") && !activeHabitCard)) return;
  window.clearTimeout(habitDetailTimer);

  const finishClose = () => {
    habitDetail.classList.remove("is-mounted");
    habitDetail.setAttribute("aria-hidden", "true");
    habitDetail.inert = true;
    habitCarousel.classList.remove("is-detail-open");
    habitShell.classList.remove("is-detail-open");
    habitCarousel.setAttribute("aria-expanded", "false");
    activeHabitCard?.classList.remove("is-flipping");
    if (!immediate && document.body.dataset.section === "habits") {
      activeHabitCard?.focus({ preventScroll: true });
    }
    activeHabitCard = null;
  };

  habitDetail.classList.remove("is-open");
  if (immediate) finishClose();
  else habitDetailTimer = window.setTimeout(finishClose, 720);
}

function reliefMaxTravel() {
  if (!reliefSlider || !reliefThumb) return 0;
  const styles = window.getComputedStyle(reliefSlider);
  const inset = Number.parseFloat(styles.paddingLeft) || 0;
  return Math.max(0, reliefSlider.clientWidth - reliefThumb.offsetWidth - inset * 2);
}

function setReliefPosition(nextPosition) {
  const maxTravel = reliefMaxTravel();
  reliefPosition = Math.min(maxTravel, Math.max(0, nextPosition));
  const progress = maxTravel > 0 ? reliefPosition / maxTravel : 0;
  reliefSlider.style.setProperty("--relief-x", `${reliefPosition}px`);
  reliefSlider.style.setProperty("--relief-progress", progress.toFixed(3));
  reliefThumb.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
  return progress;
}

function resetReliefExperience() {
  window.clearTimeout(reliefUnlockTimer);
  reliefDrag = null;
  reliefComplete = false;
  reliefSlider.classList.remove("is-dragging", "is-complete");
  reliefStage.classList.remove("is-unlocked");
  reliefIntro.setAttribute("aria-hidden", "false");
  reliefIntro.inert = false;
  reliefNext.setAttribute("aria-hidden", "true");
  reliefNext.inert = true;
  reliefThumb.removeAttribute("aria-disabled");
  reliefEnvelopes.forEach((envelope) => {
    envelope.classList.remove("is-open");
    envelope.querySelector("[data-envelope-toggle]")?.setAttribute("aria-expanded", "false");
    envelope.querySelector(".envelope-letter")?.setAttribute("aria-hidden", "true");
    envelope.querySelectorAll("[data-relief-stamp]").forEach((stamp) => { stamp.tabIndex = -1; });
  });
  closeReliefLightbox();
  setReliefPosition(0);
}

function closeReliefLightbox() {
  reliefLightbox.classList.remove("is-open");
  reliefLightbox.setAttribute("aria-hidden", "true");
  reliefLightbox.inert = true;
}

function openReliefLightbox(stamp) {
  const number = stamp.dataset.reliefStamp.split("-").at(-1);
  const image = stamp.dataset.reliefImage;
  const imageScroller = reliefLightboxImage.closest(".modal-image-placeholder");
  reliefStampNumber.textContent = number;
  reliefStampNumber.hidden = Boolean(image);
  reliefLightboxImage.hidden = !image;
  reliefLightboxImage.src = image || "";
  reliefLightboxImage.alt = image ? stamp.dataset.reliefTitle : "";
  reliefLightboxTitle.textContent = stamp.dataset.reliefTitle || "Coming Soon";
  if (imageScroller) imageScroller.scrollTop = 0;
  reliefLightbox.classList.add("is-open");
  reliefLightbox.setAttribute("aria-hidden", "false");
  reliefLightbox.inert = false;
  window.requestAnimationFrame(() => reliefLightboxClose.focus({ preventScroll: true }));
}

function completeReliefUnlock() {
  if (reliefComplete) return;
  reliefComplete = true;
  setReliefPosition(reliefMaxTravel());
  reliefSlider.classList.add("is-complete");
  reliefThumb.setAttribute("aria-disabled", "true");
  reliefUnlockTimer = window.setTimeout(() => {
    reliefStage.classList.add("is-unlocked");
    reliefIntro.setAttribute("aria-hidden", "true");
    reliefIntro.inert = true;
    reliefNext.setAttribute("aria-hidden", "false");
    reliefNext.inert = false;
  }, 300);
}

function settleReliefDrag(shouldComplete) {
  if (!reliefDrag) return;
  const pointerId = reliefDrag.pointerId;
  reliefDrag = null;
  reliefSlider.classList.remove("is-dragging");
  if (reliefThumb.hasPointerCapture(pointerId)) reliefThumb.releasePointerCapture(pointerId);
  if (shouldComplete) completeReliefUnlock();
  else setReliefPosition(0);
}

function setActiveSection(section) {
  const current = ["bone", "pain", "habits", "relief"].includes(section) ? section : "bone";
  const previous = document.body.dataset.section;
  document.body.dataset.section = current;
  root.dataset.section = current;
  contentPages.forEach((page) => {
    page.inert = !page.classList.contains(`${current}-page`);
  });

  if (current !== "habits") closeHabitDetail(true);
  if (current !== "relief") resetReliefExperience();

  if (current === "bone") {
    if (mobilePortrait.matches && previous !== "bone") experience.scrollTop = 0;
    if ((mobilePortrait.matches ? experience.scrollTop : window.scrollY) < window.innerHeight * 0.2 && !selectedHotspot) startGuide();
    window.requestAnimationFrame(syncBoneScrollState);
  } else {
    stopGuide();
    stopBoneStretchTimer();
    document.body.classList.remove("bone-checkin-active");
    root.classList.remove("bone-checkin-active");
    boneCheckin.classList.remove("is-mounted", "is-entered", "is-running", "is-result");
    boneCheckin.setAttribute("aria-hidden", "true");
    boneCheckin.inert = true;
    boneGallery.classList.remove("is-leaving");
    boneGallery.inert = false;
    const checkinIntro = boneCheckin.querySelector(".bone-checkin-intro");
    checkinIntro.removeAttribute("aria-hidden");
    checkinIntro.inert = false;
    if (activeBoneMedia) closeBoneMedia();
    document.body.classList.remove("bone-is-scrolled", "bone-past-hero");
    document.body.style.setProperty("--bone-scroll-progress", "0");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  navLinks.forEach((link) => link.classList.toggle("active", link.dataset.section === current));
  const active = navLinks.find((link) => link.dataset.section === current);
  if (!active) return;

  const navRect = nav.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();
  nav.style.setProperty("--nav-x", `${activeRect.left - navRect.left}px`);
  nav.style.setProperty("--nav-w", `${activeRect.width}px`);
}

function sectionFromHash() {
  return location.hash.replace("#", "") || "bone";
}

scaleInput.addEventListener("input", (event) => {
  setBoneScale(event.target.value);
});

scaleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setBoneScale(boneScale + Number(button.dataset.scaleStep));
  });
});

const boneGuideShape = document.createElement("span");
boneGuideShape.className = "bone-guide-shape";
boneGuideShape.setAttribute("aria-hidden", "true");
hero.append(boneGuideShape);

const boneHoverShape = document.createElement("span");
boneHoverShape.className = "bone-hover-shape";
boneHoverShape.setAttribute("aria-hidden", "true");
hero.append(boneHoverShape);

const boneSelectionShape = document.createElement("span");
boneSelectionShape.className = "bone-selection-shape";
boneSelectionShape.setAttribute("aria-hidden", "true");
hero.append(boneSelectionShape);

function boneShapeClip(bone) {
  if (bone.shapeClip) return bone.shapeClip;

  const x = bone.x;
  const y = bone.y;
  const w = bone.w;
  const h = bone.h;

  if (bone.id === "occipital") {
    return `polygon(
      ${x - w * 0.44}% ${y - h * 0.26}%,
      ${x - w * 0.2}% ${y - h * 0.5}%,
      ${x}% ${y - h * 0.38}%,
      ${x + w * 0.2}% ${y - h * 0.5}%,
      ${x + w * 0.44}% ${y - h * 0.26}%,
      ${x + w * 0.34}% ${y + h * 0.22}%,
      ${x + w * 0.12}% ${y + h * 0.46}%,
      ${x - w * 0.12}% ${y + h * 0.46}%,
      ${x - w * 0.34}% ${y + h * 0.22}%
    )`;
  }

  return `polygon(
    ${x - w * 0.48}% ${y - h * 0.12}%,
    ${x - w * 0.31}% ${y - h * 0.48}%,
    ${x - w * 0.1}% ${y - h * 0.32}%,
    ${x}% ${y - h * 0.5}%,
    ${x + w * 0.1}% ${y - h * 0.32}%,
    ${x + w * 0.31}% ${y - h * 0.48}%,
    ${x + w * 0.48}% ${y - h * 0.12}%,
    ${x + w * 0.3}% ${y + h * 0.06}%,
    ${x + w * 0.4}% ${y + h * 0.34}%,
    ${x + w * 0.14}% ${y + h * 0.48}%,
    ${x}% ${y + h * 0.3}%,
    ${x - w * 0.14}% ${y + h * 0.48}%,
    ${x - w * 0.4}% ${y + h * 0.34}%,
    ${x - w * 0.3}% ${y + h * 0.06}%
  )`;
}

function showBoneShape(layer, bone, pulse = false) {
  layer.style.setProperty("--bone-shape-clip", boneShapeClip(bone));
  layer.style.setProperty("--bone-glow-x", `${bone.x}%`);
  layer.style.setProperty("--bone-glow-y", `${bone.y}%`);
  layer.style.setProperty("--bone-glow-w", `${Math.max(2.4, bone.w * 0.68)}%`);
  layer.style.setProperty("--bone-glow-h", `${Math.max(1.5, bone.h * 0.9)}%`);
  layer.classList.remove("is-visible", "is-pulsing");
  if (pulse) void layer.offsetWidth;
  layer.classList.add("is-visible");
  if (pulse) layer.classList.add("is-pulsing");
}

bones.forEach((bone) => {
  const hotspot = document.createElement("button");
  hotspot.className = bone.guide === undefined ? "bone-hotspot" : "bone-hotspot guide-bone";
  hotspot.classList.add(`bone-${bone.id}`);
  hotspot.type = "button";
  hotspot.dataset.bone = bone.id;
  hotspot.style.left = `${bone.x}%`;
  hotspot.style.top = `${bone.y}%`;
  hotspot.style.setProperty("--spot-w", `${bone.w}%`);
  hotspot.style.setProperty("--spot-h", `${bone.h}%`);
  hotspot.style.setProperty("--spot-rotate", `${bone.rotate ?? 0}deg`);
  hotspot.setAttribute("aria-label", bone.name);

  hotspot.addEventListener("click", (event) => {
    event.stopPropagation();
    selectedHotspot?.classList.remove("active");
    selectedHotspot = hotspot;
    hotspot.classList.add("active");
    boneHoverShape.classList.remove("is-visible");
    showBoneShape(boneSelectionShape, bone);
    regionLabel.textContent = bone.region;
    title.textContent = bone.name;
    copy.textContent = bone.copy;
    stopGuide();
  });

  hotspot.addEventListener("pointerenter", () => {
    if (selectedHotspot === hotspot) return;
    showBoneShape(boneHoverShape, bone);
  });

  hotspot.addEventListener("pointerleave", () => {
    boneHoverShape.classList.remove("is-visible");
  });

  hotspot.addEventListener("focus", () => {
    if (selectedHotspot !== hotspot) showBoneShape(boneHoverShape, bone);
  });

  hotspot.addEventListener("blur", () => {
    boneHoverShape.classList.remove("is-visible");
  });

  hero.append(hotspot);
  if (bone.guide !== undefined) {
    guideHotspots[bone.guide] = hotspot;
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveSection(link.dataset.section);
  });
});

habitCarousel.addEventListener("wheel", (event) => {
  if (document.body.dataset.section !== "habits") return;
  if (mobilePortrait.matches) return;
  event.preventDefault();
  if (habitDetail.classList.contains("is-mounted")) return;

  const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
  if (Math.abs(delta) < 3) return;

  window.clearTimeout(habitWheelTimer);
  habitWheelTimer = window.setTimeout(() => {
    habitWheelGesture = false;
  }, 180);

  if (habitWheelGesture) return;
  habitWheelGesture = true;
  moveHabitCarousel(delta > 0 ? 1 : -1);
}, { passive: false });

habitCarousel.addEventListener("keydown", (event) => {
  if (document.body.dataset.section !== "habits" || habitDetail.classList.contains("is-mounted")) return;
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  event.preventDefault();
  moveHabitCarousel(event.key === "ArrowRight" ? 1 : -1);
});

habitCards.forEach((card) => {
  card.addEventListener("click", () => openHabitDetail(card));
});

habitDetailBack.addEventListener("click", () => closeHabitDetail());

reliefThumb.addEventListener("pointerdown", (event) => {
  if (reliefComplete || (event.pointerType === "mouse" && event.button !== 0)) return;
  event.preventDefault();
  reliefDrag = {
    pointerId: event.pointerId,
    startClientX: event.clientX,
    startPosition: reliefPosition,
  };
  reliefSlider.classList.add("is-dragging");
  reliefThumb.setPointerCapture(event.pointerId);
});

reliefThumb.addEventListener("pointermove", (event) => {
  if (!reliefDrag || reliefDrag.pointerId !== event.pointerId) return;
  event.preventDefault();
  setReliefPosition(reliefDrag.startPosition + event.clientX - reliefDrag.startClientX);
});

reliefThumb.addEventListener("pointerup", (event) => {
  if (!reliefDrag || reliefDrag.pointerId !== event.pointerId) return;
  event.preventDefault();
  settleReliefDrag(setReliefPosition(reliefPosition) >= 0.85);
});

reliefThumb.addEventListener("pointercancel", (event) => {
  if (!reliefDrag || reliefDrag.pointerId !== event.pointerId) return;
  settleReliefDrag(false);
});

reliefThumb.addEventListener("lostpointercapture", (event) => {
  if (!reliefDrag || reliefDrag.pointerId !== event.pointerId) return;
  settleReliefDrag(false);
});

reliefThumb.addEventListener("keydown", (event) => {
  if (reliefComplete) return;
  const maxTravel = reliefMaxTravel();
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    setReliefPosition(reliefPosition + maxTravel * (event.key === "ArrowRight" ? 0.1 : -0.1));
  } else if (event.key === "Home") {
    event.preventDefault();
    setReliefPosition(0);
  } else if ((event.key === "Enter" || event.key === " ") && maxTravel > 0 && reliefPosition / maxTravel >= 0.85) {
    event.preventDefault();
    completeReliefUnlock();
  }
});

reliefEnvelopeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const envelope = toggle.closest("[data-relief-envelope]");
    const isOpen = !envelope.classList.contains("is-open");
    envelope.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    envelope.querySelector(".envelope-letter").setAttribute("aria-hidden", String(!isOpen));
    envelope.querySelectorAll("[data-relief-stamp]").forEach((stamp) => {
      stamp.tabIndex = isOpen ? 0 : -1;
    });
  });
});

reliefStamps.forEach((stamp) => {
  stamp.addEventListener("click", () => openReliefLightbox(stamp));
});

reliefLightboxClose.addEventListener("click", closeReliefLightbox);
reliefLightbox.addEventListener("click", (event) => {
  if (event.target === reliefLightbox) closeReliefLightbox();
});

painModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPainMode = button.dataset.painMode;
    painModeButtons.forEach((item) => item.classList.toggle("active", item === button));
    painStage.dataset.painMode = selectedPainMode;
    painModeButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    if (painStage.classList.contains("has-pain")) {
      replayPainEffect();
      revealLocalHeat();
    }
  });
});

function setMuscleState(elements, muscleId, activeClass) {
  elements.forEach((element) => {
    element.classList.toggle(activeClass, element.dataset.muscle === muscleId);
  });
}

function replayPainEffect() {
  const muscleId = painStage.dataset.muscle;
  if (!muscleId) return;
  [muscleHighlights, muscleNoises, muscleFlashes].forEach((elements) => {
    elements.forEach((element) => element.classList.remove("active"));
  });
  window.requestAnimationFrame(() => {
    setMuscleState(muscleHighlights, muscleId, "active");
    setMuscleState(muscleNoises, muscleId, "active");
    setMuscleState(muscleFlashes, muscleId, "active");
  });
}

function pointFromEvent(event) {
  const mapRect = muscleMap.getBoundingClientRect();
  return {
    x: ((event.clientX - mapRect.left) / mapRect.width) * 1000,
    y: ((event.clientY - mapRect.top) / mapRect.height) * 560,
  };
}

function pieceForPoint(point) {
  if (point.y < 136) {
    return musclePieces.find((piece) => piece.dataset.muscle === "facial-muscles");
  }
  if (point.y < 270) {
    return musclePieces.find((piece) => piece.dataset.muscle === (point.x < 500 ? "left-scm" : "right-scm"));
  }
  if (point.y < 350) {
    return musclePieces.find((piece) => piece.dataset.muscle === (point.x < 500 ? "left-trapezius" : "right-trapezius"));
  }
  if (point.x < 185) {
    return musclePieces.find((piece) => piece.dataset.muscle === "left-biceps");
  }
  if (point.x > 815) {
    return musclePieces.find((piece) => piece.dataset.muscle === "right-biceps");
  }
  if (point.y > 430 && point.x < 410) {
    return musclePieces.find((piece) => piece.dataset.muscle === "left-oblique");
  }
  if (point.y > 430 && point.x > 590) {
    return musclePieces.find((piece) => piece.dataset.muscle === "right-oblique");
  }
  return musclePieces.find((piece) => piece.dataset.muscle === (point.x < 500 ? "left-pectoralis" : "right-pectoralis"));
}

function pieceFromEvent(event) {
  const directPiece = event.target.closest?.(".muscle-piece");
  return directPiece || pieceForPoint(pointFromEvent(event));
}

function revealLocalHeat() {
  heatArrival?.cancel();
  heatArrival = null;
  if (selectedPainMode === "tingling") {
    localTingle.getAnimations().forEach((animation) => { animation.currentTime = 0; });
  }
  if (selectedPainMode !== "soreness") return;
  // Restart the entrance for every click, including another point in the same muscle.
  heatArrival = localHeat.animate([
    { opacity: 0 },
    { opacity: 0.12, offset: 0.3 },
    { opacity: 0.55, offset: 0.65 },
    { opacity: 0.94 },
  ], {
    duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 160 : 950,
    easing: "ease-in-out",
  });
}

function selectMuscle(piece, point = null) {
  if (!piece) return;
  const muscle = muscles[piece.dataset.muscle];
  if (point) {
    painStage.style.setProperty("--sensation-x", `${point.x * 100}%`);
    painStage.style.setProperty("--sensation-y", `${point.y * 100}%`);
  }

  musclePieces.forEach((item) => item.classList.toggle("active", item === piece));
  setMuscleState(muscleHighlights, piece.dataset.muscle, "active");
  setMuscleState(muscleNoises, piece.dataset.muscle, "active");
  setMuscleState(muscleFlashes, piece.dataset.muscle, "active");
  painStage.classList.add("has-pain");
  painStage.dataset.painMode = selectedPainMode;
  painStage.dataset.muscle = piece.dataset.muscle;
  revealLocalHeat();
  if (muscle) {
    const label = document.createElement("span");
    const name = document.createElement("strong");
    const description = document.createElement("span");
    label.className = "pain-region-label";
    label.textContent = "SELECTED REGION";
    name.textContent = muscle.name.replace(/\b\w/g, (character) => character.toUpperCase());
    description.textContent = muscle.copy;
    painPageCopy.replaceChildren(label, name, description);
  }
}

// Match the image's object-fit: cover transform, including its cropped margins.
function imagePoint(event) {
  const rect = painStage.getBoundingClientRect();
  const width = muscleImage.naturalWidth;
  const height = muscleImage.naturalHeight;
  if (!width || !height) return null;
  const scale = Math.max(rect.width / width, rect.height / height);
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return {
    x: x / rect.width,
    y: y / rect.height,
    anatomyX: (x + (width * scale - rect.width) / 2) / (width * scale) * 1000,
    anatomyY: (y + (height * scale - rect.height) / 2) / (height * scale) * 560,
  };
}

function identifyAt(point) {
  if (!point) return null;
  const x = point.anatomyX;
  const y = point.anatomyY;
  const distance = Math.abs(x - 500);
  // The silhouette gates interaction; region boundaries are never rendered.
  const outline = [[18, 9], [30, 35], [60, 56], [100, 65], [140, 69],
    [195, 50], [215, 57], [260, 117], [275, 162], [300, 190],
    [340, 205], [385, 218], [430, 249], [480, 265], [530, 308], [560, 335]];
  if (y < outline[0][0] || y > 560) return null;
  const row = outline.findIndex(([limit]) => y <= limit);
  const a = outline[Math.max(0, row - 1)];
  const b = outline[row];
  const halfWidth = a[1] + (b[1] - a[1]) * (y - a[0]) / (b[0] - a[0] || 1);
  if (distance > halfWidth) return null;
  let region;
  const side = x < 500 ? "left" : "right";
  if (y < 198) region = "facial-muscles";
  else if (y < 277) region = `${side}-${distance < 54 ? "scm" : "trapezius"}`;
  else if (y < 366 && distance > 125) region = `${side}-deltoid`;
  else if (y < 410 && distance < 146) region = `${side}-pectoralis`;
  else if (distance > 157) region = `${side}-biceps`;
  else if (distance > 80) region = `${side}-oblique`;
  else region = "rectus-abdominis";
  return musclePieces.find((piece) => piece.dataset.muscle === region);
}

painStage.addEventListener("click", (event) => {
  event.stopPropagation();
  const point = imagePoint(event);
  const piece = identifyAt(point);
  if (piece) selectMuscle(piece, point);
}, true);

painStage.addEventListener("pointermove", (event) => {
  const point = imagePoint(event);
  const piece = identifyAt(point);
  painStage.classList.toggle("is-hovering", Boolean(piece));
  muscleMap.style.cursor = piece ? "pointer" : "default";
  if (piece) {
    painStage.style.setProperty("--hover-x", `${point.x * 100}%`);
    painStage.style.setProperty("--hover-y", `${point.y * 100}%`);
  }
});

painStage.addEventListener("pointerleave", () => painStage.classList.remove("is-hovering"));

musclePieces.forEach((piece) => {
  piece.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const rect = piece.getBoundingClientRect();
      const point = imagePoint({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
      selectMuscle(piece, point);
    }
  });
});

function renderBoneGallery() {
  boneGalleryList.innerHTML = boneExperienceConfig.gallery.map((item, index) => `
    <article class="bone-gallery-item bone-media-${item.kind}" style="--reveal-order: ${index}">
      <button class="bone-gallery-trigger" type="button" data-media-index="${index}" aria-label="Enlarge: ${item.title}">
        <span class="bone-media-placeholder has-image" style="--media-ratio: ${item.ratio}; --image-opacity: ${item.opacity}">
          <img src="${item.image}" alt="${item.alt}" decoding="async">
        </span>
        <span class="bone-gallery-caption">
          <strong>${item.title}</strong>
          ${item.description ? `<p>${item.description}</p>` : ""}
        </span>
      </button>
    </article>
  `).join("");

  const revealItems = [...boneScroll.querySelectorAll(".bone-reveal, .bone-gallery-item")];
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -8%" });
  revealItems.forEach((item) => observer.observe(item));
}

function expandedMediaBounds(sourceRect, image) {
  const ratio = image?.naturalWidth ? image.naturalWidth / image.naturalHeight : sourceRect.width / sourceRect.height;
  const isCompact = window.innerWidth < 700;
  const margin = isCompact ? 22 : Math.max(48, window.innerWidth * .045);
  const detailSpace = isCompact ? Math.min(330, window.innerHeight * .42) : 0;
  const contentWidth = window.innerWidth - margin * 2;
  const imageZoneWidth = isCompact ? contentWidth : contentWidth * .68;
  const maxWidth = imageZoneWidth - (isCompact ? 0 : Math.min(44, contentWidth * .035));
  const maxHeight = window.innerHeight - margin * 2 - detailSpace;
  let width = Math.min(maxWidth, maxHeight * ratio);
  let height = width / ratio;
  if (height > maxHeight) {
    height = maxHeight;
    width = height * ratio;
  }
  const scale = isCompact ? .88 : .75;
  width *= scale;
  height *= scale;
  return {
    left: isCompact ? (window.innerWidth - width) / 2 : margin + (maxWidth - width) / 2,
    top: Math.max(margin, (window.innerHeight - detailSpace - height) / 2),
    width,
    height,
  };
}

function mediaDetailMarkup(item) {
  return `
    <p class="bone-media-detail-eyebrow">${item.eyebrow}</p>
    <p class="bone-media-detail-stat">${item.stat}</p>
    <h3 class="bone-media-detail-title">${item.detailTitle}</h3>
    <div class="bone-media-detail-body">${item.detail.map((paragraph) => `<p>${paragraph}</p>`).join("")}</div>
    ${item.source ? `<p class="bone-media-detail-source">${item.source}</p>` : ""}`;
}

function setMediaRect(element, rect) {
  element.style.left = `${rect.left}px`;
  element.style.top = `${rect.top}px`;
  element.style.width = `${rect.width}px`;
  element.style.height = `${rect.height}px`;
}

function openBoneMedia(itemElement, index) {
  if (activeBoneMedia) return;
  const item = boneExperienceConfig.gallery[index];
  const source = itemElement.querySelector(".bone-media-placeholder");
  const sourceRect = source.getBoundingClientRect();
  const expanded = document.createElement("div");
  expanded.className = `bone-media-expanded has-image bone-media-${item.kind}`;
  const sourceImage = source.querySelector("img");
  expanded.append(sourceImage.cloneNode());
  setMediaRect(expanded, sourceRect);
  boneMediaViewer.append(expanded);

  activeBoneMedia = { itemElement, source, expanded };
  boneMediaDetail.innerHTML = mediaDetailMarkup(item);
  itemElement.classList.add("is-source-hidden");
  document.body.classList.add("bone-media-open");
  root.classList.add("bone-media-open");
  boneMediaViewer.classList.add("is-open");
  boneMediaViewer.setAttribute("aria-hidden", "false");
  boneMediaViewer.inert = false;

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => setMediaRect(expanded, expandedMediaBounds(sourceRect, sourceImage)));
  });
  boneMediaClose.focus({ preventScroll: true });
}

function closeBoneMedia() {
  if (!activeBoneMedia) return;
  const { itemElement, source, expanded } = activeBoneMedia;
  const targetRect = source.getBoundingClientRect();
  boneMediaViewer.classList.remove("is-open");
  setMediaRect(expanded, targetRect);

  window.setTimeout(() => {
    expanded.remove();
    itemElement.classList.remove("is-source-hidden");
    document.body.classList.remove("bone-media-open");
    root.classList.remove("bone-media-open");
    boneMediaViewer.setAttribute("aria-hidden", "true");
    boneMediaViewer.inert = true;
    activeBoneMedia = null;
    itemElement.querySelector(".bone-gallery-trigger")?.focus({ preventScroll: true });
  }, 780);
}

function optionMarkup(question) {
  const answer = boneAnswers[question.id];
  return question.options.map((option) => {
    const selected = question.type === "multiple" ? answer.includes(option) : answer === option;
    return `<button class="bone-option${selected ? " is-selected" : ""}" type="button" data-bone-option="${option}" aria-pressed="${selected}">${option}</button>`;
  }).join("");
}

function questionMarkup(question, index) {
  const progress = `<div class="bone-progress"><span>${index + 1} / ${boneExperienceConfig.questions.length}</span></div>`;
  if (question.type === "stretch") {
    return `
      <div class="bone-question bone-stretch">
        <div class="bone-stretch-media">
          <img src="./assets/images/bone-stretch.jpg" alt="Illustration of left and right neck stretches">
        </div>
        <div class="bone-stretch-copy">
          ${progress}
          <h3>${question.title}</h3>
          <p class="bone-stretch-hint">${question.hint}</p>
          <button class="bone-timer-start" type="button" data-bone-timer-start>START</button>
          <div class="bone-timer" aria-live="polite">
            <span class="bone-timer-side">Left side</span>
            <span class="bone-timer-track"><span class="bone-timer-fill"></span></span>
            <span class="bone-timer-seconds">30</span>
          </div>
          <button class="bone-skip" type="button" data-bone-skip>SKIP</button>
        </div>
      </div>`;
  }

  const hasMultiAnswer = question.type === "multiple" && boneAnswers[question.id].length > 0;
  return `
    <div class="bone-question">
      ${progress}
      <h3>${question.title}</h3>
      <div class="bone-options">${optionMarkup(question)}</div>
      ${question.type === "multiple" ? `<button class="bone-question-action" type="button" data-question-action ${hasMultiAnswer ? "" : "disabled"}>CONTINUE &rarr;</button>` : ""}
    </div>`;
}

function renderBoneQuestion(index, immediate = false) {
  stopBoneStretchTimer();
  boneCheckin.classList.remove("is-result");
  const renderToken = ++boneQuestionRenderToken;
  currentBoneQuestion = index;
  const update = () => {
    if (renderToken !== boneQuestionRenderToken) return;
    const question = boneExperienceConfig.questions[index];
    boneQuestionStage.innerHTML = questionMarkup(question, index);
    if (question.type === "stretch") {
      boneStretchSide = "Left side";
      boneStretchRemaining = 30;
      updateBoneTimer();
    }
    boneQuestionStage.classList.remove("is-changing");
    boneQuestionStage.classList.add("is-entering");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => boneQuestionStage.classList.remove("is-entering"));
    });
  };

  if (immediate) {
    update();
  } else {
    boneQuestionStage.classList.add("is-changing");
    window.setTimeout(update, boneQuestionFadeDuration);
  }
}

function updateBoneTimer() {
  const side = boneQuestionStage.querySelector(".bone-timer-side");
  const seconds = boneQuestionStage.querySelector(".bone-timer-seconds");
  const fill = boneQuestionStage.querySelector(".bone-timer-fill");
  if (!side || !seconds || !fill) return;
  side.textContent = boneStretchSide;
  seconds.textContent = String(boneStretchRemaining);
  fill.style.setProperty("--timer-progress", `${(boneStretchRemaining / 30) * 100}%`);
}

function startBoneStretchTimer() {
  if (boneStretchTimers.size) return;
  stopBoneStretchTimer();
  boneStretchSide = "Left side";
  boneStretchRemaining = 30;
  const start = boneQuestionStage.querySelector("[data-bone-timer-start]");
  if (start) {
    start.textContent = "RUNNING";
    start.disabled = true;
  }
  updateBoneTimer();
  const timer = window.setInterval(() => {
    boneStretchRemaining -= 1;
    if (boneStretchRemaining <= 0 && boneStretchSide === "Left side") {
      boneStretchSide = "Right side";
      boneStretchRemaining = 30;
    } else if (boneStretchRemaining <= 0) {
      stopBoneStretchTimer();
      renderBoneQuestion(3);
      return;
    }
    updateBoneTimer();
  }, 1000);
  boneStretchTimers.add(timer);
}

function stopBoneStretchTimer() {
  boneStretchTimers.forEach((timer) => window.clearInterval(timer));
  boneStretchTimers.clear();
}

function showBoneResult(answer) {
  stopBoneStretchTimer();
  const result = boneExperienceConfig.results[answer] || boneExperienceConfig.results["About the same"];
  boneQuestionStage.classList.add("is-changing");
  window.setTimeout(() => {
    boneCheckin.classList.add("is-result");
    boneQuestionStage.innerHTML = `
      <div class="bone-result">
        <p>${result}</p>
        <button class="bone-restart" type="button" data-bone-restart>BACK</button>
      </div>`;
    boneQuestionStage.classList.remove("is-changing");
    boneQuestionStage.classList.add("is-entering");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => boneQuestionStage.classList.remove("is-entering"));
    });
  }, boneQuestionFadeDuration);
}

function resetBoneCheckin() {
  stopBoneStretchTimer();
  currentBoneQuestion = 0;
  boneAnswers = {
    "position-duration": null,
    "before-feeling": [],
    "after-feeling": null,
  };
  renderBoneQuestion(0);
}

function showBoneCheckinIntro() {
  stopBoneStretchTimer();
  currentBoneQuestion = 0;
  boneCheckin.classList.remove("is-running", "is-result");
  const intro = boneCheckin.querySelector(".bone-checkin-intro");
  intro.setAttribute("aria-hidden", "false");
  intro.inert = false;
  boneQuestionStage.innerHTML = "";
}

function openBoneCheckin() {
  showBoneCheckinIntro();
  boneCheckin.setAttribute("aria-hidden", "false");
  boneCheckin.inert = false;
  boneGallery.inert = true;
  boneCheckin.classList.add("is-mounted");
  document.body.classList.add("bone-checkin-active");
  root.classList.add("bone-checkin-active");
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      boneGallery.classList.add("is-leaving");
      boneCheckin.classList.add("is-entered");
    });
  });
}

function closeBoneCheckin() {
  stopBoneStretchTimer();
  boneCheckin.classList.remove("is-entered");
  boneGallery.classList.remove("is-leaving");
  window.setTimeout(() => {
    boneCheckin.classList.remove("is-mounted", "is-running", "is-result");
    boneCheckin.setAttribute("aria-hidden", "true");
    boneCheckin.inert = true;
    boneGallery.inert = false;
    document.body.classList.remove("bone-checkin-active");
    root.classList.remove("bone-checkin-active");
    showBoneCheckinIntro();
  }, 950);
}

boneGalleryList.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-media-index]");
  if (!trigger) return;
  openBoneMedia(trigger.closest(".bone-gallery-item"), Number(trigger.dataset.mediaIndex));
});

boneMediaClose.addEventListener("click", closeBoneMedia);
boneMediaViewer.addEventListener("click", (event) => {
  if (event.target === boneMediaViewer) closeBoneMedia();
});

boneNext.addEventListener("click", () => {
  openBoneCheckin();
});

boneCheckinBegin.addEventListener("click", () => {
  renderBoneQuestion(0, true);
  const intro = boneCheckin.querySelector(".bone-checkin-intro");
  intro.setAttribute("aria-hidden", "true");
  intro.inert = true;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => boneCheckin.classList.add("is-running"));
  });
});

boneCheckin.querySelector("[data-bone-back]").addEventListener("click", () => {
  if (!boneCheckin.classList.contains("is-running")) {
    closeBoneCheckin();
  } else if (currentBoneQuestion === 0) {
    showBoneCheckinIntro();
  } else {
    renderBoneQuestion(currentBoneQuestion - 1);
  }
});

boneQuestionStage.addEventListener("click", (event) => {
  if (event.target.closest("[data-bone-timer-start]")) {
    startBoneStretchTimer();
    return;
  }

  const option = event.target.closest("[data-bone-option]");
  if (option) {
    const question = boneExperienceConfig.questions[currentBoneQuestion];
    const value = option.dataset.boneOption;
    if (question.type === "multiple") {
      const answers = boneAnswers[question.id];
      const selected = answers.includes(value);
      boneAnswers[question.id] = selected ? answers.filter((item) => item !== value) : [...answers, value];
      option.classList.toggle("is-selected", !selected);
      option.setAttribute("aria-pressed", String(!selected));
      const action = boneQuestionStage.querySelector("[data-question-action]");
      if (action) action.disabled = boneAnswers[question.id].length === 0;
    } else {
      boneAnswers[question.id] = value;
      boneQuestionStage.querySelectorAll(".bone-option").forEach((item) => {
        const selected = item === option;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      window.setTimeout(() => {
        if (currentBoneQuestion === 3) showBoneResult(value);
        else renderBoneQuestion(currentBoneQuestion + 1);
      }, 520);
    }
    return;
  }

  if (event.target.closest("[data-question-action]")) {
    renderBoneQuestion(currentBoneQuestion + 1);
  } else if (event.target.closest("[data-bone-skip]")) {
    renderBoneQuestion(3);
  } else if (event.target.closest("[data-bone-restart]")) {
    closeBoneCheckin();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && activeBoneMedia) closeBoneMedia();
  if (event.key === "Escape" && habitDetail.classList.contains("is-mounted")) closeHabitDetail();
  if (event.key === "Escape" && reliefLightbox.classList.contains("is-open")) closeReliefLightbox();
});

function syncBoneScrollState() {
  if (document.body.dataset.section !== "bone") return;
  const scrollTop = mobilePortrait.matches ? experience.scrollTop : Math.max(document.body.scrollTop, document.documentElement.scrollTop, window.scrollY);
  const transitionDistance = mobilePortrait.matches ? Math.max(1, experience.clientHeight) : window.innerHeight * 0.58;
  const transitionProgress = Math.min(1, Math.max(0, scrollTop / transitionDistance));
  const pastFirstScreen = transitionProgress > 0.04;
  const pastHero = transitionProgress > 0.96;
  document.body.style.setProperty("--bone-scroll-progress", transitionProgress.toFixed(3));
  document.body.classList.toggle("bone-is-scrolled", pastFirstScreen);
  document.body.classList.toggle("bone-past-hero", pastHero);
  if (pastFirstScreen) stopGuide();
  else if (!selectedHotspot) startGuide();
}

document.body.addEventListener("scroll", syncBoneScrollState, { passive: true });
experience.addEventListener("scroll", syncBoneScrollState, { passive: true });
window.addEventListener("scroll", syncBoneScrollState, { passive: true });

window.addEventListener("hashchange", () => {
  setActiveSection(sectionFromHash());
});

window.addEventListener("resize", () => {
  if (reliefDrag) settleReliefDrag(false);
  else if (reliefComplete) setReliefPosition(reliefMaxTravel());
  else setReliefPosition(reliefPosition);
  if (!mobilePortrait.matches || document.body.dataset.section !== sectionFromHash()) {
    setActiveSection(sectionFromHash());
  }
  syncBoneScrollState();
});

hero.addEventListener("wheel", (event) => {
  if (mobilePortrait.matches || document.body.dataset.section !== "bone") return;
  const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop, window.scrollY);
  const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
  const delta = event.deltaY * unit;

  window.requestAnimationFrame(() => {
    const currentScrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop, window.scrollY);
    if (currentScrollTop === scrollTop) {
      window.scrollBy({ top: delta, behavior: "auto" });
    }
  });
}, { passive: true });

setBoneScale(boneScale);
painStage.dataset.painMode = selectedPainMode;
painModeButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.painMode === selectedPainMode)));
renderBoneGallery();
updateHabitCarousel();
resetReliefExperience();
setActiveSection(sectionFromHash());
syncBoneScrollState();
setupMobile({ bones, muscles, selectMuscle, moveHabitCarousel, setBoneScale });
