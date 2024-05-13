import { Col, Container, Row, Text } from "@nextui-org/react";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import { useAppContext } from "../components/Context/AppContext";
import Layout from "../components/layout";
import Main from "../components/Main/Main";
import NavBar from "../components/NavBar/NavBar";
import Projects from "../components/Projects/Projects";
import ChessPuzzle from "../components/ChessPuzzle/ChessPuzzle";
import Social from "../components/Social/Social";
import Work from "../components/Work/Work";
import styles from "./index.module.css";

export default function Home() {
  const device = useAppContext();
  return (
    <Layout>
      <Container lg={true} className={styles.container}>
        <Row className={styles.navRow}>
          <NavBar />
        </Row>
        {device == "lg" || device == "md" ? (
          <Row className={styles.bodyRow}>
            <Col span={device == "lg" ? 1 : 2}>
              <Social />
            </Col>
            <Col span={device == "lg" ? 11 : 10} className={styles.main}>
              <Main />
              <About />
              <Work />
              <Projects />
              {/* <Education /> */}
              <Contact />
              <ChessPuzzle position="r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 2 3" />
              <div className={styles.footer}>
                <div className={styles.line} />
                <Text h5 css={{ color: "$gray700" }}>
                  Nagraj Deshmukh
                </Text>
                <div className={styles.line} />
              </div>
            </Col>
          </Row>
        ) : (
          <Row className={styles.mowBodyRow}>
            <Row className={styles.mowMain}>
              <Main />
              <About />
              <Work />
              <Projects />
              {/* <Education /> */}
              <Contact />
              {/* <ChessPuzzle position="r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 2 3" /> */}
            </Row>
            <Row className={styles.mowSocial}>
              <Social />
            </Row>
          </Row>
        )}
      </Container>
    </Layout>
  );
}
