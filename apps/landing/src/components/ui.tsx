import Image from "next/image";
import Link from "next/link";
import { appUrl } from "@/lib/site";

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="레이어 홈">
      <Image src="/product/layer-logo.svg" width={96} height={30} alt="Layer" />
    </Link>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav aria-label="주 메뉴">
          <Link href="/#features">서비스 소개</Link>
          <Link href="/#templates">회고 템플릿</Link>
          <Link href="/#how-it-works">이용 방법</Link>
        </nav>
        <a className="button button-dark button-small" href={appUrl}>
          레이어 시작하기 <Arrow />
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Logo />
          <a href={appUrl}>
            서비스 바로가기 <Arrow />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Layer. 모든 권리 보유.</span>
        </div>
      </div>
      <div className="footer-mark" aria-hidden="true">
        <Image src="/product/layer-logo.svg" width={960} height={300} alt="" />
      </div>
    </footer>
  );
}

export function Closing() {
  return (
    <section className="closing container">
      <div>
        <h2>
          오늘의 이야기가<br />내일의 우리를 바꿀 수 있도록.
        </h2>
        <p className="closing-description">작은 회고부터, 레이어와 함께 시작해 보세요.</p>
      </div>
      <a className="button button-blue" href={appUrl}>
        레이어 시작하기
      </a>
    </section>
  );
}
