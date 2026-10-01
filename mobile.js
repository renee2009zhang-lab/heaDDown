export const mobilePortrait = window.matchMedia("(max-width: 1100px)");

export function setupMobile({ bones, muscles, selectMuscle, moveHabitCarousel, setBoneScale }) {
  const carousel = document.querySelector("[data-habit-carousel]");
  const hero = document.querySelector(".xray-hero");
  const painStage = document.querySelector(".pain-stage");
  const checkin = document.querySelector("#bone-checkin");
  const detail = document.querySelector("[data-habit-detail]");
  const lightbox = document.querySelector("[data-relief-lightbox]");
  const mediaViewer = document.querySelector(".bone-media-viewer");
  const root = document.querySelector(".experience");
  const brand = document.querySelector(".brand");
  const nav = brand.querySelector("nav");
  const scaleInput = document.querySelector("#bone-scale");
  let desktopScale = Number(scaleInput.value);
  let mobileScale = Number(scaleInput.max);
  let usingMobileScale = false;
  const brandAnchor = document.createComment("mobile navigation position");
  const detailAnchor = document.createComment("mobile habit detail position");
  brand.before(brandAnchor);
  detail.before(detailAnchor);
  const firstScreen = document.createElement("section");
  firstScreen.className = "bone-first-screen";
  firstScreen.setAttribute("aria-label", "Bone explorer");
  const firstScreenParts = [hero, document.querySelector(".bone-copy"), document.querySelector(".bone-scale"), document.querySelector(".bone-panel"), document.querySelector(".bone-scroll-cue")];
  const anchors = firstScreenParts.map(part => {
    const anchor = document.createComment("bone mobile position");
    part.before(anchor);
    return anchor;
  });
  const controls = [];
  let gesture = null;
  let suppressClickUntil = 0;
  let currentModal = null;
  let returnFocus = null;

  function syncViewportGeometry() {
    if (!mobilePortrait.matches) return;
    root.style.setProperty("--bone-nav-height", `${brand.getBoundingClientRect().height}px`);
    const active = nav.querySelector("a.active");
    if (active) {
      const navRect = nav.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      nav.style.setProperty("--nav-x", `${activeRect.left - navRect.left}px`);
      nav.style.setProperty("--nav-w", `${activeRect.width}px`);
    }
  }
  new ResizeObserver(syncViewportGeometry).observe(brand);

  function syncScreenHeader() {
    if (!mobilePortrait.matches) return;
    if (document.body.dataset.section === "bone") firstScreen.prepend(brand);
    else brandAnchor.after(brand);
    syncViewportGeometry();
  }
  new MutationObserver(syncScreenHeader).observe(document.body, { attributes: true, attributeFilter: ["data-section"] });

  function makePicker(label, entries, onSelect) {
    const wrapper = document.createElement("label");
    wrapper.className = "mobile-region-picker";
    const text = document.createElement("span");
    text.textContent = label;
    const select = document.createElement("select");
    select.append(new Option(label, ""));
    entries.forEach(([value, name]) => select.append(new Option(name, value)));
    select.addEventListener("change", () => {
      if (mobilePortrait.matches && select.value) onSelect(select.value);
    });
    wrapper.append(text, select);
    controls.push(wrapper);
    return { wrapper, select };
  }

  const bonePicker = makePicker("Bone", bones.map(bone => [bone.id, bone.name]), id => {
    hero.querySelector(`[data-bone="${id}"]`).click();
  });
  const musclePicker = makePicker("Muscle region", Object.entries(muscles).map(([id, muscle]) => [id, muscle.name]), id => {
    const piece = document.querySelector(`.muscle-piece[data-muscle="${id}"]`);
    const box = piece.getBBox();
    // Convert the SVG region center into the uncropped mobile image coordinates.
    selectMuscle(piece, { x: (box.x + box.width / 2) / 1000, y: (box.y + box.height / 2) / 560 });
  });

  const carouselControls = document.createElement("div");
  carouselControls.className = "mobile-carousel-controls";
  for (const [direction, label, symbol] of [[-1, "Previous habit", "\u2190"], [1, "Next habit", "\u2192"]]) {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.title = label;
    button.textContent = symbol;
    button.addEventListener("click", () => {
      if (mobilePortrait.matches) moveHabitCarousel(direction);
    });
    carouselControls.append(button);
  }
  controls.push(carouselControls);

  function syncLayout() {
    if (mobilePortrait.matches) {
      if (!usingMobileScale) {
        desktopScale = Number(scaleInput.value);
        setBoneScale(mobileScale);
        usingMobileScale = true;
      }
      const newlyMounted = !firstScreen.isConnected;
      if (newlyMounted) brandAnchor.after(firstScreen);
      firstScreenParts.forEach(part => firstScreen.append(part));
      syncScreenHeader();
      root.append(detail);
      if (newlyMounted && document.body.dataset.section === "bone") {
        requestAnimationFrame(() => { root.scrollTop = 0; });
      }
      document.querySelector(".bone-panel").prepend(bonePicker.wrapper);
      document.querySelector(".pain-modes").before(musclePicker.wrapper);
      carousel.append(carouselControls);
    } else {
      if (usingMobileScale) {
        mobileScale = Number(scaleInput.value);
        setBoneScale(desktopScale);
        usingMobileScale = false;
      }
      brandAnchor.after(brand);
      detailAnchor.after(detail);
      firstScreenParts.forEach((part, index) => anchors[index].after(part));
      firstScreen.remove();
      controls.forEach(control => control.remove());
      gesture = null;
      currentModal = null;
      document.documentElement.classList.remove("mobile-modal-open");
    }
    syncModal();
  }

  hero.addEventListener("click", event => {
    if (!mobilePortrait.matches) return;
    const bone = event.target.closest("[data-bone]");
    if (bone) bonePicker.select.value = bone.dataset.bone;
  }, true);
  new MutationObserver(() => {
    if (mobilePortrait.matches) musclePicker.select.value = painStage.dataset.muscle || "";
  }).observe(painStage, { attributes: true, attributeFilter: ["data-muscle"] });

  carousel.addEventListener("pointerdown", event => {
    if (!mobilePortrait.matches || detail.classList.contains("is-mounted") || !event.isPrimary || event.button !== 0 || event.target.closest(".mobile-carousel-controls")) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  carousel.addEventListener("pointerup", event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) < 36 || Math.abs(dx) < Math.abs(dy) * 1.3) return;
    suppressClickUntil = performance.now() + 500;
    moveHabitCarousel(dx < 0 ? 1 : -1);
  });
  carousel.addEventListener("pointercancel", () => { gesture = null; });
  carousel.addEventListener("click", event => {
    if (mobilePortrait.matches && performance.now() < suppressClickUntil) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  function syncModal() {
    if (!mobilePortrait.matches) return;
    const modal = mediaViewer.classList.contains("is-open") ? mediaViewer
      : detail.classList.contains("is-mounted") ? detail
      : lightbox.classList.contains("is-open") ? lightbox
      : checkin.classList.contains("is-mounted") ? checkin : null;
    document.documentElement.classList.toggle("mobile-modal-open", Boolean(modal));
    if (modal === currentModal) return;
    if (modal) {
      returnFocus = document.activeElement;
      modal.scrollTop = 0;
    } else if (returnFocus?.isConnected && !returnFocus.closest("[inert]")) {
      returnFocus.focus({ preventScroll: true });
    }
    currentModal = modal;
  }
  const modalObserver = new MutationObserver(syncModal);
  [mediaViewer, detail, lightbox, checkin].forEach(modal => {
    modalObserver.observe(modal, { attributes: true, attributeFilter: ["class"] });
  });
  new MutationObserver(() => {
    if (mobilePortrait.matches) checkin.scrollTop = 0;
  }).observe(document.querySelector(".bone-question-stage"), { childList: true });

  document.addEventListener("keydown", event => {
    if (!mobilePortrait.matches || !currentModal || event.key !== "Tab") return;
    const focusable = [...currentModal.querySelectorAll('button:not(:disabled), a[href], select, input, [tabindex="0"]')]
      .filter(element => element.getClientRects().length && !element.closest('[inert], [aria-hidden="true"]'));
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first) return;
    if (event.shiftKey && (document.activeElement === first || !currentModal.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !currentModal.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  });
  window.addEventListener("hashchange", () => {
    if (mobilePortrait.matches) window.scrollTo({ top: 0, behavior: "instant" });
  });
  window.addEventListener("resize", syncViewportGeometry);
  mobilePortrait.addEventListener("change", syncLayout);
  syncLayout();
}
