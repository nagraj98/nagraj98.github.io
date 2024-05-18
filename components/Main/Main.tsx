import { Text } from "@nextui-org/react";
import { useAppContext } from "../Context/AppContext";
import GradientText from "../GradientText/GradientText";
import styles from "./main.module.css";
import Typewriter from "typewriter-effect";
import ChessPuzzle from "../ChessPuzzle/ChessPuzzle";

export default function Main() {
  const device = useAppContext();
  return (
    <div className={styles.main} id="home">
      <div className={styles.content}>
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
                "MS BAIM at Purdue University 🎓",
                "Philosophy bug",
                "F1 enthusiast! Go Carlando ❤️",
                "Intrigued by the smallest of things",
              ],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 30,
            }}
          />
        </Text>
      </div>
      <div className={styles.chessPuzzle}>
        <ChessPuzzle />
      </div>
    </div>
  );
}
