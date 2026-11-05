"use client";

import { useEffect } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Splits an element's text into word spans, keeping <br>. Returns the words and a restore fn. */
function splitWords(root: Element, mask: boolean) {
  const original = root.innerHTML;
  const words: HTMLElement[] = [];
  const fragment = document.createDocumentFragment();
  root.childNodes.forEach((node) => {
    if (node.nodeName === "BR") {
      fragment.appendChild(node.cloneNode());
      return;
    }
    (node.textContent ?? "").split(/(\s+)/).forEach((token) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        fragment.appendChild(document.createTextNode(" "));
        return;
      }
      const outer = document.createElement("span");
      outer.style.display = "inline-block";
      outer.setAttribute("aria-hidden", "true");
      if (mask) {
        outer.style.overflow = "hidden";
        outer.style.verticalAlign = "top";
        outer.style.paddingBottom = "0.12em";
        outer.style.marginBottom = "-0.12em";
      }
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.textContent = token;
      outer.appendChild(inner);
      fragment.appendChild(outer);
      words.push(inner);
    });
  });
  root.setAttribute(
    "aria-label",
    (root.textContent ?? "").replace(/\s+/g, " ").trim(),
  );
  root.replaceChildren(fragment);
  return {
    words,
    restore: () => {
      root.innerHTML = original;
      root.removeAttribute("aria-label");
    },
  };
}

