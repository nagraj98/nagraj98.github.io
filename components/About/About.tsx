import { Link, Text } from "@nextui-org/react";
import { useAppContext } from "../Context/AppContext";
import GradientText from "../GradientText/GradientText";
import styles from "./about.module.css";
import Image from "next/image";

export default function About() {
  const device = useAppContext();

  const skills = [
    {
      category: "Languages",
      content: "Python3, JavaScript, C, C++, SQL",
    },
    {
      category: "Tools",
      content: "AWS, Azure, Docker, Webpack",
    },
    {
      category: "Frameworks",
      content: "ReactJS, NextJS, Pytest, Pytorch",
    },
    {
      category: "Theory",
      content:
        "Foundational Models, Computer Vision, Optimisation Algorithms, System Design, Databases",
    },
  ];

  const certifications = [
    {
      name: "AWS Cloud Fundamentals",
      imageUrl: "/images/aws-certified-cloud-practitioner.png",
      credlyUrl:
        "https://www.credly.com/badges/e0c3298d-cdf1-4636-9eaf-88224d8d7225/public_url",
    },
    {
      name: "Azure Fundamentals",
      imageUrl: "/images/microsoft-certified-azure-fundamentals.png",
      credlyUrl:
        "https://www.credly.com/badges/6c16615f-d78e-4d1b-b690-08172803e155/public_url",
    },
  ];

  return (
    <div id="about" className={styles.about}>
      <GradientText h2 size={device == "lg" ? "$6xl" : "4xl"} text="About Me" />
      <br />
      <Text h4 css={{ color: "$gray700" }} weight="normal" size="$lg">
        Hey there! I am a Data Scientist based in the United States. Currently a
        graduate student at{" "}
        <Link href="https://business.purdue.edu/" target="_blank">
          <GradientText h4 size="$lg" text="Purdue University."></GradientText>
        </Link>
        <br />
        I crunch numbers, unleash creativity, tell stories and build products. I
        have a special knack for understanding the business context behind
        products & services. A strong foundation in statistics and programming,
        including experience with databases and systems, has consistently fueled
        my success in delivering enterprise-level insights that drive growth.
        Now, I'm eager to leverage these skills and enthusiasm for AI and Deep
        Learning as an AI/ML Engineer, tackling complex problems and
        contributing to cutting-edge solutions.
        <br />
        <br />
        If you're looking for an analytical mind with a passion for AI and a
        collaborative spirit, you've found him ! Let's connect!
        <br />
        I have experience with:
        <br />{" "}
      </Text>
      {skills.map((skill) => (
        <div className={styles.listdiv} key={skill.category}>
          <GradientText
            // \u27A3 \u21DB
            text={`\u27A3 ${skill.category}:  `}
            h4
            weight="normal"
            size="$lg"
            className={styles.categoryText}
          />
          <Text
            h5
            css={{ color: "$gray700" }}
            weight="normal"
            className={styles.skillText}
          >
            {skill.content}
          </Text>
        </div>
      ))}
      <br />

      {certifications.map((cert) => (
        <a
          key={cert.name} // Use the name as a key for React's list rendering
          href={cert.credlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.certificationLink} // Add if you want to style the links
        >
          <Image
            src={cert.imageUrl}
            alt={`${cert.name} certification`}
            width={100} // You might want to move these to your CSS if they're the same for all
            height={100}
            className={styles.certificationImage} // Add if you want to style the images
          />
        </a>
      ))}

      {(device == "sm" || device == "xs") && (
        <>
          {" "}
          <br /> <br />
        </>
      )}
    </div>
  );
}
