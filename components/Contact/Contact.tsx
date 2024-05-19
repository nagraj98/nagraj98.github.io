import { Button, Text } from "@nextui-org/react";
import { useAppContext } from "../Context/AppContext";
import GradientText from "../GradientText/GradientText";
import styles from "./contact.module.css";
import buttonStyles from "../../styles/buttons.module.css";

export default function Contact() {
  const device = useAppContext();
  return (
    <div id="contact" className={styles.contact}>
      <div>
        <GradientText
          h2
          size={device == "lg" ? "$6xl" : "4xl"}
          text="Contact"
        />
        <Text h4 css={{ color: "$gray700" }}>
          Currently looking for Full-time Data Science positions. Whether you
          have any open opportunity or just want to say hi, my inbox is always
          open!
        </Text>
        <br />

        <Button
          bordered
          className={`${buttonStyles.button} ${buttonStyles.customButton}`}
        >
          <a
            href="mailto:dnagraj998@gmail.com"
            title="Mail to: dnagraj998@gmail.com"
          >
            Get in touch
          </a>
        </Button>
      </div>
    </div>
  );
}
