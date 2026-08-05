'use client';

import Script from 'next/script';

export default function TawkChat() {
  return (
    <>
      <Script id="tawk-custom-position" strategy="beforeInteractive">
        {`
          var Tawk_API = Tawk_API || {};
          Tawk_API.customStyle = {
            visibility: {
              desktop: {
                position: 'br',
                xOffset: 24,
                yOffset: 95
              },
              mobile: {
                position: 'br',
                xOffset: 15,
                yOffset: 85
              }
            }
          };
        `}
      </Script>
      <Script
        id="tawk-script"
        strategy="afterInteractive"
        src="https://embed.tawk.to/6a737c7d2539311d47e468a3/1jv9hsjco"
        crossOrigin="anonymous"
      />
    </>
  );
}