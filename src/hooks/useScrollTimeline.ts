import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  VIDEO_SEGMENTS,
  VIDEO_SCRUB_DURATION,
  VIDEO_SCRUB_EASE,
  VIDEO_GLIDE_DURATION,
  VIDEO_GLIDE_EASE,
  VIDEO_GLIDE_POINTS,
  VIDEO_START_OFFSET,
  SCROLL_END,
  SCRUB,
  ANTICIPATE_PIN,
  SECTION_TIMELINES,
} from "../constants/timeline";

gsap.registerPlugin(ScrollTrigger);

interface Refs {
  pinContainerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
}

function isVideoReady(video: HTMLVideoElement | null): video is HTMLVideoElement {
  return !!video && !!video.duration && !isNaN(video.duration);
}

function computeVideoTime(progress: number): number {
  for (const seg of VIDEO_SEGMENTS) {
    if (progress >= seg.startProgress && progress < seg.endProgress) {
      const ratio = (progress - seg.startProgress) / (seg.endProgress - seg.startProgress);
      return seg.startTime + ratio * (seg.endTime - seg.startTime);
    }
  }
  return VIDEO_SEGMENTS[VIDEO_SEGMENTS.length - 1].endTime;
}

export function useScrollTimeline(refs: Refs) {
  const { pinContainerRef, videoRef } = refs;
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const pinContainer = pinContainerRef.current;
    const video = videoRef.current;
    if (!pinContainer) return;

    if (video) {
      gsap.set(video, { xPercent: VIDEO_START_OFFSET });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinContainer,
        start: "top top",
        end: SCROLL_END,
        scrub: SCRUB,
        pin: true,
        anticipatePin: ANTICIPATE_PIN,
        onUpdate: (self) => {
          if (!isVideoReady(video)) return;
          const p = self.progress;
          const targetTime = computeVideoTime(p);
          gsap.to(video, {
            currentTime: targetTime,
            duration: VIDEO_SCRUB_DURATION,
            ease: VIDEO_SCRUB_EASE,
            overwrite: "auto",
          });
        },
      },
    });

    tlRef.current = tl;

    // Video horizontal glide
    if (video) {
      for (const glide of VIDEO_GLIDE_POINTS) {
        tl.to(video, {
          xPercent: glide.xPercent,
          duration: VIDEO_GLIDE_DURATION,
          ease: VIDEO_GLIDE_EASE,
        }, glide.atProgress);
      }
    }

    // Section entrance/exit animations
    SECTION_TIMELINES.forEach((sectionCfg) => {
      const sectionEl = sectionCfg.enter === 0
        ? document.getElementById("section-thinking")
        : sectionCfg.enter === 0.25
          ? document.getElementById("section-planning")
          : sectionCfg.enter === 0.50
            ? document.getElementById("section-execution")
            : document.getElementById("section-contact");

      if (!sectionEl) return;
      const sel = (s: string) => `#${sectionEl.id}${s}`;

      for (const anim of sectionCfg.entranceAnimations) {
        if (Object.keys(anim.from).length > 0) {
          tl.fromTo(sel(anim.selector), anim.from, { ...anim.to, duration: anim.duration, ease: anim.ease ?? "none" }, anim.position);
        } else {
          tl.set(sel(anim.selector), anim.to, anim.position);
        }
      }

      for (const anim of sectionCfg.exitAnimations) {
        tl.to(sel(anim.selector), { ...anim.to, duration: anim.duration, ease: anim.ease ?? "none" }, anim.position);
      }
    });

    // Add empty tween at position 1 so timeline is exactly 1s long —
    // positions in seconds now map 1:1 to scroll progress (0–1).
    tl.to({}, { duration: 0 }, 1);
    ScrollTrigger.refresh();

    // Set initial video frame
    if (isVideoReady(video)) {
      video.currentTime = 5.4;
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const cascade = (sectionId: string) => {
    const sel = ".section-badge, .section-title, .bullet-item, .section-description, .contact-form, .contact-links";
    const el = document.getElementById(sectionId);
    if (!el) return;
    const targets = Array.from(el.querySelectorAll<HTMLElement>(sel));

    targets.forEach((child) => child.getAnimations().forEach((a) => a.cancel()));

    targets.forEach((child, i) => {
      child.animate(
        [
          { opacity: 0, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 400,
          delay: i * 80,
          easing: "cubic-bezier(0.33, 1, 0.68, 1)",
          fill: "both",
        },
      );
    });
  };

  const sectionIds = ["section-thinking", "section-planning", "section-execution", "section-contact"];

  const navigateTo = useCallback((progress: number) => {
    const tl = tlRef.current;
    const st = tl?.scrollTrigger;
    if (st) {
      const targetPosition = st.start + progress * (st.end - st.start);
      st.scroll(targetPosition);
    }
  }, []);

  const replayCurrentSection = useCallback(() => {
    const tl = tlRef.current;
    if (!tl) return;

    const p = tl.progress();
    const bounds: [number, number, string][] = [
      [0, 0.21, "section-thinking"],
      [0.25, 0.46, "section-planning"],
      [0.50, 0.71, "section-execution"],
      [0.75, 1.0, "section-contact"],
    ];

    let targetId = sectionIds[0];
    for (const [min, max, id] of bounds) {
      if (p >= min && p <= max) { targetId = id; break; }
    }
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      el.classList.remove("section-active");
      el.style.removeProperty("opacity");
      el.style.removeProperty("visibility");
      el.querySelector<HTMLElement>(".section-content")?.style.removeProperty("opacity");
      el.querySelector<HTMLElement>(".section-content")?.style.removeProperty("transform");
      el.querySelector<HTMLElement>(".section-bg-title")?.style.removeProperty("opacity");
      el.querySelector<HTMLElement>(".section-bg-title")?.style.removeProperty("transform");
      el.querySelector<HTMLElement>(".section-bg-title")?.style.removeProperty("scale");
    }

    const active = document.getElementById(targetId);
    if (!active) return;
    active.classList.add("section-active");
    active.style.removeProperty("opacity");
    active.style.removeProperty("visibility");

    cascade(targetId);
  }, []);

  return { navigateTo, replayCurrentSection };
}
