"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { templates } from "@/lib/templates";

const tones = ["blue", "purple", "mint", "navy", "purple"] as const;

const SEGMENT_VH = 70;

export function TemplateExplorer() {
  const [selected, setSelected] = useState<string>(templates[0]?.slug ?? "kpt");
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);
  const pinRef = useRef<HTMLDivElement>(null);
  const index = Math.max(
    0,
    templates.findIndex((item) => item.slug === selected),
  );
  const template = templates[index];
  const tone = tones[index % tones.length];
  const count = templates.length;

  // Scroll-driven selection: the stage stays pinned while scrolling switches templates.
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 901px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = pinRef.current;
      if (!el || !media.matches) return;
      const rect = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight + 96;
      const p = Math.min(1, Math.max(0, -rect.top / travel));
      setProgress(p);
      const next = Math.min(count - 1, Math.floor(p * count));
      setSelected(templates[next].slug);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const sync = () => {
      setPinned(media.matches);
      update();
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  const choose = useCallback(
    (slug: string, i: number) => {
      setSelected(slug);
      const el = pinRef.current;
      if (!pinned || !el) return;
      const travel = el.offsetHeight - window.innerHeight + 96;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + ((i + 0.5) / count) * travel, behavior: "smooth" });
    },
    [pinned, count],
  );

  return (
    <div
      className={`tpl-pin${pinned ? " is-pinned" : ""}`}
      ref={pinRef}
      style={pinned ? { height: `${count * SEGMENT_VH + 60}vh` } : undefined}
    >
    <div className="tpl-sticky">
    <div className="template-explorer tpl">
      <div className="template-tabs tpl-tabs" aria-label="회고 템플릿 선택">
        {templates.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            aria-pressed={selected === item.slug}
            aria-controls="template-preview"
            onClick={() => choose(item.slug, i)}
          >
            <span className="tpl-index">0{i + 1}</span>
            <span className="tpl-name">{item.name}</span>
          </button>
        ))}
      </div>
      <div
        className={`template-preview tpl-stage tone-${tone}`}
        id="template-preview"
        aria-live="polite"
      >
        <span className="tpl-bar tpl-bar-a" aria-hidden="true" />
        <span className="tpl-bar tpl-bar-b" aria-hidden="true" />
        <div className="template-intro tpl-intro" key={template.slug}>
          <h3>
            {template.name}
            <span> 회고</span>
          </h3>
          <p>{template.summary}</p>
          <Link className="text-link" href={`/templates/${template.slug}`}>
            질문과 작성 예시 보기 <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="tpl-grid" key={`${template.slug}-questions`}>
          {template.questions.slice(0, 3).map((item, i) => (
            <div className={`question-card tpl-tile tile-${i}`} key={item.term}>
              <span className="question-term">
                {item.term} · {item.label}
              </span>
              <span className="tpl-tile-number" aria-hidden="true">
                0{i + 1}
              </span>
              <p>{item.question}</p>
            </div>
          ))}
        </div>
        {template.questions.length > 3 && (
          <span className="more-questions tpl-more">
            다음 행동과 피드백 질문까지 이어져요
          </span>
        )}
      </div>
      <p className="custom-note">
        질문을 직접 편집해 맞춤 템플릿을 만들 수도 있어요.
      </p>
      {pinned && (
        <div className="tpl-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      )}
    </div>
    </div>
    </div>
  );
}
