"use client";

import Script from "next/script";

export const GoogleAnalytics = () => {
    return (
        <>
            <Script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-YPXBB8KC6M"
            ></Script>
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                    
                        gtag('config', 'G-YPXBB8KC6M');
                    `,
                }}
            />
        </>
    );
};