export function ScrollMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = () => {};

    const start = () => {
      cleanup();
      cleanup = () => {};
      if (preference.matches) return;

      const animations = new Set<Animation>();
      const restores: Array<() => void> = [];
      let observer: IntersectionObserver | undefined;
      let frame = 0;

      const play = (
        element: Element,
        keyframes: Keyframe[],
        delay = 0,
        duration = 800,
        pseudoElement?: string,
      ) => {
        if (typeof element.animate !== "function") return;
        const animation = element.animate(keyframes, {
          duration,
          delay,
          easing: EASE,
          fill: "backwards",
          ...(pseudoElement ? { pseudoElement } : {}),
        });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      };
      const reveal = (element: Element, delay = 0, distance = 24) =>
        play(
          element,
          [
            { opacity: 0, transform: `translateY(${distance}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
          delay,
        );

      // 1. Hero: headline rises word by word, then the rest of the copy and the preview.
      const heroTitle = document.querySelector(".hero h1");
      if (heroTitle) {
        const { words, restore } = splitWords(heroTitle, true);
        restores.push(restore);
        words.forEach((word, i) =>
          play(
            word,
            [{ transform: "translateY(110%)" }, { transform: "translateY(0)" }],
            80 + i * 70,
            900,
          ),
        );
      }
      document
        .querySelectorAll(".hero-copy > :not(h1)")
        .forEach((el, i) => reveal(el, 420 + i * 110));
      const preview = document.querySelector<HTMLElement>(".product-preview");
      if (preview) {
        play(
          preview,
          [
            { opacity: 0, transform: "translateY(48px) scale(0.94)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          360,
          1100,
        );
      }

      // Hero art: route-like bars draw in, then drift at different speeds on scroll.
      const bars = Array.from(
        document.querySelectorAll<HTMLElement>(".hero-art .bar"),
      );
      bars.forEach((bar, i) => {
        const from =
          bar.dataset.dir === "v"
            ? "inset(0 0 100% 0 round 999px)"
            : "inset(0 100% 0 0 round 999px)";
        play(
          bar,
          [{ clipPath: from }, { clipPath: "inset(0 0 0 0 round 999px)" }],
          200 + i * 140,
          1400,
        );
      });

      // 2. Scroll scrubbed text: words light up as the heading moves up the viewport.
      const scrub: Array<{ el: Element; words: HTMLElement[] }> = [];
      document
        .querySelectorAll(".story-intro h2, .closing h2")
        .forEach((el) => {
          const { words, restore } = splitWords(el, false);
          restores.push(restore);
          words.forEach((w) => (w.style.opacity = "0.18"));
          scrub.push({ el, words });
        });

      // 3. Scroll-linked values: header state, preview parallax, scrubbed words.
      const heroInner = document.querySelector<HTMLElement>(".hero-inner");
      const splitCards = Array.from(
        document.querySelectorAll<HTMLElement>(".split-card"),
      );
      const splitItems = Array.from(
        document.querySelectorAll<HTMLElement>(".split-index li"),
      );
      const marquees = Array.from(
        document.querySelectorAll<HTMLElement>(".marquee-row"),
      );
      const footerMark = document.querySelector<HTMLElement>(".footer-mark");
      const headingWords: Array<{ el: Element; words: HTMLElement[] }> = [];
      document
        .querySelectorAll(".section-heading h2, .faq-section h2, .marquee-head h2")
        .forEach((el) => {
          const { words, restore } = splitWords(el, true);
          restores.push(restore);
          words.forEach((w) => (w.style.transform = "translateY(112%)"));
          headingWords.push({ el, words });
        });
      const header = document.querySelector<HTMLElement>(".site-header");
      const update = () => {
        frame = 0;
        const vh = window.innerHeight;
        header?.toggleAttribute("data-scrolled", window.scrollY > 8);
        if (preview) {
          const p = clamp(window.scrollY / (vh * 0.8));
          preview.style.translate = `0 ${p * -36}px`;
          preview.style.scale = String(1 + p * 0.04);
        }
        if (heroInner) {
          const h = clamp(window.scrollY / (vh * 0.7));
          heroInner.style.translate = `0 ${h * -60}px`;
          heroInner.style.opacity = String(1 - h * 0.85);
        }
        let activeIdx = -1;
        let best = Infinity;
        splitCards.forEach((card, i) => {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--p", clamp((vh - r.top) / (vh + r.height)).toFixed(3));
          const d = Math.abs(r.top + r.height / 2 - vh * 0.5);
          if (d < best) {
            best = d;
            activeIdx = i;
          }
        });
        splitItems.forEach((li, i) => li.toggleAttribute("data-active", i === activeIdx));
        marquees.forEach((row) => {
          const r = (row.parentElement as HTMLElement).getBoundingClientRect();
          const t = clamp((vh - r.top) / (vh + r.height));
          const travel = Math.max(0, row.scrollWidth - window.innerWidth);
          const x = row.dataset.dir === "r" ? -(1 - t) * travel : -t * travel;
          row.style.transform = `translate3d(${x}px,0,0)`;
        });
        if (footerMark) {
          const r = (footerMark.parentElement as HTMLElement).getBoundingClientRect();
          const t = clamp((vh - r.top) / (r.height * 0.9));
          footerMark.style.translate = `0 ${(1 - t) * 30}%`;
          footerMark.style.opacity = String(0.15 + 0.85 * t);
        }
        bars.forEach((bar) => {
          bar.style.translate = `0 ${window.scrollY * Number(bar.dataset.speed ?? 0)}px`;
        });
        for (const { el, words } of scrub) {
          const rect = el.getBoundingClientRect();
          const progress = clamp((vh * 0.88 - rect.top) / (vh * 0.42));
          const lit = progress * words.length;
          words.forEach((w, i) => {
            w.style.opacity = String(0.18 + 0.82 * clamp(lit - i + 0.5));
          });
        }
      };
      const onScroll = () => {
        if (!frame) frame = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      // 4. Entrance reveals for the remaining sections.
      if (typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              const target = entry.target;
              const siblings = Array.from(target.parentElement?.children ?? []);
              const index = siblings.indexOf(target);
              if (target.matches(".story-row")) {
                const line = target.querySelector(".story-line");
                if (line)
                  play(
                    line,
                    [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
                    0,
                    1000,
                  );
                target
                  .querySelectorAll("h3, p")
                  .forEach((c, i) => reveal(c, 120 + i * 110, 20));
              } else if (target.matches(".how-steps li")) {
                const delay = index * 140;
                const badge = target.querySelector(":scope > span");
                if (badge)
                  play(
                    badge,
                    [
                      { opacity: 0, transform: "scale(0.5)" },
                      { opacity: 1, transform: "scale(1)" },
                    ],
                    delay,
                    700,
                  );
                play(
                  target,
                  [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
                  delay + 150,
                  900,
                  "::before",
                );
                const body = target.querySelector(":scope > div");
                if (body) reveal(body, delay + 100, 20);
              } else if (target.matches("h2")) {
              const item = headingWords.find((h) => h.el === target);
              item?.words.forEach((w, i) => {
                play(
                  w,
                  [{ transform: "translateY(112%)" }, { transform: "translateY(0)" }],
                  i * 60,
                  900,
                );
                w.style.transform = "";
              });
            } else if (target.matches(".faq-list details")) {
                reveal(target, index * 70, 16);
              } else {
                reveal(target, 0, 24);
              }
              observer?.unobserve(target);
            }
          },
          { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
        );
        document
          .querySelectorAll(
            ".story-intro > p, .section-heading > :not(h2), .section-heading h2, .faq-section h2, .marquee-head h2, .template-explorer, .template-guide-links, .how-steps li, .faq-list details, .closing > *",
          )
          .forEach((el) => observer?.observe(el));
      }

      cleanup = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (frame) cancelAnimationFrame(frame);
        observer?.disconnect();
        animations.forEach((a) => a.cancel());
        animations.clear();
        restores.reverse().forEach((r) => r());
        header?.removeAttribute("data-scrolled");
        bars.forEach((bar) => (bar.style.translate = ""));
        marquees.forEach((row) => (row.style.transform = ""));
        if (heroInner) {
          heroInner.style.translate = "";
          heroInner.style.opacity = "";
        }
        if (footerMark) {
          footerMark.style.translate = "";
          footerMark.style.opacity = "";
        }
        if (preview) {
          preview.style.translate = "";
          preview.style.scale = "";
        }
      };
    };

    start();
    preference.addEventListener("change", start);
    return () => {
      preference.removeEventListener("change", start);
      cleanup();
    };
  }, []);
  return null;
}
