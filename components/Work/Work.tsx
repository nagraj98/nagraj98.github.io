import { Button, Grid, Text } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "../Context/AppContext";
import GradientText from "../GradientText/GradientText";
import { tagTitles } from "../Projects/Projects";
import styles from "./work.module.css";

const companyList = ["Spry", "SocGen", "RAMAN"];
const companyContent = {
  Spry: {
    name: "Spry Therapeutics Inc.",
    link: "https://www.sprypt.com/",
    shortName: "Spry",
    duration: "February 2022 - March 2023",
    position: "Data Scientist",
    description: [
      "Optimised pose detection models used in client-side AI, improving speed by 200% and accuracy by 65%",
      "Proposed and led movement categorization project helping product scale from 5 exercises to 400+ exercises",
      "Built novel algorithms for calculating 15+ accuracy parameters of 5 categories of exercises",
      "Directed a 4 member data science team on Remote therapeutic monitoring (RTM) tool securing a $7M funding from marquee investors",
      "Improved assessment reports by introducing visualizations using opencv and pillow",
      "Developed LightGBM pose classifier reducing exercise identification false positive rate from 9% to 0.1%",
      "Implemented Computer vision pipeline utilizing celery, fastapi, AWS cloud, and mediapipe",
    ],
    tags: ["AWS", "FastAPI", "LightGBM", "ReactJS", "mediapipe"],
    awards: [],
  },
  SocGen: {
    name: "Société Générale",
    shortName: "SocGen",
    link: "https://www.societegenerale.com/en",
    duration: "August 2020 - October 2021",
    position: "Software Engineer",
    description: [
      "Engaged in agile team to deliver a robust Credit Risk Monitoring application used by 1100+ end-clients",
      "Solved 6 types of severe security vulnerabilities, making application OWASP compliant",
      "Spearheaded the migration project of a module from C++ to Java, delivering within 2 months",
      "Built a documentation pipeline for common issues, resulting in a 30% reduction in team’s response time",
      "Collaborated in disaster recovery activity solving myriad issues with multiple stakeholders",
      "Implemented a mechanism for live debugging directly in production for 10% of users",
    ],
    tags: ["Java", "SpringBoot", "SQL", "AWS", "Bash scripting"],
    awards: [],
  },
  RAMAN: {
    name: "Robotics And Machine Analytics (RAMAN) Laboratory",
    shortName: "RAMAN",
    link: "https://www.ramanlab.co.in/",
    duration: "Jul 2019 - May 2020",
    position: "Researcher",
    description: [
      "Developed novel metaheuristic optimization algorithms for high dimensional complex problems giving better results with high stability and quick convergence",
      "Published 2 papers with total 20 citations in reputed journals - Evolutionary Intelligence (Springer) and Knowledge Based Systems (Elsevier)",
    ],
    tags: ["Python3", "Optimisation Algorithms", "LateX"],
    awards: [],
  },
};

export default function Work() {
  const device = useAppContext();
  const [selectedComp, setSelectedComp] = useState("Spry");
  return (
    <div id="work" className={styles.work}>
      <GradientText
        h2
        size={device == "lg" ? "$6xl" : "4xl"}
        text="Work Experience"
      />
      <Grid.Container className={styles.workMain}>
        <Grid sm={2} xs={12} className={styles.companyList}>
          {companyList.map((comp) => {
            if (comp == selectedComp) {
              return (
                <GradientText
                  key={comp}
                  text={comp}
                  h5
                  weight="bold"
                  className={styles.selected}
                />
              );
            }
            return (
              <Text
                h6
                onClick={() => setSelectedComp(comp)}
                color="$gray800"
                key={comp}
              >
                {comp}
              </Text>
            );
          })}
        </Grid>
        <Grid sm={10} xs={12} className={styles.companyDesc}>
          <Link href={companyContent[selectedComp].link} target="_blank">
            <GradientText h3 text={companyContent[selectedComp].name} />
          </Link>
          <div className={styles.subtitle}>
            <Text h4 color="$gray800" weight="semibold">
              {companyContent[selectedComp].position}
            </Text>
            <Text i color="$gray800">
              {companyContent[selectedComp].duration}
            </Text>
          </div>
          <ul className={styles.descList}>
            {companyContent[selectedComp].description.map((desc, index) => (
              <li key={`${selectedComp}-${index}`}>
                <Text color="$gray700">{desc}</Text>
              </li>
            ))}
          </ul>
          <div className={styles.tagGroup}>
            {companyContent[selectedComp].tags.map((tag) => (
              <Button
                key={tag}
                className={styles.tagButton}
                flat
                size="xs"
                borderWeight="light"
                title={tagTitles[tag]}
              >
                {/* <GradientText size="$sm" text={tag} /> */}
                <Text
                  css={{
                    // textGradient: "45deg, $blue600 -20%, $purple600 60%",
                    textGradient: "45deg, orange -10%, purple 100%",
                  }}
                >
                  {tag}
                </Text>
              </Button>
            ))}
          </div>
          {companyContent[selectedComp].awards.length > 0 ? (
            <div className={styles.awards}>
              <Text i color="$gray800" weight="semibold" size="$md">
                Awards:{" "}
              </Text>
              <div className={styles.awardsList}>
                {companyContent[selectedComp].awards.map((award) => (
                  <Text color="$gray700" size="$md" key={award}>
                    &nbsp;{award}&nbsp;
                  </Text>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </Grid>
      </Grid.Container>
    </div>
  );
}
