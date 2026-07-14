# Animation Master Guide

All animation code lives in `script.js` with inline comments. This guide covers quick edits, parameter reference, and troubleshooting.

---

## Overview

This portfolio has two main animation types:

1. **Text Animations** — Sections fade in and elements slide up
2. **Video Animations** — Video scrubs through frames and pans left/right

---

## Find Sections in `script.js`

| Search Term | What It Controls | Line ~ |
|---|---|---|
| `"AUTO-PLAY FIRST ANIMATION"` | Page load text animations | 80 |
| `"TEXT ANIMATION"` | Text entrance effects | 80–180 |
| `"VIDEO POSITIONING"` | Video pan left/right | 280 |
| `"VIDEO FRAME MAPPING"` | Which video frames per section | 310 |
| `"VIDEO SCRUBBING INTERPOLATION"` | Video transition smoothness | 350 |
| `"VIDEO HORIZONTAL GLIDE"` | Video pan speed/ease | 370 |
| `"SECTION ENTRY ANIMATIONS"` | Nav click text animations | 600 |

---

## Quick Edits Cheat Sheet

| Goal | Action |
|---|---|
| Make all text slide up more dramatically | Find all `y: 20` and `y: 25` → change to `y: 40` or `y: 50` |
| Make text fade in slower | Find all `duration: 0.5` in text animations → change to `duration: 1.0` |
| Make video pan smoother | Find `scrub: 1.2` → change to `scrub: 2.0` |
| Make bullet points cascade more dramatically | Find `stagger: 0.1` → change to `stagger: 0.2` |
| Show different video frames in Thinking section | Find `targetTime = 1 + ratio * (10 - 1);` → change `1` and `10` to desired start/end times (seconds) |
| Make scale zoom more dramatic | Find `scale: 1.15` → change to `scale: 1.3` or `scale: 1.5` |
| Change easing to feel bouncier | Find `ease: "power2.out"` → change to `ease: "back.out"` |
| Make video scrubbing snappier | Find `duration: 0.5` in video scrubbing → change to `duration: 0.2` |
| Make video pans faster | Find all `duration: 0.12` in video glide animations → change to `duration: 0.08` |

---

## Text Animation Parameters

**Location:** `autoPlayFirstAnimation()` (page load) and `"SECTION ENTRY ANIMATIONS"` (nav clicks)

### Quick Reference

| Parameter | Current Value | What It Does | How to Customize |
|---|---|---|---|
| `opacity` | `0 → 1` | Fade effect | Keep as-is for fade-in |
| `y` (slide) | `20`, `25`, `15` | Slide distance (px) | ↑ `40–50` for drama, ↓ `5–10` for subtle |
| `scale` | `1.15 → 1` | Zoom effect | ↑ `1.3+` for bigger zoom, ↓ `1.05` for subtle |
| `duration` | `0.4–0.5` sec | Animation length | ↑ `0.8–1.0` slower, ↓ `0.2–0.3` faster |
| `ease` | `"power2.out"` | Animation curve | Try `power3.out`, `back.out`, `elastic.out` |
| `stagger` | `0.1` sec | Delay between bullets | ↑ `0.15–0.2` for drama, ↓ `0.05` for quick |

### Animation Structure

Each text animation has three parts:

```javascript
tl.fromTo(
  "#selector",                    // Element to animate
  { opacity: 0, y: 20 },         // STARTING state
  {
    opacity: 1,                  // ENDING state
    y: 0,
    duration: 0.5,               // HOW LONG (seconds)
    ease: "power2.out"           // HOW IT FEELS
  },
  0.1                            // WHEN TO START (0 = immediate, 0.1 = after 100ms)
);
```

### Parameter Details

#### `opacity: 0 → 1`
- **What it does:** Fade effect
- **0** = invisible, **1** = fully visible
- **Customize:** Keep as `0→1` for fade-in effect

#### `y: 20 → 0`
- **What it does:** Vertical slide distance
- **Currently:** Starts 20px below, ends at normal position (slides up)
- **More dramatic:** Change `20` to `40` or `60`
- **More subtle:** Change `20` to `5` or `10`
- **Reverse direction:** Use `y: -20` to start above instead

#### `scale: 1.15 → 1` (background titles only)
- **What it does:** Size zoom effect
- **Currently:** Starts 15% larger, shrinks to normal
- **More dramatic:** Change `1.15` to `1.3` or `1.5`
- **More subtle:** Change `1.15` to `1.05`

#### `duration: 0.5`
- **What it does:** How long the animation takes (seconds)
- **Faster:** `0.3` or `0.2`
- **Slower:** `0.8` or `1.0`

