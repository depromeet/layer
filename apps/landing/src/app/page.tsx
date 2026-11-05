import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Arrow, Closing } from "@/components/ui";
import { ScrollMotion } from "@/components/scroll-motion";
import { TemplateExplorer } from "@/components/template-showcase";
import { ActionArt, InsightArt, ThinkArt } from "@/components/story-art";
import { appUrl, isPublicSite, siteDescription, siteUrl } from "@/lib/site";
import { templates } from "@/lib/templates";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "레이어 Layer | 팀·개인 회고부터 AI 분석까지",
    description: siteDescription,
    locale: "ko_KR",
    type: "website",
    siteName: "레이어 Layer",
    images: ["/opengraph-image"],
  },
};

const faqs = [
  [
    "레이어는 어떤 회고 서비스인가요?",
    "레이어는 개인과 팀이 회고를 작성하고, AI 분석 결과를 확인하고, 다음 실행 목표를 관리할 수 있는 회고 서비스예요. 스페이스에 회고를 모아두고 경험과 배움을 이어갈 수 있어요.",
  ],
  [
    "혼자서도 사용할 수 있나요?",
    "네. 개인 회고를 기록하고 분석하는 데에도 사용할 수 있어요. 함께 회고하고 싶다면 스페이스를 만들고 초대 링크로 팀원을 초대해 보세요.",
  ],
  [
    "어떤 회고 템플릿을 사용할 수 있나요?",
    "KPT, 5F, Mad Sad Glad, SSC, PMI와 자유 형식 템플릿을 사용할 수 있어요. 추천 템플릿을 살펴보거나 질문을 편집해서 우리 팀에 맞게 구성할 수도 있어요.",
  ],
  [
    "AI 회고 분석에서는 무엇을 볼 수 있나요?",
    "작성한 회고를 바탕으로 잘한 점, 아쉬운 점, 개선할 점을 살펴볼 수 있어요. 팀과 개인의 분석, 만족도와 목표 달성 관련 결과를 확인하고 실행 목표로 이어갈 수 있어요. 분석 결과는 작성 내용과 분석 완료 여부에 따라 달라져요.",
  ],
  [
    "모바일에서도 회고할 수 있나요?",
    "네. 모바일과 데스크톱 웹에서 회고를 진행할 수 있어요. 편한 기기에서 회고를 작성하고 결과를 확인해 보세요.",
  ],
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "레이어 Layer",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "ko-KR",
    description: siteDescription,
    ...(isPublicSite ? { url: siteUrl.origin } : {}),
    featureList: [
      "개인·팀 회고",
      "회고 템플릿",
      "AI 회고 분석",
      "실행 목표 관리",
    ],
  };
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "ko-KR",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const siteData = isPublicSite
    ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "레이어 Layer",
        url: siteUrl.origin,
        inLanguage: "ko-KR",
      }
    : null;
  const jsonLd = [structuredData, faqData, ...(siteData ? [siteData] : [])];
  return (
    <main id="main">
      <ScrollMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero">
        <div className="hero-art" aria-hidden="true">
          <i className="bar bar-a" data-dir="v" data-speed="0.12" />
          <i className="bar bar-b" data-dir="h" data-speed="-0.06" />
          <i className="bar bar-c" data-dir="h" data-speed="0.18" />
          <i className="bar bar-d" data-dir="h" data-speed="-0.1" />
          <i className="bar bar-e" data-dir="v" data-speed="0.22" />
          <i className="bar bar-f" data-dir="h" data-speed="0.08" />
        </div>
        <div className="hero-inner container">
          <h1>돌아본 시간이<br />우리의 다음을 만들어요.</h1>
          <div className="hero-copy">
            <p className="hero-description">
              지나온 경험을 함께 돌아보고,<br />
              발견한 생각을 다음 실천으로 이어가요.
            </p>
            <div className="hero-actions">
              <a className="button button-blue" href={appUrl}>레이어 시작하기</a>
              <a className="button button-plain" href="#features">레이어 알아보기</a>
            </div>
          </div>
        </div>
        <figure className="product-preview container">
          <Image className="product-screen" src="/product/reflection-writing.svg" width={652} height={412} alt="레이어 온보딩의 회고 작성 예시. 질문을 따라 생각을 적고, 작성한 회고를 제출할 수 있어요." priority />
          <figcaption className="product-caption">회고 작성 화면 · 서비스 온보딩의 예시예요.</figcaption>
        </figure>
      </section>

      <section id="features" className="story-section">
        <div className="container story-intro">
          <h2>바쁘게 지나온 시간에도<br />다음으로 가져갈 이야기가 있어요.</h2>
          <p>잘했던 일부터 아쉬웠던 순간까지.<br />잠시 멈춰 돌아보면, 혼자서는 놓쳤던 생각을 발견할 수 있어요.</p>
        </div>
        <div className="container split">
          <div className="split-sticky">
            <h2 className="split-title">레이어가 돕는<br />세 가지 순간</h2>
            <ol className="split-index" aria-hidden="true">
              <li>생각 꺼내기</li>
              <li>새로운 시선</li>
              <li>작은 실천</li>
            </ol>
          </div>
          <div className="split-cards">
            <article className="split-card">
              <div className="split-visual"><ThinkArt /></div>
              <h3>생각을 편하게 꺼내는 곳</h3>
              <p>질문을 따라 각자의 속도로 기록해요. 혼자만의 회고도, 팀원과 함께 나누는 이야기도 스페이스에 모아둘 수 있어요.</p>
            </article>
            <article className="split-card">
              <div className="split-visual"><InsightArt /></div>
              <h3>기록에서 발견하는 새로운 시선</h3>
              <p>AI 분석으로 잘한 점과 개선할 점을 살펴봐요. 함께 남긴 기록을 바탕으로 우리의 경험을 조금 더 깊이 이해할 수 있어요.</p>
            </article>
            <article className="split-card">
              <div className="split-visual"><ActionArt /></div>
              <h3>다음의 변화를 작은 실천부터</h3>
              <p>회고에서 발견한 개선점을 실행 목표로 남겨요. 돌아본 시간이 다음 행동으로 이어지도록 레이어가 함께해요.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="marquee-section" aria-labelledby="marquee-title">
        <div className="container marquee-head">
          <h2 id="marquee-title">레이어가 담는<br />회고의 기반</h2>
        </div>
        <div className="marquee-viewport">
          <div className="marquee-row" data-dir="l">
            {templates.map((item, i) => (
              <div className={`m-card m-tone-${i % 5}`} key={item.slug}>
                <div className="m-visual"><strong>{item.name}</strong></div>
                <span className="m-label">{item.name} 회고</span>
              </div>
            ))}
          </div>
          <div className="marquee-row" data-dir="r">
            {[
              "개인 · 팀 회고",
              "AI 회고 분석",
              "실행 목표",
              "스페이스",
              "초대 링크",
              "맞춤 템플릿",
              "모바일 · 웹",
            ].map((label, i) => (
              <div className={`m-card m-tone-${(i + 2) % 5}`} key={label}>
                <div className="m-visual"><strong>{label}</strong></div>
                <span className="m-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="templates" className="templates-section section-space">
        <div className="container">
          <div className="section-heading">
            <h2>
              회고에 맞는 질문을 골라보세요.
            </h2>
            <p>
              KPT부터 5F까지, 목적에 맞는 회고 방식을 살펴보세요.
            </p>
          </div>
          <TemplateExplorer />
          <div className="template-guide-links" aria-label="모든 회고 가이드">
            {templates.map((item) => (
              <Link key={item.slug} href={`/templates/${item.slug}`}>
                {item.name} 회고 가이드 <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="how-section container section-space"
      >
        <div className="section-heading">
          <h2>
            우리의 첫 회고,
            <br />
            이렇게 시작해요.
          </h2>
          <a className="text-link" href={appUrl}>
            지금 레이어 시작하기 <Arrow />
          </a>
        </div>
        <ol className="how-steps">
          <li>
            <span>01</span>
            <div>
              <h3>우리만의 스페이스 만들기</h3>
              <p>
                혼자만의 기록도, 팀과 함께하는 회고도 좋아요.
                <br />
                회고를 모아둘 공간을 만들고 함께할 사람을 초대해요.
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>템플릿을 고르고, 생각 적어보기</h3>
              <p>
                회고의 목적에 맞는 질문을 선택해요.
                <br />
                미처 하지 못했던 이야기도 나의 속도로 차근차근 적어요.
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>발견한 것을 다음 행동으로</h3>
              <p>
                회고를 제출하고 분석 결과를 확인해요.
                <br />
                우리에게 필요한 작은 실천을 실행 목표로 남겨요.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="faq-section container section-space">
        <div className="section-heading">
          <h2>자주 묻는 질문</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <Closing />
    </main>
  );
}
