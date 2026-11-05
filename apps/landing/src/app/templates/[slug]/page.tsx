import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Closing } from "@/components/ui";
import { templates } from "@/lib/templates";
import { appUrl, isPublicSite, siteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return templates.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = templates.find((item) => item.slug === slug);
  if (!template) notFound();
  const title = `${template.name} 회고 방법·질문·작성 예시`;
  const description = `${template.summary} ${template.name} 회고의 질문과 작성 예시, 진행 팁을 확인하고 레이어에서 직접 시작해 보세요.`;
  return {
    title,
    description,
    alternates: { canonical: `/templates/${slug}` },
    openGraph: {
      title,
      description,
      url: `/templates/${slug}`,
      type: "article",
      locale: "ko_KR",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function TemplateGuide({ params }: Props) {
  const { slug } = await params;
  const template = templates.find((item) => item.slug === slug);
  if (!template) notFound();
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "레이어",
        item: siteUrl.origin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `${template.name} 회고`,
        item: new URL(`/templates/${slug}`, siteUrl).href,
      },
    ],
  };
  return (
    <main id="main">
      {isPublicSite && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <article className="guide container">
        <nav className="breadcrumbs" aria-label="현재 위치">
          <Link href="/">홈</Link>
          <span>/</span>
          <Link href="/#templates">회고 템플릿</Link>
          <span>/</span>
          <span aria-current="page">{template.name}</span>
        </nav>
        <header className={`guide-header ${template.color}`}>
          <p className="eyebrow">{template.label}</p>
          <h1>
            {template.name} 회고,
            <br />
            질문부터 작성 예시까지.
          </h1>
          <p>{template.summary}</p>
          <a className="button button-dark" href={appUrl}>
            레이어에서 회고 시작하기 <span aria-hidden="true">↗</span>
          </a>
        </header>
        <div className="guide-content">
          <section>
            <h2>{template.name} 회고란 무엇인가요?</h2>
            <p>{template.intro}</p>
          </section>
          <section>
            <h2>이럴 때 활용해 보세요</h2>
            <p>{template.audience}</p>
          </section>
          <section>
            <h2>질문을 따라 회고해 보세요</h2>
            <p>
              아래 답변은 이해를 돕기 위한 예시예요. 내 경험 속 구체적인 상황을
              떠올리며 적어보세요.
            </p>
            <ol className="guide-questions">
              {template.questions.map((question, index) => (
                <li key={question.term}>
                  <span className="question-number">0{index + 1}</span>
                  <div>
                    <span className="question-term">
                      {question.term} · {question.label}
                    </span>
                    <h3>{question.question}</h3>
                    <blockquote>{question.example}</blockquote>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <aside className="guide-tip">
            <span aria-hidden="true">✳</span>
            <div>
              <h2>조금 더 의미 있는 회고를 위한 팁</h2>
              <p>{template.tip}</p>
            </div>
          </aside>
          <section>
            <h2>회고를 다음 행동으로 연결하려면</h2>
            <p>
              먼저 각자의 생각을 충분히 적고, 함께 읽으며 반복해서 나온 이야기를
              찾아보세요. 그중 다음 회고 전까지 실천할 수 있는 행동을 정해요.
              레이어에서는 회고 작성과 AI 분석, 실행 목표 관리를 하나의 흐름으로
              이어갈 수 있어요.
            </p>
          </section>
          <section>
            <h2>다른 회고 방식도 살펴보세요</h2>
            <div className="related-guides">
              {templates
                .filter((item) => item.slug !== slug)
                .map((item) => (
                  <Link key={item.slug} href={`/templates/${item.slug}`}>
                    <strong>{item.name}</strong>
                    <span>{item.label}</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </article>
      <Closing />
    </main>
  );
}
