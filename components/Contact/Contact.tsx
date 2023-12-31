import { Button, Text } from "@nextui-org/react";
import { useAppContext } from "../Context/AppContext";
import GradientText from "../GradientText/GradientText";
import styles from "./contact.module.css";

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
          className={styles.button}
          // css={{
          //   // backgroundColor: 'orange',
          //   color: "white",
          //   "& a": {
          //     // Targeting the <a> tag specifically
          //     color: "white", // Change to your desired color
          //     textDecoration: "none", // Optional: removes underline from link
          //   },
          // }}

          css={{
            // backgroundColor: "orange",
            position: "relative",
            overflow: "hidden",
            "& a": {
              color: "transparent",
              background: "linear-gradient(45deg, orange, purple)",
              "-webkit-background-clip": "text",
              "background-clip": "text",
              textDecoration: "none",
            },
          }}
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
