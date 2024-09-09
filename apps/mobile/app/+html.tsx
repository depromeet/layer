import { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="apple-itunes-app" content="app-id={ITUNES_ID}" />

        {/* Other head elements... */}
      </head>
      <body>{children}</body>
    </html>
  );
}
