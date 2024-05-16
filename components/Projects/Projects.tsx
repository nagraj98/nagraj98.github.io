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
    title: "Multimodal Meme Search Engine",
    description:
      "Developed a search engine using CLIP model for semantic search on meme images and text queries.",
    tags: ["Python", "Pinecone", "CLIP"],
    link: "https://github.com/nagraj98/build-n-learn/tree/main/pinecone_meme_search",
  },
  {
    title: "LLM Powered Autonomous Marketing Agent",
    description:
      "Developed an LLM-powered agent to identify trends and generate platform-specific post ideas, boosting engagement by 25%.",
    tags: ["Python", "LLMs", "Langchain", "LanceDB", "FastAPI"],
    link: "https://github.com/nagraj98/llm-marketing-agent",
  },
  {
    title: "Walmart M5 Sales Forecasting",
    description:
      "Forecasted 30K+ time series using sales, pricing, and temporal features, achieving a validation loss of 0.013.",
    tags: [
      "Time Series Forecasting",
      "LSTM",
      "XGBoost",
      "Keras",
      "Feature Engineering",
    ],
    link: "https://github.com/nagraj98/m5kaggle",
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
    link: "https://github.com/nagraj98/Airbnb_superhosts",
  },
  {
    title: "LLMs for Automated Medical Documentation",
    description:
      "Hosted Llama-2 on AWS Sagemaker for zero-shot prompting and RAG, achieving WER of 0.86 on medical transcripts.",
    tags: ["Prompt Engineering", "Python", "Sagemaker"],
    link: "https://github.com/nagraj98/data4good",
  },
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
    link: "https://github.com/nagraj98/gap_bigdata_case",
  },

  {
    title: "Driver Performance Analysis Across F1 Circuits",
    description:
      "Maximizing the excitement in a Formula 1 Grand Prix with some network analysis and algorithmic magic",
    tags: ["Graph Algorithms", "BFS", "Linear Programming", "Clustering"],
    link: "https://github.com/nagraj98/fun_with_f1",
  },

  {
    title: "Analysing clique behavior in academic settings",
    description:
      "Understanding relationships among a real-world collaboration network of researchers who have published General Relativity work in Arxiv",
    tags: [
      "Network analysis",
      "Community Detection",
      "Network Simulation",
      "ERGM",
      "R",
    ],
    link: "https://github.com/nagraj98/arxiv_networks_analysis",
  },

  {
    title: "Key Opinion Leader Identification for Neurology",
    description:
      "Developed a data-driven approach using ML and NLP to identify and engage influential KOLs in neurology, enhancing market impact.",
    tags: ["USgov APIs", "Business Analytics", "Machine Learning", "pandas"],
    link: "https://github.com/nagraj98/pharma_KOL_identification",
  },
  {
    title: "Retail Theft Analysis",
    description:
      "Deep dive into analysing the surge in Retail theft for the cities of Chicago and San Francisco",
    tags: ["Tableau", "Data Visualisation"],
    link: "#projects",
  },
  {
    title: "The Fire Guide",
    description: "A Corpus calculator for financial independence",
    tags: ["ReactJS", "FastAPI", "Python"],
    link: "https://github.com/nagraj98/The-Fire-Guide-FastAPI",
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
                <Link
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
                </Link>
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
