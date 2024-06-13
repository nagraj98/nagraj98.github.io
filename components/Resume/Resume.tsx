import { useAppContext } from "../Context/AppContext";
import GradientText from "../GradientText/GradientText";

import styles from "./resume.module.css";

export default function Resume() {
  const device = useAppContext();
  return (
    <div id="resume" style={{ width: "100%", height: "100vh" }}>
      <GradientText h2 size={device == "lg" ? "$6xl" : "4xl"} text="Resume" />
      <iframe
        src="assets/nagraj_resume_June2024.pdf"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Resume"
      />
    </div>
  );
}
