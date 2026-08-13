'use client';

import Script from 'next/script';

export default function TawkChat() {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

  if (!propertyId || !widgetId) {
    return null;
  }

  // Define CSS directly as a string for injection
  const css = `
    /* Ye CSS direct Tawk.to iframe ko overwrite karega */
    
    /* Pura Container */
    [id^='tawk-bubble'] {
      overflow: visible !important; /* Cut hone se rokega */
    }

    /* Original Bubble element ko target karna */
    div.tawk-min-container {
      bottom: auto !important;
      right: 0px !important;
      left: auto !important;
      overflow: visible !important; /* Safe check */
    }

    /* Scaling: Mobile par 15% aur Laptop par 25% bara */
    @media (max-width: 639px) {
      .tawk-min-container {
        transform: scale(1.15) !important;
        transform-origin: bottom right !important;
      }
    }

    @media (min-width: 640px) {
      .tawk-min-container {
        transform: scale(1.25) !important;
        transform-origin: bottom right !important;
      }
    }
  `;

  return (
    <>
      <Script
        id="tawk-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API = Tawk_API || {};
            var Tawk_LoadStart = new Date();

            // API se positioning control karein, standard CSS direct use nahi karna
            Tawk_API.customStyle = {
              visibility: {
                desktop: {
                  position: 'br', // bottom right
                  xOffset: 12,
                  yOffset: 110 // WhatsApp ke upar
                },
                mobile: {
                  position: 'br',
                  xOffset: 8,  // Screen edge se safe distance
                  yOffset: 85  // Mobile WhatsApp ke upar
                }
              }
            };

            // Custom dynamic CSS inject karna
            (function(){
              var st = document.createElement('style');
              st.type = 'text/css';
              if (st.styleSheet){
                st.styleSheet.cssText = \`${css}\`;
              } else {
                st.appendChild(document.createTextNode(\`${css}\`));
              }
              document.getElementsByTagName('head')[0].appendChild(st);

              // Tawk.to ka original script
              var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/${propertyId}/${widgetId}';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `,
        }}
      />
    </>
  );
}