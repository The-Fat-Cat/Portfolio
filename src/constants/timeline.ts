/**
 * ============================================================================
 * ANIMATION PARAMETERS
 * Edit these values to tweak the animation behavior. All scroll-linked
 * animation parameters are centralized here.
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// VIDEO POSITIONING — Horizontal shifts (video translateX %)
// ---------------------------------------------------------------------------
export const VIDEO_START_OFFSET = 11;
export const VIDEO_SHIFT_LEFT = -15;
export const VIDEO_SHIFT_RIGHT = 15;

// ---------------------------------------------------------------------------
// VIDEO FRAME MAPPING — Maps scroll progress (0–1) to video time ranges
// ---------------------------------------------------------------------------
export const VIDEO_SEGMENTS = [
  { name: "Thinking",  startProgress: 0.00, endProgress: 0.25, startTime: 1,  endTime: 10 },
  { name: "Planning",  startProgress: 0.25, endProgress: 0.50, startTime: 11, endTime: 34 },
  { name: "Execution", startProgress: 0.50, endProgress: 0.75, startTime: 35, endTime: 57 },
  { name: "Contact",   startProgress: 0.75, endProgress: 1.00, startTime: 58, endTime: 73 },
] as const;

// ---------------------------------------------------------------------------
// VIDEO SCRUBBING — Controls how video seeks respond to scroll
// ---------------------------------------------------------------------------
export const VIDEO_SCRUB_DURATION = 0.5;     // seconds — lower = snappier
export const VIDEO_SCRUB_EASE = "power1.out";

// ---------------------------------------------------------------------------
// VIDEO HORIZONTAL GLIDE — Video pan animations at scroll milestones
// ---------------------------------------------------------------------------
export const VIDEO_GLIDE_DURATION = 0.12;   // seconds
export const VIDEO_GLIDE_EASE = "power2.inOut";
export const VIDEO_GLIDE_POINTS = [
  { atProgress: 0.16, xPercent: -15 },
  { atProgress: 0.41, xPercent: 15 },
  { atProgress: 0.66, xPercent: -15 },
] as const;

// ---------------------------------------------------------------------------
// SCROLL TRIGGER
// ---------------------------------------------------------------------------
export const SCROLL_END = "+=400%";
export const SCRUB = 1.2;                   // seconds — higher = smoother lag
export const ANTICIPATE_PIN = 1;

// ---------------------------------------------------------------------------
// SECTION TIMELINE — Controls text entrance & exit per phase
//
// Positions are scroll progress values (0–1). Each section has:
//   enter       — scroll progress where section starts appearing
//   exit        — scroll progress where section starts disappearing
//   entranceAnimations — list of tweens that play on enter
//   exitAnimations     — list of tweens that play on exit
// ---------------------------------------------------------------------------
export const SECTION_TIMELINES = [
  // ---- SECTION 1: Thinking ----
  // Note: child elements deliberately use no tl.set here so cascade
  // entrance animation (on nav click / reload) is never overwritten by
  // ScrollTrigger. Children default to visible via CSS.
  {
    enter: 0.00,
    exit: 0.21,
    entranceAnimations: [
      { selector: "",                       position: 0.00, duration: 0,    from: {},                               to: { autoAlpha: 1 },                          ease: "none" },
    ],
    exitAnimations: [
      { selector: "",                       position: 0.21, duration: 0.04, from: {}, to: { autoAlpha: 0 },          ease: "power2.in" },
    ],
  },

  // ---- SECTION 2: Planning ----
  {
    enter: 0.25,
    exit: 0.46,
    entranceAnimations: [
      { selector: "",                       position: 0.25, duration: 0.02, from: { autoAlpha: 0 },              to: { autoAlpha: 1 },                          ease: "none" },
      { selector: " .section-bg-title",     position: 0.25, duration: 0.06, from: { opacity: 0, scale: 1.15 },   to: { opacity: 1, scale: 1 },                  ease: "power2.out" },
      { selector: " .section-badge",        position: 0.26, duration: 0.04, from: { opacity: 0, y: 20 },         to: { opacity: 1, y: 0 },                      ease: "power2.out" },
      { selector: " .section-title",        position: 0.27, duration: 0.04, from: { opacity: 0, y: 25 },         to: { opacity: 1, y: 0 },                      ease: "power2.out" },
      { selector: " .bullet-item",          position: 0.28, duration: 0.04, from: { opacity: 0, y: 15 },         to: { opacity: 1, y: 0, stagger: 0.015 },      ease: "power2.out" },
      { selector: " .section-description",  position: 0.33, duration: 0.04, from: { opacity: 0, y: 15 },         to: { opacity: 1, y: 0 },                      ease: "power2.out" },
    ],
    exitAnimations: [
      { selector: "",                       position: 0.46, duration: 0.04, from: {}, to: { autoAlpha: 0 },          ease: "power2.in" },
      { selector: " .section-content",      position: 0.46, duration: 0.04, from: {}, to: { y: -45 },                ease: "power2.in" },
    ],
  },

  // ---- SECTION 3: Execution ----
  {
    enter: 0.50,
    exit: 0.71,
    entranceAnimations: [
      { selector: "",                       position: 0.50, duration: 0.02, from: { autoAlpha: 0 },              to: { autoAlpha: 1 },                          ease: "none" },
      { selector: " .section-bg-title",     position: 0.50, duration: 0.06, from: { opacity: 0, scale: 1.15 },   to: { opacity: 1, scale: 1 },                  ease: "power2.out" },
      { selector: " .section-badge",        position: 0.51, duration: 0.04, from: { opacity: 0, y: 20 },         to: { opacity: 1, y: 0 },                      ease: "power2.out" },
      { selector: " .section-title",        position: 0.52, duration: 0.04, from: { opacity: 0, y: 25 },         to: { opacity: 1, y: 0 },                      ease: "power2.out" },
      { selector: " .bullet-item",          position: 0.53, duration: 0.04, from: { opacity: 0, y: 15 },         to: { opacity: 1, y: 0, stagger: 0.015 },      ease: "power2.out" },
      { selector: " .section-description",  position: 0.58, duration: 0.04, from: { opacity: 0, y: 15 },         to: { opacity: 1, y: 0 },                      ease: "power2.out" },
    ],
    exitAnimations: [
      { selector: "",                       position: 0.71, duration: 0.04, from: {}, to: { autoAlpha: 0 },          ease: "power2.in" },
      { selector: " .section-content",      position: 0.71, duration: 0.04, from: {}, to: { y: -45 },                ease: "power2.in" },
    ],
  },

  // ---- SECTION 4: Contact ----
  {
    enter: 0.75,
    exit: 1.00,
    entranceAnimations: [
      { selector: "",                       position: 0.75, duration: 0.02, from: { autoAlpha: 0 },              to: { autoAlpha: 1 },                          ease: "none" },
      { selector: " .section-bg-title",     position: 0.75, duration: 0.06, from: { opacity: 0, scale: 1.15 },   to: { opacity: 1, scale: 1 },                  ease: "power2.out" },
      { selector: " .section-badge",        position: 0.76, duration: 0.04, from: { opacity: 0, y: 20 },         to: { opacity: 1, y: 0 },                      ease: "power2.out" },
      { selector: " .section-title",        position: 0.77, duration: 0.04, from: { opacity: 0, y: 25 },         to: { opacity: 1, y: 0 },                      ease: "power2.out" },
      { selector: " .contact-form",         position: 0.79, duration: 0.06, from: { opacity: 0, y: 30 },         to: { opacity: 1, y: 0 },                      ease: "power2.out" },
      { selector: " .contact-links",        position: 0.81, duration: 0.06, from: { opacity: 0, y: 30 },         to: { opacity: 1, y: 0 },                      ease: "power2.out" },
    ],
    exitAnimations: [],
  },
];
