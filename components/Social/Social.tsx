import Image from "next/image";
import { useAppContext } from "../Context/AppContext";
import styles from "./social.module.css";

export default function Social() {
  const device = useAppContext();
  return (
    <div
      className={
        device == "lg" || device == "md"
          ? styles.verticalAlign
          : styles.horizontalAlign
      }
    >
      <a
        href="https://www.linkedin.com/in/nagraj-deshmukh/"
        target="_blank"
        className={styles.mediaImg}
      >
        <Image
          src="/images/linkedin.svg"
          height={20}
          width={20}
          alt="LinkedIn"
          priority
        />
      </a>
      <a href="https://github.com/nagraj98" target="_blank">
        <Image
          src="/images/github.svg"
          height={20}
          width={20}
          alt="Github"
          priority
        />
      </a>
      <a
        href="https://scholar.google.com/citations?user=0TEq0-IAAAAJ&hl=en&oi=ao"
        target="_blank"
        className={styles.mediaImg}
      >
        <Image
          src="/images/gscholar.svg"
          height={20}
          width={20}
          alt="GoogleScholar"
          priority
        />
      </a>
      <a
        href="https://tinsandwich.medium.com/"
        target="_blank"
        className={styles.mediaImg}
      >
        <Image
          src="/images/medium.svg"
          height={20}
          width={20}
          alt="Medium"
          priority
        />
      </a>

      <a
        href="mailto:dnagraj998@gmail.com"
        title="Mail to: dnagraj998@gmail.com"
      >
        <Image
          src="/images/gmail.svg"
          height={20}
          width={20}
          alt="Mail"
          priority
        />
      </a>

      <a href="assets/nagraj_resume_May24.pdf" target="_blank">
        <Image
          src="/images/cv.svg"
          height={20}
          width={20}
          alt="Resume"
          priority
        />
      </a>
    </div>
  );
}
