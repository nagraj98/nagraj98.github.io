// import { Text } from "@nextui-org/react";
import { useAppContext } from "../Context/AppContext";
import GradientText from "../GradientText/GradientText";
import styles from "./main.module.css";
import Typewriter from "typewriter-effect";

import { Button, Text } from "@nextui-org/react";

export default function Main() {
  const device = useAppContext();
  return (
    <div className={styles.main} id="home">
      <Text
        h3={device == "lg"}
        h5={device != "lg"}
        className={styles.h3}
        css={{ color: "$gray700" }}
      >
        Hi, my name is
      </Text>
      <GradientText
        text="Nagraj"
        h2
        size={device == "lg" ? "$8xl" : "6xl"}
        className={device == "lg" ? styles.h1 : styles.h1small}
        weight="semibold"
      />
      <Text
        h2={device == "lg"}
        h5={device != "lg"}
        size={device === "lg" ? "$2xl" : "$xl"}
        css={{
          color: "$gray700",
          display: "flex",
          flexDirection: device === "lg" ? "row" : "column",
        }}
      >
        Data Scientist 💻 &nbsp; &nbsp;
        <Typewriter
          options={{
            strings: [
              "ML at Purdue University 🎓",
              "Curious 🧠",
              "Creative 💭",
              "Solution Oriented 💡",
            ],
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 30,
          }}
        />
      </Text>
      <br />
      <br />

      <Text
        h3={device == "lg"}
        h5={device != "lg"}
        className={styles.h3}
        css={{ color: "$gray700" }}
      >
        I am currently seeking <strong>full-time</strong> opportunities and will
        be available to begin new professional challenges in the{" "}
        <strong>US</strong> from <strong>August 12, 2024</strong>, under{" "}
        <strong>
          F1 <em>STEM OPT</em>
        </strong>{" "}
        status
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
          href="assets/nagraj_resume_May24.pdf"
          title="Take a look !"
          target="_blank"
        >
          View Resume
        </a>
      </Button>
    </div>
  );
}
