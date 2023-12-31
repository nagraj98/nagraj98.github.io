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
    </div>
  );
}
