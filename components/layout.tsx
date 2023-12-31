import Head from "next/head";
import styles from "./layout.module.css";
import Script from "next/script";

export const siteTitle = "Nagraj Deshmukh";
const description = `Hi! I am Nagraj, a 25 y/o Data Scientist. 
I love to solve problems and build products & experiences. Currently pursuing MS in Business Analytics and Information Management at Purdue University.`;

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
        <script
          data-name="BMC-Widget"
          data-cfasync="false"
          src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
          data-id="jargan"
          data-description="Support me on Buy me a coffee!"
          data-message=""
          data-color="#8401c0"
          data-position="Right"
          data-x_margin="18"
          data-y_margin="18"
        ></script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-D62B2HVNB2" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-D62B2HVNB2');
        `}
        </Script>
      </Head>
      <main className={styles.body}>{children}</main>
    </div>
  );
}
