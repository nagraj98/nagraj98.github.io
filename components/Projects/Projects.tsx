import { Button, Card, Grid, Link, Row, Text } from "@nextui-org/react";
import Image from "next/image";
import { useAppContext } from "../Context/AppContext";
import GradientText from "../GradientText/GradientText";
import styles from "./projects.module.css";

export const tagTitles = {
  GA: "Genetic Algorithm",
  NLP: "Natural Language Processing",
  TS: "TypeScript",
  GKE: "Google Kubernetes Engine",
  GCS: "Google Cloud Storage",
};

const list = [
  {
    title: "Data Driven Marketing for GAP Inc.",
    description:
      "Exploring data driven marketing techniques for fashion retail industry including market segmentation, customer sentiment analysis, financial data analysis and SERP analysis.",
    tags: [
      "Web Scraping",
      "Selenium",
      "Statistical analysis",
      "Google Trends",
      "GCP",
      "Python",
    ],
    link: "#home",
  },
  {
    title: "Decoding the 'Super' in AirBnb's Superhosts",
    description:
      "Decoding the superhost status and its criteria over 16 evaluation periods. Understanding if it helps, how it helps and who it helps.",
    tags: [
      "Network effects",
      "Chi2",
      "Linear Regression",
      "Interaction effects",
      "KMeans",
      "XGboost",
      "Optimisation",
      "Python",
    ],
    link: "#home",
  },
  {
    title: "Retail Theft Analysis",
    description:
      "Deep dive into analysing the surge in Retail theft for the cities of Chicago and San Francisco",
    tags: ["Tableau", "Data Visualisation"],
    link: "#home",
  },
  {
    title: "The Fire Guide",
    description: "A Corpus calculator for financial independence",
    tags: ["ReactJS", "FastAPI", "Python"],
    link: "#home",
  },
  {
    title: "Personal Website",
    description:
      "Personal website to showcase my projects and work. Do have a look!",
    tags: ["NextJS", "NextUI", "JS", "TS", "CSS", "HTML"],
    link: "#home",
  },
];

export default function Projects() {
  const device = useAppContext();
  return (
    <div id="projects" className={styles.projects}>
      <GradientText h2 size={device == "lg" ? "$6xl" : "4xl"} text="Projects" />
      <Grid.Container
        gap={2}
        justify="flex-start"
        className={styles.projectCard}
      >
        {list.map((item, index) => (
          <Grid xs={12} sm={4} key={item.title} className={styles.gridCard}>
            <Card css={{ p: "$6", mw: "400px" }} isHoverable role="contentinfo">
              <Card.Header className={styles.cardHeader}>
                <Grid.Container css={{ pl: "$6" }}>
                  <Grid xs={12}>
                    <Text h4 css={{ lineHeight: "$xs" }} style={{ margin: 0 }}>
                      {item.title}
                    </Text>
                  </Grid>
                </Grid.Container>
                {/* <Link
                  //   icon
                  color="primary"
                  target="_blank"
                  href={item.link}
                >
                  <Image
                    src="/images/github.svg"
                    height={device == "lg" ? 30 : 20}
                    width={device == "lg" ? 30 : 20}
                    alt="Github"
                  />
                </Link> */}
              </Card.Header>
              <Card.Body css={{ py: "$2" }} className={styles.cardBody}>
                <div className={styles.tagGroup}>
                  {item.tags.map((tag) => (
                    <Button
                      key={tag}
                      className={styles.tagButton}
                      flat
                      size="xs"
                      borderWeight="light"
                      title={tagTitles[tag]}
                      // style={{
                      //   // background: "#111 !important", // Dark background color
                      //   color: "orange !important", // Light color for text
                      //   // fontWeight: "bold !important", // Bold text
                      // }}
                    >
                      <Text
                        css={{
                          // textGradient: "45deg, $blue600 -20%, $purple600 60%",
                          textGradient: "45deg, orange -10%, purple 100%",
                        }}
                      >
                        {tag}
                      </Text>
                      {/* <Text
                        size="$xs"
                        text={tag}
                        css={{ fontWeight: "bold" }}
                      /> */}
                    </Button>
                  ))}
                </div>
                <Text className={styles.mainText} h5 weight="normal">
                  {item.description}
                </Text>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
}