#### `ease: "power2.out"`
- **What it does:** Animation curve (smooth vs linear)
- **Currently:** `power2.out` = smooth deceleration
- See [Easing Options](#easing-options) below for alternatives

#### `stagger: 0.1` (bullet points only)
- **What it does:** Delay between each bullet point entrance
- **More dramatic:** `0.15` or `0.2`
- **Quicker:** `0.05`

#### Timing parameter (third argument) — `0`, `0.1`, `0.2`, `0.5`
- **What it does:** When the animation starts in the timeline
- **0** = start immediately, **0.1** = wait 100ms, **0.5** = wait 500ms
- **Customize:** Use larger values for more staggered entrances

### Before & After Examples

**Current:**
```javascript
tl.fromTo(".title", { opacity: 0, y: 25 },
  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.2);
```

**More dramatic:**
```javascript
tl.fromTo(".title", { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1.0, ease: "back.out" }, 0.2);
```

**Snappier:**
```javascript
tl.fromTo(".title", { opacity: 0, y: 10 },
  { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.2);
```

---

## Video Animation Parameters

**Location:** `initTimeline()` function

### Quick Reference

| Parameter | Current Value | What It Does | How to Customize |
|---|---|---|---|
| `START_OFFSET` | `11` | Initial position | ↑ `20+` more right, ↓ `0–5` more centered |
| `SHIFT_LEFT_OFFSET` | `-15` | Pan left amount | `-25` for more dramatic |
| `SHIFT_RIGHT_OFFSET` | `15` | Pan right amount | `25` for more dramatic |
| Frame times — Thinking | `1–10` sec | Frames per section | Change start/end seconds |
| Frame times — Planning | `11–34` sec | Frames per section | Change start/end seconds |
| Frame times — Execution | `35–57` sec | Frames per section | Change start/end seconds |
| Frame times — Contact | `58–73` sec | Frames per section | Change start/end seconds |
| `scrub` | `1.2` | Scroll lag | ↑ `2.0` smoother, ↓ `0.5` snappier |
| Video seek `duration` | `0.5` sec | Frame transition | ↑ `0.8` smoother, ↓ `0.2` snappier |
| Video glide `duration` | `0.12` sec | Pan speed | ↑ `0.20` slower, ↓ `0.08` faster |

### 1. Video Position (Pan/Shift)

```javascript
const START_OFFSET = 11;         // Initial position
const SHIFT_LEFT_OFFSET = -15;   // Move left
const SHIFT_RIGHT_OFFSET = 15;   // Move right
```

- **Positive** = shifts video right (shows left side of subject)
- **Negative** = shifts video left (shows right side of subject)
- **More dramatic shifts:** `-25` and `25` instead of `-15` and `15`
- **Subtle shifts:** `-8` and `8`
- **One direction only:** Use `0` for one offset

### 2. Video Frame Selection

```javascript
// Section 1 (Thinking): 0:01 - 0:10
targetTime = 1 + ratio * (10 - 1);

// Section 2 (Planning): 0:11 - 0:34
targetTime = 11 + ratio * (34 - 11);

// Section 3 (Execution): 0:35 - 0:57
targetTime = 35 + ratio * (57 - 35);

// Section 4 (Contact): 0:58 - 1:13
targetTime = 58 + ratio * (maxVideoTime - 58);
```

- Numbers are in **seconds** (e.g., `1` = 1 second in, `10` = 10 seconds in)
- **Format:** `startTime + ratio * (endTime - startTime)`
- **Example:** Change Thinking from seconds 1–10 to 0–8: `0 + ratio * (8 - 0)`

### 3. Video Glide Speed (Pan Smoothness)

```javascript
tl.to(video, {
  xPercent: SHIFT_LEFT_OFFSET,
  duration: 0.12,          // ← Customize this
  ease: "power2.inOut"
}, 0.16);
```

- **Currently:** Quick glide (120ms)
- **Slower/smoother:** `0.20` or `0.25`
- **Faster/snappier:** `0.08`

### 4. Video Scrubbing Speed (Frame Seek)

```javascript
gsap.to(video, {
  currentTime: targetTime,
  duration: 0.5,           // ← Customize this
  ease: "power1.out",
  overwrite: "auto"
});
```

- **Currently:** 500ms smooth transition
- **Snappier:** `0.2` or `0.3`
- **Smoother:** `0.8` or `1.0`

### 5. ScrollTrigger Scrub (Scroll Responsiveness)

```javascript
scrub: 1.2,  // ← Customize this
```

- **0** = instant (snappy, responsive to scroll)
- **1.2** = 1.2 second lag (smooth, momentum-like)
- **Try:** `0.5` (snappier), `2` (smoother)

---

## Easing Options

| Ease | Feel |
|---|---|
| `"none"` | Linear — constant speed (robotic) |
| `"power1.out"` | Gentle deceleration (smooth) |
| `"power2.out"` | Normal deceleration (default) |
| `"power3.out"` | Strong deceleration (snappy) |
| `"back.out"` | Slight bounce at end (playful) |
| `"elastic.out"` | Springy bounce (energetic) |
| `"power2.inOut"` | Accelerate then decelerate (smooth S-curve) |

### Visualized

```
"none"          ════════════════ (straight line, constant speed)
"power1.out"    ═════════╱════╱ (slight deceleration)
"power2.out"    ═════╱═══════╱╱ (pronounced deceleration)
"power3.out"    ═══╱═════════╱╱╱ (strong deceleration)
"back.out"      ══════╱══════╱~ (bounce at end)
"elastic.out"   ══════╱═══╱~~╱~~ (springy)
"power2.inOut"  ════╱════╱════╱ (accelerate then decelerate)
```

---

## Pro Tips

1. **Test in real-time:** Use browser DevTools to modify values and see changes immediately
2. **Start with duration:** Changing animation speeds is easiest and most impactful
3. **Keep easing consistent:** Use the same easing throughout for a cohesive feel
4. **Stagger creates sophistication:** Increase stagger values for a premium feel
5. **Video positioning should match content:** Shift video to show speaker/subject appropriately

### Browser Console Testing

After making changes, open DevTools (F12) and check the Console for errors. Look for messages like `[Video Scrub] Progress:` to verify scrubbing is working.

---

## Common Issues & Fixes

**Text still looks similar after changes?**
- Increase `duration` from `0.5` to `1.0`
- Increase `y` from `20` to `50`
- Try a different `ease` function

**Video scrubbing feels jerky?**
- Increase `scrub` from `1.2` to `2.0`
- Increase video scrubbing `duration` from `0.5` to `0.8`

**Animations feel too slow?**
- Decrease all `duration` values
- Decrease `stagger` values
- Change `ease` to `"power3.out"` for a snappier feel

**Animations feel too fast?**
- Increase all `duration` values
- Increase `stagger` values
- Change `ease` to `"back.out"` for a smoother feel
