"use client";

import { useState } from "react";
import Link from "next/link";
import { templates } from "@/lib/templates";

export function TemplateExplorer() {
  const [selected, setSelected] = useState<string>("kpt");
  const template =
    templates.find((item) => item.slug === selected) || templates[0];
  return (
    <div className="template-explorer">
      <div className="template-tabs" aria-label="회고 템플릿 선택">
        {templates.map((item) => (
          <button
            key={item.slug}
            type="button"
            aria-pressed={selected === item.slug}
            aria-controls="template-preview"
            onClick={() => setSelected(item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div
        className={`template-preview ${template.color}`}
        id="template-preview"
        aria-live="polite"
      >
        <div className="template-intro" key={template.slug}>
          <h3>
            {template.name}
            <span> 회고</span>
          </h3>
          <p>{template.summary}</p>
          <Link className="text-link" href={`/templates/${template.slug}`}>
            질문과 작성 예시 보기 <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="question-stack" key={`${template.slug}-questions`}>
          {template.questions.slice(0, 3).map((item, index) => (
            <div className="question-card" key={item.term}>
              <span className={`question-number number-${index}`}>
                0{index + 1}
              </span>
              <div>
                <span className="question-term">
                  {item.term} · {item.label}
                </span>
                <p>{item.question}</p>
              </div>
            </div>
          ))}
          {template.questions.length > 3 && (
            <span className="more-questions">
              다음 행동과 피드백 질문까지 이어져요
            </span>
          )}
        </div>
      </div>
      <p className="custom-note">
        질문을 직접 편집해 맞춤 템플릿을 만들 수도 있어요.
      </p>
    </div>
  );
}
