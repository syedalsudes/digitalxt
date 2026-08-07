'use client';

import Script from 'next/script';

export default function TawkChat() {
  return (
    <>
      {/* Configuration Script - Lowered yOffset */}
      <Script id="tawk-config" strategy="afterInteractive">
        {`
          var Tawk_API = Tawk_API || {};
          Tawk_API.customStyle = {
            visibility: {
              desktop: {
                position: 'br',
                xOffset: 24,
                yOffset: 84 // Pehle 110 tha, ab niche kar diya hai
              },
              mobile: {
                position: 'br',
                xOffset: 16,
                yOffset: 74 // Pehle 85 tha, ab niche kar diya hai
              }
            }
          };
        `}
      </Script>

      {/* Main Tawk Script */}
      <Script
        id="tawk-script"
        strategy="afterInteractive"
        src="https://embed.tawk.to/6a737c7d2539311d47e468a3/1jv9hsjco"
        crossOrigin="anonymous"
      />
    </>
  );
}
