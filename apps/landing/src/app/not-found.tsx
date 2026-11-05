import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="not-found container">
      <p className="eyebrow">페이지를 찾을 수 없어요</p>
      <h1>잠시, 다른 길로 왔네요.</h1>
      <p>주소를 확인하거나 레이어 소개 페이지에서 다시 시작해 보세요.</p>
      <Link className="button button-blue" href="/">
        레이어 홈으로 돌아가기 <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
