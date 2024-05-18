import Head from "next/head";
import styles from "./layout.module.css";
import Script from "next/script";

export const siteTitle = "Nagraj Deshmukh";
const description = `Hi! I am Nagraj, a 25 y/o Data Scientist. 
I crunch numbers, unleash creativity, and tell stories.`;

export default function Layout({ children }) {
  return (
    <div className={styles.body}>
      <Head>
        <title>Jargan</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={description} />
        <meta
          property="og:image"
          content={`https://github.com/nagraj98/jargan-portfolio/blob/main/public/images/Website.png`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="og:url" content="https://jargan.vercel.app/" />
        <meta name="og:description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={siteTitle} />
        <Script src="https://www.googletagmanager.com/gtag/js?id=${process.env.JARGAN_GOOGLE_ANALYTICS_ID}" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.JARGAN_GOOGLE_ANALYTICS_ID}');
        `}
        </Script>
      </Head>
      <main className={styles.body}>{children}</main>
    </div>
  );
}
